import React from "react";
import { motion } from "framer-motion";
import { Quote, MessageSquare } from "lucide-react";
import { testimonialsData } from "../constants/portfolioData";

const Testimonials = () => {
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
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={16} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Endorsements
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
            Recommendations
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonialsData.map((test, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-white/12 transition-all relative overflow-hidden text-left"
            >
              {/* Giant Decorative Quote Mark */}
              <Quote className="absolute top-6 right-6 text-white/[0.02] w-24 h-24 pointer-events-none" />

              <div>
                {/* Quote Text */}
                <p className="text-white/80 text-sm sm:text-base leading-relaxed font-poppins italic mb-8 relative z-10">
                  "{test.text}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-6 relative z-10">
                <img
                  src={test.image}
                  alt={test.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-space font-bold text-white leading-snug">
                    {test.name}
                  </h4>
                  <span className="text-[11px] font-poppins font-medium text-white/40">
                    {test.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
