import React from 'react';
import { Box, Button, ButtonProps } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';

export default function ComponentsSection() {
  const { currentBrand } = useBrandStore();

  if (!currentBrand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 dark:text-slate-400">No brand selected</p>
      </div>
    );
  }

  const primaryColor = currentBrand.colors?.primary?.[500] || '#3B82F6';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          UI Components
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Preview of branded UI components
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Buttons</h3>
          <div className="space-y-3">
            <button
              className="px-4 py-2 rounded-lg text-white font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              Primary Button
            </button>
            <button className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Secondary Button
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Card</h3>
          <div
            className="p-4 rounded-lg border-2 border-dashed"
            style={{ borderColor: primaryColor + '40' }}
          >
            <div
              className="w-10 h-10 rounded-lg mb-3"
              style={{ backgroundColor: primaryColor }}
            />
            <h4 className="font-medium text-slate-900 dark:text-white">Card Title</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Card description text</p>
          </div>
        </div>
      </div>
    </div>
  );
}
