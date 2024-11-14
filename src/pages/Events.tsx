import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Tag, Filter, Search } from 'lucide-react';
import type { Event, EventType } from '../types/event';

const mockEvents: Event[] = [
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
  },
  {
    id: '3',
    title: 'Workshop de Marketing Digital',
    description: 'Aprenda as melhores estratégias de marketing digital',
    type: 'online',
    category: 'curso',
    date: '2024-05-10',
    location: {
      country: 'Brasil',
      venue: 'Online',
      address: 'N/A',
      city: 'Online',
      state: 'N/A'
    },
    organizerId: '3',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80',
    price: 149,
    capacity: 100,
    registrations: 45,
    status: 'published',
    featured: false,
    tags: ['marketing', 'digital', 'educação'],
    amenities: ['Material Digital', 'Certificado', 'Suporte Online']
  }
];

const eventTypes = [
  { type: 'presencial', label: 'Presencial' },
  { type: 'online', label: 'Online' },
  { type: 'hibrido', label: 'Híbrido' },
  { type: 'curso-video', label: 'Curso em Vídeo' }
];

export default function Events() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesType = selectedType === 'all' || event.type === selectedType;
      
      const matchesSearch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDate = !selectedDate || 
        new Date(event.date).toISOString().split('T')[0] === selectedDate;
      
      const matchesLocation = !selectedLocation || 
        event.location.city.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        event.location.state.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesType && matchesSearch && matchesDate && matchesLocation;
    });
  }, [selectedType, searchQuery, selectedDate, selectedLocation]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Eventos</h1>
        <button
          onClick={() => navigate('/app/events/create')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Criar Evento
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
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
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum evento encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                {event.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-medium rounded-full">
                    Destaque
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800">
                    {eventTypes.find(t => t.type === event.type)?.label}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location.city}, {event.location.state}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    {event.registrations} / {event.capacity} inscritos
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Tag className="w-4 h-4 mr-2" />
                    {event.tags.join(', ')}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      R$ {event.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {event.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/app/events/${event.id}`)}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}