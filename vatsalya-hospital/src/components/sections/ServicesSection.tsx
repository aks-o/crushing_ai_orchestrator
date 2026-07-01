import { motion } from 'framer-motion';
import { 
  Baby, 
  Stethoscope, 
  Smile, 
  Syringe, 
  Shield, 
  Siren,
  ArrowRight 
} from 'lucide-react';
import { services } from '../../data/hospitalData';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';
import { useStore } from '../../store/useStore';

const iconMap: { [key: string]: React.ElementType } = {
  Baby,
  Stethoscope,
  Smile,
  Syringe,
  Shield,
  Siren,
};

const ServicesSection = () => {
  const { setAppointmentModalOpen } = useStore();

  return (
    <section id="services" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(74, 144, 217, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeader
          subtitle="Our Services"
          title="Comprehensive Healthcare Services"
          description="We offer a wide range of pediatric and dental services to meet all your family's healthcare needs under one roof."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Stethoscope;
            
            return (
              <ScrollReveal key={service.id} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col"
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                    service.category === 'pediatric' 
                      ? 'bg-secondary/20 group-hover:bg-secondary/30' 
                      : service.category === 'dental'
                      ? 'bg-accent/20 group-hover:bg-accent/30'
                      : 'bg-primary/20 group-hover:bg-primary/30'
                  }`}>
                    <Icon className={`w-7 h-7 ${
                      service.category === 'pediatric' 
                        ? 'text-secondary-dark' 
                        : service.category === 'dental'
                        ? 'text-accent-dark'
                        : 'text-primary'
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-primary/70 mb-3">{service.titleHindi}</p>
                    <p className="text-foreground-light text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setAppointmentModalOpen(true)}
                      className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all group/btn"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.3} direction="up">
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <div className="text-center sm:text-left">
                <h4 className="text-lg font-bold text-foreground mb-1">Need Emergency Care?</h4>
                <p className="text-foreground-light text-sm">Our emergency services are available 24/7</p>
              </div>
              <a
                href={`tel:${hospitalInfo.phone}`}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;
