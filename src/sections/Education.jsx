import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { educationData } from "../constants/portfolioData";

const Education = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="education" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap size={18} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Academics
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
            Education Timeline
          </h2>
        </div>

        {/* Timeline container */}
        <motion.div
          className="relative border-l border-white/10 pl-6 sm:pl-8 ml-2 flex flex-col gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative flex flex-col items-start text-left group"
            >
              {/* Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#050816] border-2 border-accent group-hover:border-secondary transition-colors duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-secondary transition-colors" />
              </div>

              {/* Card content */}
              <div className="w-full glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden hover:border-white/15 transition-all">
                {/* Year tag */}
                <div className="flex items-center gap-2 text-xs font-mono text-secondary mb-3">
                  <Calendar size={12} />
                  <span>{edu.duration}</span>
                </div>

                {/* Institution name */}
                <h3 className="text-xl sm:text-2xl font-space font-bold text-white mb-1 group-hover:text-accent transition-colors">
                  {edu.institution}
                </h3>
                <span className="text-sm font-semibold font-poppins text-white/60 block mb-4">
                  {edu.degree}
                </span>

                {/* Grade display tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-secondary mb-4">
                  <Award size={12} />
                  <span>Grade / GPA: <strong>{edu.cgpa}</strong></span>
                </div>

                {/* Extra course details */}
                <p className="text-muted text-xs sm:text-sm font-inter leading-relaxed">
                  {edu.details}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
