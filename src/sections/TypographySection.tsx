import React, { useState } from 'react';
import { Type, Copy, Check, RefreshCw, Eye } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';
import { cn, copyToClipboard } from '../lib/utils';
import { Button } from '../components/ui/Button';

export default function TypographySection() {
  const { currentBrand } = useBrandStore();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog.');

  if (!currentBrand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 dark:text-slate-400">No brand selected</p>
      </div>
    );
  }

  const typography = currentBrand.typography;
  const fonts = typography?.fonts || { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' };
  const scale = typography?.scale || {};

  const typeScale = [
    { key: 'display', label: 'Display', sample: 'Display' },
    { key: 'h1', label: 'Heading 1', sample: 'Heading 1' },
    { key: 'h2', label: 'Heading 2', sample: 'Heading 2' },
    { key: 'h3', label: 'Heading 3', sample: 'Heading 3' },
    { key: 'h4', label: 'Heading 4', sample: 'Heading 4' },
    { key: 'body', label: 'Body', sample: 'Body text for paragraphs and general content' },
    { key: 'caption', label: 'Caption', sample: 'Caption text' },
  ];

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Typography
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Type scale, font pairings, and text styles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>
      </div>

      {/* Font Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Type className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Heading Font</p>
              <p className="font-semibold text-slate-900 dark:text-white">{fonts.heading}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Type className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Body Font</p>
              <p className="font-semibold text-slate-900 dark:text-white">{fonts.body}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Type className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Monospace Font</p>
              <p className="font-semibold text-slate-900 dark:text-white">{fonts.mono}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Live Preview
          </h3>
        </div>
        <input
          type="text"
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="Type to preview..."
          className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 mb-6"
        />

        <div className="space-y-6">
          {typeScale.map(({ key, label, sample }) => {
            const scaleData = scale[key as keyof typeof scale];
            if (!scaleData) return null;
            
            return (
              <div key={key} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl group">
                <div className="flex-1 min-w-0">
                  <p 
                    className="text-slate-900 dark:text-white break-words"
                    style={{
                      fontSize: scaleData.size,
                      lineHeight: scaleData.lineHeight,
                      letterSpacing: scaleData.letterSpacing,
                      fontFamily: key === 'body' || key === 'caption' ? fonts.body : fonts.heading,
                    }}
                  >
                    {previewText || sample}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{scaleData.size}</p>
                  <button
                    onClick={() => handleCopy(`${key}: ${scaleData.size} / ${scaleData.lineHeight}`)}
                    className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedText?.includes(key) ? 'Copied!' : 'Copy CSS'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
