import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";

// Core Components
import CustomCursor from "./components/CustomCursor";
import BackgroundEffect from "./components/BackgroundEffect";
import NoiseOverlay from "./components/NoiseOverlay";
import ScrollProgressBar from "./components/ScrollProgressBar";
import LoadingScreen from "./components/LoadingScreen";

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

    // Disable scroll while loading is active
    if (loading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {/* Premium Boot Loader Screen */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Layout and Site Elements (Rendered underneath, fades & unblurs once loaded) */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ 
          opacity: loading ? 0.2 : 1, 
          filter: loading ? "blur(6px)" : "blur(0px)" 
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`relative min-h-screen ${loading ? "pointer-events-none select-none" : ""}`}
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
    </>
  );
}

export default App;
