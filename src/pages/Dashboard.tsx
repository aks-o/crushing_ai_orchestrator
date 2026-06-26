import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Palette,
  Type,
  Layers,
  Download,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  FolderOpen,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useBrandStore } from '../store/brandStore';
import { cn, formatDate } from '../lib/utils';

const stats = [
  { label: 'Total Brands', value: '0', icon: FolderOpen, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20' },
  { label: 'Generated Today', value: '0', icon: Sparkles, color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/20' },
  { label: 'Exports', value: '0', icon: Download, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20' },
  { label: 'Time Saved', value: '0h', icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/20' },
];

const quickActions = [
  { label: 'Create New Brand', description: 'Generate a complete brand system', icon: Plus, href: '/create', color: 'bg-blue-600 hover:bg-blue-700' },
  { label: 'Browse Library', description: 'View all your saved brands', icon: FolderOpen, href: '/library', color: 'bg-slate-700 hover:bg-slate-800' },
  { label: 'Export Brands', description: 'Download brand assets', icon: Download, href: '/library', color: 'bg-slate-700 hover:bg-slate-800' },
];

const recentBrands: any[] = [];

export default function Dashboard() {
  const navigate = useNavigate();
  const { brands, currentBrand, setCurrentBrand } = useBrandStore();

  const handleBrandClick = (brand: any) => {
    setCurrentBrand(brand);
    navigate(`/brand/${brand.id}/identity`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Main Content */}
      <main className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Welcome to BrandForge AI
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Create professional brand systems in minutes
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={cn('p-2 rounded-lg', stat.bgColor)}>
                  <stat.icon className={cn('w-4 h-4', stat.color)} />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all"
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110', action.color)}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900 dark:text-white">
                    {action.label}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Brands */}
        {brands.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Recent Brands
              </h2>
              <Link
                to="/library"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.slice(0, 6).map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => handleBrandClick(brand)}
                  className="group text-left p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: brand.colors?.primary?.[500] || '#3B82F6' }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 dark:text-white truncate">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {brand.vertical || 'Brand'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Palette className="w-3 h-3" />
                      Colors
                    </span>
                    <span className="flex items-center gap-1">
                      <Type className="w-3 h-3" />
                      Typography
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      Tokens
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              No brands yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4 max-w-sm mx-auto">
              Create your first brand to get started with AI-powered brand generation
            </p>
            <Link to="/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Brand
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
