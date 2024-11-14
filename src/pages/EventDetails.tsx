import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Tag, DollarSign, Share2, Heart, Globe, Mail, Phone, AlertCircle } from 'lucide-react';
import type { Event, TicketBatch } from '../types/event';

// Mock data - Replace with actual API call
const mockEvent: Event = {
  id: '1',
  title: 'Tech Conference 2024',
  description: `Junte-se a nós para a maior conferência de tecnologia do ano! O Tech Conference 2024 reunirá líderes da indústria, inovadores e profissionais de tecnologia para compartilhar conhecimentos, tendências e as últimas inovações.

  Durante o evento, você terá acesso a:
  - Palestras inspiradoras com especialistas renomados
  - Workshops práticos e interativos
  - Networking com profissionais da área
  - Demonstrações de novas tecnologias
  - Oportunidades de carreira

  Não perca esta oportunidade única de fazer parte do futuro da tecnologia!`,
  type: 'presencial',
  category: 'tecnologia',
  date: '2024-04-15T09:00:00',
  endDate: '2024-04-15T18:00:00',
  location: {
    country: 'Brasil',
    venue: 'Centro de Convenções',
    address: 'Av. Principal, 1000',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01000-000',
    district: 'Centro'
  },
  organizerId: '1',
  imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80',
  price: 299,
  capacity: 500,
  registrations: 342,
  status: 'published',
  featured: true,
  tags: ['tecnologia', 'networking', 'inovação'],
  amenities: ['Wi-Fi', 'Coffee Break', 'Material Didático'],
  organizer: {
    name: 'Tech Events Brasil',
    description: 'Organizadora líder em eventos de tecnologia',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=200&h=200&q=80',
    email: 'contato@techevents.com.br',
    phone: '(11) 99999-9999',
    website: 'https://techevents.com.br'
  },
  gallery: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
  ],
  ticketTypes: [
    {
      id: '1',
      name: 'Early Bird',
      description: 'Lote promocional com quantidade limitada',
      price: 199,
      quantity: 100,
      soldCount: 100,
      benefits: ['Acesso a todas as palestras', 'Material digital', 'Coffee break']
    },
    {
      id: '2',
      name: 'Regular',
      description: 'Ingresso padrão do evento',
      price: 299,
      quantity: 300,
      soldCount: 242,
      benefits: ['Acesso a todas as palestras', 'Material digital', 'Coffee break']
    },
    {
      id: '3',
      name: 'VIP',
      description: 'Experiência premium com benefícios exclusivos',
      price: 499,
      quantity: 100,
      soldCount: 0,
      benefits: [
        'Acesso a todas as palestras',
        'Material digital e físico',
        'Coffee break premium',
        'Área VIP',
        'Networking exclusivo com palestrantes'
      ]
    }
  ]
};

interface TicketSelectionModalProps {
  ticket: TicketBatch;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
}

function TicketSelectionModal({ ticket, onClose, onConfirm }: TicketSelectionModalProps) {
  const [quantity, setQuantity] = useState(1);
  const availableQuantity = ticket.quantity - ticket.soldCount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">{ticket.name}</h3>
        <div className="mb-4">
          <p className="text-gray-600">{ticket.description}</p>
          <p className="text-xl font-bold mt-2">R$ {ticket.price}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantidade
          </label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border rounded-md"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(availableQuantity, quantity + 1))}
              className="px-3 py-1 border rounded-md"
              disabled={quantity >= availableQuantity}
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {availableQuantity} ingressos disponíveis
          </p>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>R$ {(ticket.price * quantity).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Taxa de serviço (10%)</span>
            <span>R$ {(ticket.price * quantity * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>R$ {(ticket.price * quantity * 1.1).toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(quantity)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EventDetails() {
  const { id } = useParams();
  const [selectedTicket, setSelectedTicket] = useState<TicketBatch | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // In a real app, fetch event data using the id
  const event = mockEvent;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateProgress = (sold: number, total: number) => {
    return (sold / total) * 100;
  };

  const handleTicketPurchase = (quantity: number) => {
    // Implement ticket purchase logic
    console.log(`Purchasing ${quantity} tickets of type ${selectedTicket?.name}`);
    setSelectedTicket(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                  {event.featured && (
                    <span className="px-3 py-1 bg-yellow-500 rounded-full text-sm font-medium">
                      Destaque
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    {formatDateTime(event.date)}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {event.location.city}, {event.location.state}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Sobre o Evento</h2>
                <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
              </section>

              {/* Details */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Data e Hora</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-3" />
                      <div>
                        <p>Início: {formatDateTime(event.date)}</p>
                        {event.endDate && (
                          <p>Término: {formatDateTime(event.endDate)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3" />
                      <p>Duração: 9 horas</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Local</h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="font-medium">{event.location.venue}</p>
                    <p>{event.location.address}</p>
                    <p>{event.location.district}</p>
                    <p>
                      {event.location.city}, {event.location.state}
                    </p>
                    <p>{event.location.zipCode}</p>
                  </div>
                </div>
              </section>

              {/* Gallery */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Galeria</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {event.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Foto ${index + 1}`}
                      className="rounded-lg w-full h-48 object-cover cursor-pointer hover:opacity-75 transition-opacity"
                      onClick={() => window.open(image, '_blank')}
                    />
                  ))}
                </div>
              </section>

              {/* Amenities */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Comodidades</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-50 p-4 rounded-lg"
                    >
                      <Tag className="w-5 h-5 mr-3 text-indigo-600" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tickets */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Ingressos</h3>
                <div className="space-y-4">
                  {event.ticketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{ticket.name}</h4>
                          <p className="text-sm text-gray-600">
                            {ticket.description}
                          </p>
                        </div>
                        <span className="text-xl font-bold">
                          R$ {ticket.price}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{
                              width: `${calculateProgress(
                                ticket.soldCount,
                                ticket.quantity
                              )}%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>
                            {ticket.quantity - ticket.soldCount} disponíveis
                          </span>
                          <span>{ticket.soldCount} vendidos</span>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-1">
                        {ticket.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-indigo-600 mr-2">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={ticket.soldCount === ticket.quantity}
                      >
                        {ticket.soldCount === ticket.quantity
                          ? 'Esgotado'
                          : 'Comprar'}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-yellow-50 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-600">
                    Os ingressos são limitados e podem se esgotar rapidamente. Garanta já o seu!
                  </p>
                </div>
              </div>

              {/* Organizer */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Organizador</h3>
                <div className="flex items-center mb-4">
                  <img
                    src={event.organizer.logo}
                    alt={event.organizer.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{event.organizer.name}</h4>
                    <p className="text-sm text-gray-600">
                      {event.organizer.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a
                    href={`mailto:${event.organizer.email}`}
                    className="flex items-center text-gray-600 hover:text-indigo-600"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    {event.organizer.email}
                  </a>
                  <a
                    href={`tel:${event.organizer.phone}`}
                    className="flex items-center text-gray-600 hover:text-indigo-600"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    {event.organizer.phone}
                  </a>
                  <a
                    href={event.organizer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-indigo-600"
                  >
                    <Globe className="w-5 h-5 mr-3" />
                    Website
                  </a>
                </div>
              </div>

              {/* Share & Save */}
              <div className="flex space-x-4">
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex-1 flex items-center justify-center border py-2 rounded-lg transition-colors ${
                    isSaved
                      ? 'bg-pink-50 border-pink-600 text-pink-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 mr-2 ${isSaved ? 'fill-current' : ''}`}
                  />
                  {isSaved ? 'Salvo' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Selection Modal */}
      {selectedTicket && (
        <TicketSelectionModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onConfirm={handleTicketPurchase}
        />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Compartilhar Evento</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${event.title}\n${window.location.href}`)}`)}
                className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50"
              >
                WhatsApp
              </button>
              <button
                onClick={() => window.open(`https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(event.title)}`)}
                className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50"
              >
                Telegram
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${event.title}\n${window.location.href}`)}`)}
                className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50"
              >
                Twitter
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copiado!');
                }}
                className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50"
              >
                Copiar Link
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 p-2 border rounded-lg hover:bg-gray-50"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}