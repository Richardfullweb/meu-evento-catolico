export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'organizador' | 'usuario';
  phone: string;
  location: string;
  avatar?: string;
  createdAt: string;
  status: 'ativo' | 'inativo';
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'organizador' | 'usuario';
  phone: string;
  location: string;
}