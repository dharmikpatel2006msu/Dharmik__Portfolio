import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Flame, Code, BookMarked, BarChart3 } from "lucide-react";
import { personalInfo } from "../constants/portfolioData";

// Generates simulated git commit grid data (53 weeks * 7 days)
const generateCommitData = () => {
  const data = [];
  const levels = [0, 0, 0, 1, 1, 2, 2, 3, 4]; // weights for colors
  for (let i = 0; i < 371; i++) {
    data.push(levels[Math.floor(Math.random() * levels.length)]);
  }
  return data;
};

const GitHubSection = () => {
  const [commits, setCommits] = useState([]);
  const [hoveredCommit, setHoveredCommit] = useState(null);

  useEffect(() => {
    setCommits(generateCommitData());
  }, []);

  const getCommitColor = (level) => {
    switch (level) {
      case 0:
        return "bg-white/5";
      case 1:
        return "bg-emerald-950/80";
      case 2:
        return "bg-emerald-800/80";
      case 3:
        return "bg-emerald-600/90";
      case 4:
        return "bg-emerald-400";
      default:
        return "bg-white/5";
    }
  };

  const getCommitCount = (level) => {
    switch (level) {
      case 0: return "No commits";
      case 1: return "1-2 commits";
      case 2: return "3-4 commits";
      case 3: return "5-6 commits";
      case 4: return "8+ commits";
      default: return "";
    }
  };

  return (
    <section id="github" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Github size={18} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Activity
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
            GitHub Contributions
          </h2>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left: Interactive Contribution Graph */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-space font-bold text-white flex items-center gap-2">
                  <Flame size={16} className="text-orange-500 animate-pulse" />
                  <span>Contribution History</span>
                </span>
                <span className="text-[10px] font-mono text-white/40">1,248 commits in the past year</span>
              </div>

              {/* Grid Box */}
              <div className="relative overflow-x-auto pb-4">
                <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[640px]">
                  {commits.map((level, i) => (
                    <div
                      key={i}
                      className={`w-[10px] h-[10px] rounded-[1.5px] transition-colors duration-200 cursor-crosshair ${getCommitColor(
                        level
                      )}`}
                      onMouseEnter={() => setHoveredCommit({ index: i, level })}
                      onMouseLeave={() => setHoveredCommit(null)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Color keys legend */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[10px] font-mono text-white/50">
              <div>
                {hoveredCommit !== null ? (
                  <span className="text-secondary font-semibold">
                    {getCommitCount(hoveredCommit.level)} on day {hoveredCommit.index + 1}
                  </span>
                ) : (
                  <span>Hover over squares for details</span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-[1px] bg-white/5" />
                <span className="w-2.5 h-2.5 rounded-[1px] bg-emerald-950/80" />
                <span className="w-2.5 h-2.5 rounded-[1px] bg-emerald-800/80" />
                <span className="w-2.5 h-2.5 rounded-[1px] bg-emerald-600/90" />
                <span className="w-2.5 h-2.5 rounded-[1px] bg-emerald-400" />
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Metrics Stats */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            
            {/* Stat Box 1 */}
            <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                  Overall Rank
                </span>
                <span className="text-2xl font-space font-extrabold text-white">
                  A+ (Top 1.5%)
                </span>
                <span className="text-[10px] font-mono text-secondary block mt-1">GitHub Profile Grade</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 text-secondary">
                <BarChart3 size={20} />
              </div>
            </div>

            {/* Stat Box 2 */}
            <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                  Language Mix
                </span>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs text-white/70">C++</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-xs text-white/70">JS</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-xs text-white/70">SQL</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 text-primary">
                <Code size={20} />
              </div>
            </div>

          </div>
        </div>

        {/* Pinned Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-xl flex flex-col justify-between text-left group hover:border-white/12 transition-all">
            <div>
              <div className="flex items-center gap-2 text-white font-space font-bold mb-3">
                <BookMarked size={16} className="text-secondary" />
                <a href="https://github.com/dharmikpatel2006msu/CampusConnect" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  CampusConnect
                </a>
              </div>
              <p className="text-muted text-xs leading-relaxed font-inter mb-6">
                Interactive student portal platform supporting group communication threads and Supabase access policies.
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span>JavaScript</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Star size={12} /> 12</span>
                <span className="flex items-center gap-1"><GitFork size={12} /> 5</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-xl flex flex-col justify-between text-left group hover:border-white/12 transition-all">
            <div>
              <div className="flex items-center gap-2 text-white font-space font-bold mb-3">
                <BookMarked size={16} className="text-secondary" />
                <a href="https://github.com/dharmikpatel2006msu/AI-Attendance" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  AI-Attendance
                </a>
              </div>
              <p className="text-muted text-xs leading-relaxed font-inter mb-6">
                Automatic facial attendance tracking pipeline using Python OpenCV and face recognition models.
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Python</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Star size={12} /> 24</span>
                <span className="flex items-center gap-1"><GitFork size={12} /> 8</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-xl flex flex-col justify-between text-left group hover:border-white/12 transition-all">
            <div>
              <div className="flex items-center gap-2 text-white font-space font-bold mb-3">
                <BookMarked size={16} className="text-secondary" />
                <a href="https://github.com/dharmikpatel2006msu/FinVue-Tracker" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  FinVue-Tracker
                </a>
              </div>
              <p className="text-muted text-xs leading-relaxed font-inter mb-6">
                Personal finance budget planner utilizing localized index calculations and chart animations.
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>TypeScript</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Star size={12} /> 18</span>
                <span className="flex items-center gap-1"><GitFork size={12} /> 3</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GitHubSection;
