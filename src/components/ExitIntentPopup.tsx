import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Copy, ClipboardList, Sparkles } from "lucide-react";

// External survey link URL
export const SURVEY_FORM_URL = "https://tally.so/r/gD1yQd";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Check if user has already seen or dismissed the popup in this session
    const isDismissed = sessionStorage.getItem("vytal_exit_popup_dismissed");
    if (isDismissed) return;

    // 1. Desktop Exit Intent (Mouse leaves top of screen)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 25) {
        setIsVisible(true);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    // 2. Mobile / Tablet Timeout Fallback (Show after 25 seconds of active reading)
    const mobileFallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 25000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileFallbackTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("vytal_exit_popup_dismissed", "true");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(SURVEY_FORM_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleOpenSurvey = () => {
    window.open(SURVEY_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto" id="exit-intent-overlay">
          {/* Backdrop blur/dim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-brand-heading/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="bg-brand-dark-card border-2 border-brand-pink/50 rounded-[32px] w-full max-w-lg shadow-2xl p-6 sm:p-8 relative overflow-hidden text-center my-8 z-10"
            id="exit-intent-modal"
          >
            {/* Elegant Background Blobs */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-pink/20 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-brand-teal/10 rounded-full filter blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-brand-dark/40 text-brand-light-teal hover:text-brand-heading transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6 relative z-10">
              {/* Visual Icon */}
              <div className="mx-auto h-14 w-14 rounded-2xl bg-brand-dark flex items-center justify-center text-brand-coral border border-brand-pink/30 relative">
                <div className="absolute -top-1 -right-1 animate-bounce">
                  <Sparkles className="h-4 w-4 text-brand-coral fill-brand-coral" />
                </div>
                <ClipboardList className="h-7 w-7" />
              </div>

              {/* Catchy Header */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-brand-coral bg-brand-pink/20 px-2.5 py-1 rounded-full border border-brand-pink/35 uppercase tracking-wider">
                  Community Survey
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-heading tracking-tight">
                  Before you go...
                </h3>
                <p className="text-brand-light-teal text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  Help us shape maternal healthcare in Eswatini! Take 1 minute to complete our feedback survey.
                </p>
              </div>

              {/* Primary Action Card: Open External Survey Form Link */}
              <div className="bg-brand-dark/60 p-5 rounded-2xl border border-brand-border text-left space-y-4 shadow-inner">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold text-brand-coral block tracking-wider">Official Feedback Form</span>
                    <p className="text-sm font-bold text-brand-heading truncate">Vytal Bridge Community Survey</p>
                  </div>
                  <button
                    onClick={handleOpenSurvey}
                    className="bg-brand-teal hover:bg-brand-teal/90 text-white px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2 text-xs font-bold shrink-0 hover:scale-105"
                  >
                    <span>Open Form</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-brand-light-teal pt-2 border-t border-brand-border/40">
                  <span className="truncate pr-2 font-mono text-[10px] text-brand-light-teal/90">{SURVEY_FORM_URL}</span>
                  <button
                    onClick={handleCopyLink}
                    className="text-brand-coral hover:underline flex items-center gap-1 font-semibold shrink-0 cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copiedLink ? "Copied!" : "Copy link"}
                  </button>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="text-xs text-brand-light-teal hover:text-brand-heading transition-colors pt-1 block mx-auto cursor-pointer underline"
              >
                No thanks, skip survey for now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
