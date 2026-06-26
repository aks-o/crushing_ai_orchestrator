import React from 'react';
import { Image, Download, RefreshCw, Lightbulb } from 'lucide-react';
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
  const secondaryColor = currentBrand.colors?.secondary?.[500] || '#10B981';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Logo Concepts
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          AI-generated logo ideas and brand marks
        </p>
      </div>

      {/* Logo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Primary Logo */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="aspect-square rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: primaryColor }}>
            <span className="text-6xl font-bold text-white">{currentBrand.name.charAt(0)}</span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Primary Mark</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Main brand identifier</p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download SVG
          </Button>
        </div>

        {/* Secondary Logo */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="aspect-square rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: secondaryColor }}>
            <span className="text-6xl font-bold text-white">{currentBrand.name.charAt(0)}</span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Secondary Mark</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Alternative variation</p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download SVG
          </Button>
        </div>

        {/* Monochrome Logo */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="aspect-square rounded-xl flex items-center justify-center mb-4 bg-slate-900 dark:bg-white">
            <span className="text-6xl font-bold text-white dark:text-slate-900">{currentBrand.name.charAt(0)}</span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Monochrome</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Single color version</p>
          <Button variant="outline" size="sm" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download SVG
          </Button>
        </div>
      </div>

      {/* AI Concept Generator */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              AI Logo Concept Generator
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Generate new logo ideas based on your brand personality
            </p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate New Concepts
        </Button>
      </div>
    </div>
  );
}
