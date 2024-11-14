import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Calendar, DollarSign, TrendingUp, Tag } from 'lucide-react';
import type { DashboardStats, EventType } from '../types';

const mockStats: DashboardStats = {
  totalEvents: 45,
  activeEvents: 12,
  totalRegistrations: 1250,
  revenue: 25000,
  topEventTypes: [
    { type: 'tech', count: 15 },
    { type: 'show', count: 12 },
    { type: 'workshop', count: 8 }
  ],
  recentSales: [
    { eventId: '1', eventTitle: 'Tech Conference 2024', amount: 299, date: '2024-03-15' },
    { eventId: '2', eventTitle: 'Summer Music Festival', amount: 89, date: '2024-03-14' },
    { eventId: '3', eventTitle: 'Digital Marketing Workshop', amount: 199, date: '2024-03-13' }
  ]
};

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: any; color: string }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Painel de Controle</h1>
        <button
          onClick={() => navigate('/events/create')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Criar Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Eventos"
          value={mockStats.totalEvents}
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="Eventos Ativos"
          value={mockStats.activeEvents}
          icon={BarChart3}
          color="bg-green-500"
        />
        <StatCard
          title="Total de Inscrições"
          value={mockStats.totalRegistrations}
          icon={Users}
          color="bg-purple-500"
        />
        <StatCard
          title="Receita Total"
          value={`R$ ${mockStats.revenue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Tipos de Eventos Populares</h2>
            <Tag className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockStats.topEventTypes.map(({ type, count }) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">{type.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    <p className="text-sm text-gray-500">{count} eventos</p>
                  </div>
                </div>
                <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${(count / mockStats.totalEvents) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Vendas Recentes</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockStats.recentSales.map((sale) => (
              <div key={sale.eventId} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{sale.eventTitle}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(sale.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-lg font-medium text-gray-900">
                  R$ {sale.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}