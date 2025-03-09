"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityX: number;
  velocityY: number;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, colors: string[]) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.radius = Math.random() * 3 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.velocityX = Math.random() * 2 - 1;
    this.velocityY = Math.random() * 2 - 1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    // Boundary check and position update
    if (this.x + this.radius > this.canvasWidth || this.x - this.radius < 0) {
      this.velocityX = -this.velocityX;
    }
    if (this.y + this.radius > this.canvasHeight || this.y - this.radius < 0) {
      this.velocityY = -this.velocityY;
    }
    
    this.x += this.velocityX;
    this.y += this.velocityY;
    
    this.draw();
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    const particles: Particle[] = [];
    
    // Define colors based on theme
    const lightThemeColors = [
      "rgba(99, 102, 241, 0.2)",  // indigo-500 with opacity
      "rgba(139, 92, 246, 0.2)",  // violet-500 with opacity
      "rgba(59, 130, 246, 0.2)",  // blue-500 with opacity
      "rgba(236, 72, 153, 0.2)",  // pink-500 with opacity
    ];
    
    const darkThemeColors = [
      "rgba(99, 102, 241, 0.3)",  // indigo-500 with opacity
      "rgba(139, 92, 246, 0.3)",  // violet-500 with opacity
      "rgba(59, 130, 246, 0.3)",  // blue-500 with opacity
      "rgba(236, 72, 153, 0.3)",  // pink-500 with opacity
    ];
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reset particles
      particles.length = 0;
      
      // Create particles
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
      const colors = resolvedTheme === "dark" ? darkThemeColors : lightThemeColors;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(ctx, canvas.width, canvas.height, colors));
      }
    };
    
    // Initial setup
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Create connection line between particles
    function connect() {
      const opacityValue = 0.7;
      const maxDistance = 100;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = resolvedTheme === "dark" 
              ? `rgba(99, 102, 241, ${opacity * opacityValue})`  // indigo for dark mode
              : `rgba(99, 102, 241, ${opacity * opacityValue})`;  // indigo for light mode
            
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      
      connect();
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-50"
      style={{ pointerEvents: "none" }}
    />
  );
}