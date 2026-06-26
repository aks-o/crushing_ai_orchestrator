import React, { useState } from 'react';
import { Download, Copy, Check, FileJson, FileCode, Palette, Package } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';
import { cn, copyToClipboard } from '../lib/utils';
import { Button } from '../components/ui/Button';

export default function ExportSection() {
  const { currentBrand } = useBrandStore();
  const [copiedContent, setCopiedContent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'json' | 'tailwind' | 'figma'>('json');

  if (!currentBrand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 dark:text-slate-400">No brand selected</p>
      </div>
    );
  }

  const generateJSON = () => {
    return JSON.stringify({
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
    }, null, 2);
  };

  const generateTailwindConfig = () => {
    return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '${currentBrand.colors?.primary?.[50] || '#f0f9ff'}',
          100: '${currentBrand.colors?.primary?.[100] || '#e0f2fe'}',
          200: '${currentBrand.colors?.primary?.[200] || '#bae6fd'}',
          300: '${currentBrand.colors?.primary?.[300] || '#7dd3fc'}',
          400: '${currentBrand.colors?.primary?.[400] || '#38bdf8'}',
          500: '${currentBrand.colors?.primary?.[500] || '#0ea5e9'}',
          600: '${currentBrand.colors?.primary?.[600] || '#0284c7'}',
          700: '${currentBrand.colors?.primary?.[700] || '#0369a1'}',
          800: '${currentBrand.colors?.primary?.[800] || '#075985'}',
          900: '${currentBrand.colors?.primary?.[900] || '#0c4a6e'}',
          950: '${currentBrand.colors?.primary?.[950] || '#082f49'}',
        },
        // ... add other colors
      },
      fontFamily: {
        heading: ['${currentBrand.typography?.fonts?.heading || 'Inter'}', 'sans-serif'],
        body: ['${currentBrand.typography?.fonts?.body || 'Inter'}', 'sans-serif'],
        mono: ['${currentBrand.typography?.fonts?.mono || 'JetBrains Mono'}', 'monospace'],
      },
    },
  },
}`;
  };

  const generateFigmaVariables = () => {
    return JSON.stringify({
      version: '1.0',
      variables: {
        colors: currentBrand.colors,
        typography: currentBrand.typography,
        spacing: currentBrand.tokens?.spacing,
        radius: currentBrand.tokens?.radius,
      },
    }, null, 2);
  };

  const handleCopy = async (content: string) => {
    await copyToClipboard(content);
    setCopiedContent(content);
    setTimeout(() => setCopiedContent(null), 2000);
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

  const tabs = [
    { id: 'json', label: 'brandDetails.json', icon: FileJson },
    { id: 'tailwind', label: 'tailwind.config.js', icon: FileCode },
    { id: 'figma', label: 'figma-variables.json', icon: Palette },
  ];

  const getContent = () => {
    switch (activeTab) {
      case 'json':
        return generateJSON();
      case 'tailwind':
        return generateTailwindConfig();
      case 'figma':
        return generateFigmaVariables();
      default:
        return '';
    }
  };

  const content = getContent();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Export Brand Assets
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Download your brand specifications in multiple formats
        </p>
      </div>

      {/* Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              'p-6 rounded-xl border-2 text-left transition-all',
              activeTab === tab.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                )}
              >
                <tab.icon className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className={cn(
                    'font-semibold',
                    activeTab === tab.id
                      ? 'text-blue-900 dark:text-blue-100'
                      : 'text-slate-900 dark:text-white'
                  )}
                >
                  {tab.label}
                </h3>
                <p
                  className={cn(
                    'text-sm',
                    activeTab === tab.id
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-slate-500 dark:text-slate-400'
                  )}
                >
                  {tab.id === 'json' && 'Complete brand specification'}
                  {tab.id === 'tailwind' && 'Tailwind CSS config'}
                  {tab.id === 'figma' && 'Figma variables format'}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Code Preview */}
      <div className="bg-slate-900 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-slate-400">
            {tabs.find((t) => t.id === activeTab)?.label}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(content)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              {copiedContent === content ? (
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
              onClick={() =>
                handleDownload(
                  content,
                  activeTab === 'tailwind'
                    ? 'tailwind.config.js'
                    : `${activeTab}-export.json`
                )
              }
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm text-slate-300 font-mono">
            <code>{content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
