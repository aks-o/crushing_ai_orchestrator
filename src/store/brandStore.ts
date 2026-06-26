import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ColorShade {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ColorSystem {
  primary: ColorShade;
  secondary: ColorShade;
  accent: ColorShade;
  neutral: ColorShade;
  semantic: {
    success: ColorShade;
    warning: ColorShade;
    error: ColorShade;
    info: ColorShade;
  };
}

export interface TypographySystem {
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  scale: {
    display: { size: string; lineHeight: string; letterSpacing: string };
    h1: { size: string; lineHeight: string; letterSpacing: string };
    h2: { size: string; lineHeight: string; letterSpacing: string };
    h3: { size: string; lineHeight: string; letterSpacing: string };
    h4: { size: string; lineHeight: string; letterSpacing: string };
    h5: { size: string; lineHeight: string; letterSpacing: string };
    h6: { size: string; lineHeight: string; letterSpacing: string };
    body: { size: string; lineHeight: string; letterSpacing: string };
    caption: { size: string; lineHeight: string; letterSpacing: string };
  };
  weights: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface DesignTokens {
  spacing: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24: string;
    32: string;
    40: string;
    48: string;
    64: string;
  };
  radius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
  };
  motion: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      default: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  values: string[];
  audience: string;
  vertical: string;
  personality: string[];
  colors: ColorSystem;
  typography: TypographySystem;
  tokens: DesignTokens;
  createdAt: Date;
  updatedAt: Date;
}

interface BrandState {
  brands: Brand[];
  currentBrand: Brand | null;
  isLoading: boolean;
  error: string | null;
  setBrands: (brands: Brand[]) => void;
  setCurrentBrand: (brand: Brand | null) => void;
  addBrand: (brand: Brand) => void;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBrandStore = create<BrandState>()(
  persist(
    (set, get) => ({
      brands: [],
      currentBrand: null,
      isLoading: false,
      error: null,

      setBrands: (brands) => set({ brands }),
      
      setCurrentBrand: (brand) => set({ currentBrand: brand }),
      
      addBrand: (brand) => {
        const { brands } = get();
        set({ brands: [brand, ...brands], currentBrand: brand });
      },
      
      updateBrand: (id, updates) => {
        const { brands, currentBrand } = get();
        const updatedBrands = brands.map((brand) =>
          brand.id === id ? { ...brand, ...updates, updatedAt: new Date() } : brand
        );
        const updatedCurrentBrand = currentBrand?.id === id 
          ? { ...currentBrand, ...updates, updatedAt: new Date() }
          : currentBrand;
        set({ brands: updatedBrands, currentBrand: updatedCurrentBrand });
      },
      
      deleteBrand: (id) => {
        const { brands, currentBrand } = get();
        const filteredBrands = brands.filter((brand) => brand.id !== id);
        const newCurrentBrand = currentBrand?.id === id 
          ? (filteredBrands[0] || null)
          : currentBrand;
        set({ brands: filteredBrands, currentBrand: newCurrentBrand });
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'brandforge-storage',
      partialize: (state) => ({ brands: state.brands }),
    }
  )
);
