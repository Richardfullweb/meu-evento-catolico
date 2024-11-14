import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, CreditCard, Building2, QrCode } from 'lucide-react';
import type { EventRegistration, TicketBatch, CustomField, PaymentMethod } from '../../types/event';

const schema = z.object({
  totalCapacity: z.number().min(1),
  serviceFeeType: z.enum(['organizer', 'participant']),
  paymentMethods: z.array(z.enum(['credit-card', 'bank-transfer', 'pix'])).min(1),
  customFields: z.array(z.object({
    id: z.string(),
    label: z.string(),
    type: z.literal('text'),
    required: z.boolean(),
    maxLength: z.number().min(1).max(200)
  }))
});

interface Props {
  onSubmit: (data: EventRegistration) => void;
  initialData?: Partial<EventRegistration>;
}

export default function SalesRegistration({ onSubmit, initialData }: Props) {
  const [ticketBatches, setTicketBatches] = useState<TicketBatch[]>(initialData?.ticketBatches || []);
  const [customFields, setCustomFields] = useState<CustomField[]>(initialData?.customFields || []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData
  });

  const addTicketBatch = () => {
    const newBatch: TicketBatch = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      serviceFee: 10,
      finalPrice: 0,
      quantity: 0,
      isVisible: true,
      type: 'paid'
    };
    setTicketBatches([...ticketBatches, newBatch]);
  };

  const removeTicketBatch = (id: string) => {
    setTicketBatches(ticketBatches.filter(batch => batch.id !== id));
  };

  const addCustomField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      label: '',
      type: 'text',
      required: false,
      maxLength: 200
    };
    setCustomFields([...customFields, newField]);
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  const paymentMethods: { value: PaymentMethod; label: string; icon: any }[] = [
    { value: 'credit-card', label: 'Credit Card', icon: CreditCard },
    { value: 'bank-transfer', label: 'Bank Transfer', icon: Building2 },
    { value: 'pix', label: 'PIX', icon: QrCode }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Capacity & Tickets</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Capacity
            </label>
            <input
              type="number"
              {...register('totalCapacity')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Ticket Batches</h3>
              <button
                type="button"
                onClick={addTicketBatch}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Batch
              </button>
            </div>

            <div className="space-y-4">
              {ticketBatches.map((batch) => (
                <div key={batch.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Batch Name
                      </label>
                      <input
                        type="text"
                        value={batch.name}
                        onChange={(e) => {
                          const updated = ticketBatches.map(b =>
                            b.id === batch.id ? { ...b, name: e.target.value } : b
                          );
                          setTicketBatches(updated);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price (R$)
                      </label>
                      <input
                        type="number"
                        value={batch.price}
                        onChange={(e) => {
                          const price = Number(e.target.value);
                          const finalPrice = price + (price * batch.serviceFee / 100);
                          const updated = ticketBatches.map(b =>
                            b.id === batch.id ? { ...b, price, finalPrice } : b
                          );
                          setTicketBatches(updated);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={batch.quantity}
                        onChange={(e) => {
                          const updated = ticketBatches.map(b =>
                            b.id === batch.id ? { ...b, quantity: Number(e.target.value) } : b
                          );
                          setTicketBatches(updated);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeTicketBatch(batch.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Registration Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Fee (10.0%)*
            </label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('serviceFeeType')}
                  value="organizer"
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Charged to Organizer</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...register('serviceFeeType')}
                  value="participant"
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Charged to Participant</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Methods
            </label>
            <div className="space-y-2">
              {paymentMethods.map(({ value, label, icon: Icon }) => (
                <label key={value} className="inline-flex items-center mr-6">
                  <input
                    type="checkbox"
                    {...register('paymentMethods')}
                    value={value}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <Icon className="h-5 w-5 ml-2 mr-1 text-gray-400" />
                  <span className="ml-2">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Custom Registration Fields</h3>
              <button
                type="button"
                onClick={addCustomField}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </button>
            </div>

            <div className="space-y-4">
              {customFields.map((field) => (
                <div key={field.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Field Label
                      </label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => {
                          const updated = customFields.map(f =>
                            f.id === field.id ? { ...f, label: e.target.value } : f
                          );
                          setCustomFields(updated);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Max Length
                      </label>
                      <input
                        type="number"
                        value={field.maxLength}
                        onChange={(e) => {
                          const updated = customFields.map(f =>
                            f.id === field.id ? { ...f, maxLength: Number(e.target.value) } : f
                          );
                          setCustomFields(updated);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => {
                            const updated = customFields.map(f =>
                              f.id === field.id ? { ...f, required: e.target.checked } : f
                            );
                            setCustomFields(updated);
                          }}
                          className="form-checkbox h-4 w-4 text-indigo-600"
                        />
                        <span className="ml-2">Required</span>
                      </label>
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeCustomField(field.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font- medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Event Details
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Continue to Design & Configuration
        </button>
      </div>
    </form>
  );
}