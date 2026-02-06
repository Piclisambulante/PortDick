import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/components/HeroSection';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxSection from '@/components/ParallaxSection';
import '../App.css'

const manifestoLines = [
  { text: "Não fazemos tatuagens.", highlight: false },
  { text: "Criamos cicatrizes de propósito.", highlight: true },
  { text: "Cada linha é uma decisão.", highlight: false },
  { text: "Cada sombra, um segredo.", highlight: true },
  { text: "Você não sai o mesmo.", highlight: false },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />
      
      <main>
        <HeroSection />

        {/* Manifesto Section - Completely Different */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
          
          {/* Diagonal line accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent origin-left"
          />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              {/* Left side - vertical text */}
              <div className="lg:col-span-4 flex lg:flex-col justify-center lg:justify-start items-center lg:items-end gap-4">
                <ScrollReveal direction="left">
                  <span className="text-gold text-xs tracking-[0.5em] uppercase font-body lg:writing-mode-vertical lg:rotate-180" 
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                    Manifesto
                  </span>
                </ScrollReveal>
              </div>

              {/* Right side - manifesto text */}
              <div className="lg:col-span-8 space-y-6">
                {manifestoLines.map((line, index) => (
                  <ScrollReveal key={index} delay={index * 0.15}>
                    <motion.p
                      whileHover={{ x: 20 }}
                      className={`font-display text-2xl md:text-4xl lg:text-5xl font-bold cursor-default transition-colors duration-300 ${
                        line.highlight ? 'text-gradient-gold' : 'text-foreground hover:text-gold/80'
                      }`}
                    >
                      {line.text}
                    </motion.p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Floating Stats - Scattered, not in a row */}
        <section className="py-24 px-6 relative min-h-[60vh]">
          <div className="max-w-7xl mx-auto relative">
            {/* Scattered floating elements */}
            <ScrollReveal className="absolute top-0 left-0 md:left-10">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-center"
              >
                <span className="block font-display text-7xl md:text-9xl font-bold text-gradient-gold">7</span>
                <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-body">anos de agulha</span>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="absolute top-20 right-0 md:right-20">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="text-right"
              >
                <span className="block font-display text-5xl md:text-7xl font-bold text-foreground">∞</span>
                <span className="text-gold text-xs tracking-[0.3em] uppercase font-body">histórias na pele</span>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="absolute bottom-0 left-1/4">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="text-center"
              >
                <span className="block font-display text-6xl md:text-8xl font-bold text-foreground/50">0</span>
                <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-body">arrependimentos</span>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.6} className="absolute bottom-10 right-1/4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="border border-gold/30 p-6 md:p-8"
              >
                <span className="block font-display text-3xl md:text-4xl font-bold text-gold">24h</span>
                <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-body">maior sessão</span>
              </motion.div>
            </ScrollReveal>

            {/* Central quote */}
            <div className="flex items-center justify-center min-h-[50vh]">
              <ScrollReveal delay={0.3}>
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="max-w-lg text-center"
                >
                  <p className="font-display text-xl md:text-2xl text-muted-foreground italic">
                    "A dor é temporária. A arte é para sempre."
                  </p>
                </motion.blockquote>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* About Preview - Asymmetric */}
        <ParallaxSection className="py-24 px-6" speed={0.3}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image - takes more space, off-center */}
              <ScrollReveal direction="left" className="lg:col-span-7 lg:col-start-1">
                <div className="relative">
                  {/* Decorative frame */}
                  <div className="absolute -top-4 -left-4 w-32 h-32 border-l-2 border-t-2 border-gold/50" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r-2 border-b-2 border-gold/50" />
                  
                  <img
                    src="/img/braçocomdiabo.jpg"
                    alt="Tattoo Artist at Work"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  
                  {/* Overlay text */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-12 bg-background border border-gold p-6"
                  >
                    <span className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">Dick</span>
                    <span className="block text-muted-foreground text-xs tracking-widest uppercase mt-1">studio</span>
                  </motion.div>
                </div>
              </ScrollReveal>

              {/* Text - offset to the right */}
              <ScrollReveal direction="right" className="lg:col-span-4 lg:col-start-9 mt-16 lg:mt-0">
                <div className="lg:pl-8">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '3rem' }}
                    transition={{ duration: 0.8 }}
                    className="h-px bg-gold mb-8"
                  />
                  
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Não somos um estúdio.
                    <br />
                    <span className="text-gradient-gold">Somos um ritual.</span>
                  </h2>
                  
                  <p className="text-muted-foreground font-body text-base leading-relaxed mb-8">
                    Aqui, cada sessão é uma cerimônia. Cada traço, uma promessa. 
                    Trabalhamos com quem entende que tatuagem não é decoração — 
                    é declaração.
                  </p>
                  
                  <motion.a
                    href="/about"
                    whileHover={{ x: 10 }}
                    className="inline-flex items-center gap-4 text-gold font-body text-sm tracking-widest uppercase cursor-pointer group"
                  >
                    Conheça nossa filosofia
                    <motion.span
                      className="w-8 h-px bg-gold group-hover:w-12 transition-all duration-300"
                    />
                  </motion.a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ParallaxSection>

        {/* Gallery Preview */}
        <GallerySection />

        {/* CTA Section - Different approach */}
        <section className="py-32 px-6 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-gold/5 to-transparent" />
            <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-gold text-xs tracking-[0.4em] uppercase font-body">
                    Próximo passo
                  </span>
                  <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold text-foreground">
                    Pronto pra
                    <br />
                    <span className="text-gradient-gold">se marcar?</span>
                  </h2>
                </div>
                
                <div className="flex flex-col gap-4">
                  <motion.a
                    href="/schedule"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-between p-6 border border-gold bg-gold/5 hover:bg-gold/10 transition-all cursor-pointer"
                  >
                    <span className="font-body text-lg text-foreground">Agendar uma sessão</span>
                    <span className="text-gold text-2xl group-hover:translate-x-2 transition-transform">→</span>
                  </motion.a>
                  
                  <motion.a
                    href="/gallery"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-between p-6 border border-border hover:border-gold/50 transition-all cursor-pointer"
                  >
                    <span className="font-body text-lg text-muted-foreground group-hover:text-foreground transition-colors">Ver portfólio completo</span>
                    <span className="text-muted-foreground text-2xl group-hover:text-gold group-hover:translate-x-2 transition-all">→</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-between p-6 border border-border hover:border-gold/50 transition-all cursor-pointer"
                  >
                    <span className="font-body text-lg text-muted-foreground group-hover:text-foreground transition-colors">Seguir no Instagram</span>
                    <span className="text-muted-foreground text-2xl group-hover:text-gold group-hover:translate-x-2 transition-all">→</span>
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;