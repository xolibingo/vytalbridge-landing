import React from "react";
import { motion } from "motion/react";

interface InteractiveLogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export default function InteractiveLogo({ size = "md", withText = false }: InteractiveLogoProps) {
  const containerSize = size === "sm" ? "h-12 w-12" : size === "md" ? "h-24 w-24 sm:h-28 sm:w-28" : "h-40 w-40";
  const textClasses = size === "sm" ? "text-lg" : size === "md" ? "text-3xl sm:text-4xl" : "text-5xl";
  const subtextClasses = size === "sm" ? "text-xs" : size === "md" ? "text-sm sm:text-base" : "text-lg";

  return (
    <div className="flex flex-col items-center md:items-start md:flex-row gap-4 sm:gap-6">
      {/* Brand Icon */}
      <motion.div
        className={`relative ${containerSize} flex items-center justify-center shadow-xl shadow-teal-900/10 overflow-hidden cursor-pointer`}
        style={{ 
          borderRadius: "26%", 
          background: "linear-gradient(135deg, #1fa295 0%, #116358 100%)" 
        }}
        whileHover={{ scale: 1.05, rotate: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        id="vytal-bridge-icon"
      >
        {/* Abstract subtle inner radial gloss glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none" />

        <svg
          viewBox="0 0 160 160"
          className="w-[85%] h-[85%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle horizontal base guidelines from reference image */}
          <line x1="24" y1="100" x2="136" y2="100" stroke="rgba(255,255,255,0.24)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="26" y1="105" x2="134" y2="105" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Flanking vertical rounded guidelines from reference image */}
          <line x1="68" y1="78" x2="68" y2="104" stroke="rgba(255,255,255,0.24)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="92" y1="78" x2="92" y2="104" stroke="rgba(255,255,255,0.24)" strokeWidth="3.5" strokeLinecap="round" />

          {/* Core Pulse Waveform (Exact symmetric QRS ECG bell curve from reference) */}
          <motion.path
            d="M 24 100 L 52 100 L 58 90 L 64 112 C 69 92, 73 54, 80 54 C 87 54, 91 92, 96 112 L 102 90 L 108 100 L 136 100"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          {/* Plump Coral Heart resting exactly on top of the summit */}
          <motion.g
            transform="translate(80, 38)"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M 0 0 C -4.5 -5, -10 -5, -12 0 C -14 5, -8 11, 0 16 C 8 11, 14 5, 12 0 C 10 -5, 4.5 -5, 0 0"
              fill="#FF7262"
            />
          </motion.g>
        </svg>

        {/* Dynamic scanning glow line */}
        <motion.div
          className="absolute inset-y-0 w-1 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          animate={{ x: ["-100%", "250%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
      </motion.div>

      {/* Brand Text */}
      {withText && (
        <div className="flex flex-col justify-center text-center md:text-left">
          <motion.h1
            className={`${textClasses} font-display font-extrabold tracking-tight text-brand-heading leading-none`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Vytal Bridge
          </motion.h1>
          <motion.p
            className={`${subtextClasses} font-sans font-medium text-brand-light-teal mt-2`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Bridging every mother to care that saves lives.
          </motion.p>
        </div>
      )}
    </div>
  );
}
