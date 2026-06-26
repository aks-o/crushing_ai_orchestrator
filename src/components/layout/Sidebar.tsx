import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  Palette,
  Type,
  Layers,
  Image,
  Box,
  BookOpen,
  Download,
  Fingerprint,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Plus,
  Library,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useBrandStore } from '../../store/brandStore';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const mainNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Plus, label: 'Create Brand', path: '/create' },
  { icon: Library, label: 'Library', path: '/library' },
];

const brandNavItems = [
  { icon: Fingerprint, label: 'Identity', path: 'identity' },
  { icon: Palette, label: 'Colors', path: 'colors' },
  { icon: Type, label: 'Typography', path: 'typography' },
  { icon: Layers, label: 'Tokens', path: 'tokens' },
  { icon: Image, label: 'Logos', path: 'logos' },
  { icon: Box, label: 'Components', path: 'components' },
  { icon: BookOpen, label: 'Guidelines', path: 'guidelines' },
  { icon: Download, label: 'Export', path: 'export' },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { brandId } = useParams<{ brandId: string }>();
  const { currentBrand } = useBrandStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-white font-semibold">BrandForge</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            'p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors',
            isCollapsed && 'mx-auto'
          )}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )
            }
          >
            <item.icon size={18} />
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        {brandId && currentBrand && (
          <>
            <div className="pt-4 pb-2">
              <div className={cn('border-t border-slate-800', !isCollapsed && 'mx-3')} />
            </div>
            
            {!isCollapsed && (
              <div className="px-3 py-2 mb-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Current Brand
                </p>
                <p className="text-sm font-medium text-white truncate mt-1">
                  {currentBrand.name}
                </p>
              </div>
            )}

            {brandNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/brand/${brandId}/${item.path}`}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-400'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  )
                }
              >
                <item.icon size={16} />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
}
