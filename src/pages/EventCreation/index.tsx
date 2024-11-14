import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventDetails from './EventDetails';
import SalesRegistration from './SalesRegistration';
import DesignConfiguration from './DesignConfiguration';
import type { EventDetails as EventDetailsType, EventRegistration, EventConfiguration } from '../../types/event';

type Step = 'details' | 'sales' | 'design';

const stepTitles = {
  details: 'Detalhes',
  sales: 'Vendas',
  design: 'Design'
};

export default function EventCreation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [eventData, setEventData] = useState<{
    details?: EventDetailsType;
    sales?: EventRegistration;
    design?: EventConfiguration;
  }>({});

  const handleDetailsSubmit = (data: EventDetailsType) => {
    setEventData({ ...eventData, details: data });
    setCurrentStep('sales');
  };

  const handleSalesSubmit = (data: EventRegistration) => {
    setEventData({ ...eventData, sales: data });
    setCurrentStep('design');
  };

  const handleDesignSubmit = async (data: EventConfiguration) => {
    setEventData({ ...eventData, design: data });
    console.log('Dados completos do evento:', { ...eventData, design: data });
    navigate('/events');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Criar Novo Evento</h1>
        <div className="mt-4">
          <nav className="flex justify-center">
            <ol className="flex items-center space-x-4">
              {(['details', 'sales', 'design'] as Step[]).map((step, index) => (
                <li key={step} className="flex items-center">
                  <div
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-full
                      ${currentStep === step
                        ? 'bg-indigo-600 text-white'
                        : index < ['details', 'sales', 'design'].indexOf(currentStep)
                        ? 'bg-indigo-200 text-indigo-700'
                        : 'bg-gray-200 text-gray-500'
                      }
                    `}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-4 text-sm font-medium ${
                      currentStep === step ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                  >
                    {stepTitles[step]}
                  </span>
                  {index < 2 && (
                    <div className="ml-4 w-8 h-0.5 bg-gray-200" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {currentStep === 'details' && (
        <EventDetails
          onSubmit={handleDetailsSubmit}
          initialData={eventData.details}
        />
      )}
      {currentStep === 'sales' && (
        <SalesRegistration
          onSubmit={handleSalesSubmit}
          initialData={eventData.sales}
        />
      )}
      {currentStep === 'design' && (
        <DesignConfiguration
          onSubmit={handleDesignSubmit}
          initialData={eventData.design}
        />
      )}
    </div>
  );
}