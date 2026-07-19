import React from "react";
import { motion } from "framer-motion";
import { Award, Zap, Trophy, Heart } from "lucide-react";
import { achievementsData } from "../constants/portfolioData";

const Achievements = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 85, damping: 15 },
    },
  };

  // Helper to pick category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Hackathons":
        return <Zap size={18} className="text-secondary" />;
      case "Coding Contests":
        return <Trophy size={18} className="text-primary" />;
      case "Leadership":
        return <Heart size={18} className="text-accent" />;
      default:
        return <Award size={18} className="text-white" />;
    }
  };

  return (
    <section id="achievements" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={18} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Milestones
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
            Achievements & Awards
          </h2>
        </div>

        {/* Achievements Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {achievementsData.map((ach, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:border-white/12 transition-all relative overflow-hidden group"
            >
              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                    {getCategoryIcon(ach.category)}
                  </div>
                  <span className="px-2.5 py-1 rounded bg-white/5 text-[10px] font-mono text-white/50 uppercase tracking-widest">
                    {ach.category}
                  </span>
                </div>

                {/* Info Text */}
                <h3 className="text-lg sm:text-xl font-space font-bold text-white mb-2 leading-snug group-hover:text-secondary transition-colors">
                  {ach.title}
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed font-inter mb-4">
                  {ach.description}
                </p>
              </div>

              {/* Date Footer */}
              <div className="border-t border-white/5 pt-4 text-[10px] font-mono text-white/35">
                Achieved: {ach.date}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
