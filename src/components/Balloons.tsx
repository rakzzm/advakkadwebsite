'use client';

import { useEffect, useState } from 'react';

type Balloon = {
  id: number;
  left: number; // 0-100%
  animationDuration: number; // seconds
  delay: number; // seconds
  color: string;
};

const COLORS = ['#FF4D4D', '#FF9F4D', '#FFD700', '#4DFF4D', '#4D9FFF', '#9F4DFF', '#FF4D9F'];

export default function Balloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    // Generate 15 random balloons
    const newBalloons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5, // Random position 5-95%
      animationDuration: Math.random() * 5 + 10, // 10-15s float duration
      delay: Math.random() * 10, // 0-10s delay start
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setBalloons(newBalloons);
  }, []);

  const popBalloon = (id: number) => {
    // Remove popped balloon and add a new one to keep the party going
    setBalloons((prev) => 
      prev.map(b => b.id === id ? {
         ...b, 
         // Reset balloon to bottom
         delay: 0,
         key: Math.random() // Force re-render/reset animation
      } : b)
    );
    // Simple visual interaction - could be enhanced with pop sound or particle effect
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3'); // Optional sound
    // audio.play().catch(() => {}); 
  };

  return (
    <div className="balloon-container">
      {balloons.map((balloon) => (
        <div
          key={`${balloon.id}-${balloon.delay}`} // Force re-mount on reset
          className="balloon"
          style={{
            left: `${balloon.left}%`,
            backgroundColor: balloon.color,
            animationDuration: `${balloon.animationDuration}s`,
            animationDelay: `${balloon.delay}s`,
          }}
          onClick={() => popBalloon(balloon.id)}
        >
           <div className="string"></div>
        </div>
      ))}
      <style jsx>{`
        .balloon-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          pointer-events: none; /* Let clicks pass through container */
          z-index: 0; /* Behind content generally, or specify */
        }

        .balloon {
          position: absolute;
          bottom: -150px;
          width: 60px;
          height: 70px;
          border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
          box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
          animation: floatUp linear infinite;
          cursor: pointer;
          pointer-events: auto; /* Re-enable clicks on balloons */
          opacity: 0.9;
          transition: transform 0.2s;
        }

        .balloon:hover {
           transform: scale(1.1);
        }

        .balloon::before {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 10px solid inherit; /* Match balloon color via JS if needed, or currentColor */
          border-top-color: inherit;
        }

        .string {
          position: absolute;
          bottom: -60px;
          left: 50%;
          width: 2px;
          height: 50px;
          background: rgba(0,0,0,0.2);
          transform: translateX(-50%);
        }

        @keyframes floatUp {
          0% { bottom: -150px; transform: translateX(0); }
          25% { transform: translateX(10px); }
          50% { transform: translateX(-10px); }
          75% { transform: translateX(5px); }
          100% { bottom: 120%; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
