import React from "react";
import { motion } from "framer-motion";
import { Terminal, Award, HelpCircle, ExternalLink } from "lucide-react";
import { codingProfiles } from "../constants/portfolioData";
import TiltCard from "../components/TiltCard";

const CodingProfiles = () => {
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

  return (
    <section id="coding-profiles" className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={16} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Algorithms
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-space font-bold tracking-tight text-gradient-primary">
            Coding Profiles
          </h2>
        </div>

        {/* Profiles Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {codingProfiles.map((profile, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <TiltCard className="h-full p-6 flex flex-col justify-between hover:border-white/12 transition-all relative group">
                <div>
                  {/* Top: Brand Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-md font-space font-extrabold text-white">
                      {profile.platform}
                    </span>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white transition-colors clickable"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Mid: Stats display */}
                  <div className="flex flex-col gap-4 mb-6">
                    {/* Rating */}
                    <div>
                      <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider block">
                        Rating / Standing
                      </span>
                      <span className={`text-xl font-space font-bold bg-gradient-to-r ${profile.color} bg-clip-text text-transparent`}>
                        {profile.rating}
                      </span>
                    </div>

                    {/* Problems Solved */}
                    <div>
                      <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider block">
                        Problems Solved
                      </span>
                      <span className="text-base font-semibold font-poppins text-white/80">
                        {profile.solved}
                      </span>
                    </div>

                    {/* Badges */}
                    <div>
                      <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider block">
                        Highest Badge
                      </span>
                      <span className="text-xs font-medium font-poppins text-white/60">
                        {profile.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card footer decorative gradient stripe */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${profile.color}`} />
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfiles;
