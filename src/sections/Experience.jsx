import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Award } from "lucide-react";
import { experienceData } from "../constants/portfolioData";

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={16} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Career
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
            Work Experience
          </h2>
        </div>

        {/* Vertical Timeline container */}
        <motion.div
          className="relative border-l border-white/10 pl-6 sm:pl-8 ml-2 flex flex-col gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative flex flex-col items-start text-left group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#050816] border-2 border-primary group-hover:border-secondary transition-colors duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-secondary transition-colors" />
              </div>

              {/* Card Container */}
              <div className="w-full glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden hover:border-white/15 transition-all">
                {/* Duration */}
                <div className="flex items-center gap-2 text-xs font-mono text-secondary mb-3">
                  <Calendar size={12} />
                  <span>{exp.duration}</span>
                </div>

                {/* Role / Company */}
                <h3 className="text-xl sm:text-2xl font-space font-bold text-white mb-1">
                  {exp.role}
                </h3>
                <span className="text-sm font-semibold font-poppins text-white/50 block mb-6">
                  {exp.company}
                </span>

                {/* Responsibilities list */}
                <ul className="flex flex-col gap-3 mb-6">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 font-inter leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Special Achievement tag */}
                {exp.achievements && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-2.5">
                    <Award size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-semibold font-space text-accent uppercase tracking-wider block mb-1">
                        Key Accomplishment
                      </span>
                      <p className="text-white/70 text-xs font-poppins leading-relaxed">
                        {exp.achievements}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
