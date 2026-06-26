import React from 'react';
import { BookOpen, Check, X, Lightbulb, MessageSquare } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';

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
    'Use the primary color for main CTAs and important actions',
    'Maintain consistent spacing using the 8px grid system',
    'Ensure text has sufficient contrast against backgrounds',
    'Use approved font pairings for all communications',
  ];

  const donts = [
    'Don\'t use colors outside the approved palette',
    'Don\'t stretch or distort the logo',
    'Don\'t use low contrast text combinations',
    'Don\'t mix different heading styles',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Brand Guidelines
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Rules and best practices for using your brand
        </p>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
              Do&apos;s
            </h3>
          </div>
          <ul className="space-y-3">
            {dos.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-green-800 dark:text-green-200 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
              <X className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
              Don&apos;ts
            </h3>
          </div>
          <ul className="space-y-3">
            {donts.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <X className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-red-800 dark:text-red-200 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Voice and Tone */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Voice and Tone
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Professional</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Communicate with clarity and authority while remaining approachable
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Innovative</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Forward-thinking language that inspires and motivates action
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Trustworthy</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Honest, transparent communication that builds lasting relationships
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
