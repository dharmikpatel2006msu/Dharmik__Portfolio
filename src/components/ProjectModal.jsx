import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Cpu, AlertTriangle, Lightbulb, Code } from "lucide-react";

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  // Background overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Modal box scale/fade animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", duration: 0.5, bounce: 0.1 },
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            className="absolute inset-0 bg-[#050816]/80 backdrop-blur-md"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-4xl h-[85vh] md:h-[80vh] bg-[#0c0f24] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 glass-panel"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all z-20 clickable"
            >
              <X size={18} />
            </button>

            {/* Scrollable Content wrapper */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              
              {/* Header Info */}
              <div className="mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary font-space tracking-wider uppercase">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-4xl font-space font-bold text-white mt-3">
                  {project.title}
                </h3>
              </div>

              {/* Main Image Banner */}
              <div className="relative w-full h-[220px] md:h-[350px] rounded-xl overflow-hidden mb-8 border border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f24] to-transparent opacity-60" />
              </div>

              {/* Grid content info */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Side: About, Features */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div>
                    <h4 className="text-md font-space font-bold text-white mb-2">Description</h4>
                    <p className="text-muted text-sm sm:text-base leading-relaxed font-inter">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-md font-space font-bold text-white mb-3">Key Features</h4>
                    <ul className="flex flex-col gap-2.5">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 font-poppins">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-sm font-space font-bold text-white mb-2 flex items-center gap-2">
                      <Cpu size={14} className="text-primary" />
                      <span>Architecture Detail</span>
                    </h4>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed font-inter">
                      {project.architecture}
                    </p>
                  </div>
                </div>

                {/* Right Side: Challenges, Learnings, Tech stack */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  
                  {/* Tech stack */}
                  <div>
                    <h4 className="text-md font-space font-bold text-white mb-3 flex items-center gap-2">
                      <Code size={14} className="text-secondary" />
                      <span>Technologies Used</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-white/70 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                    <h4 className="text-xs sm:text-sm font-space font-bold text-yellow-400 mb-1.5 flex items-center gap-2">
                      <AlertTriangle size={14} />
                      <span>Technical Challenge</span>
                    </h4>
                    <p className="text-muted text-xs leading-relaxed font-inter">
                      {project.challenges}
                    </p>
                  </div>

                  {/* Learnings */}
                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                    <h4 className="text-xs sm:text-sm font-space font-bold text-green-400 mb-1.5 flex items-center gap-2">
                      <Lightbulb size={14} />
                      <span>Key Learnings</span>
                    </h4>
                    <p className="text-muted text-xs leading-relaxed font-inter">
                      {project.learnings}
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Bottom Actions footer */}
            <div className="p-4 border-t border-white/5 flex justify-end items-center gap-4 bg-white/[0.01]">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-2 clickable"
              >
                <Github size={14} />
                <span>Source Code</span>
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-xs sm:text-sm font-semibold text-white hover:shadow-primary/10 transition-all flex items-center gap-2 clickable"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
