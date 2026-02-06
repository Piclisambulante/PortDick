import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

const categories = ['Todos', 'Blackwork', 'Realismo', 'Fine Line', 'Old School', 'Dotwork'];

const galleryImages = [
  { id: 1, url: 'https://i.pinimg.com/736x/f3/5f/54/f35f542d05fe673e59e4cb606b60e169.jpg', title: 'Blackwork Geométrico', category: 'Blackwork' },
  { id: 2, url: '/img/braçocomdiabo.jpg', title: 'Realismo em Preto', category: 'Realismo' },
  { id: 4, url: '/img/maocomolho.jpg', title: 'Tradicional Americano', category: 'Old School' },
  { id: 5, url: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800', title: 'Ornamental', category: 'Blackwork' },,
  { id: 7, url: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800', title: 'Sessão em Andamento', category: 'Realismo' },
 
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'Todos' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handlePrev = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(filteredImages[nextIndex].id);
    }
  };

  const currentImage = selectedImage !== null 
    ? galleryImages.find(img => img.id === selectedImage) 
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-gold text-xs tracking-[0.4em] uppercase font-body">
                Portfólio
              </span>
              <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-foreground">
                Nossos <span className="text-gradient-gold">Trabalhos</span>
              </h1>
              <p className="mt-6 text-muted-foreground font-body text-lg max-w-2xl mx-auto">
                Cada peça é única. Cada história é diferente. 
                Explore nossa galeria e encontre inspiração.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Filter */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 font-body text-sm tracking-widest uppercase cursor-pointer transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gold text-primary-foreground'
                      : 'border border-border text-muted-foreground hover:border-gold hover:text-gold'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className="aspect-[4/5] overflow-hidden">
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
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {currentImage && (
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
              className="absolute top-6 right-6 text-foreground hover:text-gold transition-colors cursor-pointer z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground hover:text-gold transition-colors cursor-pointer z-10"
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
              className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground hover:text-gold transition-colors cursor-pointer z-10"
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
              className="max-w-5xl max-h-[80vh] mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage.url}
                alt={currentImage.title}
                className="max-w-full h-[70vh] object-contain"
              />
              <div className="text-center mt-6">
                <span className="text-gold text-sm tracking-widest uppercase">
                  {currentImage.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground mt-2">
                  {currentImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;