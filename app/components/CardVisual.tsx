"use client";

import { useRef, MouseEvent } from "react";

export default function CardVisual() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    
    const card = tiltRef.current;
    const rect = card.getBoundingClientRect();
    
    // Center of the card in viewport coordinates
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX; 
    const mouseY = e.clientY - centerY; 
    
    // Smooth rotation calculation based on the distance from center
    // We adjust the divisor to control sensitivity
    const rotateX = (mouseY / (rect.height / 2)) * -20;
    const rotateY = (mouseX / (rect.width / 2)) * 20;
    
    // Clamp values so it doesn't flip over if mouse goes really far away
    const clampedX = Math.max(-30, Math.min(30, rotateX));
    const clampedY = Math.max(-30, Math.min(30, rotateY));
    
    // Direct DOM manipulation for 60fps smoothness (bypasses React render cycle)
    card.style.transform = `rotateX(${clampedX}deg) rotateY(${clampedY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    if (reflectionRef.current) {
      reflectionRef.current.style.opacity = "1";
      reflectionRef.current.style.background = `radial-gradient(circle at ${clampedY * 2 + 50}% ${-clampedX * 2 + 50}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = `rotateX(15deg) rotateY(-15deg) scale3d(1, 1, 1)`;
    
    if (reflectionRef.current) {
      reflectionRef.current.style.opacity = "0";
    }
  };

  return (
    // Large Hitbox Wrapper
    <div 
      className="relative w-full max-w-2xl mx-auto flex justify-center items-center p-10 md:p-20"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow that matches the hitbox area */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,186,47,0.15)_0%,rgba(0,0,0,0)_60%)] pointer-events-none z-0"></div>
      
      {/* Outer wrapper for the continuous CSS float animation */}
      <div className="w-full max-w-sm animate-float z-10 pointer-events-none">
        
        {/* Inner wrapper for the JS tilt (pointer events re-enabled so it can still capture precise clicks if needed) */}
        <div 
          ref={tiltRef}
          className="relative w-full aspect-[1.586/1] rounded-2xl glass-panel p-6 flex flex-col justify-between overflow-hidden transition-transform duration-[100ms] ease-out pointer-events-auto"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(15deg) rotateY(-15deg)" }}
        >
          {/* Abstract Background Elements inside card */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#F3BA2F] rounded-full mix-blend-screen filter blur-[60px] opacity-40 pointer-events-none"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-zinc-400 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none"></div>

          {/* Card Header */}
          <div className="flex justify-between items-start z-10 pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
            <div className="font-bold text-xl tracking-wider text-white drop-shadow-md">
              LINECARD
            </div>
            {/* Mock Chip */}
            <div className="w-12 h-9 rounded bg-gradient-to-br from-yellow-200 to-yellow-600 opacity-80 border border-yellow-400/50 shadow-sm"></div>
          </div>

          {/* Card Number & Details */}
          <div className="z-10 mt-auto pointer-events-none" style={{ transform: 'translateZ(40px)' }}>
            <div className="text-xl tracking-[0.2em] font-mono text-zinc-300 mb-4 drop-shadow-md">
              •••• •••• •••• 8888
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Cardholder</div>
                <div className="text-sm font-medium text-white tracking-widest drop-shadow-sm">ANONYMOUS</div>
              </div>
              {/* Mock Mastercard/Visa circles */}
              <div className="flex relative w-12 h-8">
                <div className="absolute right-4 w-8 h-8 rounded-full bg-red-500/80 mix-blend-screen"></div>
                <div className="absolute right-0 w-8 h-8 rounded-full bg-yellow-500/80 mix-blend-screen"></div>
              </div>
            </div>
          </div>
          
          {/* Dynamic Reflection Overlay */}
          <div 
            ref={reflectionRef}
            className="absolute inset-0 z-20 pointer-events-none rounded-2xl transition-opacity duration-300 opacity-0"
          />
        </div>
      </div>
    </div>
  );
}
