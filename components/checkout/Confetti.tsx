// components/checkout/Confetti.tsx
"use client";

import { useEffect, useState } from 'react';

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  velocity: number;
}

export default function Confetti() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const newParticles: ConfettiParticle[] = [];

    for (let i = 0; i < 150; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: 2 + Math.random() * 3,
      });
    }

    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: particle.y + particle.velocity,
          rotation: particle.rotation + 2,
        })).filter(particle => particle.y < 100)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            backgroundColor: particle.color,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}