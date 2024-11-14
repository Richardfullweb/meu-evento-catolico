// Atualizando os tipos com valores em português
export type EventType = 'presencial' | 'online' | 'hibrido' | 'curso-video';
export type EventCategory = 
  | 'festa' | 'show' | 'curso' | 'workshop' 
  | 'esporte' | 'gastronomia' | 'teatro' 
  | 'congresso' | 'palestra' | 'tour' 
  | 'infantil' | 'tecnologia' | 'religioso' | 'outro';

export type TemplateType = 'zero' | 'simples-2' | 'template-1';
export type ColorTheme = 'vermelho' | 'azul' | 'verde' | 'roxo' | 'laranja';
export type PaymentMethod = 'cartao' | 'transferencia' | 'pix';

export interface EventLocation {
  country: string;
  venue: string;
  zipCode?: string;
  address: string;
  district?: string;
  city: string;
  state: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface TicketBatch {
  id: string;
  name: string;
  price: number;
  serviceFee: number;
  finalPrice: number;
  quantity: number;
  isVisible: boolean;
  type: 'pago' | 'gratuito';
  startDate?: string;
  endDate?: string;
}

export interface CustomField {
  id: string;
  label: string;
  type: 'text';
  required: boolean;
  maxLength: number;
}

export interface EventDesign {
  template: TemplateType;
  colorTheme: ColorTheme;
  headerStyle: {
    type: 'banner' | 'cor-solida';
    value: string;
  };
  organizerLogo?: string;
}

export interface EventDetails {
  id: string;
  type: EventType;
  name: string;
  description: string;
  category: EventCategory;
  contactEmail: string;
  socialMedia: SocialMedia;
  startDate: string;
  endDate?: string;
  location: EventLocation;
}

export interface EventRegistration {
  totalCapacity: number;
  ticketBatches: TicketBatch[];
  serviceFeeType: 'organizador' | 'participante';
  paymentMethods: PaymentMethod[];
  customFields: CustomField[];
}

export interface EventConfiguration {
  design: EventDesign;
  organizerName: string;
  organizerDescription?: string;
  customUrl: string;
  isPublished: boolean;
}