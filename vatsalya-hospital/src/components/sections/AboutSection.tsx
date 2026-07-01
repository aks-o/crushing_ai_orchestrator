import { motion } from 'framer-motion';
import { Award, Users, Clock, Heart, CheckCircle2 } from 'lucide-react';
import { hospitalInfo } from '../../data/hospitalData';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';
import Counter from '../shared/Counter';

const stats = [
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Patients' },
  { icon: Award, value: 15, suffix: '+', label: 'Years Experience' },
  { icon: Clock, value: 50, suffix: 'K+', label: 'Consultations' },
  { icon: Heart, value: 99, suffix: '%', label: 'Success Rate' },
];

const features = [
  'Expert Pediatric & Dental Care',
  'Modern Medical Equipment',
  'Child-Friendly Environment',
  'Experienced Medical Team',
  'Affordable Treatment',
  'Emergency Services Available',
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeader
          subtitle="About Us"
          title="Welcome to Vatsalya Hospital"
          description="Your trusted partner for pediatric and dental care in Deoghar. We combine compassionate care with modern medical expertise to ensure the best health outcomes for your family."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Heart className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Vatsalya Hospital</h3>
                    <p className="text-white/80 text-sm mt-1">Caring Since 2009</p>
                  </div>
                </div>
              </div>

              {/* Experience Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary">15+</span>
                  <p className="text-sm text-foreground-light">Years of<br />Excellence</p>
                </div>
              </motion.div>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-accent-dark" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">Certified</span>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right Content */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Providing Quality Healthcare for Your Family
                </h3>
                <p className="text-foreground-light leading-relaxed">
                  At {hospitalInfo.name}, we understand that your family's health is your top priority. 
                  That's why we've brought together a team of experienced pediatricians and dental specialists 
                  who are dedicated to providing compassionate, personalized care for patients of all ages.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats Section */}
        <div className="mt-20 lg:mt-24">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <ScrollReveal key={stat.label} delay={index * 0.1} direction="up">
                  <div className="text-center text-white">
                    <div className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold mb-1">
                      <Counter 
                        end={stat.value} 
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    </div>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
