import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Building2,
  Target,
  Users,
  Lightbulb,
  Loader2,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useBrandStore } from '../store/brandStore';
import { cn, generateId } from '../lib/utils';

const industryOptions = [
  'Fintech',
  'E-commerce',
  'Healthcare',
  'SaaS',
  'EdTech',
  'AgriTech',
  'Logistics',
  'Real Estate',
  'Manufacturing',
  'Consulting',
  'Consumer Goods',
  'Energy',
  'Media & Entertainment',
  'Non-Profit',
  'Other',
];

const personalityOptions = [
  'Professional',
  'Friendly',
  'Innovative',
  'Trustworthy',
  'Bold',
  'Playful',
  'Luxurious',
  'Minimalist',
  'Energetic',
  'Calm',
  'Approachable',
  'Sophisticated',
  'Adventurous',
  'Reliable',
  'Creative',
];

interface FormData {
  companyName: string;
  industry: string;
  personality: string[];
  audience: string;
  additionalInfo: string;
}

export default function BrandCreator() {
  const navigate = useNavigate();
  const { addBrand } = useBrandStore();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industry: '',
    personality: [],
    audience: '',
    additionalInfo: '',
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const togglePersonality = (trait: string) => {
    setFormData((prev) => {
      const current = prev.personality;
      if (current.includes(trait)) {
        return { ...prev, personality: current.filter((t) => t !== trait) };
      }
      if (current.length >= 5) {
        return prev;
      }
      return { ...prev, personality: [...current, trait] };
    });
    setError(null);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.companyName.trim()) {
          setError('Please enter a company name');
          return false;
        }
        if (!formData.industry) {
          setError('Please select an industry');
          return false;
        }
        return true;
      case 2:
        if (formData.personality.length === 0) {
          setError('Please select at least one personality trait');
          return false;
        }
        return true;
      case 3:
        if (!formData.audience.trim()) {
          setError('Please describe your target audience');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        handleGenerate();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
    } else {
      navigate('/');
    }
  };

  const generateColorShade = (baseHue: number): any => {
    const shades: any = {};
    const lightnessValues = [96, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5];
    const shadeKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    
    shadeKeys.forEach((key, index) => {
      const lightness = lightnessValues[index];
      shades[key] = `hsl(${baseHue}, 70%, ${lightness}%)`;
    });
    
    return shades;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Simulate AI generation delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate brand colors based on industry
      const industryHueMap: Record<string, number> = {
        Fintech: 210, // Blue
        'E-commerce': 340, // Pink/Red
        Healthcare: 160, // Teal/Green
        SaaS: 220, // Blue
        EdTech: 45, // Orange
        AgriTech: 120, // Green
        Logistics: 200, // Blue
        'Real Estate': 30, // Brown/Orange
        Manufacturing: 0, // Red
        Consulting: 240, // Indigo
        'Consumer Goods': 280, // Purple
        Energy: 50, // Yellow/Orange
        'Media & Entertainment': 300, // Magenta
        'Non-Profit': 180, // Cyan
        Other: 210, // Default Blue
      };

      const primaryHue = industryHueMap[formData.industry] || 210;
      const secondaryHue = (primaryHue + 30) % 360;
      const accentHue = (primaryHue + 180) % 360;

      // Create brand object
      const newBrand: any = {
        id: generateId(),
        name: formData.companyName,
        tagline: `Innovative solutions for ${formData.industry.toLowerCase()}`,
        values: formData.personality.slice(0, 3),
        audience: formData.audience,
        vertical: formData.industry,
        personality: formData.personality,
        colors: {
          primary: generateColorShade(primaryHue),
          secondary: generateColorShade(secondaryHue),
          accent: generateColorShade(accentHue),
          neutral: generateColorShade(210),
          semantic: {
            success: generateColorShade(142),
            warning: generateColorShade(38),
            error: generateColorShade(0),
            info: generateColorShade(210),
          },
        },
        typography: {
          fonts: {
            heading: 'Inter',
            body: 'Inter',
            mono: 'JetBrains Mono',
          },
          scale: {
            display: { size: '4.5rem', lineHeight: '1.1', letterSpacing: '-0.02em' },
            h1: { size: '3rem', lineHeight: '1.2', letterSpacing: '-0.02em' },
            h2: { size: '2.25rem', lineHeight: '1.3', letterSpacing: '-0.01em' },
            h3: { size: '1.5rem', lineHeight: '1.4', letterSpacing: '-0.01em' },
            h4: { size: '1.25rem', lineHeight: '1.5', letterSpacing: '0' },
            h5: { size: '1.125rem', lineHeight: '1.5', letterSpacing: '0' },
            h6: { size: '1rem', lineHeight: '1.5', letterSpacing: '0' },
            body: { size: '1rem', lineHeight: '1.6', letterSpacing: '0' },
            caption: { size: '0.875rem', lineHeight: '1.5', letterSpacing: '0' },
          },
          weights: {
            light: 300,
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
          },
        },
        tokens: {
          spacing: {
            0: '0px',
            1: '4px',
            2: '8px',
            3: '12px',
            4: '16px',
            5: '20px',
            6: '24px',
            8: '32px',
            10: '40px',
            12: '48px',
            16: '64px',
            20: '80px',
            24: '96px',
            32: '128px',
            40: '160px',
            48: '192px',
            64: '256px',
          },
          radius: {
            none: '0px',
            sm: '2px',
            md: '4px',
            lg: '8px',
            xl: '12px',
            '2xl': '16px',
            '3xl': '24px',
            full: '9999px',
          },
          shadows: {
            none: 'none',
            sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
            inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
          },
          motion: {
            duration: {
              fast: '150ms',
              normal: '300ms',
              slow: '500ms',
            },
            easing: {
              default: 'cubic-bezier(0.4, 0, 0.2, 1)',
              easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
              easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
              easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      addBrand(newBrand);
      navigate(`/brand/${newBrand.id}/identity`);
    } catch (err) {
      setError('Failed to generate brand. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Company Name *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter your company name"
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Industry *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {industryOptions.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => handleInputChange('industry', industry)}
                    className={cn(
                      'px-3 py-2 text-sm rounded-lg border transition-all',
                      formData.industry === industry
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    )}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Brand Personality *
                <span className="text-slate-500 dark:text-slate-400 font-normal ml-2">
                  (Select up to 5)
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {personalityOptions.map((trait) => {
                  const isSelected = formData.personality.includes(trait);
                  return (
                    <button
                      key={trait}
                      onClick={() => togglePersonality(trait)}
                      className={cn(
                        'px-4 py-2 text-sm rounded-full border transition-all',
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                      {trait}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Target Audience *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <textarea
                  value={formData.audience}
                  onChange={(e) => handleInputChange('audience', e.target.value)}
                  placeholder="Describe your target audience (e.g., 'Young professionals aged 25-40 who value sustainability and innovation')"
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Additional Information
                <span className="text-slate-500 dark:text-slate-400 font-normal ml-2">
                  (Optional)
                </span>
              </label>
              <div className="relative">
                <Lightbulb className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Any specific requirements, brand guidelines, or inspiration you'd like us to consider..."
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Review Your Brand Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-blue-100 dark:border-blue-800">
                  <span className="text-blue-700 dark:text-blue-300">Company Name</span>
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    {formData.companyName}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100 dark:border-blue-800">
                  <span className="text-blue-700 dark:text-blue-300">Industry</span>
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    {formData.industry}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-100 dark:border-blue-800">
                  <span className="text-blue-700 dark:text-blue-300">Personality</span>
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    {formData.personality.join(', ')}
                  </span>
                </div>
                <div className="py-2">
                  <span className="text-blue-700 dark:text-blue-300 block mb-1">
                    Target Audience
                  </span>
                  <p className="text-blue-900 dark:text-blue-100 text-sm">
                    {formData.audience}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    'Company Information',
    'Brand Personality',
    'Target Audience',
    'Review & Generate',
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-900 dark:text-white">
                BrandForge AI
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1;
              const isActive = step === stepNumber;
              const isCompleted = step > stepNumber;

              return (
                <div key={title} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-blue-600 text-white'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      )}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                    </div>
                    <span
                      className={cn(
                        'text-xs mt-1 font-medium',
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : isCompleted
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-slate-500 dark:text-slate-400'
                      )}
                    >
                      {title}
                    </span>
                  </div>
                  {index < stepTitles.length - 1 && (
                    <div
                      className={cn(
                        'w-16 sm:w-24 h-0.5 mx-2 sm:mx-4',
                        isCompleted ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {stepTitles[step - 1]}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {step === 1 && "Tell us about your company and industry."}
              {step === 2 && "Select the traits that best describe your brand's personality."}
              {step === 3 && "Who is your target audience?"}
              {step === 4 && "Review your information before generating your brand."}
            </p>

            {error && (
              <div className="mt-6 flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="mt-8">{renderStep()}</div>
          </div>

          <div className="px-6 sm:px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isGenerating}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>

              <Button
                onClick={handleNext}
                disabled={isGenerating}
                className={cn(
                  step === 4 && 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                )}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : step === 4 ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Brand
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
