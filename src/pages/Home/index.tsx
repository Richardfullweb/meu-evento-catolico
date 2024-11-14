import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, Filter, ArrowRight } from 'lucide-react';
import type { Event, EventType } from '../../types/event';

const featuredEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring industry leaders',
    type: 'presencial',
    category: 'tecnologia',
    date: '2024-04-15',
    location: {
      country: 'Brasil',
      venue: 'Centro de Convenções',
      address: 'Av. Principal, 1000',
      city: 'São Paulo',
      state: 'SP'
    },
    organizerId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80',
    price: 299,
    capacity: 500,
    registrations: 342,
    status: 'published',
    featured: true,
    tags: ['tecnologia', 'networking', 'inovação'],
    amenities: ['Wi-Fi', 'Coffee Break', 'Material Didático']
  },
  {
    id: '2',
    title: 'Festival de Música de Verão',
    description: 'Um dia inteiro de música ao vivo e entretenimento',
    type: 'presencial',
    category: 'show',
    date: '2024-07-20',
    location: {
      country: 'Brasil',
      venue: 'Parque da Cidade',
      address: 'Rua do Parque, 500',
      city: 'Rio de Janeiro',
      state: 'RJ'
    },
    organizerId: '2',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=2000&q=80',
    price: 89,
    capacity: 2000,
    registrations: 1250,
    status: 'published',
    featured: true,
    tags: ['música', 'festival', 'verão'],
    amenities: ['Food Court', 'Estacionamento', 'Área VIP']
  }
];

const eventTypes = [
  { type: 'presencial', label: 'Presencial' },
  { type: 'online', label: 'Online' },
  { type: 'hibrido', label: 'Híbrido' },
  { type: 'curso-video', label: 'Curso em Vídeo' }
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const filteredEvents = useMemo(() => {
    return featuredEvents.filter(event => {
      const matchesSearch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        event.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.state.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'all' || event.type === selectedType;

      const matchesDate = !selectedDate || 
        new Date(event.date).toISOString().split('T')[0] === selectedDate;

      const matchesLocation = !selectedLocation || 
        event.location.city.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        event.location.state.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesType && matchesDate && matchesLocation;
    });
  }, [searchQuery, selectedType, selectedDate, selectedLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add additional search logic here if needed
    navigate('/app/events', { 
      state: { 
        searchQuery,
        selectedType,
        selectedDate,
        selectedLocation 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-600 h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=80"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Crie e Gerencie Seus Eventos
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Plataforma completa para organização e divulgação de eventos
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/app/events/create')}
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Criar Evento
              </button>
              <button
                onClick={() => navigate('/app/events')}
                className="px-8 py-4 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-400 transition-colors"
              >
                Explorar Eventos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Localização"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as EventType | 'all')}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">Todos os tipos</option>
                {eventTypes.map(({ type, label }) => (
                  <option key={type} value={type}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Buscar Eventos
            </button>
          </div>
        </form>
      </div>

      {/* Featured Events */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery || selectedType !== 'all' || selectedDate || selectedLocation
              ? 'Eventos Encontrados'
              : 'Eventos em Destaque'}
          </h2>
          <Link
            to="/app/events"
            className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center"
          >
            Ver todos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum evento encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                      R$ {event.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-5 w-5 mr-2" />
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-5 w-5 mr-2" />
                      {event.location.city}, {event.location.state}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/app/events/${event.id}`)}
                    className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que escolher nossa plataforma?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Fácil de Usar',
                description: 'Interface intuitiva para criar e gerenciar seus eventos em minutos'
              },
              {
                title: 'Ferramentas Completas',
                description: 'Tudo que você precisa para organizar eventos de sucesso'
              },
              {
                title: 'Suporte Dedicado',
                description: 'Equipe pronta para ajudar você em todas as etapas'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Comece a organizar seus eventos hoje mesmo
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Junte-se a milhares de organizadores de sucesso
          </p>
          <button
            onClick={() => navigate('/app/events/create')}
            className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Criar Meu Primeiro Evento
          </button>
        </div>
      </div>
    </div>
  );
}