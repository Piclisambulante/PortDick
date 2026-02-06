import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Início', path: '/' },
  { name: 'Trabalhos', path: '/gallery' },
  { name: 'Sobre', path: '/about' },
  { name: 'Agendar', path: '/schedule' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-display text-2xl md:text-3xl font-bold"
          >
            <span className="text-gradient-gold">Dick</span>
            <span className="text-foreground text-lg md:text-xl ml-1">studio</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                to={item.path}
                className="relative cursor-pointer group"
              >
                <span className={`font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === item.path ? 'text-gold' : 'text-foreground hover:text-gold'
                }`}>
                  {item.name}
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-gold"
                  initial={{ width: location.pathname === item.path ? '100%' : '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden cursor-pointer text-foreground hover:text-gold transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="flex flex-col items-center py-8 gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-body text-lg tracking-widest uppercase cursor-pointer ${
                      location.pathname === item.path ? 'text-gold' : 'text-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;