import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Cpu } from "lucide-react";
import { skillsData } from "../constants/portfolioData";
import TiltCard from "../components/TiltCard";

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  // Helper to render Lucide icons dynamically
  const SkillIcon = ({ iconName, className }) => {
    const IconComponent = Icons[iconName];
    if (!IconComponent) return <Icons.Code className={className} />;
    return <IconComponent className={className} />;
  };

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={16} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Abilities
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
            Technical Arsenal
          </h2>
        </div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillsData.map((category, catIndex) => (
            <motion.div key={catIndex} variants={itemVariants}>
              <TiltCard className="p-8 h-full">
                <h3 className="text-xl font-space font-bold text-white mb-6 border-b border-white/5 pb-3">
                  {category.category}
                </h3>
                
                <div className="flex flex-col gap-5">
                  {category.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs font-poppins text-white/80">
                        <div className="flex items-center gap-2 font-medium">
                          <SkillIcon iconName={skill.icon} className="text-secondary w-3.5 h-3.5" />
                          <span>{skill.name}</span>
                        </div>
                        <span className="font-semibold text-white/60">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar Container */}
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
