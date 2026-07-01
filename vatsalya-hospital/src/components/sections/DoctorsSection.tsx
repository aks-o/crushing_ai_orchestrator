import { motion } from 'framer-motion';
import { Award, GraduationCap, Stethoscope, Phone } from 'lucide-react';
import { doctors } from '../../data/hospitalData';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';

const DoctorsSection = () => {
  return (
    <section id="doctors" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeader
          subtitle="Our Doctors"
          title="Meet Our Expert Medical Team"
          description="Our team of experienced and compassionate doctors are dedicated to providing the highest quality care for your family's health needs."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {doctors.map((doctor, index) => (
            <ScrollReveal key={doctor.id} delay={index * 0.15} direction="up">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
              >
                {/* Doctor Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" />
                    <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full" />
                  </div>
                  
                  {/* Doctor Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Stethoscope className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">{doctor.name.split(' ').slice(-1)[0]}</h3>
                    </div>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <span className="text-white text-sm font-semibold">{doctor.experience} Exp</span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-primary font-medium text-sm">{doctor.specialty}</p>
                    <p className="text-foreground-light text-xs mt-1">{doctor.specialtyHindi}</p>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-foreground-light">
                      <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{doctor.qualifications}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground-light">
                      <Award className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Reg. No: {doctor.registration}</span>
                    </div>
                  </div>

                  {/* Call Button */}
                  <a
                    href={`tel:${doctor.phone || hospitalInfo.phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl py-3 font-semibold transition-all duration-300 group/btn"
                  >
                    <Phone className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                    <span>Book Appointment</span>
                  </a>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
