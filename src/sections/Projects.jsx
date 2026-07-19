import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { projectsData } from "../constants/portfolioData";
import TiltCard from "../components/TiltCard";
import ProjectModal from "../components/ProjectModal";

const FILTERS = ["All", "React", "Python", "AI", "Web"];

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects by category/tech matching
  const filteredProjects = projectsData.filter((project) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "React") return project.techStack.includes("React");
    if (selectedFilter === "Python") return project.techStack.includes("Python");
    if (selectedFilter === "AI") return project.category === "AI";
    if (selectedFilter === "Web") return project.category === "Web";
    return true;
  });

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <FolderGit2 size={16} className="text-secondary" />
              <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
                Portfolio
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
              Featured Projects
            </h2>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-md self-start md:self-auto">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold font-poppins transition-all duration-300 clickable ${
                  selectedFilter === filter
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                onClick={() => openProjectDetails(project)}
                className="group cursor-none h-full"
              >
                <TiltCard className="h-full flex flex-col justify-between p-0">
                  <div>
                    {/* Project Image Panel */}
                    <div className="relative w-full h-[200px] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-[#050816]/30 group-hover:bg-[#050816]/10 transition-colors duration-300" />
                      
                      {/* Floating Category Tag */}
                      <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#050816]/80 backdrop-blur-md text-[10px] font-mono text-white border border-white/10 uppercase">
                        {project.category}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-space font-bold text-white mb-2 flex items-center justify-between group-hover:text-secondary transition-colors">
                        <span>{project.title}</span>
                        <ArrowUpRight size={18} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </h3>
                      <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6 font-inter line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions / Tech Stack Summary */}
                  <div className="px-6 pb-6 mt-auto">
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[9px] font-mono text-white/40 pt-1">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="text-[11px] font-space font-semibold uppercase tracking-wider text-secondary hover:text-white transition-colors">
                        Case Study
                      </span>
                      <div className="flex items-center gap-3">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} // Stop modal activation
                          className="text-white/60 hover:text-white transition-colors clickable"
                          title="GitHub Source"
                        >
                          <Github size={16} />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-white/60 hover:text-white transition-colors clickable"
                          title="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
