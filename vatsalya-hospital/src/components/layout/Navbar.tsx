import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calendar, Stethoscope } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { navLinks } from '../../data/hospitalData';

const Navbar = () => {
  const { isScrolled, activeSection, setAppointmentModalOpen, toggleMobileMenu, isMobileMenuOpen } = useStore();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    toggleMobileMenu();
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ 
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        {/* Top Bar */}
        <div className={`hidden lg:block transition-all duration-300 ${
          isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 opacity-100'
        }`}>
          <div className="container mx-auto px-4 h-full flex items-center justify-between text-sm">
            <div className="flex items-center gap-6 text-white/90">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 82921 14160
              </span>
              <span className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                Mon-Sat: 10 AM - 8 PM
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setAppointmentModalOpen(true)}
                className="flex items-center gap-2 bg-secondary text-white px-4 py-1.5 rounded-full font-medium hover:bg-secondary-dark transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Stethoscope className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className={`font-heading font-bold text-lg lg:text-xl leading-tight transition-colors ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  Vatsalya
                </h1>
                <p className={`text-xs lg:text-sm transition-colors ${
                  isScrolled ? 'text-foreground-light' : 'text-white/80'
                }`}>
                  Child & Dental Care
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10 ${
                    isScrolled 
                      ? activeSection === link.href.slice(1) 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-primary'
                      : activeSection === link.href.slice(1)
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                        isScrolled ? 'bg-primary' : 'bg-white'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAppointmentModalOpen(true)}
                className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                  isScrolled
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg'
                    : 'bg-white text-primary hover:bg-white/90 shadow-lg'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-foreground hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleMobileMenu}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-lg text-foreground">Vatsalya</h2>
                      <p className="text-xs text-foreground-light">Child & Dental Care</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        activeSection === link.href.slice(1)
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground-light hover:bg-gray-50 hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setAppointmentModalOpen(true);
                      toggleMobileMenu();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </button>
                  
                  <a
                    href={`tel:${hospitalInfo.phone}`}
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-gray-100 text-foreground px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
