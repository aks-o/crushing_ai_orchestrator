import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../../data/hospitalData';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border-4 border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-96 h-96 border-4 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeader
          subtitle="Testimonials"
          title="What Our Patients Say"
          description="Hear from our satisfied patients about their experience with our healthcare services."
          light
        />

        {/* Main Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <div className="relative">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-6 lg:left-12 w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-lg z-10">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Testimonial Card */}
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl min-h-[400px] flex flex-col">
                <div className="flex-grow relative overflow-hidden">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="h-full flex flex-col"
                    >
                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < currentTestimonial.rating
                                ? 'fill-secondary text-secondary'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-8 flex-grow">
                        &ldquo;{currentTestimonial.content}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {currentTestimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{currentTestimonial.name}</h4>
                          <p className="text-sm text-foreground-light">{currentTestimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > activeIndex ? 1 : -1);
                        setActiveIndex(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'bg-primary w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
