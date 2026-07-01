import { motion } from 'framer-motion';
import { Clock, Calendar, Phone, MapPin, CheckCircle2, XCircle, Sun } from 'lucide-react';
import { hospitalInfo } from '../../data/hospitalData';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';
import { useStore } from '../../store/useStore';

const TimingsSection = () => {
  const { setAppointmentModalOpen } = useStore();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section id="timings" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeader
          subtitle="OPD Timings"
          title="Visit Us at Your Convenience"
          description="Our OPD is open 6 days a week with morning and evening sessions to accommodate your busy schedule."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Contact Card */}
            <ScrollReveal direction="left">
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">Quick Contact</h3>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Book your appointment or inquire about our services
                </p>
                <a
                  href={`tel:${hospitalInfo.phone}`}
                  className="flex items-center justify-center gap-2 bg-white text-primary px-4 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {hospitalInfo.phone}
                </a>
              </div>
            </ScrollReveal>

            {/* Location Card */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary-dark" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Our Location</h3>
                </div>
                <p className="text-foreground-light text-sm leading-relaxed mb-4">
                  {hospitalInfo.address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(hospitalInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                >
                  Get Directions
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

            {/* Sunday Notice */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sun className="w-5 h-5 text-accent-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Sunday Appointments</h3>
                    <p className="text-foreground-light text-sm">
                      Sunday consultations are available by prior appointment only. 
                      Please call us in advance to schedule.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Timings Table */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Weekly Schedule</h3>
                      <p className="text-white/80 text-sm">Regular OPD Timings</p>
                    </div>
                  </div>
                </div>

                {/* Timings Table */}
                <div className="divide-y divide-gray-100">
                  {hospitalInfo.timings.map((timing, index) => {
                    const isToday = timing.day === today;
                    const isOpen = timing.isOpen;

                    return (
                      <motion.div
                        key={timing.day}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 lg:p-6 transition-colors ${
                          isToday ? 'bg-primary/5' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Day Info */}
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              isToday 
                                ? 'bg-primary text-white' 
                                : isOpen 
                                  ? 'bg-accent/20 text-accent-dark'
                                  : 'bg-gray-100 text-gray-500'
                            }`}>
                              {isOpen ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <XCircle className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-foreground">
                                {timing.day}
                                {isToday && (
                                  <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                                    Today
                                  </span>
                                )}
                              </h4>
                              <p className="text-xs text-foreground-light">{timing.dayHindi}</p>
                            </div>
                          </div>

                          {/* Timings */}
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
                            {isOpen ? (
                              <>
                                <div className="flex items-center gap-2 bg-secondary/10 rounded-lg px-3 py-2">
                                  <Clock className="w-4 h-4 text-secondary-dark" />
                                  <span className="font-medium text-foreground">{timing.morning}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
                                  <Clock className="w-4 h-4 text-primary" />
                                  <span className="font-medium text-foreground">{timing.evening}</span>
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center gap-2 bg-accent/10 rounded-lg px-4 py-2">
                                <Calendar className="w-4 h-4 text-accent-dark" />
                                <span className="font-medium text-foreground">{timing.morning}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Table Footer */}
                <div className="bg-gray-50 p-4 lg:p-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-foreground-light text-center sm:text-left">
                      <span className="font-semibold text-foreground">Note:</span> Emergency services available 24/7
                    </p>
                    <button
                      onClick={() => setAppointmentModalOpen(true)}
                      className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-semibold transition-colors whitespace-nowrap"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimingsSection;
