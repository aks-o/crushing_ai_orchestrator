import { motion } from 'framer-motion';
import { Phone, MessageCircle, Calendar, X } from 'lucide-react';
import { useState } from 'react';
import { hospitalInfo } from '../../data/hospitalData';
import { useStore } from '../../store/useStore';

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setAppointmentModalOpen } = useStore();

  const buttons = [
    {
      icon: Phone,
      label: 'Call Now',
      href: `tel:${hospitalInfo.phone}`,
      color: 'bg-primary hover:bg-primary-dark',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: `https://wa.me/${hospitalInfo.whatsapp}`,
      color: 'bg-accent hover:bg-accent-dark',
    },
    {
      icon: Calendar,
      label: 'Book Appointment',
      onClick: () => setAppointmentModalOpen(true),
      color: 'bg-secondary hover:bg-secondary-dark',
    },
  ];

  return (
    <>
      {/* Desktop Floating Buttons */}
      <div className="hidden lg:flex fixed bottom-8 right-8 flex-col gap-3 z-50">
        {buttons.map((button, index) => (
          <motion.div
            key={button.label}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {button.href ? (
              <a
                href={button.href}
                target={button.href.startsWith('http') ? '_blank' : undefined}
                rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-3 ${button.color} text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <button.icon className="w-5 h-5" />
                <span className="font-medium whitespace-nowrap">{button.label}</span>
              </a>
            ) : (
              <button
                onClick={button.onClick}
                className={`flex items-center gap-3 ${button.color} text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <button.icon className="w-5 h-5" />
                <span className="font-medium whitespace-nowrap">{button.label}</span>
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative"
        >
          {/* Expanded Buttons */}
          <div className={`absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-300 ${
            isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}>
            {buttons.map((button, index) => (
              <motion.div
                key={button.label}
                initial={{ scale: 0 }}
                animate={{ scale: isExpanded ? 1 : 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {button.href ? (
                  <a
                    href={button.href}
                    target={button.href.startsWith('http') ? '_blank' : undefined}
                    rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-2 ${button.color} text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-medium whitespace-nowrap`}
                    onClick={() => setIsExpanded(false)}
                  >
                    <button.icon className="w-4 h-4" />
                    {button.label}
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      button.onClick?.();
                      setIsExpanded(false);
                    }}
                    className={`flex items-center gap-2 ${button.color} text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-medium whitespace-nowrap`}
                  >
                    <button.icon className="w-4 h-4" />
                    {button.label}
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Main FAB */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
              isExpanded 
                ? 'bg-red-500 hover:bg-red-600 rotate-45' 
                : 'bg-primary hover:bg-primary-dark'
            }`}
          >
            {isExpanded ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Phone className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};

export default FloatingButtons;
