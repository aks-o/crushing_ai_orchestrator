import React from 'react';
import { Image, Download, RefreshCw } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';
import { Button } from '../components/ui/Button';

export default function LogoSection() {
  const { currentBrand } = useBrandStore();

  if (!currentBrand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 dark:text-slate-400">No brand selected</p>
      </div>
    );
  }

  const primaryColor = currentBrand.colors?.primary?.[500] || '#3B82F6';
  const firstLetter = currentBrand.name.charAt(0).toUpperCase();

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Logo Concepts
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            AI-generated logo concepts and variations
          </p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Primary Logo */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="aspect-square rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: primaryColor }}>
            <span className="text-8xl font-bold text-white">{firstLetter}</span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Primary Logo</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Main brand mark</p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download SVG
          </Button>
        </div>

        {/* Monochrome */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <span className="text-8xl font-bold text-slate-900 dark:text-white">{firstLetter}</span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Monochrome</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Single color version</p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download SVG
          </Button>
        </div>

        {/* Dark Mode */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="aspect-square rounded-xl bg-slate-900 flex items-center justify-center mb-4">
            <span className="text-8xl font-bold text-white">{firstLetter}</span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Dark Mode</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Inverted for dark backgrounds</p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download SVG
          </Button>
        </div>
      </div>
    </div>
  );
}
