import React, { useEffect, useRef, useState } from "react";

const BackgroundEffect = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
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
    let particles = [];
    let time = 0;
    let isTabActive = true;

    // Detect user preferences for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
    };

    class SpaceParticle {
      constructor(type) {
        this.type = type; // 0 = twinkling white star, 1 = rising glowing ember
        this.reset();
        // Stagger y initial states
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = this.type === 1 ? canvas.height + 20 : Math.random() * canvas.height;
        this.size = this.type === 1 ? Math.random() * 1.5 + 1.0 : Math.random() * 0.7 + 0.3;
        this.speedY = this.type === 1 ? Math.random() * 0.4 + 0.2 : (Math.random() - 0.5) * 0.05;
        this.speedX = this.type === 1 ? 0 : (Math.random() - 0.5) * 0.05;
        this.alpha = Math.random() * 0.5 + 0.15;
        this.baseAlpha = this.alpha;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.offset = Math.random() * 100;
      }

      update() {
        if (prefersReducedMotion) return;

        // Apply movement physics
        if (this.type === 1) {
          // Ember rising physics with sway wave
          this.y -= this.speedY;
          this.x += Math.sin(time * 0.015 + this.offset) * 0.2;
        } else {
          // Star slow drift
          this.y += this.speedY;
          this.x += this.speedX;
        }

        // Wrap around bounds
        if (this.y < -10) {
          this.reset();
        } else if (this.y > canvas.height + 10) {
          this.y = -5;
        }

        if (this.x < -10) {
          this.x = canvas.width + 5;
        } else if (this.x > canvas.width + 10) {
          this.x = -5;
        }

        // Twinkling animation for stars
        if (this.type === 0) {
          this.alpha = this.baseAlpha + Math.sin(time * this.twinkleSpeed) * 0.12;
          if (this.alpha < 0.05) this.alpha = 0.05;
          if (this.alpha > 0.8) this.alpha = 0.8;
        }
      }

      draw(parallaxX, parallaxY) {
        ctx.beginPath();
        // Apply mouse parallax translations
        const drawX = this.x + parallaxX * (this.type === 1 ? 1.5 : 0.5);
        const drawY = this.y + parallaxY * (this.type === 1 ? 1.5 : 0.5);

        ctx.arc(drawX, drawY, this.size, 0, Math.PI * 2);

        if (this.type === 1) {
          // Glow ember colors
          ctx.fillStyle = `rgba(255, 106, 61, ${this.alpha * 0.75})`;
        } else {
          // Soft white/silver star colors
          ctx.fillStyle = `rgba(248, 250, 252, ${this.alpha})`;
        }
        ctx.fill();
      }
    }

    const initializeParticles = () => {
      particles = [];
      const starCount = isMobile ? 30 : 80;
      const emberCount = isMobile ? 15 : 35;

      for (let i = 0; i < starCount; i++) {
        particles.push(new SpaceParticle(0)); // Stars
      }
      for (let i = 0; i < emberCount; i++) {
        particles.push(new SpaceParticle(1)); // Embers
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const animate = () => {
      if (!isTabActive) return;

      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Track scroll details for the fading nebula
      const scrollY = window.scrollY || window.pageYOffset;
      const fadeFactor = Math.max(0, 1 - scrollY / (window.innerHeight * 0.85));

      // Calculate mouse parallax offset values
      const parallaxX = mouseRef.current.active ? (mouseRef.current.x - canvas.width / 2) * 0.015 : 0;
      const parallaxY = mouseRef.current.active ? (mouseRef.current.y - canvas.height / 2) * 0.015 : 0;

      // Draw Volumetric Gas Nebula Clouds (if visible on scroll)
      if (fadeFactor > 0) {
        ctx.globalCompositeOperation = "screen";

        const width = canvas.width;
        const height = canvas.height;
        const baseRadius = Math.min(width, height);

        // Volumetric Orbs Data (Crimson, Dark Red, Orange highlights)
        const orbs = [
          // Orb 1: Deep Crimson Left
          {
            x: width * 0.2 + Math.sin(time * 0.0008) * 80 + parallaxX * 2,
            y: height * 0.3 + Math.cos(time * 0.0006) * 50 + parallaxY * 2,
            radius: baseRadius * 0.45,
            color: `rgba(50, 7, 7, ${0.45 * fadeFactor})`
          },
          // Orb 2: Dark Red Mid-Left
          {
            x: width * 0.35 + Math.cos(time * 0.0007) * 70 + parallaxX * 1.5,
            y: height * 0.25 + Math.sin(time * 0.0009) * 60 + parallaxY * 1.5,
            radius: baseRadius * 0.35,
            color: `rgba(122, 10, 10, ${0.35 * fadeFactor})`
          },
          // Orb 3: Orange highlight (under portrait)
          {
            x: width * 0.18 + Math.sin(time * 0.001) * 40 + parallaxX * 2.5,
            y: height * 0.4 + Math.cos(time * 0.0008) * 40 + parallaxY * 2.5,
            radius: baseRadius * 0.25,
            color: `rgba(255, 106, 61, ${0.08 * fadeFactor})`
          },
          // Orb 4: Soft Crimson Right boundary
          {
            x: width * 0.75 + Math.sin(time * 0.0005) * 50 + parallaxX,
            y: height * 0.15 + Math.cos(time * 0.0007) * 40 + parallaxY,
            radius: baseRadius * 0.3,
            color: `rgba(50, 7, 7, ${0.2 * fadeFactor})`
          }
        ];

        orbs.forEach((orb) => {
          const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
          grad.addColorStop(0, orb.color);
          grad.addColorStop(0.5, orb.color.replace(/[\d.]+\)$/, (m) => parseFloat(m) * 0.4 + ")"));
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        // Restore normal draw mode
        ctx.globalCompositeOperation = "source-over";
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.update();
        p.draw(parallaxX, parallaxY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Tab active management
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        animate();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animate();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
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
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#030303] pointer-events-none">
      {/* Cinematic vignette and grain overlay */}
      <div className="vignette-overlay" />
      <div className="noise-overlay" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.25]" />

      {/* Ambient background particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none" />
    </div>
  );
};

export default BackgroundEffect;
