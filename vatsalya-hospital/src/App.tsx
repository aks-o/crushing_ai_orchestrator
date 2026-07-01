import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import DoctorsSection from './components/sections/DoctorsSection';
import ServicesSection from './components/sections/ServicesSection';
import TimingsSection from './components/sections/TimingsSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/layout/FloatingButtons';
import AppointmentModal from './components/modals/AppointmentModal';

function App() {
  const { setIsScrolled, setActiveSection } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'doctors', 'services', 'timings', 'gallery', 'testimonials', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled, setActiveSection]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <DoctorsSection />
        <ServicesSection />
        <TimingsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
      <AppointmentModal />
    </div>
  );
}

export default App;
