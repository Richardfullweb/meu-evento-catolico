import React, { useState } from 'react';
import { Bell, Lock, CreditCard } from 'lucide-react';
import Integrations from './Settings/Integrations';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'integrations' | 'billing';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs: { id: SettingsTab; label: string }[] = [
    { id: 'profile', label: 'Perfil' },
    { id: 'notifications', label: 'Notificações' },
    { id: 'security', label: 'Segurança' },
    { id: 'integrations', label: 'Integrações' },
    { id: 'billing', label: 'Faturamento' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'integrations' && <Integrations />}
        {/* Outros conteúdos das abas permanecem os mesmos */}
      </div>
    </div>
  );
}