import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Palette,
  Type,
  Layers,
  Download,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Package,
} from 'lucide-react';
import { useBrandStore } from '../store/brandStore';
import { Button } from '../components/ui/Button';
import { cn, formatDate } from '../lib/utils';

export default function Dashboard() {
  const navigate = useNavigate();
  const { brands } = useBrandStore();

  const recentBrands = brands.slice(0, 4);

  const stats = [
    {
      label: 'Total Brands',
      value: brands.length,
      icon: Package,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      label: 'Generated Today',
      value: brands.filter(b => new Date(b.createdAt).toDateString() === new Date().toDateString()).length,
      icon: Sparkles,
      color: 'bg-purple-500',
      trend: '+3',
    },
    {
      label: 'Exports',
      value: '24',
      icon: Download,
      color: 'bg-emerald-500',
      trend: '+8%',
    },
    {
      label: 'Time Saved',
      value: '12h',
      icon: Clock,
      color: 'bg-amber-500',
      trend: '+15%',
    },
  ];

  const quickActions = [
    {
      title: 'Create New Brand',
      description: 'Generate a complete brand system with AI',
      icon: Plus,
      href: '/create',
      color: 'bg-blue-500',
    },
    {
      title: 'View Color Palettes',
      description: 'Browse and manage color systems',
      icon: Palette,
      href: '/library',
      color: 'bg-purple-500',
    },
    {
      title: 'Typography Library',
      description: 'Explore font pairings and scales',
      icon: Type,
      href: '/library',
      color: 'bg-emerald-500',
    },
    {
      title: 'Design Tokens',
      description: 'Manage spacing, shadows, and more',
      icon: Layers,
      href: '/library',
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome to BrandForge AI
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create professional brand systems with AI-powered design tools
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={cn('p-2 rounded-lg', stat.color.replace('bg-', 'bg-opacity-10 bg-'))}>
                  <stat.icon className={cn('w-5 h-5', stat.color.replace('bg-', 'text-'))} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-emerald-600 font-medium">{stat.trend}</span>
                <span className="text-xs text-slate-500">vs last week</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="group bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-500/30"
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', action.color)}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Brands */}
        {recentBrands.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Recent Brands
              </h2>
              <Link
                to="/library"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentBrands.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => navigate(`/brand/${brand.id}/identity`)}
                  className="group bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-500/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-lg"
                      style={{ backgroundColor: brand.colors?.primary?.[500] || '#3B82F6' }}
                    />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(new Date(brand.createdAt))}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                    {brand.tagline || 'No tagline'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
