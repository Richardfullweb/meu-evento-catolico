export interface WordPressConfig {
  siteUrl: string;
  username: string;
  password: string;
  eventalkTheme: boolean;
  apiEndpoint: string;
  apiKey: string;
  webhookSecret: string;
}

export interface WhatsAppConfig {
  apiKey: string;
  instanceId: string;
  phoneNumber: string;
  webhookUrl: string;
  webhookSecret: string;
  notificationEvents: {
    newEvent: boolean;
    registration: boolean;
    reminder: boolean;
    cancellation: boolean;
  };
  templates: {
    welcome: string;
    confirmation: string;
    reminder: string;
    cancellation: string;
  };
}

export interface OpenAIConfig {
  apiKey: string;
  model: 'gpt-4' | 'gpt-3.5-turbo';
  temperature: number;
  maxTokens: number;
  promptTemplate: string;
  language: 'pt-BR' | 'en';
}

export interface IntegrationsConfig {
  wordpress?: WordPressConfig;
  whatsapp?: WhatsAppConfig;
  openai?: OpenAIConfig;
}

export interface WebhookEvent {
  type: string;
  data: any;
  timestamp: number;
  signature: string;
}