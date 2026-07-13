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
        className={`relative ${containerSize} rounded-[28px] bg-brand-seafoam flex items-center justify-center shadow-lg shadow-brand-seafoam/20 overflow-hidden cursor-pointer`}
        whileHover={{ scale: 1.05, rotate: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        id="vytal-bridge-icon"
      >
        {/* Abstract subtle waves behind */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-700/20 to-transparent pointer-events-none" />

        <svg
          viewBox="0 0 160 160"
          className="w-4/5 h-4/5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle horizontal grid lines */}
          <line x1="10" y1="95" x2="150" y2="95" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="10" y1="105" x2="150" y2="105" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {/* Core Pulse Bridge wave */}
          <motion.path
            d="M 10 95 L 45 95 L 53 80 L 61 110 L 71 95 L 80 50 Q 85 45 90 50 L 99 95 L 109 80 L 117 110 L 125 95 L 150 95"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          {/* Bridge side guides (flanking lines) */}
          <line x1="68" y1="65" x2="68" y2="105" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeDasharray="3 3" />
          <line x1="102" y1="65" x2="102" y2="105" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeDasharray="3 3" />

          {/* Heart on top of the bridge summit */}
          <motion.g
            transform="translate(85, 38)"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Heart Shape */}
            <path
              d="M 0 -8 C -4 -13, -11 -13, -13 -7 C -15 -2, -10 5, 0 12 C 10 5, 15 -2, 13 -7 C 11 -13, 4 -13, 0 -8"
              fill="#A98467"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>

        {/* Dynamic scanning glow line */}
        <motion.div
          className="absolute inset-y-0 w-1 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
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
