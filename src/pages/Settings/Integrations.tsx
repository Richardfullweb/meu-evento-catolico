import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Globe, MessageSquare, Brain, Save, X, Webhook, Key, FileCode, MessageCircle } from 'lucide-react';
import type { IntegrationsConfig } from '../../types/integrations';

const wordPressSchema = z.object({
  siteUrl: z.string().url(),
  username: z.string().min(1),
  password: z.string().min(1),
  eventalkTheme: z.boolean(),
  apiEndpoint: z.string().url(),
  apiKey: z.string().min(1),
  webhookSecret: z.string().min(1)
});

const whatsAppSchema = z.object({
  apiKey: z.string().min(1),
  instanceId: z.string().min(1),
  phoneNumber: z.string().min(1),
  webhookUrl: z.string().url(),
  webhookSecret: z.string().min(1),
  notificationEvents: z.object({
    newEvent: z.boolean(),
    registration: z.boolean(),
    reminder: z.boolean(),
    cancellation: z.boolean()
  }),
  templates: z.object({
    welcome: z.string(),
    confirmation: z.string(),
    reminder: z.string(),
    cancellation: z.string()
  })
});

const openAISchema = z.object({
  apiKey: z.string().min(1),
  model: z.enum(['gpt-4', 'gpt-3.5-turbo']),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().min(1).max(4000),
  promptTemplate: z.string(),
  language: z.enum(['pt-BR', 'en'])
});

const integrations = [
  {
    id: 'wordpress',
    name: 'WordPress',
    description: 'Integre seus eventos com o WordPress usando o tema Eventalk',
    icon: Globe,
    sections: [
      {
        title: 'Configurações do WordPress',
        fields: [
          {
            name: 'siteUrl',
            label: 'URL do Site',
            type: 'url',
            icon: Globe,
            placeholder: 'https://seusite.com'
          },
          {
            name: 'username',
            label: 'Usuário',
            type: 'text',
            icon: MessageCircle
          },
          {
            name: 'password',
            label: 'Senha',
            type: 'password',
            icon: Key
          },
          {
            name: 'eventalkTheme',
            label: 'Usar tema Eventalk',
            type: 'checkbox'
          }
        ]
      },
      {
        title: 'Configurações da API',
        fields: [
          {
            name: 'apiEndpoint',
            label: 'Endpoint da API',
            type: 'url',
            icon: FileCode
          },
          {
            name: 'apiKey',
            label: 'Chave da API',
            type: 'text',
            icon: Key
          },
          {
            name: 'webhookSecret',
            label: 'Segredo do Webhook',
            type: 'text',
            icon: Webhook
          }
        ]
      }
    ]
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Automatize a comunicação com participantes via WhatsApp',
    icon: MessageSquare,
    sections: [
      {
        title: 'Configurações da API',
        fields: [
          {
            name: 'apiKey',
            label: 'Chave da API',
            type: 'text',
            icon: Key
          },
          {
            name: 'instanceId',
            label: 'ID da Instância',
            type: 'text',
            icon: FileCode
          },
          {
            name: 'phoneNumber',
            label: 'Número do WhatsApp',
            type: 'text',
            icon: MessageSquare
          }
        ]
      },
      {
        title: 'Configurações do Webhook',
        fields: [
          {
            name: 'webhookUrl',
            label: 'URL do Webhook',
            type: 'url',
            icon: Webhook
          },
          {
            name: 'webhookSecret',
            label: 'Segredo do Webhook',
            type: 'text',
            icon: Key
          }
        ]
      },
      {
        title: 'Notificações',
        fields: [
          {
            name: 'notificationEvents.newEvent',
            label: 'Novo evento',
            type: 'checkbox'
          },
          {
            name: 'notificationEvents.registration',
            label: 'Nova inscrição',
            type: 'checkbox'
          },
          {
            name: 'notificationEvents.reminder',
            label: 'Lembrete do evento',
            type: 'checkbox'
          },
          {
            name: 'notificationEvents.cancellation',
            label: 'Cancelamento',
            type: 'checkbox'
          }
        ]
      },
      {
        title: 'Templates de Mensagem',
        fields: [
          {
            name: 'templates.welcome',
            label: 'Mensagem de boas-vindas',
            type: 'textarea'
          },
          {
            name: 'templates.confirmation',
            label: 'Confirmação de inscrição',
            type: 'textarea'
          },
          {
            name: 'templates.reminder',
            label: 'Lembrete do evento',
            type: 'textarea'
          },
          {
            name: 'templates.cancellation',
            label: 'Cancelamento do evento',
            type: 'textarea'
          }
        ]
      }
    ]
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Gere descrições criativas para seus eventos usando IA',
    icon: Brain,
    sections: [
      {
        title: 'Configurações da API',
        fields: [
          {
            name: 'apiKey',
            label: 'Chave da API',
            type: 'text',
            icon: Key
          },
          {
            name: 'model',
            label: 'Modelo',
            type: 'select',
            options: [
              { value: 'gpt-4', label: 'GPT-4' },
              { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
            ]
          },
          {
            name: 'temperature',
            label: 'Temperatura',
            type: 'range',
            min: 0,
            max: 2,
            step: 0.1
          },
          {
            name: 'maxTokens',
            label: 'Máximo de Tokens',
            type: 'number',
            min: 1,
            max: 4000
          }
        ]
      },
      {
        title: 'Configurações de Geração',
        fields: [
          {
            name: 'promptTemplate',
            label: 'Template do Prompt',
            type: 'textarea'
          },
          {
            name: 'language',
            label: 'Idioma',
            type: 'select',
            options: [
              { value: 'pt-BR', label: 'Português (Brasil)' },
              { value: 'en', label: 'English' }
            ]
          }
        ]
      }
    ]
  }
];

export default function Integrations() {
  const [currentIntegration, setCurrentIntegration] = useState<string | null>(null);
  const [config, setConfig] = useState<IntegrationsConfig>({});
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(
      currentIntegration === 'wordpress'
        ? wordPressSchema
        : currentIntegration === 'whatsapp'
        ? whatsAppSchema
        : currentIntegration === 'openai'
        ? openAISchema
        : z.object({})
    ),
  });

  const handleConfigureIntegration = (id: string) => {
    setCurrentIntegration(id);
    const currentConfig = config[id as keyof IntegrationsConfig];
    reset(currentConfig || {});
  };

  const handleCloseModal = () => {
    setCurrentIntegration(null);
    reset({});
  };

  const handleSaveConfig = async (data: any) => {
    if (currentIntegration) {
      try {
        setConfig({
          ...config,
          [currentIntegration]: data
        });
        handleCloseModal();
      } catch (error) {
        console.error('Erro ao salvar configuração:', error);
      }
    }
  };

  const getCurrentIntegration = () => {
    return integrations.find(i => i.id === currentIntegration);
  };

  const renderIntegrationForm = () => {
    const integration = getCurrentIntegration();
    if (!integration || !currentIntegration) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <integration.icon className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-medium">{integration.name}</h3>
            </div>
            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleSaveConfig)} className="space-y-6">
            {integration.sections.map((section, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="text-md font-medium mb-4">{section.title}</h4>
                <div className="grid grid-cols-1 gap-4">
                  {section.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        {field.icon && (
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <field.icon className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        {field.type === 'select' ? (
                          <select
                            {...register(field.name)}
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                              field.icon ? 'pl-10' : ''
                            }`}
                          >
                            {field.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : field.type === 'checkbox' ? (
                          <input
                            type="checkbox"
                            {...register(field.name)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        ) : field.type === 'textarea' ? (
                          <textarea
                            {...register(field.name)}
                            rows={3}
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                              field.icon ? 'pl-10' : ''
                            }`}
                          />
                        ) : (
                          <input
                            type={field.type}
                            {...register(field.name)}
                            placeholder={field.placeholder}
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                              field.icon ? 'pl-10' : ''
                            }`}
                            {...(field.type === 'range' && {
                              min: field.min,
                              max: field.max,
                              step: field.step
                            })}
                          />
                        )}
                      </div>
                      {errors[field.name] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[field.name]?.message as string}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="h-4 w-4 inline-block mr-2" />
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <integration.icon className="h-8 w-8 text-indigo-600" />
              <h3 className="ml-3 text-lg font-medium">{integration.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{integration.description}</p>
            <button
              onClick={() => handleConfigureIntegration(integration.id)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Configurar
            </button>
          </div>
        ))}
      </div>

      {currentIntegration && renderIntegrationForm()}
    </div>
  );
}