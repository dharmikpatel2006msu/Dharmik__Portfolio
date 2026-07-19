import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { certificatesData } from "../constants/portfolioData";
import TiltCard from "../components/TiltCard";

const Certificates = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
    <section id="certificates" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Award size={18} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Credentials
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
            Licenses & Certifications
          </h2>
        </div>

        {/* Certificates Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {certificatesData.map((cert, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <TiltCard className="h-full flex flex-col justify-between p-0">
                <div>
                  {/* Certificate preview */}
                  <div className="relative w-full h-[160px] overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                  </div>

                  {/* Body details */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-secondary mb-2">
                      <Calendar size={10} />
                      <span>Issued {cert.date}</span>
                    </div>
                    <h3 className="text-md sm:text-lg font-space font-bold text-white leading-snug mb-1">
                      {cert.title}
                    </h3>
                    <span className="text-xs font-poppins font-medium text-white/50">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                {/* Footer URL link */}
                <div className="px-6 pb-6 pt-2">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold font-space text-secondary hover:text-white transition-colors clickable"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={12} />
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

export default Certificates;
