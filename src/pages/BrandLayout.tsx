import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate, NavLink } from 'react-router-dom';
import {
  Fingerprint,
  Palette,
  Type,
  Layers,
  Image,
  Box,
  BookOpen,
  Download,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Download as DownloadIcon,
} from 'lucide-react';
import { cn, copyToClipboard } from '../lib/utils';
import { useBrandStore } from '../store/brandStore';
import { Button } from '../components/ui/Button';

const navItems = [
  { icon: Fingerprint, label: 'Identity', path: 'identity' },
  { icon: Palette, label: 'Colors', path: 'colors' },
  { icon: Type, label: 'Typography', path: 'typography' },
  { icon: Layers, label: 'Tokens', path: 'tokens' },
  { icon: Image, label: 'Logos', path: 'logos' },
  { icon: Box, label: 'Components', path: 'components' },
  { icon: BookOpen, label: 'Guidelines', path: 'guidelines' },
  { icon: Download, label: 'Export', path: 'export' },
];

export default function BrandLayout() {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const { brands, currentBrand, setCurrentBrand } = useBrandStore();
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    if (!currentBrand || currentBrand.id !== brandId) {
      const brand = brands.find((b) => b.id === brandId);
      if (brand) {
        setCurrentBrand(brand);
      } else {
        navigate('/');
      }
    }
  }, [brandId, brands, currentBrand, setCurrentBrand, navigate]);

  if (!currentBrand) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <p className="text-slate-500 dark:text-slate-400">Loading brand...</p>
        </div>
      </div>
    );
  }

  const handleCopyHex = async (hex: string) => {
    await copyToClipboard(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const primaryColor = currentBrand.colors?.primary?.[500] || '#3B82F6';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Brand Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div
                className="w-12 h-12 rounded-xl"
                style={{ backgroundColor: primaryColor }}
              />
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  {currentBrand.name}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {currentBrand.vertical} • {currentBrand.tagline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/brand/${brandId}/export`)}
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Navigation */}
        <nav className="w-64 min-h-[calc(100vh-8rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/brand/${brandId}/${item.path}`}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          <main className="flex-1 p-6">
            <Outlet />
          </main>

          {/* Right Panel */}
          {isRightPanelOpen && (
            <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Quick Preview
                </h3>
                <button
                  onClick={() => setIsRightPanelOpen(false)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                >
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Color Preview */}
              {currentBrand.colors && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Primary Colors
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(currentBrand.colors.primary)
                      .filter(([key]) => ['500', '600', '700'].includes(key))
                      .map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => handleCopyHex(value as string)}
                          className="w-full flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group"
                        >
                          <div
                            className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700"
                            style={{ backgroundColor: value as string }}
                          />
                          <span className="text-sm font-mono text-slate-600 dark:text-slate-400">
                            {value as string}
                          </span>
                          {copiedHex === value ? (
                            <Check className="w-4 h-4 text-green-500 ml-auto" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 ml-auto transition-opacity" />
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
