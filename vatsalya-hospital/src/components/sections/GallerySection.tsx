import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, MapPin, Building2, Users, Stethoscope } from 'lucide-react';
import { galleryImages } from '../../data/hospitalData';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';

const categories = [
  { id: 'all', label: 'All Photos', icon: Building2 },
  { id: 'exterior', label: 'Exterior', icon: MapPin },
  { id: 'interior', label: 'Interior', icon: Building2 },
  { id: 'equipment', label: 'Equipment', icon: Stethoscope },
  { id: 'team', label: 'Our Team', icon: Users },
];

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeader
          subtitle="Gallery"
          title="Explore Our Facility"
          description="Take a virtual tour of our modern hospital facility equipped with state-of-the-art medical technology and comfortable patient spaces."
        />

        {/* Category Filter */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white text-foreground-light hover:bg-primary/10 hover:text-primary border border-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => setSelectedImage(image.src)}
              >
                {/* Placeholder Image */}
                <div className={`bg-gradient-to-br from-primary/20 to-secondary/20 ${
                  index === 0 || index === 5 ? 'aspect-square md:aspect-auto md:h-full' : 'aspect-square'
                }`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 mx-auto mb-3 bg-white/50 rounded-xl flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-foreground-light text-sm font-medium">{image.alt}</p>
                    </div>
                  </div>
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
                  >
                    <ZoomIn className="w-6 h-6 text-primary" />
                  </motion.div>
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-primary capitalize">{image.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ZoomIn className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No images found</h3>
            <p className="text-foreground-light">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/50 rounded-2xl flex items-center justify-center">
                    <ZoomIn className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-foreground-light text-lg font-medium">Gallery Image</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
