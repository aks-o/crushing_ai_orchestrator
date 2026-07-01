import { create } from 'zustand';
import type { AppointmentFormData, ContactFormData } from '../types';

interface AppState {
  // UI State
  isAppointmentModalOpen: boolean;
  isMobileMenuOpen: boolean;
  activeSection: string;
  isScrolled: boolean;
  
  // Actions
  toggleAppointmentModal: () => void;
  setAppointmentModalOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setActiveSection: (section: string) => void;
  setIsScrolled: (isScrolled: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial State
  isAppointmentModalOpen: false,
  isMobileMenuOpen: false,
  activeSection: 'home',
  isScrolled: false,
  
  // Actions
  toggleAppointmentModal: () => 
    set((state) => ({ isAppointmentModalOpen: !state.isAppointmentModalOpen })),
  
  setAppointmentModalOpen: (isOpen: boolean) => 
    set({ isAppointmentModalOpen: isOpen }),
  
  toggleMobileMenu: () => 
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  setMobileMenuOpen: (isOpen: boolean) => 
    set({ isMobileMenuOpen: isOpen }),
  
  setActiveSection: (section: string) => 
    set({ activeSection: section }),
  
  setIsScrolled: (isScrolled: boolean) => 
    set({ isScrolled }),
}));
