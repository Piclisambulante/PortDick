import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      trailIdRef.current += 1;
      const newDot: TrailDot = {
        id: trailIdRef.current,
        x: e.clientX,
        y: e.clientY,
      };
      
      setTrail(prev => [...prev.slice(-8), newDot]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('a') || target.closest('button') ||
          target.classList.contains('cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(1));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Rastro (Trail) */}
      {trail.map((dot, index) => (
        <motion.div
          key={dot.id}
          className="fixed pointer-events-none z-[9998]"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            left: dot.x - 2,
            top: dot.y - 2,
            width: 4,
            height: 4,
            background: `hsl(45 90% 55% / ${0.5 - index * 0.05})`,
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Cursor Principal - Ajustado para centralizar sempre */}
      <motion.div
        className="fixed pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          x: position.x - (isHovering ? 20 : 6),
          y: position.y - (isHovering ? 20 : 6),
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      >
        <div 
          className={`w-full h-full rounded-full border-2 border-gold transition-colors duration-300 ${
            isHovering ? 'bg-gold/20' : 'bg-gold'
          }`}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
