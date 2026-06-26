import React from 'react';
import { useBrandStore } from '../store/brandStore';
import { Fingerprint, Building2, Target, Users, Sparkles, Lightbulb } from 'lucide-react';

export default function IdentitySection() {
  const { currentBrand } = useBrandStore();

  if (!currentBrand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 dark:text-slate-400">No brand selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Brand Identity
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Core information about your brand
        </p>
      </div>

      {/* Brand Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="h-32" style={{ backgroundColor: currentBrand.colors?.primary?.[500] || '#3B82F6' }} />
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6">
            <div 
              className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center"
              style={{ backgroundColor: currentBrand.colors?.primary?.[600] || '#2563EB' }}
            >
              <span className="text-4xl font-bold text-white">
                {currentBrand.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {currentBrand.name}
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {currentBrand.tagline || 'Your tagline here'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              <Building2 className="w-4 h-4 mr-1.5" />
              {currentBrand.vertical}
            </span>
            {currentBrand.values?.map((value: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Target Audience */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Target Audience
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {currentBrand.audience || 'No audience defined'}
          </p>
        </div>

        {/* Brand Personality */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Brand Personality
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentBrand.personality?.map((trait: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Values */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Core Values
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentBrand.values?.map((value: string, index: number) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30"
            >
              <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">{index + 1}</span>
              </div>
              <span className="font-medium text-green-900 dark:text-green-100">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
