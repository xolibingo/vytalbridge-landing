import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HeartPulse, ShieldAlert, Activity, Sparkles, CheckCircle2, UserPlus, FileHeart, RefreshCw } from "lucide-react";
import { FeatureDetail } from "../types";

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
    <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden" id="features-preview-section">
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
        <div className="lg:col-span-5 space-y-3">
          {features.map((feature) => {
            const isActive = feature.id === activeTab;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 border ${
                  isActive
                    ? "bg-[#FAF9F6] border-brand-teal shadow-md shadow-brand-teal/5 text-brand-heading"
                    : "bg-[#FAF9F6]/60 hover:bg-[#FAF9F6] border-brand-border text-brand-light-teal hover:text-brand-teal"
                }`}
                id={`feature-tab-${feature.id}`}
              >
                <div
                  className={`p-3 rounded-xl transition-all ${
                    isActive ? "bg-brand-teal text-white font-semibold" : "bg-white text-brand-light-teal border border-brand-border"
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
              </button>
            );
          })}
        </div>

        {/* Dynamic Display (Right 7 columns on Desktop) */}
        <div className="lg:col-span-7 bg-[#FAF9F6] border border-brand-border rounded-2xl p-6 sm:p-8 h-[360px] flex flex-col justify-between relative overflow-hidden shadow-inner">
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
              <div className="mt-6 flex-1 bg-white rounded-xl border border-brand-border p-4 flex flex-col justify-between relative overflow-hidden min-h-[140px] shadow-sm">
                {currentFeature.visualMockup === "monitoring" && (
                  <div className="space-y-3" id="mockup-monitoring">
                    <div className="flex justify-between items-center text-xs text-brand-light-teal border-b border-brand-border pb-2">
                      <span className="flex items-center gap-1.5"><FileHeart className="h-3.5 w-3.5 text-brand-teal animate-pulse" /> Active Session</span>
                      <span className="text-brand-teal font-semibold">98% Signal Quality</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#FAF9F6] p-2.5 rounded-lg border border-brand-border">
                        <span className="text-[10px] text-brand-light-teal uppercase font-semibold">Baby Heartbeat</span>
                        <div className="flex items-baseline gap-1 mt-1 text-brand-heading">
                          <span className="text-lg font-bold font-mono">142</span>
                          <span className="text-[10px] text-brand-light-teal">BPM</span>
                        </div>
                      </div>
                      <div className="bg-[#FAF9F6] p-2.5 rounded-lg border border-brand-border">
                        <span className="text-[10px] text-brand-light-teal uppercase font-semibold">Maternal BP</span>
                        <div className="flex items-baseline gap-1 mt-1 text-brand-heading">
                          <span className="text-lg font-bold font-mono">118/76</span>
                          <span className="text-[10px] text-brand-light-teal">mmHg</span>
                        </div>
                      </div>
                    </div>
                    {/* Animated rhythm line */}
                    <div className="h-6 w-full opacity-60 relative flex items-center justify-center">
                      <svg className="w-full h-full stroke-brand-teal" viewBox="0 0 100 20" fill="none">
                        <path d="M0 10 L30 10 L34 4 L38 16 L42 10 L60 10 L64 0 L68 20 L72 10 L100 10" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                )}

                {currentFeature.visualMockup === "alerting" && (
                  <div className="space-y-3" id="mockup-alerting">
                    <div className="flex justify-between items-center text-xs text-brand-light-teal border-b border-brand-border pb-2">
                      <span className="text-brand-coral font-semibold flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5 animate-bounce" /> Emergency Guard</span>
                      <span className="text-brand-light-teal font-semibold">Live Router</span>
                    </div>
                    <div className="bg-brand-coral/10 border border-brand-coral/20 rounded-lg p-3 text-xs flex gap-3 items-start">
                      <div className="h-2 w-2 rounded-full bg-brand-coral mt-1.5 animate-ping flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="font-semibold text-brand-coral">Critical Elevation Detected</p>
                        <p className="text-brand-text text-[11px]">Systolic blood pressure exceeded safe target. Secure telemetry routed instantly to Dr. Sarah Jenkins.</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-brand-light-teal px-1 bg-[#FAF9F6] p-1.5 rounded-md border border-brand-border">
                      <span>Routing Status:</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Transmitted</span>
                    </div>
                  </div>
                )}

                {currentFeature.visualMockup === "contraction" && (
                  <div className="space-y-3" id="mockup-contraction">
                    <div className="flex justify-between items-center text-xs text-brand-light-teal border-b border-brand-border pb-2">
                      <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-brand-teal" /> Interval Log</span>
                      <span className="text-brand-light-teal font-mono">4m 12s average</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-brand-light-teal">Current Phase:</span>
                        <span className="text-brand-teal font-semibold">Active Labor Transition</span>
                      </div>
                      <div className="w-full bg-[#FAF9F6] border border-brand-border h-2.5 rounded-full overflow-hidden">
                        <div className="bg-brand-teal h-full w-4/6" />
                      </div>
                      <p className="text-[10px] text-brand-coral leading-tight bg-brand-coral/5 p-1.5 rounded border border-brand-coral/10">
                        Recommendation: Contractual cycle is stabilizing below 5 minutes. Prepare to contact your birth partner.
                      </p>
                    </div>
                  </div>
                )}

                {currentFeature.visualMockup === "advisory" && (
                  <div className="space-y-3" id="mockup-advisory">
                    <div className="flex justify-between items-center text-xs text-brand-light-teal border-b border-brand-border pb-2">
                      <span className="flex items-center gap-1.5 text-brand-coral font-semibold"><Sparkles className="h-3.5 w-3.5" /> Week 32 - Smart Path</span>
                      <span className="text-brand-light-teal font-semibold">Maternal-Fetal Care</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <div className="h-8 w-8 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center text-xs font-bold flex-shrink-0 border border-brand-teal/10">32w</div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-brand-heading">Daily Wellness Guideline</p>
                        <p className="text-[11px] text-brand-text leading-normal">Your baby is about the size of a squash. To buffer blood volume increases, increase hydration to 3.2L today and log rest periods.</p>
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
