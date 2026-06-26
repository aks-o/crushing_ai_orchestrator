import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreVertical,
  Trash2,
  Edit,
  Download,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useBrandStore } from '../store/brandStore';
import { cn, formatDate } from '../lib/utils';

export default function Library() {
  const navigate = useNavigate();
  const { brands, currentBrand, setCurrentBrand, deleteBrand } = useBrandStore();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedIndustry, setSelectedIndustry] = React.useState<string>('all');

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         brand.vertical?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || brand.vertical === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const industries = ['all', ...new Set(brands.map((b) => b.vertical).filter(Boolean))];

  const handleBrandClick = (brand: any) => {
    setCurrentBrand(brand);
    navigate(`/brand/${brand.id}/identity`);
  };

  const handleDeleteBrand = (e: React.MouseEvent, brandId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this brand? This action cannot be undone.')) {
      deleteBrand(brandId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Brand Library
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {brands.length} brand{brands.length !== 1 ? 's' : ''} created
                </p>
              </div>
            </div>
            <Link to="/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Brand
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border-0 rounded-lg text-sm text-slate-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Industries</option>
                {industries.filter((i) => i !== 'all').map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {filteredBrands.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {searchQuery || selectedIndustry !== 'all' ? (
                <Search className="w-10 h-10 text-slate-400" />
              ) : (
                <Sparkles className="w-10 h-10 text-slate-400" />
              )}
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              {searchQuery || selectedIndustry !== 'all'
                ? 'No brands found'
                : 'No brands yet'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              {searchQuery || selectedIndustry !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first brand to get started with AI-powered brand generation'}
            </p>
            {!searchQuery && selectedIndustry === 'all' && (
              <Link to="/create">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Brand
                </Button>
              </Link>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => handleBrandClick(brand)}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-blue-500/50 hover:shadow-xl transition-all cursor-pointer"
              >
                {/* Color Preview Strip */}
                <div className="h-24 flex">
                  {brand.colors?.primary && (
                    <>
                      <div
                        className="flex-1"
                        style={{ backgroundColor: brand.colors.primary[500] }}
                      />
                      <div
                        className="flex-1"
                        style={{ backgroundColor: brand.colors.secondary?.[500] || brand.colors.primary[400] }}
                      />
                      <div
                        className="flex-1"
                        style={{ backgroundColor: brand.colors.accent?.[500] || brand.colors.primary[600] }}
                      />
                    </>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {brand.vertical}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDeleteBrand(e, brand.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                    {brand.tagline || 'No tagline set'}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>Created {formatDate(new Date(brand.createdAt))}</span>
                    </div>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    Brand
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    Industry
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    Created
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBrands.map((brand) => (
                  <tr
                    key={brand.id}
                    onClick={() => handleBrandClick(brand)}
                    className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg"
                          style={{ backgroundColor: brand.colors?.primary?.[500] || '#3B82F6' }}
                        />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {brand.name}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {brand.tagline || 'No tagline'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {brand.vertical || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(new Date(brand.createdAt))}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/brand/${brand.id}/export`);
                          }}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteBrand(e, brand.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
