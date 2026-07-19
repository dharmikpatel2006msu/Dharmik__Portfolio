import React from "react";
import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";
import { personalInfo } from "../constants/portfolioData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <footer className="relative border-t border-white/5 bg-[#050816] px-6 py-12 overflow-hidden">
      
      {/* Decorative Aurora Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] rounded-full bg-primary aurora-orb opacity-10" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left: Brand info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            onClick={scrollToTop}
            className="text-white font-space font-extrabold text-lg tracking-tight mb-2 clickable"
          >
            {personalInfo.name.split(" ")[0]}
            <span className="text-secondary font-medium">.dev</span>
          </button>
          <p className="text-white/40 text-xs font-poppins">
            Designed & Engineered with premium standards.
          </p>
        </div>

        {/* Mid: Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-md">
          {["home", "about", "skills", "projects", "experience", "education", "contact"].map((link) => (
            <button
              key={link}
              onClick={() => handleScrollTo(link)}
              className="text-xs font-poppins font-medium text-white/50 hover:text-white capitalize transition-colors clickable"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right: Socials & Back to Top */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors clickable"
            >
              <Github size={16} />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors clickable"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={personalInfo.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors clickable"
            >
              <Twitter size={16} />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all clickable"
            title="Scroll to Top"
            aria-label="Back to Top"
          >
            <ArrowUp size={16} className="animate-bounce" />
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 border-t border-white/5 pt-8 text-center text-[10px] font-mono text-white/30 relative z-10">
        © {currentYear} {personalInfo.name}. All rights reserved. Built with React + Vite + TailwindCSS.
      </div>
    </footer>
  );
};

export default Footer;
