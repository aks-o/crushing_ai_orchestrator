import React, { useState } from 'react';
import { Layers, Copy, Check, Box, Move, Radius, Shadow, Clock } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';
import { cn, copyToClipboard } from '../lib/utils';

interface TokenGroupProps {
  title: string;
  icon: React.ElementType;
  tokens: Record<string, string>;
  onCopy: (value: string) => void;
  copiedValue: string | null;
}

function TokenGroup({ title, icon: Icon, tokens, onCopy, copiedValue }: TokenGroupProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        {Object.entries(tokens).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onCopy(value)}
            className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <code className="text-sm font-mono text-slate-600 dark:text-slate-400">{key}</code>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono text-slate-900 dark:text-white">{value}</code>
              {copiedValue === value ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TokensSection() {
  const { currentBrand } = useBrandStore();
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  if (!currentBrand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 dark:text-slate-400">No brand selected</p>
      </div>
    );
  }

  const tokens = currentBrand.tokens || {};

  const handleCopy = async (value: string) => {
    await copyToClipboard(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Design Tokens
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Spacing, shadows, borders, and animation values
        </p>
      </div>

      {/* Token Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tokens.spacing && (
          <TokenGroup
            title="Spacing Scale"
            icon={Move}
            tokens={tokens.spacing}
            onCopy={handleCopy}
            copiedValue={copiedValue}
          />
        )}

        {tokens.radius && (
          <TokenGroup
            title="Border Radius"
            icon={Radius}
            tokens={tokens.radius}
            onCopy={handleCopy}
            copiedValue={copiedValue}
          />
        )}

        {tokens.shadows && (
          <TokenGroup
            title="Shadows"
            icon={Shadow}
            tokens={tokens.shadows}
            onCopy={handleCopy}
            copiedValue={copiedValue}
          />
        )}

        {tokens.motion && (
          <TokenGroup
            title="Motion & Animation"
            icon={Clock}
            tokens={{
              ...tokens.motion.duration,
              ...tokens.motion.easing,
            }}
            onCopy={handleCopy}
            copiedValue={copiedValue}
          />
        )}
      </div>

      {/* Code Export */}
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">CSS Variables</h3>
          <button
            onClick={() => handleCopy(JSON.stringify(tokens, null, 2))}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            {copiedValue === JSON.stringify(tokens, null, 2) ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy CSS
              </>
            )}
          </button>
        </div>
        <pre className="overflow-x-auto text-sm text-slate-300 font-mono">
          <code>{`:root {
  /* Spacing */
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  
  /* Border Radius */
  --radius-none: 0px;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-3xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-none: none;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}`}</code>
        </pre>
      </div>
    </div>
  );
}
