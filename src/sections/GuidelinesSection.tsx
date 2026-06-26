import React from 'react';
import { BookOpen, Check, X, Lightbulb, MessageSquare, ArrowRight } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';
import { cn } from '../lib/utils';

export default function GuidelinesSection() {
  const { currentBrand } = useBrandStore();

  if (!currentBrand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 dark:text-slate-400">No brand selected</p>
      </div>
    );
  }

  const dos = [
    'Use the primary color for main CTAs and key actions',
    'Maintain consistent spacing using the design tokens',
    'Apply appropriate contrast ratios for accessibility',
    'Use the brand typography for all headings and body text',
  ];

  const donts = [
    'Don\'t use colors outside the defined palette',
    'Don\'t mix different font families incorrectly',
    'Don\'t ignore minimum contrast requirements',
    'Don\'t create custom colors for brand elements',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Brand Guidelines
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Voice, tone, and usage guidelines for your brand
        </p>
      </div>

      {/* Voice & Tone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Brand Voice
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Your brand voice is {currentBrand.personality?.[0]?.toLowerCase() || 'professional'} and{' '}
            {currentBrand.personality?.[1]?.toLowerCase() || 'approachable'}. 
            It communicates with clarity and confidence while maintaining a{' '}
            {currentBrand.personality?.[2]?.toLowerCase() || 'modern'} tone.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Tone Guidelines
            </h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
              <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
              <span>Be clear and concise in all communications</span>
            </li>
            <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
              <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
              <span>Use active voice to convey confidence</span>
            </li>
            <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
              <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
              <span>Adapt tone based on context and audience</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Do's
            </h3>
          </div>
          <ul className="space-y-3">
            {dos.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg"
              >
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <X className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Don'ts
            </h3>
          </div>
          <ul className="space-y-3">
            {donts.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg"
              >
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
