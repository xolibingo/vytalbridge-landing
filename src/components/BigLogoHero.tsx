import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Stethoscope, Baby, Shield, ArrowDown, Users, Phone, Zap } from "lucide-react";
import InteractiveLogo from "./InteractiveLogo";

export default function BigLogoHero() {
  const scrollToMainContent = () => {
    const target = document.getElementById("main-content-anchor");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-[#FAF9F6] border-b border-brand-border px-4 py-12 md:py-20" id="big-logo-entrance-hero">
      
      {/* Immersive artistic glowing backdrops utilizing light shades of translucent pink and teal */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-pink/20 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-brand-light-pink/40 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 rounded-full filter blur-[140px] pointer-events-none" />

      {/* Floating Creative Motion Icons in the margins */}
      
      {/* Sparkle 1 */}
      <motion.div
        className="absolute top-[15%] left-[10%] md:left-[15%] p-3 bg-white rounded-2xl border border-brand-pink/40 text-brand-coral shadow-md hidden sm:block"
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <Sparkles className="h-6 w-6" />
      </motion.div>

      {/* Heart 1 */}
      <motion.div
        className="absolute bottom-[20%] left-[8%] md:left-[12%] p-3.5 bg-white rounded-2xl border border-brand-pink/50 text-brand-coral shadow-lg hidden sm:block"
        animate={{ y: [0, 15, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        <Heart className="h-7 w-7 fill-brand-coral text-brand-coral" />
      </motion.div>

      {/* Stethoscope */}
      <motion.div
        className="absolute top-[20%] right-[8%] md:right-[15%] p-3.5 bg-white rounded-2xl border border-brand-border text-brand-teal shadow-md hidden sm:block"
        animate={{ y: [0, -15, 0], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
      >
        <Stethoscope className="h-6 w-6" />
      </motion.div>

      {/* Baby icon wrapping in light pink */}
      <motion.div
        className="absolute bottom-[25%] right-[10%] md:right-[14%] p-3.5 bg-brand-light-pink border border-brand-pink text-brand-heading shadow-md hidden sm:block"
        animate={{ y: [0, 10, 0], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1 }}
      >
        <Baby className="h-7 w-7" />
      </motion.div>

      {/* Clinical Telemetry Ring */}
      <motion.div
        className="absolute top-[45%] left-[5%] opacity-20 hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="50" stroke="#2C332D" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
      </motion.div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10 flex flex-col items-center">
        
        {/* Welcome Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-pink/20 text-brand-heading border border-brand-pink/30 uppercase tracking-widest">
            <Baby className="h-4 w-4 text-brand-coral" /> Maternal Telemetry Ecosystem
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-brand-heading tracking-tight leading-none mt-2">
            The Digital <span className="font-serif italic font-normal text-brand-coral">Bridge</span> to Life-Saving Care
          </h1>
          <p className="text-brand-light-teal text-sm sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed pt-2">
            Connecting expecting mothers in Manzini, Eswatini with continuous maternal vitals telemetry and immediate physician emergency alert tunnels.
          </p>
        </motion.div>

        {/* Big Screen Logo Display (The Main Requested Screen Frame) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-2xl"
          id="big-screen-logo-frame"
        >
          {/* Bezel / Sleek Display Glass Frame */}
          <div className="bg-white border-4 border-brand-heading rounded-[40px] shadow-2xl p-6 sm:p-12 relative overflow-hidden backdrop-blur-md">
            
            {/* Top Device bar indicator */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-border" />
              <span className="w-12 h-1 rounded-full bg-brand-border" />
              <span className="w-2 h-2 rounded-full bg-brand-border" />
            </div>

            {/* Ambient inner soft light-pink display glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-light-pink/20 via-white to-[#FAF9F6]/20 pointer-events-none" />

            {/* Glowing background circles within screen */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-pink/15 rounded-full filter blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-teal/5 rounded-full filter blur-xl" />

            {/* Screen Inner Workspace */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-8 py-4 sm:py-8">
              
              {/* Giant Interactive Logo */}
              <div className="transform scale-110 sm:scale-125 transition-transform duration-500 hover:scale-130">
                <InteractiveLogo size="lg" withText={false} />
              </div>

              {/* Subtitles inside the clinical monitor display */}
              <div className="space-y-2 text-center">
                <span className="text-xl sm:text-3xl font-display font-black text-brand-heading tracking-tight block">
                  Vytal Bridge
                </span>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-light-teal uppercase font-bold tracking-widest bg-brand-dark/35 border border-brand-border px-3 py-1 rounded-full">
                  <Shield className="h-3.5 w-3.5 text-brand-teal" /> HIPAA Clinical Station Live
                </div>
              </div>

            </div>

            {/* Bottom status line */}
            <div className="absolute bottom-3 left-6 right-6 flex justify-between items-center text-[8px] text-brand-light-teal/80 font-mono">
              <span>MANZINI REGIONAL HUB</span>
              <span>VER: 2026.07.13</span>
            </div>
          </div>

          {/* Shadow decorations beneath the big display screen */}
          <div className="absolute -bottom-4 left-[10%] right-[10%] h-8 bg-brand-heading/5 rounded-full filter blur-lg pointer-events-none" />
        </motion.div>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 relative z-10"
        >
          <button
            onClick={scrollToMainContent}
            className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold py-3.5 px-8 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand-teal/15 text-sm uppercase tracking-wider"
          >
            <span>Explore Clinical Portal</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
          
          <div className="flex items-center gap-1.5 text-xs text-brand-light-teal font-medium bg-white border border-brand-border px-4 py-3 rounded-2xl shadow-sm">
            <Zap className="h-3.5 w-3.5 text-brand-coral fill-brand-coral" />
            <span>Closed Beta Enrolling October 1, 2026</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
