import React, { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { personalInfo } from "../constants/portfolioData";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "certificates", label: "Certificates" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050816]/70 backdrop-blur-xl border-b border-white/5 py-3.5 shadow-lg"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="text-white font-space font-bold text-lg sm:text-xl tracking-tight flex items-center gap-2 clickable"
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {personalInfo.name.split(" ")[0]}
          </span>
          <span className="text-white/30 font-light">.dev</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md relative">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-1.5 rounded-full text-[11px] font-medium font-poppins transition-all duration-300 clickable ${
                activeSection === item.id
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/5 z-[-1]"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Button & Socials */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white hover:scale-105 transition-all clickable"
            title="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white hover:scale-105 transition-all clickable"
            title="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          <a
            href={personalInfo.resumeUrl}
            className="flex items-center gap-2 px-4 py-2 rounded-full btn-neon text-xs font-semibold text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all clickable"
          >
            <FileText size={13} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white hover:text-secondary p-2 -mr-2 rounded-full bg-white/5 border border-white/5 transition-all clickable min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[60px] sm:top-[70px] z-40 bg-[#050816]/98 backdrop-blur-xl border-t border-white/5 lg:hidden px-6 py-8 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-lg font-space font-semibold py-2.5 transition-all duration-200 clickable min-h-[44px] ${
                    activeSection === item.id ? "text-secondary pl-3 border-l-2 border-secondary font-bold" : "text-white/50"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-6 pt-6 border-t border-white/5 mb-16"
            >
              <div className="flex items-center gap-6 justify-center">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-sm flex items-center gap-2 clickable min-h-[44px]"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-sm flex items-center gap-2 clickable min-h-[44px]"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
              <a
                href={personalInfo.resumeUrl}
                className="w-full py-3.5 rounded-xl btn-neon text-center text-sm font-bold text-white shadow-lg clickable min-h-[48px] flex items-center justify-center"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
