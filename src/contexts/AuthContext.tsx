import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  AuthError
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getErrorMessage(error: AuthError): string {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Email inválido';
    case 'auth/user-disabled':
      return 'Usuário desativado';
    case 'auth/user-not-found':
      return 'Usuário não encontrado';
    case 'auth/wrong-password':
      return 'Senha incorreta';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente mais tarde';
    case 'auth/network-request-failed':
      return 'Erro de conexão. Verifique sua internet';
    case 'auth/internal-error':
      return 'Erro interno. Tente novamente';
    default:
      return 'Erro ao fazer login. Tente novamente';
  }
}

async function createUserDocument(firebaseUser: FirebaseUser): Promise<User> {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const basicUser: User = {
    id: firebaseUser.uid,
    email: firebaseUser.email!,
    name: firebaseUser.displayName || 'Usuário',
    role: 'usuario',
    phone: '',
    location: '',
    createdAt: new Date().toISOString(),
    status: 'ativo',
    password: '' // This will not be stored
  };

  try {
    await setDoc(userRef, basicUser, { merge: true });
    return basicUser;
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              ...userDoc.data()
            } as User);
          } else {
            const newUser = await createUserDocument(firebaseUser);
            setUser(newUser);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!userDoc.exists()) {
        const newUser = await createUserDocument(userCredential.user);
        setUser(newUser);
      } else {
        setUser({
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          ...userDoc.data()
        } as User);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error && 'code' in error) {
        throw new Error(getErrorMessage(error as AuthError));
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Erro ao fazer logout. Tente novamente');
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}