import React from 'react';
import { Box, ToggleLeft, AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

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
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          UI Components
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Pre-built components styled with your brand colors
        </p>
      </div>

      {/* Buttons */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Box className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Buttons</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Alerts</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Information</p>
              <p className="text-sm opacity-90">This is an informational alert message.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Success</p>
              <p className="text-sm opacity-90">Your changes have been saved successfully.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg">
            <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm opacity-90">Something went wrong. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
