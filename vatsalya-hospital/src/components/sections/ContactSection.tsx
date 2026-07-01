import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2,
  Loader2,
  MessageCircle
} from 'lucide-react';
import { hospitalInfo } from '../../data/hospitalData';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: hospitalInfo.address,
    color: 'bg-secondary/20 text-secondary-dark',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: hospitalInfo.phone,
    href: `tel:${hospitalInfo.phone}`,
    color: 'bg-primary/20 text-primary',
  },
  {
    icon: Mail,
    label: 'Email',
    value: hospitalInfo.email,
    href: `mailto:${hospitalInfo.email}`,
    color: 'bg-accent/20 text-accent-dark',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon-Sat: 10AM-2PM & 5PM-8PM',
    color: 'bg-secondary/20 text-secondary-dark',
  },
];

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeader
          subtitle="Contact Us"
          title="Get In Touch"
          description="Have questions or need to schedule an appointment? We're here to help. Reach out to us through any of the channels below."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 0.1} direction="left">
                <motion.div
                  whileHover={{ x: 8 }}
                  className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm text-foreground-light mb-1">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="font-semibold text-foreground hover:text-primary transition-colors break-words"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-foreground break-words">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}

            {/* WhatsApp CTA */}
            <ScrollReveal direction="left" delay={0.4}>
              <a
                href={`https://wa.me/${hospitalInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-gradient-to-r from-accent to-accent-dark rounded-2xl p-5 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Chat on WhatsApp</h4>
                  <p className="text-white/80 text-sm">Quick responses during working hours</p>
                </div>
              </a>
            </ScrollReveal>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Send us a Message</h3>
                    <p className="text-sm text-foreground-light">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="appointment">Book Appointment</option>
                        <option value="inquiry">General Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      isSubmitted
                        ? 'bg-accent text-white'
                        : 'bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Message Sent Successfully!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
