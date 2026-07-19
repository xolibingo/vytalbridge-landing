import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HeartPulse, ShieldAlert, Activity, Sparkles, CheckCircle2, UserPlus, FileHeart, RefreshCw } from "lucide-react";
import { FeatureDetail } from "../types";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 110,
    }
  }
};

export default function FeaturesPreview() {
  const [activeTab, setActiveTab] = useState<string>("monitoring");

  const features: FeatureDetail[] = [
    {
      id: "monitoring",
      title: "Maternal & Fetal Vitals",
      description: "Continuous remote vitals capture. Syncs with clinical-grade wearable sensors to record maternal heart rate, oxygen levels, blood pressure, and fetal heartbeat safely and passively.",
      iconName: "HeartPulse",
      color: "from-teal-500 to-cyan-500",
      badge: "Clinical-Grade Integration",
      visualMockup: "monitoring"
    },
    {
      id: "alerting",
      title: "Instant Caregiver Bridge",
      description: "A secure alert pipeline. When vitals deviate from personalized safe thresholds, our system immediately triggers SMS alerts and notifies your assigned medical team, cutting down action time to seconds.",
      iconName: "ShieldAlert",
      color: "from-coral to-rose-500",
      badge: "Zero-Latency Routing",
      visualMockup: "alerting"
    },
    {
      id: "contraction",
      title: "Smart Contraction Compass",
      description: "Track contraction frequency, duration, and intensity with absolute simplicity. Intelligent algorithms analyze data to predict labor progress and guide you when it is time to depart.",
      iconName: "Activity",
      color: "from-indigo-500 to-brand-teal",
      badge: "Predictive Analytics",
      visualMockup: "contraction"
    },
    {
      id: "advisory",
      title: "Personalized Daily Pathway",
      description: "Daily insights curated by board-certified OB/GYNs and maternal-fetal medical experts, tailored precisely to your current gestational week, baby's size, and specific symptom logs.",
      iconName: "Sparkles",
      color: "from-yellow-500 to-brand-coral",
      badge: "Curated by Doctors",
      visualMockup: "advisory"
    }
  ];

  const currentFeature = features.find((f) => f.id === activeTab) || features[0];

  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "HeartPulse":
        return <HeartPulse className={className} />;
      case "ShieldAlert":
        return <ShieldAlert className={className} />;
      case "Activity":
        return <Activity className={className} />;
      case "Sparkles":
        return <Sparkles className={className} />;
      default:
        return <HeartPulse className={className} />;
    }
  };

  return (
    <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden" id="features-preview-section">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-coral/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-accent-beige text-brand-teal mb-4 uppercase tracking-wider border border-brand-teal/10">
          Feature Blueprint
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-heading tracking-tight">
          How Vytal Bridge protects you
        </h2>
        <p className="text-brand-light-teal mt-3 text-base sm:text-lg">
          We are building the first-ever responsive maternal safety ecosystem. Explore the dynamic interface modules arriving on iOS and Android.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Navigation Tabs (Left 5 columns on Desktop) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 space-y-3"
        >
          {features.map((feature) => {
            const isActive = feature.id === activeTab;
            return (
              <motion.button
                key={feature.id}
                variants={staggerItem}
                onClick={() => setActiveTab(feature.id)}
                className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 border ${
                  isActive
                    ? "bg-brand-dark border-brand-teal shadow-md shadow-brand-teal/5 text-brand-heading"
                    : "bg-brand-dark/60 hover:bg-brand-dark border-brand-border text-brand-light-teal hover:text-brand-teal"
                }`}
                id={`feature-tab-${feature.id}`}
              >
                <div
                  className={`p-3 rounded-xl transition-all ${
                    isActive ? "bg-brand-teal text-white font-semibold" : "bg-brand-dark-card text-brand-light-teal border border-brand-border"
                  }`}
                >
                  {renderIcon(feature.iconName, "h-6 w-6")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm sm:text-base tracking-tight truncate">
                    {feature.title}
                  </p>
                  <p className="text-xs text-brand-light-teal mt-0.5 truncate hidden sm:block">
                    {feature.badge}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Dynamic Display (Right 7 columns on Desktop) */}
        <div className="lg:col-span-7 bg-brand-dark border border-brand-border rounded-2xl p-6 sm:p-8 h-[360px] flex flex-col justify-between relative overflow-hidden shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col justify-between"
            >
              {/* Feature Header */}
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-coral/10 text-brand-coral mb-3 border border-brand-coral/10">
                  {currentFeature.badge}
                </span>
                <h3 className="text-2xl font-serif font-bold text-brand-heading tracking-tight">
                  {currentFeature.title}
                </h3>
                <p className="text-brand-text mt-2 text-sm sm:text-base leading-relaxed">
                  {currentFeature.description}
                </p>
              </div>

              {/* Dynamic CSS Visual Mockup of App Screen */}
              <div className="mt-6 flex-1 bg-brand-dark-card rounded-xl border border-brand-border p-4 flex flex-col justify-between relative overflow-hidden min-h-[140px] shadow-sm">
                {currentFeature.visualMockup === "monitoring" && (
                  <div className="space-y-3" id="mockup-monitoring">
                    <div className="flex justify-between items-center text-xs text-brand-light-teal border-b border-brand-border pb-2">
                      <span className="flex items-center gap-1.5"><FileHeart className="h-3.5 w-3.5 text-brand-coral animate-pulse" /> Live Telemetry</span>
                      <span className="text-brand-teal font-semibold font-mono text-[10px]">98% Signal Quality</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-brand-dark p-2 rounded-lg border border-brand-border">
                        <span className="text-[9px] text-brand-light-teal uppercase font-bold tracking-wider">Fetal Heartbeat</span>
                        <div className="flex items-baseline gap-1 mt-0.5 text-brand-heading">
                          <span className="text-base font-bold font-mono text-brand-teal">142</span>
                          <span className="text-[9px] text-brand-light-teal">BPM</span>
                        </div>
                      </div>
                      <div className="bg-brand-dark p-2 rounded-lg border border-brand-border">
                        <span className="text-[9px] text-brand-light-teal uppercase font-bold tracking-wider">Maternal BP</span>
                        <div className="flex items-baseline gap-1 mt-0.5 text-brand-heading">
                          <span className="text-base font-bold font-mono text-brand-coral">118/76</span>
                          <span className="text-[9px] text-brand-light-teal">mmHg</span>
                        </div>
                      </div>
                    </div>
                    {/* Animated rhythm line (Dual Waveform representing pink and green) */}
                    <div className="h-8 w-full opacity-90 relative flex items-center justify-between">
                      <svg className="w-1/2 h-full stroke-brand-teal" viewBox="0 0 100 20" fill="none">
                        <path d="M0 10 L25 10 L28 4 L31 16 L34 10 L50 10 L54 0 L58 20 L62 10 L100 10" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <svg className="w-1/2 h-full stroke-brand-coral" viewBox="0 0 100 20" fill="none">
                        <path d="M0 10 L15 10 L20 6 L25 14 L30 10 L60 10 L65 2 L70 18 L75 10 L100 10" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                )}

                {currentFeature.visualMockup === "alerting" && (
                  <div className="space-y-3" id="mockup-alerting">
                    <div className="flex justify-between items-center text-xs text-brand-light-teal border-b border-brand-border pb-2">
                      <span className="text-brand-coral font-bold flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5 animate-bounce" /> Emergency Guard</span>
                      <span className="text-brand-light-teal font-semibold text-[10px]">Live Router Active</span>
                    </div>
                    <div className="bg-brand-coral/10 border border-brand-coral/20 rounded-lg p-2.5 text-[11px] flex gap-2 items-start">
                      <div className="h-2 w-2 rounded-full bg-brand-coral mt-1.5 animate-ping flex-shrink-0" />
                      <div className="space-y-0.5">
                        <p className="font-bold text-brand-coral">Critical Threshold Flagged</p>
                        <p className="text-brand-text leading-tight text-[10px]">Systolic blood pressure trends exceeded personalized targets. Direct alert tunnels routed to Dr. Jenkins.</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-brand-light-teal px-1 bg-brand-dark p-1.5 rounded-md border border-brand-border">
                      <span>Telemetry Status:</span>
                      <span className="text-brand-teal font-bold flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> SECURE TUNNEL OK</span>
                    </div>
                  </div>
                )}

                {currentFeature.visualMockup === "contraction" && (
                  <div className="space-y-3" id="mockup-contraction">
                    <div className="flex justify-between items-center text-xs text-brand-light-teal border-b border-brand-border pb-2">
                      <span className="flex items-center gap-1.5 text-brand-teal font-semibold"><Activity className="h-3.5 w-3.5" /> Interval Analysis</span>
                      <span className="text-brand-light-teal font-mono text-[10px]">4m 12s average</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-brand-light-teal">Contraction Phase:</span>
                        <span className="text-brand-coral font-bold">Transition State</span>
                      </div>
                      <div className="w-full bg-brand-dark border border-brand-border h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-teal to-brand-coral h-full w-4/6" />
                      </div>
                      <p className="text-[9px] text-brand-light-teal leading-tight bg-brand-teal/5 p-1.5 rounded border border-brand-teal/20">
                        <strong className="text-brand-heading">Advisory:</strong> Cycle is stabilizing. Prepare transport procedures to nearest birth facility.
                      </p>
                    </div>
                  </div>
                )}

                {currentFeature.visualMockup === "advisory" && (
                  <div className="space-y-3" id="mockup-advisory">
                    <div className="flex justify-between items-center text-xs text-brand-light-teal border-b border-brand-border pb-2">
                      <span className="flex items-center gap-1.5 text-brand-coral font-semibold"><Sparkles className="h-3.5 w-3.5 text-brand-coral" /> Week 32 Guidance</span>
                      <span className="text-brand-light-teal font-semibold text-[10px]">Board Certified</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <div className="h-8 w-8 rounded-full bg-brand-pink/20 text-brand-coral flex items-center justify-center text-xs font-bold flex-shrink-0 border border-brand-pink/30">32w</div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-brand-heading">Maternal Hydration Guide</p>
                        <p className="text-[10px] text-brand-text leading-normal">Your baby is sizing like a squash. To buffer continuous blood volume expansion, target 3.2L of water today and record symptom responses.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aesthetic corner background glow */}
                <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${currentFeature.color} opacity-10 filter blur-xl`} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
