import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  description, 
  centered = true,
  light = false 
}: SectionHeaderProps) => {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 lg:mb-16`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-block text-sm font-semibold tracking-wider uppercase mb-3 ${
            light ? 'text-secondary-light' : 'text-primary'
          }`}
        >
          {subtitle}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? 'text-white' : 'text-foreground'
        }`}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`max-w-2xl ${centered ? 'mx-auto' : ''} text-base lg:text-lg ${
            light ? 'text-white/80' : 'text-foreground-light'
          }`}
        >
          {description}
        </motion.p>
      )}
      
      {/* Decorative underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`h-1 w-24 mt-6 ${centered ? 'mx-auto' : ''} rounded-full ${
          light ? 'bg-secondary' : 'bg-gradient-to-r from-primary to-secondary'
        }`}
      />
    </div>
  );
};

export default SectionHeader;
