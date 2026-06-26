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

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Logo Concepts
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            AI-generated logo ideas and variations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="aspect-square bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <div
                className="w-32 h-32 rounded-2xl flex items-center justify-center text-white text-4xl font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                {currentBrand.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                Concept {i}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Initial lettermark concept with rounded corners
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download SVG
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
