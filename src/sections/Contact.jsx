import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { personalInfo } from "../constants/portfolioData";
import { motion } from "framer-motion";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Mail size={16} className="text-secondary" />
            <span className="text-xs font-semibold font-space tracking-wider uppercase text-secondary">
              Connect
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tight text-gradient-primary">
            Get In Touch
          </h2>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Info Block */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-2xl text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-space font-bold text-white mb-4">
                Let's discuss a project!
              </h3>
              <p className="text-muted text-xs sm:text-sm leading-relaxed mb-8 font-inter">
                Whether you have a question, want to collaborate on open-source solutions, or are looking to hire a software engineer intern, my inbox is open.
              </p>

              <div className="flex flex-col gap-6">
                {/* Email link */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-secondary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase">Email Me</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs sm:text-sm font-poppins font-medium text-white hover:text-secondary block transition-colors clickable min-h-[36px] flex items-center"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-secondary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase">Location</span>
                    <span className="text-xs sm:text-sm font-poppins font-medium text-white block">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 mt-8 text-[10px] font-mono text-white/30">
              timezone: IST (UTC+5:30) • active hours: 9:00 AM - 10:00 PM
            </div>
          </div>

          {/* Validated Inputs Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl text-left">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <CheckCircle2 size={52} className="text-green-400 mb-4 animate-bounce" />
                <h3 className="text-xl sm:text-2xl font-space font-bold text-white mb-2">Message Dispatched!</h3>
                <p className="text-muted text-xs sm:text-sm max-w-sm font-inter">
                  Thank you. I have received your email payload and will respond as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                
                {/* Row 1: Name / Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-white/50 uppercase">Your Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      {...register("name", { required: "Name is required" })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary focus:bg-white/[0.08] transition-all clickable min-h-[48px]"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-400 font-mono mt-0.5">{errors.name.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-white/50 uppercase">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary focus:bg-white/[0.08] transition-all clickable min-h-[48px]"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 font-mono mt-0.5">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-white/50 uppercase">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    {...register("subject", { required: "Subject is required" })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary focus:bg-white/[0.08] transition-all clickable min-h-[48px]"
                  />
                  {errors.subject && (
                    <span className="text-[10px] text-red-400 font-mono mt-0.5">{errors.subject.message}</span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-white/50 uppercase">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Describe your goals..."
                    {...register("message", {
                      required: "Message is required",
                      minLength: { value: 10, message: "Min 10 characters required" },
                    })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-secondary focus:bg-white/[0.08] transition-all resize-none clickable min-h-[120px]"
                  />
                  {errors.message && (
                    <span className="text-[10px] text-red-400 font-mono mt-0.5">{errors.message.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-xs sm:text-sm font-bold text-white shadow-lg flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 transition-all clickable min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Transmitting Payload...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
