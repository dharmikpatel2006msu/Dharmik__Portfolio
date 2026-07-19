import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";

// Core Components
import CustomCursor from "./components/CustomCursor";
import BackgroundEffect from "./components/BackgroundEffect";
import NoiseOverlay from "./components/NoiseOverlay";
import ScrollProgressBar from "./components/ScrollProgressBar";

// Sections
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import CodingProfiles from "./sections/CodingProfiles";
import GitHubSection from "./sections/GitHubSection";
import Certificates from "./sections/Certificates";
import Achievements from "./sections/Achievements";
import Testimonials from "./sections/Testimonials";
import Blogs from "./sections/Blogs";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Simulated Page Loader Progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15 + 5);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Premium Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[999999] bg-[#050816] flex flex-col justify-center items-center font-space"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            {/* Dynamic visual loader elements */}
            <div className="relative flex flex-col items-center gap-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-extrabold tracking-widest text-gradient-neon"
              >
                DHARMIK
              </motion.div>
              
              {/* Spinning progress loader ring */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-t-secondary border-r-transparent border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                <span className="text-xs font-mono font-semibold text-white/80">
                  {progress}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout and Site Elements */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen"
        >
          {/* Global overlays & animations */}
          <CustomCursor />
          <BackgroundEffect />
          <NoiseOverlay />
          <ScrollProgressBar />

          {/* Site Sections */}
          <Navbar />
          
          <main className="relative z-10 w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            
            {/* Intersecting timelining items */}
            <Experience />
            <Education />
            
            {/* Developer dashboards */}
            <CodingProfiles />
            <GitHubSection />
            
            {/* Social validations */}
            <Certificates />
            <Achievements />
            <Testimonials />
            <Blogs />
            
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
