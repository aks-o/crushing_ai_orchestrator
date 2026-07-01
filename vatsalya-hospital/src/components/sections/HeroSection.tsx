import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Phone, ChevronDown, Heart, Shield, Baby, Stethoscope } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { hospitalInfo } from '../../data/hospitalData';

const HeroSection = () => {
  const { setAppointmentModalOpen } = useStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-secondary/30 to-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-accent/30 to-secondary/20 rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating Icons */}
        <motion.div
          variants={floatingIconVariants}
          animate="animate"
          className="absolute top-1/4 left-[10%] text-white/10"
        >
          <Heart className="w-16 h-16" />
        </motion.div>
        <motion.div
          variants={floatingIconVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-1/3 right-[15%] text-white/10"
        >
          <Shield className="w-20 h-20" />
        </motion.div>
        <motion.div
          variants={floatingIconVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-1/4 left-[20%] text-white/10"
        >
          <Baby className="w-14 h-14" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 pt-20 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Open Now - Accepting Patients</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            >
              Caring for Your{' '}
              <span className="relative inline-block">
                Family&apos;s
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-secondary/40 -z-10 origin-left"
                />
              </span>{' '}
              Health
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {hospitalInfo.name} - Your trusted partner for pediatric and dental care in Deoghar. 
              Experienced doctors, modern facilities, compassionate care.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => setAppointmentModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`tel:${hospitalInfo.phone}`}
                className="group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/80"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium">10,000+ Patients</span>
              </div>
              <div className="h-8 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <div className="flex text-secondary">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium">4.9 Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-[500px] h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-32 h-32 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Stethoscope className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-2">Vatsalya Hospital</h3>
                    <p className="text-white/80">Your Health, Our Priority</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-20 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-secondary-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Expert Care</p>
                    <p className="text-xs text-foreground-light">For your family</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 bottom-32 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Trusted By</p>
                    <p className="text-xs text-foreground-light">10,000+ Patients</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors group"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
