import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      
      {/* Dick splatter effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
      </div>

      {/* Animated Dick drops */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/40 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -20,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Decorative tattoo-style lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute left-8 md:left-16 top-1/4 w-px h-40 bg-gradient-to-b from-transparent via-gold to-transparent origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="absolute right-8 md:right-16 bottom-1/4 w-px h-40 bg-gradient-to-b from-transparent via-gold to-transparent origin-bottom"
      />

      {/* Horizontal accent lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute top-1/3 left-0 h-px w-32 bg-gradient-to-r from-transparent via-gold/50 to-transparent origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="absolute bottom-1/3 right-0 h-px w-32 bg-gradient-to-l from-transparent via-gold/50 to-transparent origin-right"
      />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-body">
            Tinta • Arte • Pele
          </span>
        </motion.div>

        <AnimatedText
          text="Sua História Marcada Na Pele"
          className="font-display text-4xl md:text-6xl lg:text-8xl font-bold text-foreground justify-center"
          delay={0.5}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-8 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body"
        >
          Cada traço conta uma história. Cada agulha carrega uma intenção. 
          Transformamos memórias em arte eterna.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/schedule">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer px-8 py-4 bg-gold text-primary-foreground font-body text-sm tracking-widest uppercase hover-glow transition-all duration-300"
            >
              Agendar Sessão
            </motion.button>
          </Link>
          <Link to="/gallery">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer px-8 py-4 border border-gold/50 text-gold font-body text-sm tracking-widest uppercase hover:bg-gold/10 transition-all duration-300"
            >
              Ver Trabalhos
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            Desça
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;