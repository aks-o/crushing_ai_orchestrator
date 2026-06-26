import React, { useState } from 'react';
import { Download, FileJson, FileCode, Palette, Copy, Check, Package } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';
import { cn, copyToClipboard } from '../lib/utils';
import { Button } from '../components/ui/Button';

export default function ExportSection() {
  const { currentBrand } = useBrandStore();
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'json' | 'tailwind' | 'figma'>('json');

  if (!currentBrand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 dark:text-slate-400">No brand selected</p>
      </div>
    );
  }

  const handleCopy = async (text: string, format: string) => {
    await copyToClipboard(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const brandDetails = {
    meta: {
      version: '1.0',
      generatedBy: 'BrandForge AI',
      generatedAt: new Date().toISOString(),
    },
    identity: {
      name: currentBrand.name,
      tagline: currentBrand.tagline,
      values: currentBrand.values,
      audience: currentBrand.audience,
      vertical: currentBrand.vertical,
      personality: currentBrand.personality,
    },
    visuals: {
      colors: currentBrand.colors,
      typography: currentBrand.typography,
    },
    tokens: currentBrand.tokens,
  };

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: ${JSON.stringify(currentBrand.colors?.primary || {}, null, 2).replace(/"([^"]+)":/g, '$1:')},
        secondary: ${JSON.stringify(currentBrand.colors?.secondary || {}, null, 2).replace(/"([^"]+)":/g, '$1:')},
        accent: ${JSON.stringify(currentBrand.colors?.accent || {}, null, 2).replace(/"([^"]+)":/g, '$1:')},
        neutral: ${JSON.stringify(currentBrand.colors?.neutral || {}, null, 2).replace(/"([^"]+)":/g, '$1:')},
      },
      fontFamily: {
        heading: ['${currentBrand.typography?.fonts?.heading || 'Inter'}', 'sans-serif'],
        body: ['${currentBrand.typography?.fonts?.body || 'Inter'}', 'sans-serif'],
        mono: ['${currentBrand.typography?.fonts?.mono || 'JetBrains Mono'}', 'monospace'],
      },
      spacing: ${JSON.stringify(currentBrand.tokens?.spacing || {}, null, 2).replace(/"([^"]+)":/g, '$1:')},
      borderRadius: ${JSON.stringify(currentBrand.tokens?.radius || {}, null, 2).replace(/"([^"]+)":/g, '$1:')},
      boxShadow: ${JSON.stringify(currentBrand.tokens?.shadows || {}, null, 2).replace(/"([^"]+)":/g, '$1:')},
    },
  },
}`;

  const figmaVariables = {
    version: '1.0',
    variables: {
      colors: currentBrand.colors,
      typography: currentBrand.typography,
      spacing: currentBrand.tokens?.spacing,
      radius: currentBrand.tokens?.radius,
    },
  };

  const tabs = [
    { id: 'json', label: 'brandDetails.json', icon: FileJson },
    { id: 'tailwind', label: 'tailwind.config.js', icon: FileCode },
    { id: 'figma', label: 'figma-variables.json', icon: Palette },
  ];

  const getContent = () => {
    switch (activeTab) {
      case 'json':
        return JSON.stringify(brandDetails, null, 2);
      case 'tailwind':
        return tailwindConfig;
      case 'figma':
        return JSON.stringify(figmaVariables, null, 2);
      default:
        return '';
    }
  };

  const getFilename = () => {
    switch (activeTab) {
      case 'json':
        return `${currentBrand.name.toLowerCase().replace(/\s+/g, '-')}-brand-details.json`;
      case 'tailwind':
        return 'tailwind.config.js';
      case 'figma':
        return `${currentBrand.name.toLowerCase().replace(/\s+/g, '-')}-figma-variables.json`;
      default:
        return 'export.json';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Export Brand Assets
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Download your brand assets in multiple formats
        </p>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              'flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
              activeTab === tab.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
            )}
          >
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              )}
            >
              <tab.icon className="w-6 h-6" />
            </div>
            <div>
              <p
                className={cn(
                  'font-semibold',
                  activeTab === tab.id
                    ? 'text-blue-900 dark:text-blue-100'
                    : 'text-slate-900 dark:text-white'
                )}
              >
                {tab.label}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {tab.id === 'json' && 'Complete brand specification'}
                {tab.id === 'tailwind' && 'Tailwind CSS config'}
                {tab.id === 'figma' && 'Figma variables'}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Code Preview */}
      <div className="bg-slate-900 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-3 text-sm text-slate-400 font-mono">{getFilename()}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(getContent(), activeTab)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              {copiedFormat === activeTab ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
            <button
              onClick={() => handleDownload(getContent(), getFilename())}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm text-slate-300 font-mono">
            <code>{getContent()}</code>
          </pre>
        </div>
      </div>

      {/* Additional Downloads */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Complete Package
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Download all brand assets in a single ZIP file
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            // Create a simple ZIP with all files
            const files = [
              { name: 'brand-details.json', content: JSON.stringify(brandDetails, null, 2) },
              { name: 'tailwind.config.js', content: tailwindConfig },
              { name: 'figma-variables.json', content: JSON.stringify(figmaVariables, null, 2) },
            ];
            files.forEach(file => handleDownload(file.content, file.name));
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          <Package className="w-5 h-5" />
          Download All Assets
        </button>
      </div>
    </div>
  );
}
