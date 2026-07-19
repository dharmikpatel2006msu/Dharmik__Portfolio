import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { blogsData } from "../constants/portfolioData";
import TiltCard from "../components/TiltCard";

const Blogs = () => {
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
    <section id="blogs" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={16} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Publications
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
            Technical Writing
          </h2>
        </div>

        {/* Blogs Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogsData.map((blog, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <TiltCard className="h-full flex flex-col justify-between p-6 hover:border-white/12 transition-all group">
                <div className="text-left">
                  {/* Date / Read Time */}
                  <div className="flex items-center gap-4 text-[10px] font-mono text-secondary mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-lg font-space font-bold text-white mb-3 leading-snug group-hover:text-secondary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed font-inter line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Footer Action link */}
                <div className="border-t border-white/5 pt-4 mt-6 flex justify-start">
                  <a
                    href={blog.link}
                    className="inline-flex items-center gap-1 text-xs font-semibold font-space text-secondary hover:text-white transition-colors clickable"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs;
