import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, BarChart3, Settings, Users, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600">EventPro</h1>
      </div>
      <nav className="mt-6">
        <Link
          to="/app/dashboard"
          className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
            isActive('/app/dashboard') ? 'bg-indigo-50 text-indigo-600' : ''
          }`}
        >
          <BarChart3 className="w-5 h-5 mr-3" />
          Painel
        </Link>
        <Link
          to="/app/events"
          className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
            isActive('/app/events') ? 'bg-indigo-50 text-indigo-600' : ''
          }`}
        >
          <Calendar className="w-5 h-5 mr-3" />
          Eventos
        </Link>
        {user?.role === 'admin' && (
          <Link
            to="/app/users"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
              isActive('/app/users') ? 'bg-indigo-50 text-indigo-600' : ''
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Usuários
          </Link>
        )}
        <Link
          to="/app/settings"
          className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
            isActive('/app/settings') ? 'bg-indigo-50 text-indigo-600' : ''
          }`}
        >
          <Settings className="w-5 h-5 mr-3" />
          Configurações
        </Link>
      </nav>
    </aside>
  );
};

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-800">Painel</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src={user?.avatar}
              alt="Perfil"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">{user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600 flex items-center"
          >
            <LogOut className="w-5 h-5 mr-1" />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-16">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}