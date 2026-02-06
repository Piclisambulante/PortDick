import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand - Larger */}
          <div className="col-span-1 md:col-span-6">
            <Link to="/">
              <h3 className="font-display text-4xl font-bold mb-2">
                <span className="text-gradient-gold">Dick</span>
                <span className="text-foreground text-2xl ml-1">studio</span>
              </h3>
            </Link>
            <p className="text-muted-foreground font-body mt-4 max-w-sm">
              Tatuagens que contam histórias. Arte que dura para sempre.
              Desde 2017, transformando pele em tela.
            </p>
            <div className="flex gap-4 mt-6">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors cursor-pointer"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="mailto:contato@inkstudio.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors cursor-pointer"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Navegue
            </h4>
            <ul className="space-y-3">
              {['Início', 'Trabalhos', 'Sobre', 'Agendar'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Início' ? '/' : item === 'Trabalhos' ? '/gallery' : `/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-gold transition-colors font-body cursor-pointer"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="md:col-span-3">
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Estúdio
            </h4>
            <div className="flex items-start gap-3 text-muted-foreground font-body">
              <MapPin size={18} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <p>Rua Augusta, 1200</p>
                <p>Consolação, São Paulo</p>
                <p className="text-gold mt-2">Seg - Sáb: 12h - 22h</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-body">
            © 2024 Dick Studio. Arte permanente.
          </p>
          <p className="text-muted-foreground/50 text-xs font-body">
            Cada tatuagem é única. Cada história é sua.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;