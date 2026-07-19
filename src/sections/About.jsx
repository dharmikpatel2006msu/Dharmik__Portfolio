import React from "react";
import { motion } from "framer-motion";
import { User, Cpu, BookOpen, Heart, Award } from "lucide-react";
import { aboutData, personalInfo } from "../constants/portfolioData";
import TiltCard from "../components/TiltCard";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <User size={16} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Introduction
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
            About My Journey
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block (Journey & Objective) */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-space font-semibold text-white mb-3 flex items-center gap-2">
                <Cpu size={16} className="text-primary" />
                <span>The Story So Far</span>
              </h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed font-inter">
                {aboutData.journey}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-space font-semibold text-white mb-3 flex items-center gap-2">
                <Award size={16} className="text-accent" />
                <span>Career Objective</span>
              </h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed font-inter">
                {aboutData.objective}
              </p>
            </motion.div>

            {/* Fun Facts */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.funFacts.map((fact, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 hover:bg-white/10 transition-colors"
                >
                  <span className="text-xl leading-none">{fact.emoji}</span>
                  <span className="text-xs sm:text-sm text-white/80 font-poppins">{fact.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Block (Learning, Passion, Illustration) */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Tilt Card with learning & passion */}
            <motion.div variants={itemVariants}>
              <TiltCard className="p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-space font-semibold text-white mb-4 flex items-center gap-2">
                    <BookOpen size={16} className="text-secondary" />
                    <span>Current Focus</span>
                  </h3>
                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6 font-inter">
                    {aboutData.learning}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/5">
                  <h3 className="text-sm font-space font-semibold text-white mb-3 flex items-center gap-2">
                    <Heart size={14} className="text-red-400" />
                    <span>Passions</span>
                  </h3>
                  <p className="text-muted text-xs sm:text-sm leading-relaxed font-inter">
                    {aboutData.passion}
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* Abstract Graphic Illustration (Interactive Orbit Art) */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden h-[180px] rounded-2xl glass-panel flex items-center justify-center bg-gradient-to-tr from-primary/5 via-accent/5 to-secondary/5"
            >
              {/* Rotating glowing circles */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 rounded-full border-2 border-dashed border-primary"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute w-24 h-24 rounded-full border border-dashed border-secondary"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute w-16 h-16 rounded-full border border-accent"
                />
              </div>

              {/* Core Node */}
              <div className="relative flex flex-col items-center gap-1 z-10 text-center">
                <span className="text-xs font-mono text-secondary">CORE_OBJECTIVE</span>
                <span className="text-xl font-space font-extrabold text-white tracking-widest uppercase">
                  INNOVATION
                </span>
                <span className="text-[10px] font-mono text-white/30">LATEST_PASSION: DEVELOPMENT</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
