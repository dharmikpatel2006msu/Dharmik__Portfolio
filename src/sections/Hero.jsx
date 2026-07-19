import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Twitter, Mail, ArrowDown, ChevronRight } from "lucide-react";
import { personalInfo } from "../constants/portfolioData";
import portraitImg from "../assets/portrait.jpg";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseX = useSpring(useMotionValue(0), { damping: 45, stiffness: 350 });
  const mouseY = useSpring(useMotionValue(0), { damping: 45, stiffness: 350 });

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  // Parallax transformations
  const rotateX = useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [-12, 12]);

  const slice1X = useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [-15, 15]);
  const slice1Y = useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [-15, 15]);

  const slice2X = useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [-8, 8]);
  const slice2Y = useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [-8, 8]);

  const slice3X = useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [10, -10]);
  const slice3Y = useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [10, -10]);

  const slice4X = useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [18, -18]);
  const slice4Y = useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [18, -18]);

  const mainCardX = useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [4, -4]);
  const mainCardY = useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [4, -4]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Grayscale Magazine-Style Portrait Collage */}
        <div className="lg:col-span-5 relative w-full h-[360px] xs:h-[420px] sm:h-[480px] flex justify-center items-center z-10 perspective(1000px)">
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative w-full max-w-[260px] xs:max-w-[310px] sm:max-w-[360px] h-[320px] xs:h-[380px] sm:h-[420px] flex items-center justify-center transform-style-preserve-3d"
          >
            {/* Soft Ambient Silver Halo Glow */}
            <div className="absolute w-[240px] h-[240px] rounded-full blur-[80px] opacity-15 mix-blend-screen pointer-events-none bg-gradient-to-tr from-white/20 via-white/5 to-transparent" />

            {/* SLICE 1: Grayscale Left background slice */}
            <motion.div
              style={{ x: slice1X, y: slice1Y, translateZ: -45 }}
              className="absolute left-[2%] top-[12%] w-[22%] h-[55%] rounded-xl border border-white/5 overflow-hidden shadow-lg opacity-40 z-1"
            >
              <img
                src={portraitImg}
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 object-left-top scale-110"
                alt="portrait slice left"
              />
            </motion.div>

            {/* SLICE 2: Grayscale Top-Middle background slice */}
            <motion.div
              style={{ x: slice2X, y: slice2Y, translateZ: -25 }}
              className="absolute left-[28%] top-[2%] w-[24%] h-[40%] rounded-xl border border-white/5 overflow-hidden shadow-lg opacity-35 z-1"
            >
              <img
                src={portraitImg}
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 object-center-top scale-125"
                alt="portrait slice top"
              />
            </motion.div>

            {/* SLICE 3: Grayscale Bottom-Middle background slice */}
            <motion.div
              style={{ x: slice3X, y: slice3Y, translateZ: -10 }}
              className="absolute left-[26%] top-[46%] w-[28%] h-[46%] rounded-xl border border-white/5 overflow-hidden shadow-lg opacity-45 z-2"
            >
              <img
                src={portraitImg}
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 object-center-bottom scale-115"
                alt="portrait slice bottom"
              />
            </motion.div>

            {/* SLICE 4: Grayscale Right background slice */}
            <motion.div
              style={{ x: slice4X, y: slice4Y, translateZ: -30 }}
              className="absolute right-[2%] top-[15%] w-[20%] h-[58%] rounded-xl border border-white/5 overflow-hidden shadow-lg opacity-30 z-1"
            >
              <img
                src={portraitImg}
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 object-right-bottom scale-125"
                alt="portrait slice right"
              />
            </motion.div>

            {/* MAIN PORTRAIT CARD PANEL */}
            <motion.div
              style={{ x: mainCardX, y: mainCardY, translateZ: 35 }}
              className="absolute left-[16%] top-[10%] w-[58%] h-[78%] rounded-2xl border-2 border-white/10 overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.65)] hover:border-white/20 transition-all duration-300 z-10 group"
            >
              <img
                src={portraitImg}
                className="w-full h-full object-cover grayscale contrast-110 brightness-95 group-hover:scale-102 transition-transform duration-500"
                alt="Dharmik Patel Portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030307]/90 via-[#030307]/10 to-transparent opacity-80 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] font-space font-extrabold text-white leading-none block">
                    Dharmik Patel
                  </span>
                  <span className="text-[8px] font-mono text-white/40 block mt-0.5">
                    MSU Baroda
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* RIGHT COLUMN: Info / Text details */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left z-10 w-full overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Tag */}
          <motion.div
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold font-space tracking-wider uppercase mb-6 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            <span>Computer Science Engineer</span>
          </motion.div>

          {/* Header Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-space font-extrabold tracking-tight mb-4 leading-[1.1] text-white w-full"
          >
            Hi, I'm{" "}
            {/* Premium, low-saturation blue-cyan-purple gradient */}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Subtitle typing */}
          <motion.div
            variants={itemVariants}
            className="h-12 text-base sm:text-lg md:text-xl lg:text-2xl font-poppins font-medium text-white/80 mb-6 flex items-center w-full justify-center lg:justify-start"
          >
            <span className="mr-2">I build</span>
            <TypeAnimation
              sequence={[
                "scalable software backend setups.",
                1500,
                "dynamic React user interfaces.",
                1500,
                "secure database models.",
                1500,
                "creative interactive architectures.",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-white font-bold"
            />
          </motion.div>

          {/* Description text */}
          <motion.p
            variants={itemVariants}
            className="text-[#CBD5E1] text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-8 font-inter"
          >
            {personalInfo.description}
          </motion.p>

          {/* Obsidian & Glass buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mb-8 justify-center lg:justify-start"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full btn-neon text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all clickable min-h-[48px]"
            >
              <span>Explore Projects</span>
              <ChevronRight size={15} />
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full btn-glass text-xs sm:text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all clickable min-h-[48px]"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-5 w-full lg:w-auto">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/3 border border-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all clickable min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/3 border border-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all clickable min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={personalInfo.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/3 border border-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all clickable min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Twitter size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 rounded-full bg-white/3 border border-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all clickable min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </motion.div>

      </div>

      {/* Down Scroll Indicator */}
      <motion.button
        onClick={() => handleScrollTo("about")}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 hover:text-white transition-colors flex flex-col items-center gap-1.5 clickable"
      >
        <span className="text-[9px] font-space uppercase tracking-widest font-medium">Scroll Down</span>
        <ArrowDown size={13} />
      </motion.button>
    </section>
  );
};

export default Hero;
