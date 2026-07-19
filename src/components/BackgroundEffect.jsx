import React, { useEffect, useRef, useState } from "react";

const BackgroundEffect = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [mouseGlow, setMouseGlow] = useState({ x: -200, y: -200 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    let time = 0;

    // Responsive star counts
    const starCount = isMobile ? 60 : 150;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    };

    // Box-Muller transform to generate standard normal distribution numbers (Gaussian)
    const gaussianRandom = () => {
      let u = 0, v = 0;
      while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    const initializeStars = () => {
      stars = [];
      const width = canvas.width;
      const height = canvas.height;

      // Define 3 galactic cluster hubs (Milky Way centers)
      const clusters = [
        { x: width * 0.25, y: height * 0.3, radius: Math.min(width, height) * 0.2 },
        { x: width * 0.70, y: height * 0.65, radius: Math.min(width, height) * 0.25 },
        { x: width * 0.50, y: height * 0.15, radius: Math.min(width, height) * 0.15 }
      ];

      for (let i = 0; i < starCount; i++) {
        let x, y;
        const isClustered = Math.random() < 0.7; // 70% clustered, 30% background scatter

        if (isClustered && clusters.length > 0) {
          const cluster = clusters[Math.floor(Math.random() * clusters.length)];
          // Gaussian distribution around the hub coordinate
          x = cluster.x + gaussianRandom() * cluster.radius;
          y = cluster.y + gaussianRandom() * cluster.radius;
        } else {
          // Uniform background scatter
          x = Math.random() * width;
          y = Math.random() * height;
        }

        // Clip bounds to screen area
        if (x < 0) x = 0;
        if (x > width) x = width;
        if (y < 0) y = 0;
        if (y > height) y = height;

        // Visual types: 0 (tiny), 1 (medium), 2 (large glowing)
        let type = 0;
        const rand = Math.random();
        if (rand > 0.95) {
          type = 2; // Glowing stars
        } else if (rand > 0.8) {
          type = 1; // Medium stars
        }

        const size = type === 2 ? Math.random() * 1.5 + 1.2 : type === 1 ? Math.random() * 0.8 + 0.6 : Math.random() * 0.4 + 0.2;
        const baseAlpha = type === 2 ? Math.random() * 0.4 + 0.5 : type === 1 ? Math.random() * 0.3 + 0.3 : Math.random() * 0.25 + 0.15;
        const twinkleSpeed = Math.random() * 0.015 + 0.005;
        
        stars.push({
          x,
          y,
          size,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed,
          type,
          // Extremely slow drift speeds
          driftX: (Math.random() - 0.5) * 0.02,
          driftY: (Math.random() - 0.5) * 0.02
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Triggers initialization

    const drawConstellations = () => {
      // Limit line drawings to a subset of stars to save rendering time (constant 60fps)
      const subsetLimit = Math.min(stars.length, isMobile ? 0 : 40);
      if (subsetLimit === 0) return;

      for (let i = 0; i < subsetLimit; i++) {
        const starA = stars[i];
        for (let j = i + 1; j < subsetLimit; j++) {
          const starB = stars[j];
          const dx = starA.x - starB.x;
          const dy = starA.y - starB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if within threshold (90px)
          if (dist < 90) {
            const lineAlpha = (1 - dist / 90) * 0.04 * starA.alpha * starB.alpha;
            ctx.beginPath();
            ctx.moveTo(starA.x, starA.y);
            ctx.lineTo(starB.x, starB.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.45;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render stars
      stars.forEach((star) => {
        // Apply tiny slow drift
        star.x += star.driftX;
        star.y += star.driftY;

        // Re-wrap bounds
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Calculate twinkling alpha using trigonometric waves
        star.alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed) * (star.type === 2 ? 0.25 : 0.15);
        if (star.alpha < 0.05) star.alpha = 0.05;
        if (star.alpha > 1) star.alpha = 1;

        ctx.beginPath();
        if (star.type === 2) {
          // Large glowing stars: render radial glow shadow
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
          gradient.addColorStop(0.3, `rgba(255, 255, 255, ${star.alpha * 0.4})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
        } else {
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        }
        ctx.fill();
      });

      // Draw constellation connections on top of stars
      drawConstellations();

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      setMouseGlow({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#030307] pointer-events-none">
      {/* Film grain noise and vignette overlay layers */}
      <div className="vignette-overlay" />
      <div className="noise-overlay" />

      {/* Grid line pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.25]" />

      {/* VERY faint, reduced blue glow follow */}
      {mouseRef.current.active && (
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none mix-blend-screen opacity-10 transition-all duration-700 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(0, 0, 0, 0) 70%)",
            left: `${mouseGlow.x - 250}px`,
            top: `${mouseGlow.y - 250}px`,
          }}
        />
      )}

      {/* Very soft ambient background glow orbs (reduced blue/cyan intensity by 80%) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#3B82F6]/[0.03] aurora-orb" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#8B5CF6]/[0.02] aurora-orb" />
      <div className="absolute top-[35%] right-[25%] w-[400px] h-[400px] rounded-full bg-white/[0.01] aurora-orb" />

      {/*Twinkling Cosmic Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none" />
    </div>
  );
};

export default BackgroundEffect;
