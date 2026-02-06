import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxSection from '@/components/ParallaxSection';

const artists = [
  { name: 'Júnior Dieckman', style: 'Blackwork & Realismo', years: '8 anos', image: '/img/dick.png' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl">
                <span className="text-gold text-xs tracking-[0.4em] uppercase font-body">
                  Nossa Filosofia
                </span>
                <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  A pele é 
                  <br />
                  <span className="text-gradient-gold">sagrada.</span>
                </h1>
                <p className="mt-8 text-muted-foreground font-body text-xl leading-relaxed max-w-2xl">
                  Por isso, não tatuamos qualquer coisa em qualquer pessoa. 
                  Cada trabalho começa com uma conversa. Queremos entender 
                  sua história antes de marcá-la para sempre.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Philosophy */}
        <ParallaxSection className="py-24 px-6" speed={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <ScrollReveal direction="left">
                <div className="sticky top-32">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800"
                      alt="Tattoo Process"
                      className="w-full aspect-[3/4] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="space-y-12">
                  <div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '4rem' }}
                      transition={{ duration: 0.8 }}
                      className="h-px bg-gold mb-6"
                    />
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      O Processo
                    </h2>
                    <p className="text-muted-foreground font-body leading-relaxed">
                      Tudo começa com uma consulta gratuita. Sentamos, conversamos, 
                      entendemos o que você quer expressar. Depois, desenhamos, 
                      refinamos, até chegar no perfeito. Só então, tatuamos.
                    </p>
                  </div>

                  <div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '4rem' }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-px bg-gold mb-6"
                    />
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      O Ambiente
                    </h2>
                    <p className="text-muted-foreground font-body leading-relaxed">
                      Nosso estúdio foi projetado para você relaxar. Som ambiente, 
                      iluminação pensada, café sempre fresco. Aqui, cada sessão 
                      é uma experiência, não só um procedimento.
                    </p>
                  </div>

                  <div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '4rem' }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="h-px bg-gold mb-6"
                    />
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      A Higiene
                    </h2>
                    <p className="text-muted-foreground font-body leading-relaxed">
                      Materiais 100% descartáveis. Esterilização em autoclave. 
                      Ambiente climatizado e controlado. Sua segurança não é 
                      negociável — é o mínimo.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ParallaxSection>

        {/* Artists */}
        <section className="py-24 px-6 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-gold text-xs tracking-[0.4em] uppercase font-body">
                  Os Artistas
                </span>
                <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-foreground">
                  Quem <span className="text-gradient-gold">tatua</span> aqui
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-8 max-w-sm mx-auto px-4">
              {artists.map((artist, index) => (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden mb-6">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/50 transition-colors duration-300" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {artist.name}
                    </h3>
                    <p className="text-gold font-body text-sm tracking-widest uppercase mt-2">
                      {artist.style}
                    </p>
                    <p className="text-muted-foreground font-body text-sm mt-1">
                      {artist.years} de experiência
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <span className="font-display text-[20rem] font-bold text-gold">Dick</span>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <ScrollReveal>
              <blockquote className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                "Tatuagem não é sobre rebeldia.
                <br />
                <span className="text-gradient-gold">É sobre pertencimento.</span>"
              </blockquote>
              <p className="mt-8 text-muted-foreground font-body text-sm tracking-widest uppercase">
                — Júnior Dieckman, Fundador
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-secondary/20">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Pronto pra <span className="text-gradient-gold">começar?</span>
              </h2>
              <p className="mt-6 text-muted-foreground font-body text-lg">
                A primeira consulta é gratuita! Vem trocar uma ideia comigo.
              </p>
              <motion.a
                href="/schedule"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-10 px-12 py-5 bg-gold text-primary-foreground font-body text-sm tracking-widest uppercase hover-glow cursor-pointer"
              >
                Agendar Consulta
              </motion.a>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;