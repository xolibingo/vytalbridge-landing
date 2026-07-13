import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Settings, 
  Eye, 
  Leaf, 
  Activity, 
  Compass, 
  ShieldCheck, 
  ChevronRight, 
  HelpCircle, 
  BookOpen, 
  Users, 
  Sparkles,
  ClipboardList
} from "lucide-react";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  theme: "natural" | "clinical-dark";
  setTheme: (theme: "natural" | "clinical-dark") => void;
  accessibilityMode: boolean;
  setAccessibilityMode: (mode: boolean) => void;
}

export default function SettingsPanel({
  isOpen,
  onClose,
  theme,
  setTheme,
  accessibilityMode,
  setAccessibilityMode
}: SettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // Only close if we didn't click the settings trigger button
        const trigger = document.getElementById("settings-trigger-btn");
        if (trigger && trigger.contains(event.target as Node)) {
          return;
        }
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Smooth scroll to element and close settings
  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Offset scrolling slightly to account for fixed header
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      onClose();
    }
  };

  const navItems = [
    {
      id: "main-content-anchor",
      label: "Overview & Launch Countdown",
      subtitle: "Project timeline & early access metrics",
      icon: <Sparkles className="h-4 w-4 text-brand-coral" />
    },
    {
      id: "mission-section",
      label: "Vytal Core Mission",
      subtitle: "Why continuous remote vitals matter",
      icon: <Compass className="h-4 w-4 text-brand-teal" />
    },
    {
      id: "features-preview-section",
      label: "Interactive Features Blueprint",
      subtitle: "Explore our real-time clinic loops",
      icon: <Activity className="h-4 w-4 text-brand-teal" />
    },
    {
      id: "waitlist-card",
      label: "Patient Registration Queue",
      subtitle: "Join the closed Eswatini beta queue",
      icon: <ClipboardList className="h-4 w-4 text-brand-coral" />
    },
    {
      id: "maternal-insights-section",
      label: "Maternal Health Insights",
      subtitle: "Clinical guides & preeclampsia prevention",
      icon: <BookOpen className="h-4 w-4 text-brand-teal" />
    },
    {
      id: "meet-the-team-section",
      label: "Clinical Advisory Board",
      subtitle: "Meet our primary physicians & specialists",
      icon: <Users className="h-4 w-4 text-brand-coral" />
    },
    {
      id: "social-proof-section",
      label: "Community Impact & Trials",
      subtitle: "Decentralized deployment reports",
      icon: <ShieldCheck className="h-4 w-4 text-brand-teal" />
    },
    {
      id: "faq-section",
      label: "Frequently Asked Questions",
      subtitle: "Security, privacy & technical guides",
      icon: <HelpCircle className="h-4 w-4 text-brand-light-teal" />
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (mobile-only overlay feel, desktop-safe) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-brand-dark/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Absolute floating panel right below Header */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="absolute top-full right-4 sm:right-6 lg:right-8 mt-2 w-full max-w-[380px] sm:max-w-[420px] bg-brand-dark-card border border-brand-border rounded-3xl shadow-2xl p-5 z-50 space-y-5 overflow-hidden"
            id="vytal-settings-panel"
          >
            {/* Soft decorative background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-teal/5 rounded-full filter blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-border/40 pb-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-brand-teal/10 flex items-center justify-center text-brand-teal border border-brand-teal/20">
                  <Settings className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-heading uppercase tracking-wider">Control Center</h4>
                  <p className="text-[10px] text-brand-light-teal leading-none">System & navigation settings</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-brand-dark text-brand-light-teal hover:text-brand-heading border border-transparent hover:border-brand-border transition-all cursor-pointer"
                aria-label="Close Settings"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* PREFERENCES SECTION */}
            <div className="space-y-3.5 relative z-10">
              <h5 className="text-[10px] font-bold text-brand-coral uppercase tracking-widest">Preferences</h5>
              
              {/* Theme Toggle option */}
              <div className="space-y-1.5 bg-brand-dark/40 border border-brand-border/50 p-3 rounded-2xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-heading">Visual Palette</span>
                  <span className="text-[9px] text-brand-light-teal px-1.5 py-0.5 rounded bg-brand-dark border border-brand-border font-mono">
                    {theme === "natural" ? "Natural Tones" : "Clinical Dark"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  <button
                    onClick={() => setTheme("natural")}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      theme === "natural"
                        ? "bg-brand-teal text-white border-brand-teal shadow-sm"
                        : "bg-brand-dark border-brand-border text-brand-light-teal hover:text-brand-heading hover:bg-brand-dark/70"
                    }`}
                  >
                    <Leaf className="h-3.5 w-3.5" />
                    <span>Natural</span>
                  </button>
                  <button
                    onClick={() => setTheme("clinical-dark")}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      theme === "clinical-dark"
                        ? "bg-brand-teal text-white border-brand-teal shadow-sm"
                        : "bg-brand-dark border-brand-border text-brand-light-teal hover:text-brand-heading hover:bg-brand-dark/70"
                    }`}
                  >
                    <Activity className="h-3.5 w-3.5" />
                    <span>Clinical Dark</span>
                  </button>
                </div>
              </div>

              {/* Accessibility Toggle */}
              <div className="flex items-center justify-between bg-brand-dark/40 border border-brand-border/50 p-3 rounded-2xl">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-heading">
                    <Eye className="h-3.5 w-3.5 text-brand-teal" />
                    <span>Accessibility A+</span>
                  </div>
                  <p className="text-[9px] text-brand-light-teal max-w-[200px] leading-relaxed">
                    Increases font size and line-height for high-stress clinics.
                  </p>
                </div>
                
                <button
                  onClick={() => setAccessibilityMode(!accessibilityMode)}
                  className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    accessibilityMode ? "bg-brand-coral" : "bg-brand-dark border-brand-border"
                  }`}
                  role="switch"
                  aria-checked={accessibilityMode}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      accessibilityMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* SECTIONS NAVIGATION TAB */}
            <div className="space-y-2.5 relative z-10 border-t border-brand-border/40 pt-4">
              <div className="flex items-center justify-between">
                <h5 className="text-[10px] font-bold text-brand-coral uppercase tracking-widest">View Sections</h5>
                <span className="text-[9px] text-brand-light-teal font-mono">Jump to block</span>
              </div>

              <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-brand-border">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-brand-dark/20 hover:bg-brand-dark border border-brand-border/40 hover:border-brand-pink/30 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-6 w-6 rounded bg-brand-dark border border-brand-border flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-brand-heading leading-tight truncate group-hover:text-brand-coral transition-colors">
                          {item.label}
                        </p>
                        <p className="text-[9px] text-brand-light-teal leading-none mt-0.5 truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-3 w-3 text-brand-light-teal group-hover:text-brand-heading group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Safety & Compliance notice */}
            <div className="p-3 bg-brand-teal/5 border border-brand-teal/20 rounded-xl flex items-start gap-2 relative z-10">
              <ShieldCheck className="h-4 w-4 text-brand-teal flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h6 className="text-[10px] font-bold text-brand-heading">HIPAA Safeguards Active</h6>
                <p className="text-[8px] text-brand-light-teal leading-relaxed">
                  Your theme & accessibility settings are safely stored in your local clinical session cache.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
