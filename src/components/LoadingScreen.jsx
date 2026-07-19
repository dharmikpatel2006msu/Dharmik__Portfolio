import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [ripples, setRipples] = useState([]);
  const lastThresholdRef = useRef(0);
  const canvasRef = useRef(null);

  // 1. Continuous progress interpolation (2.8 seconds total boot sequence)
  useEffect(() => {
    const duration = 2800; // total duration
    const intervalTime = 30; // update frequency
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step + Math.random() * 0.45, 100);
        if (next >= 100) {
          clearInterval(timer);
          // Wait 600ms at 100% for the light sweep and ripple before dissolving
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // 2. Ripple trigger mechanism every 25% progress
  useEffect(() => {
    const currentThreshold = Math.floor(progress / 25) * 25;
    if (currentThreshold > 0 && currentThreshold > lastThresholdRef.current) {
      lastThresholdRef.current = currentThreshold;
      
      const newRipple = {
        id: Date.now() + Math.random(),
        scale: 1,
      };
      setRipples((prev) => [...prev, newRipple]);

      // Automatically clean up ripple object
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    }
  }, [progress]);

  // 3. Lightweight, optimized background space canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame;
    let stars = [];
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 30 : 70;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    };

    const initializeStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 0.7 + 0.3,
          alpha: Math.random() * 0.4 + 0.1,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          offset: Math.random() * 100,
          driftY: (Math.random() - 0.5) * 0.04
        });
      }
    };

    window.addEventListener("resize", resize);
    resize();

    let time = 0;
    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint stars
      stars.forEach((star) => {
        star.y += star.driftY;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        const alpha = star.alpha + Math.sin(time * star.twinkleSpeed + star.offset) * 0.1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${Math.max(0.05, Math.min(alpha, 0.7))})`;
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // 4. SVG Progress Ring Geometry
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Calculate orbiting spark coordinates using trigonometry (offset by -90deg for vertical top start)
  const angle = (progress / 100) * 360 * (Math.PI / 180) - Math.PI / 2;
  const orbitX = 50 + Math.cos(angle) * radius;
  const orbitY = 50 + Math.sin(angle) * radius;

  // Determine dynamic message string
  const getStatusMessage = () => {
    if (progress < 25) return "Preparing Experience...";
    if (progress < 50) return "Loading Portfolio...";
    if (progress < 75) return "Initializing Components...";
    return "Almost Ready...";
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ 
        opacity: 0, 
        scale: 1.05, 
        filter: "blur(8px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[999999] bg-[#030303] flex flex-col justify-center items-center overflow-hidden"
    >
      <style>{`
        .loading-shimmer-text {
          background: linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 30%, #60A5FA 50%, #FFFFFF 70%, #F8FAFC 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: loadingShimmer 6s linear infinite;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
        }
        @keyframes loadingShimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {/* Floating Canvas Stars background */}
      <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none" />

      {/* Edge vignette shadow mask */}
      <div className="vignette-overlay" />
      <div className="noise-overlay" />

      {/* Main content loader stack */}
      <div className="relative flex flex-col items-center gap-8 z-10 select-none">
        
        {/* DHARMIK logo header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-extrabold tracking-[0.25em] font-space loading-shimmer-text"
        >
          DHARMIK
        </motion.div>

        {/* Circular Ring Loader Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative w-28 h-28 flex items-center justify-center"
        >
          {/* Active expands ripples */}
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="absolute w-20 h-20 rounded-full border border-[#60A5FA]/25 pointer-events-none"
            />
          ))}

          {/* Orbit rotating dots border */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <svg width="112" height="112" viewBox="0 0 100 100" className="absolute">
              <circle cx="50" cy="50" r="46" stroke="rgba(248, 250, 252, 0.04)" strokeWidth="1" strokeDasharray="2 6" fill="none" />
            </svg>
          </motion.div>

          {/* SVG ring elements */}
          <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Outer static ring */}
            <circle cx="50" cy="50" r="38" stroke="rgba(248, 250, 252, 0.03)" strokeWidth="1" fill="none" />
            
            {/* Inner static ring */}
            <circle cx="50" cy="50" r="32" stroke="rgba(248, 250, 252, 0.02)" strokeWidth="1" fill="none" />

            {/* Active progress ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="url(#loadingProgressGradient)"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50px 50px",
                transition: "stroke-dashoffset 0.08s linear",
                filter: "drop-shadow(0 0 3px rgba(96, 165, 250, 0.3))"
              }}
            />

            {/* Trignometric orbit cursor spark */}
            <circle
              cx={orbitX}
              cy={orbitY}
              r="2.5"
              fill="#F8FAFC"
              style={{
                filter: "drop-shadow(0 0 4px #60A5FA)",
                transition: "cx 0.08s linear, cy 0.08s linear"
              }}
            />

            <defs>
              <linearGradient id="loadingProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#A3C2F7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage text centered inside */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#CBD5E1] tracking-tighter">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>

        {/* Dynamically Fading Status Messages */}
        <div className="h-6 overflow-hidden flex justify-center items-center min-w-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={getStatusMessage()}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-[10px] sm:text-xs font-mono text-[#94A3B8] tracking-wider text-center"
            >
              {getStatusMessage()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};

export default LoadingScreen;
