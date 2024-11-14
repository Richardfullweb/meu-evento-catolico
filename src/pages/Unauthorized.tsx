import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Acesso Não Autorizado
        </h2>
        <p className="mt-2 text-gray-600">
          Você não tem permissão para acessar esta página.
        </p>
        <button
          onClick={() => navigate('/app/dashboard')}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Voltar ao Dashboard
        </button>
      </div>
    </div>
  );
}