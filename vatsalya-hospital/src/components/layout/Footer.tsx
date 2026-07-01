import { motion } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Heart,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUp
} from 'lucide-react';
import { hospitalInfo, navLinks } from '../../data/hospitalData';
import ScrollReveal from '../shared/ScrollReveal';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Doctors', href: '#doctors' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Pediatric Consultation',
  'General Dentistry',
  'Pediatric Dentistry',
  'Dental Procedures',
  'Vaccination',
  'Emergency Care',
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 - About */}
          <ScrollReveal direction="up" delay={0}>
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Vatsalya</h3>
                  <p className="text-xs text-white/60">Child & Dental Care</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Providing compassionate pediatric and dental care in Deoghar since 2009. 
                Your family's health is our priority.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Column 2 - Quick Links */}
          <ScrollReveal direction="up" delay={0.1}>
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Column 3 - Services */}
          <ScrollReveal direction="up" delay={0.2}>
            <div>
              <h4 className="text-lg font-bold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="text-white/70 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Column 4 - Contact Info */}
          <ScrollReveal direction="up" delay={0.3}>
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-0.5">Address</p>
                    <p className="text-white/80 text-sm">{hospitalInfo.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-0.5">Phone</p>
                    <a href={`tel:${hospitalInfo.phone}`} className="text-white/80 text-sm hover:text-primary transition-colors">
                      {hospitalInfo.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-0.5">Email</p>
                    <a href={`mailto:${hospitalInfo.email}`} className="text-white/80 text-sm hover:text-primary transition-colors">
                      {hospitalInfo.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-secondary fill-secondary" />
              <span>in Deoghar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-colors z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
