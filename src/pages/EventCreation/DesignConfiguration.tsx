import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, Palette, Layout, Globe } from 'lucide-react';
import type { EventConfiguration, TemplateType, ColorTheme } from '../../types/event';

const schema = z.object({
  design: z.object({
    template: z.enum(['zero', 'simple-2', 'template-1']),
    colorTheme: z.enum(['red', 'blue', 'green', 'purple', 'orange']),
    headerStyle: z.object({
      type: z.enum(['banner', 'solid-color']),
      value: z.string()
    })
  }),
  organizerName: z.string().min(2),
  organizerDescription: z.string().optional(),
  customUrl: z.string().min(3),
  isPublished: z.boolean()
});

const templates: { value: TemplateType; label: string }[] = [
  { value: 'zero', label: 'Zero' },
  { value: 'simple-2', label: 'Simple-2' },
  { value: 'template-1', label: 'Template-1' }
];

const colorThemes: { value: ColorTheme; label: string; bgClass: string }[] = [
  { value: 'red', label: 'Red', bgClass: 'bg-red-500' },
  { value: 'blue', label: 'Blue', bgClass: 'bg-blue-500' },
  { value: 'green', label: 'Green', bgClass: 'bg-green-500' },
  { value: 'purple', label: 'Purple', bgClass: 'bg-purple-500' },
  { value: 'orange', label: 'Orange', bgClass: 'bg-orange-500' }
];

interface Props {
  onSubmit: (data: EventConfiguration) => void;
  initialData?: Partial<EventConfiguration>;
}

export default function DesignConfiguration({ onSubmit, initialData }: Props) {
  const [headerType, setHeaderType] = useState(initialData?.design?.headerStyle?.type || 'banner');
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData
  });

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB
        alert('Banner image must be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB
        alert('Logo image must be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Design Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Template
            </label>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map(({ value, label }) => (
                <label
                  key={value}
                  className={`
                    relative border rounded-lg p-4 flex flex-col items-center cursor-pointer
                    ${value === initialData?.design?.template ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'}
                  `}
                >
                  <input
                    type="radio"
                    {...register('design.template')}
                    value={value}
                    className="sr-only"
                  />
                  <Layout className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-sm font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color Theme
            </label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-4">
              {colorThemes.map(({ value, label, bgClass }) => (
                <label
                  key={value}
                  className={`
                    relative border rounded-lg p-4 flex flex-col items-center cursor-pointer
                    ${value === initialData?.design?.colorTheme ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'}
                  `}
                >
                  <input
                    type="radio"
                    {...register('design.colorTheme')}
                    value={value}
                    className="sr-only"
                  />
                  <div className={`w-8 h-8 rounded-full ${bgClass}`} />
                  <span className="mt-2 text-sm font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Header Style
            </label>
            <div className="mt-2 space-y-4">
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="banner"
                    checked={headerType === 'banner'}
                    onChange={(e) => setHeaderType(e.target.value as 'banner' | 'solid-color')}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Banner Image</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="solid-color"
                    checked={headerType === 'solid-color'}
                    onChange={(e) => setHeaderType(e.target.value as 'banner' | 'solid-color')}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Solid Color</span>
                </label>
              </div>

              {headerType === 'banner' ? (
                <div>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Upload banner</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleBannerUpload}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 1MB (1280x575px)
                      </p>
                    </div>
                  </div>
                  {bannerPreview && (
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="mt-4 rounded-lg w-full h-48 object-cover"
                    />
                  )}
                </div>
              ) : (
                <input
                  type="color"
                  {...register('design.headerStyle.value')}
                  className="h-10 w-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Organizer Information</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organizer Name*
            </label>
            <input
              type="text"
              {...register('organizerName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register('organizerDescription')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Logo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>Upload logo</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG up to 1MB (400x200px)
                </p>
              </div>
            </div>
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo preview"
                className="mt-4 h-20 object-contain"
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Page Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Custom URL*
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                events.com/
              </span>
              <input
                type="text"
                {...register('customUrl')}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('isPublished')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">Publish Event</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Sales & Registration
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create Event
        </button>
      </div>
    </form>
  );
}