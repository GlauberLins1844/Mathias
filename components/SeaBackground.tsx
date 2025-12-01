import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bubble, FishType } from '../types';

const generateBubbles = (count: number): Bubble[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage
    size: Math.random() * 40 + 20, // 20px to 60px
    speed: Math.random() * 10 + 5, // duration
    delay: Math.random() * 5,
  }));
};

const SeaBackground: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [fishes, setFishes] = useState<FishType[]>([]);

  useEffect(() => {
    // Initial bubbles
    setBubbles(generateBubbles(15));

    // Generate fish periodically
    const fishInterval = setInterval(() => {
      const newFish: FishType = {
        id: Date.now(),
        y: Math.random() * 80 + 10, // 10% to 90% height
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 10 + 15,
        direction: Math.random() > 0.5 ? 'right' : 'left',
        type: Math.random() > 0.8 ? 'whale' : Math.random() > 0.5 ? 'blue' : 'clown'
      };
      setFishes(prev => [...prev.slice(-4), newFish]); // Keep max 5 fish
    }, 4000);

    // Replenish bubbles
    const bubbleInterval = setInterval(() => {
      setBubbles(prev => {
        if (prev.length < 15) {
          return [...prev, ...generateBubbles(15 - prev.length)];
        }
        return prev;
      });
    }, 3000);

    return () => {
      clearInterval(fishInterval);
      clearInterval(bubbleInterval);
    };
  }, []);

  const popBubble = (id: number) => {
    // Play a soft pop sound (optional, visually handled here)
    setBubbles(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Swimming Fish */}
      <AnimatePresence>
        {fishes.map((fish) => (
          <motion.div
            key={fish.id}
            initial={{ x: fish.direction === 'right' ? '-20vw' : '120vw', y: `${fish.y}vh`, opacity: 0.8 }}
            animate={{ x: fish.direction === 'right' ? '120vw' : '-20vw' }}
            exit={{ opacity: 0 }}
            transition={{ duration: fish.duration, ease: "linear" }}
            className="absolute pointer-events-auto"
            onClick={() => {
                // Interactive wiggle on click
                const el = document.getElementById(`fish-${fish.id}`);
                if (el) {
                    el.style.transform = `scale(${fish.scale * 1.2}) rotate(10deg)`;
                    setTimeout(() => {
                         el.style.transform = `scale(${fish.scale})`;
                    }, 200);
                }
            }}
          >
            <div id={`fish-${fish.id}`} style={{ transform: `scale(${fish.scale}) scaleX(${fish.direction === 'left' ? -1 : 1})` }}>
              {fish.type === 'clown' && (
                <svg width="60" height="40" viewBox="0 0 60 40" className="drop-shadow-lg">
                  <path d="M55,20 Q50,5 30,10 Q10,5 5,20 Q10,35 30,30 Q50,35 55,20 Z M5,20 L0,15 L0,25 Z" fill="#FF7F50" />
                  <circle cx="15" cy="18" r="2" fill="white" />
                  <path d="M35,10 Q40,20 35,30" stroke="white" strokeWidth="3" fill="none" />
                  <path d="M20,10 Q25,20 20,30" stroke="white" strokeWidth="3" fill="none" />
                </svg>
              )}
              {fish.type === 'blue' && (
                <svg width="50" height="30" viewBox="0 0 50 30" className="drop-shadow-lg">
                  <path d="M45,15 Q40,0 25,5 Q5,0 2,15 Q5,30 25,25 Q40,30 45,15 Z M2,15 L-2,10 L-2,20 Z" fill="#60A5FA" />
                  <circle cx="10" cy="12" r="2" fill="black" />
                </svg>
              )}
               {fish.type === 'whale' && (
                <svg width="120" height="80" viewBox="0 0 120 80" className="drop-shadow-xl">
                   <path d="M10,40 Q20,10 60,10 Q100,10 110,40 Q100,60 60,60 Q20,60 10,40 Z M10,40 Q5,30 0,20 M10,40 Q5,50 0,60" fill="#93C5FD" stroke="#60A5FA" strokeWidth="2" />
                   <circle cx="90" cy="35" r="3" fill="black" />
                   <path d="M80,50 Q90,55 100,50" stroke="#3B82F6" strokeWidth="2" fill="none" />
                   {/* Water spout */}
                   <path d="M60,10 L60,0 M55,5 L50,-5 M65,5 L70,-5" stroke="white" strokeWidth="2" opacity="0.6" />
                </svg>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Rising Bubbles */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ y: '110vh', x: `${bubble.x}vw`, opacity: 0, scale: 0 }}
            animate={{ 
                y: '-20vh', 
                opacity: [0, 0.6, 0.6, 0],
                scale: 1,
                x: [`${bubble.x}vw`, `${bubble.x + (Math.random() * 5 - 2.5)}vw`, `${bubble.x}vw`] 
            }}
            transition={{ 
                duration: bubble.speed, 
                delay: bubble.delay, 
                ease: "linear",
                repeat: Infinity 
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => popBubble(bubble.id)}
            className="absolute rounded-full border-2 border-white/40 bg-white/20 cursor-pointer pointer-events-auto backdrop-blur-[1px]"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: 0, 
              boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)'
            }}
          >
             <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-white/60 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SeaBackground;