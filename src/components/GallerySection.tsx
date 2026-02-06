import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const galleryImages = [
  {
    id: 1,
    url: 'https://i.pinimg.com/736x/5a/be/92/5abe92326f75c3ed5e8129533ddd2387.jpg',
    title: 'Blackwork Geométrico',
    category: 'Blackwork',
  },
  {
    id: 2,
    url: 'https://i.pinimg.com/736x/25/00/1b/25001bef893dd8b8a61b87b7eab5e921.jpg',
    title: 'Realismo em Preto',
    category: 'Realismo',
  },
  {
    id: 4,
    url: 'https://i.pinimg.com/736x/4f/63/95/4f63952d81ff265aa197c987ef7811b0.jpg',
    title: 'Tradicional Americano',
    category: 'Old School',
  },
  {
    id: 5,
    url: 'https://i.pinimg.com/1200x/19/f8/53/19f85381885f75ac290a44b72cb8e295.jpg',
    title: 'Ornamental',
    category: 'Blackwork',
  },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-gold text-xs tracking-[0.4em] uppercase font-body">
                Portfólio
              </span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-foreground">
                Trabalhos <span className="text-gradient-gold">Recentes</span>
              </h2>
            </div>
            <motion.a
              href="/gallery"
              whileHover={{ x: 10 }}
              className="mt-6 md:mt-0 inline-flex items-center gap-3 text-gold font-body text-sm tracking-widest uppercase cursor-pointer"
            >
              Ver todos
              <span className="w-8 h-px bg-gold" />
            </motion.a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <ScrollReveal key={image.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group cursor-pointer overflow-hidden"
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-[4/5] overflow-hidden max-h[400px]">
                  <motion.img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex flex-col justify-end p-6"
                >
                  <span className="text-gold text-xs tracking-widest uppercase mb-2">
                    {image.category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {image.title}
                  </h3>
                </motion.div>
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/50 transition-colors duration-300" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-foreground hover:text-gold transition-colors cursor-pointer"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground hover:text-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft size={48} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground hover:text-gold transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight size={48} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}

              className="max-w-5xl max-h-[90vh] mx-6 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].url}
                alt={galleryImages[selectedImage].title}

                className="max-w-full max-h-[70vh] w-auto h-auto object-contain shadow-2xl"
              />
              
              <div className="text-center mt-6">
                <span className="text-gold text-sm tracking-widest uppercase">
                  {galleryImages[selectedImage].category}
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground mt-2">
                  {galleryImages[selectedImage].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;