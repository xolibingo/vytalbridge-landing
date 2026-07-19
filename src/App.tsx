import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Sparkles, Heart, Bell, Stethoscope, Mail, Phone, MapPin, ExternalLink, HelpCircle, Calendar, Leaf, Activity, Eye, Settings, Download } from "lucide-react";
import InteractiveLogo from "./components/InteractiveLogo";
import FeaturesPreview from "./components/FeaturesPreview";
import WaitlistForm from "./components/WaitlistForm";
import SocialProof from "./components/SocialProof";
import FAQSection from "./components/FAQSection";
import MeetTheTeam from "./components/MeetTheTeam";
import MaternalInsights from "./components/MaternalInsights";
import DemoRequestModal from "./components/DemoRequestModal";
import BigLogoHero from "./components/BigLogoHero";
import SupportChat from "./components/SupportChat";
import ExitIntentPopup from "./components/ExitIntentPopup";
import SettingsPanel from "./components/SettingsPanel";
import { addSubscriber } from "./lib/db";

export default function App() {
  // Theme state for switching between Natural Tones & Clinical Dark
  const [theme, setTheme] = useState<"natural" | "clinical-dark">(() => {
    return (localStorage.getItem("vytal_theme") as "natural" | "clinical-dark") || "natural";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("vytal_theme", theme);
  }, [theme]);

  // Accessibility state for increasing font-size and line-height for visual impairment
  const [accessibilityMode, setAccessibilityMode] = useState<boolean>(() => {
    return localStorage.getItem("vytal_accessibility") === "true";
  });

  useEffect(() => {
    localStorage.setItem("vytal_accessibility", String(accessibilityMode));
  }, [accessibilityMode]);

  // Settings Panel state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Demo Modal & Footer email states
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSubscribed, setFooterSubscribed] = useState(false);

  // Countdown Timer state to target launch date: October 1, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-10-01T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to waitlist form
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist-card");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className={`min-h-screen bg-brand-dark text-brand-text font-sans selection:bg-brand-teal selection:text-white relative overflow-x-hidden ${accessibilityMode ? "accessibility-active" : ""}`}>
      
      {/* Immersive background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1200px] pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[10%] w-[500px] h-[500px] rounded-full bg-brand-teal/5 filter blur-[120px]" />
        <div className="absolute top-[-100px] right-[10%] w-[600px] h-[600px] rounded-full bg-brand-pink/20 filter blur-[140px]" />
        <div className="absolute top-[400px] left-[30%] w-[400px] h-[400px] rounded-full bg-brand-light-pink/30 filter blur-[120px]" />
        <div className="absolute top-[800px] right-[20%] w-[350px] h-[350px] rounded-full bg-brand-pink/15 filter blur-[100px]" />
      </div>

      {/* Header Bar */}
      <header className="border-b border-brand-border bg-brand-dark/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <InteractiveLogo size="sm" withText={false} />
            <span className="font-display font-bold text-brand-heading text-base sm:text-lg tracking-tight">Vytal Bridge</span>
          </div>
          
          <div className="flex items-center gap-2.5 sm:gap-4 relative">
            {/* Elegant Settings & Navigation Panel Trigger */}
            <button
              id="settings-trigger-btn"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                isSettingsOpen
                  ? "bg-brand-teal border-brand-teal text-white shadow-sm ring-2 ring-brand-teal/20"
                  : "bg-brand-light-pink border-brand-border text-brand-light-teal hover:text-brand-heading hover:bg-brand-light-pink/80"
              }`}
              title="Open Control Settings & Navigation"
            >
              <Settings className={`h-4 w-4 ${isSettingsOpen ? "animate-spin" : ""}`} style={{ animationDuration: '6s' }} />
              <span className="hidden sm:inline font-bold">Settings & Nav</span>
            </button>

            <span className="hidden lg:inline-flex items-center gap-1 text-xs text-brand-teal bg-brand-accent-beige/40 px-2.5 py-1 rounded-md font-medium border border-brand-teal/20">
              <Shield className="h-3.5 w-3.5 text-brand-teal" /> HIPAA Compliant Architecture
            </span>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="border border-brand-pink/60 text-brand-heading hover:bg-brand-light-pink/50 bg-brand-dark-card/70 text-xs sm:text-sm font-semibold py-2 px-3 sm:px-4 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              id="header-demo-cta"
            >
              <Calendar className="h-3.5 w-3.5 text-brand-coral" />
              <span>Request Demo</span>
            </button>
            <button
              onClick={scrollToWaitlist}
              className="bg-brand-teal hover:bg-brand-teal/90 text-white text-xs sm:text-sm font-semibold py-2 px-3.5 sm:px-5 rounded-xl transition-all cursor-pointer shadow-sm shadow-brand-teal/10"
              id="header-cta"
            >
              Join Waitlist
            </button>

            {/* Float Settings Panel */}
            <SettingsPanel
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              theme={theme}
              setTheme={setTheme}
              accessibilityMode={accessibilityMode}
              setAccessibilityMode={setAccessibilityMode}
            />
          </div>
        </div>
      </header>

      {/* High-Impact Hero Landing Entry Section */}
      <BigLogoHero />

      {/* Main Body Layout */}
      <main id="main-content-anchor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 relative">
        
        {/* Dynamic Countdown & Greeting Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-start gap-8 bg-brand-dark-card border border-brand-border rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm"
        >
          {/* Subtle translucent pink overlay on left corner */}
          <div className="absolute top-0 left-0 w-44 h-44 bg-brand-pink/10 rounded-full filter blur-xl pointer-events-none" />

          <div className="space-y-3 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-1.5 text-brand-heading text-xs font-semibold uppercase tracking-wider bg-brand-pink/30 px-3 py-1.5 rounded-full border border-brand-pink/40">
              <Sparkles className="h-3 w-3 text-brand-coral" /> Early Access Enrolling
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-heading tracking-tight leading-tight">
              Bridging every <span className="font-serif italic font-normal text-brand-coral">mother</span> to care that saves lives.
            </h2>
            <p className="text-brand-light-teal text-sm sm:text-base leading-relaxed">
              We are building a responsive healthcare loop connecting expecting mothers with continuous vitals telemetry, direct physician alert tunnels, and supportive care pathways.
            </p>
          </div>

          {/* Real-time Countdown Box */}
          <div className="flex flex-col items-center bg-brand-light-pink/40 border border-brand-pink/30 p-5 rounded-2xl w-full sm:w-auto min-w-[280px] relative z-10 shadow-sm">
            <span className="text-[10px] text-brand-light-teal uppercase tracking-widest font-bold mb-3">Beta Launch (Oct 1, 2026) Countdown</span>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <div className="bg-brand-dark-card rounded-lg p-2.5 min-w-[50px] font-mono text-xl sm:text-2xl font-black text-brand-teal border border-brand-pink/20 shadow-sm">
                  {timeLeft.days}
                </div>
                <span className="text-[9px] text-brand-light-teal uppercase mt-1 block font-semibold">Days</span>
              </div>
              <div>
                <div className="bg-brand-dark-card rounded-lg p-2.5 min-w-[50px] font-mono text-xl sm:text-2xl font-black text-brand-teal border border-brand-pink/20 shadow-sm">
                  {timeLeft.hours}
                </div>
                <span className="text-[9px] text-brand-light-teal uppercase mt-1 block font-semibold">Hours</span>
              </div>
              <div>
                <div className="bg-brand-dark-card rounded-lg p-2.5 min-w-[50px] font-mono text-xl sm:text-2xl font-black text-brand-teal border border-brand-pink/20 shadow-sm">
                  {timeLeft.minutes}
                </div>
                <span className="text-[9px] text-brand-light-teal uppercase mt-1 block font-semibold">Mins</span>
              </div>
              <div>
                <div className="bg-brand-dark-card rounded-lg p-2.5 min-w-[50px] font-mono text-xl sm:text-2xl font-black text-brand-teal border border-brand-pink/20 shadow-sm">
                  {timeLeft.seconds}
                </div>
                <span className="text-[9px] text-brand-light-teal uppercase mt-1 block font-semibold">Secs</span>
              </div>
            </div>
            <button
              onClick={scrollToWaitlist}
              className="mt-4 w-full bg-brand-teal text-white text-xs font-bold py-2.5 px-4 rounded-lg hover:bg-brand-teal/90 transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm shadow-brand-teal/5"
            >
              Get Enrolled <Heart className="h-3 w-3 fill-white" />
            </button>
          </div>
        </motion.div>

        {/* Dynamic Logo banner matched from user's asset */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden shadow-sm"
          id="asset-banner"
        >
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-brand-teal/5 to-transparent pointer-events-none" />
          <InteractiveLogo size="md" withText={true} />
        </motion.section>

        {/* Two-Column Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Mission & Interactive Features Blueprint */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              id="mission-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm"
            >
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-heading tracking-tight">Our Mission</h3>
              <p className="text-brand-text text-sm sm:text-base leading-relaxed">
                Maternal health should not rely on periodic checks alone. Major clinical risks like preeclampsia or gestational anomalies develop silently between office visits. 
              </p>
              <p className="text-brand-text text-sm sm:text-base leading-relaxed">
                <strong className="text-brand-heading">Vytal Bridge</strong> connects the safety of clinic observation directly to your home. By integrating lightweight, medical-grade sensors, we provide live vitals tracking, automatic doctor telemetry, and an adaptive labor companion.
              </p>

              {/* Unique Selling Points Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border">
                <div className="flex gap-3 items-start text-xs">
                  <div className="h-7 w-7 rounded-lg bg-brand-teal/10 text-brand-teal flex items-center justify-center flex-shrink-0 border border-brand-teal/20">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-brand-heading">Smart Ingress Alerts</h5>
                    <p className="text-brand-light-teal mt-0.5">Automated SMS & pager routing to assigned physicians when vital targets shift.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start text-xs">
                  <div className="h-7 w-7 rounded-lg bg-brand-teal/10 text-brand-teal flex items-center justify-center flex-shrink-0 border border-brand-teal/20">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-brand-heading">Clinician Dashboard</h5>
                    <p className="text-brand-light-teal mt-0.5">High-fidelity vitals charting integrated natively with patient EHRs.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interactive Features Module */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FeaturesPreview />
            </motion.div>

            {/* FAQ Accordion Section */}
            <motion.div
              id="faq-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <FAQSection />
            </motion.div>
          </div>

          {/* Right Side: Signup Form, Spot Checker, Admin Transparency Console */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-8"
          >
            <WaitlistForm />
          </motion.div>

        </div>

        {/* Maternal Health Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <MaternalInsights />
        </motion.div>

        {/* Clinical Leadership Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <MeetTheTeam />
        </motion.div>

        {/* Social Proof Carousel, Milestones and Community Connections */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <SocialProof />
        </motion.div>

      </main>

      {/* Professional Legal Footer & Contacts */}
      <footer className="border-t border-brand-border bg-brand-dark-card py-12 mt-16 text-xs text-brand-light-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Grid Layout - Balanced 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Branding Column */}
            <div className="md:col-span-3 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-brand-teal flex items-center justify-center text-white text-[10px] font-bold font-mono">VB</div>
                <span className="font-display font-semibold text-brand-heading text-sm">Vytal Bridge</span>
              </div>
              <p className="text-brand-text max-w-sm leading-normal text-[11px]">
                The responsive digital bridge securing clinical care for expecting mothers and infants.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] text-brand-light-teal font-semibold uppercase">
                <span className="bg-brand-dark px-2 py-0.5 rounded border border-brand-border">HIPAA Compliant</span>
                <span className="bg-brand-dark px-2 py-0.5 rounded border border-brand-border">GDPR Ready</span>
              </div>
            </div>

            {/* Stay Informed Subscription Column */}
            <div className="md:col-span-3 space-y-3" id="stay-informed-footer-box">
              <h4 className="text-xs font-bold text-brand-heading uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-brand-coral" /> Stay Informed
              </h4>
              <p className="text-brand-text leading-normal text-[11px]">
                Subscribe for clinical research updates, public health announcements, and maternal trial data.
              </p>
              {!footerSubscribed ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (footerEmail.trim()) {
                      try {
                        await addSubscriber(footerEmail);
                        setFooterSubscribed(true);
                      } catch (err) {
                        console.error("Failed to subscribe:", err);
                      }
                    }
                  }}
                  className="space-y-2"
                >
                  <div className="flex gap-1.5">
                    <input
                      type="email"
                      required
                      value={footerEmail}
                      onChange={(e) => setFooterEmail(e.target.value)}
                      placeholder="research@clinic.org"
                      className="bg-brand-dark/20 border border-brand-border rounded-xl px-2.5 py-1.5 text-[11px] text-brand-heading placeholder:text-brand-light-teal/50 focus:border-brand-pink focus:outline-none w-full shadow-sm"
                    />
                    <button
                      type="submit"
                      className="bg-brand-teal hover:bg-brand-teal/90 text-white text-[11px] font-semibold px-3 rounded-xl transition-all cursor-pointer flex-shrink-0"
                    >
                      Join
                    </button>
                  </div>
                  <p className="text-[9px] text-brand-light-teal/70 leading-tight">
                    Separate from the patient queue waitlist.
                  </p>
                </form>
              ) : (
                <div className="bg-brand-light-pink/40 border border-brand-pink/30 p-2.5 rounded-xl text-[10px] text-brand-heading space-y-2">
                  <div>
                    <p className="font-semibold text-brand-coral">✓ Subscription Secured</p>
                    <p className="text-[9px] text-brand-light-teal leading-tight">
                      Added <span className="font-mono text-[9px] font-bold">{footerEmail}</span> to our clinical dispatch database.
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      const { generatePregnancyGuidePDF } = await import("./lib/pdfGenerator");
                      generatePregnancyGuidePDF();
                    }}
                    className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white text-[10px] font-bold py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Branded PDF
                  </button>
                </div>
              )}
            </div>

            {/* Contact Information Column */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-brand-heading uppercase tracking-wider">Contact & Inquiries</h4>
              <div className="space-y-2 text-brand-text">
                <a href="mailto:hello@vytalbridge.com" className="flex items-center gap-2 hover:text-brand-teal transition-colors">
                  <Mail className="h-3.5 w-3.5 text-brand-teal" />
                  hello@vytalbridge.com
                </a>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-brand-teal" />
                  +268 76585309 (Clinical Advisory Inquiry)
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-brand-teal mt-0.5 flex-shrink-0" />
                  <span>Manzini Medical Centre, Ground Floor<br />Manzini, Eswatini</span>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-3 border-t border-brand-border/40 space-y-2">
                <span className="text-[10px] text-brand-light-teal uppercase font-bold tracking-wider block">Official Channels</span>
                <div className="flex items-center gap-3">
                  {/* WhatsApp */}
                  <a href="https://whatsapp.com/channel/0029Vb8DnCF6BIEe6WbIDA0E" target="_blank" rel="noopener noreferrer" title="WhatsApp Channel">
                    <svg className="h-4.5 w-4.5 fill-current text-brand-light-teal hover:text-emerald-500 transition-all hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.765.46 3.42 1.258 4.876L2 22l5.244-1.222A9.914 9.914 0 0012.004 22c5.522 0 10.002-4.478 10.002-10.002S17.525 2 12.004 2zm0 1.636c4.613 0 8.366 3.753 8.366 8.366s-3.753 8.366-8.366 8.366a8.318 8.318 0 01-4.28-1.17l-.307-.182-3.111.724.737-3.036-.2-.318A8.32 8.32 0 013.638 12c0-4.613 3.753-8.364 8.366-8.364zm-1.848 3.518a.636.636 0 00-.46.216c-.16.177-.61.597-.61 1.455s.624 1.688.71 1.808c.088.12 1.21 1.848 2.937 2.59.412.176.732.282.983.361.414.13.79.112 1.088.068.332-.05.624-.206.81-.412.188-.206.188-.382.188-.432 0-.05-.025-.088-.063-.106l-1.3-.642c-.063-.031-.137-.025-.2.012l-.563.702c-.075.093-.15.1-.263.043-.45-.226-1.025-.563-1.463-.956-.375-.337-.625-.75-.7-.875s-.012-.188.044-.244l.325-.375c.037-.05.05-.113.025-.175L10.743 7.3c-.063-.138-.138-.138-.2-.138-.057-.006-.113-.006-.387-.006z"/>
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a href="https://vt.tiktok.com/ZSX9XeNjt/" target="_blank" rel="noopener noreferrer" title="TikTok Profile">
                    <svg className="h-4.5 w-4.5 fill-current text-brand-light-teal hover:text-pink-500 transition-all hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14 1.02.99 2.44 1.53 3.86 1.61v3.86c-1.24-.08-2.47-.46-3.52-1.15-.35-.23-.68-.5-.98-.8v4.94c0 1.94-.49 3.86-1.54 5.39-1.2 1.63-3.13 2.69-5.12 2.89-2.31.18-4.65-.67-6.13-2.45C3.12 16.71 2.38 14.12 2.76 11.54c.39-2.28 1.83-4.32 3.9-5.26 1.41-.6 3-.72 4.51-.43v3.91c-.81-.19-1.68-.08-2.41.34-.84.45-1.42 1.34-1.52 2.29-.14 1.15.35 2.33 1.25 3.01.89.65 2.1.75 3.07.24.7-.35 1.15-1.07 1.2-1.85V.02z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/p/Da-eDQOAdL8/?igsh=cW9xaXczYnM0cWV3" target="_blank" rel="noopener noreferrer" title="Instagram Post">
                    <svg className="h-4.5 w-4.5 fill-none stroke-current text-brand-light-teal hover:text-rose-500 stroke-[2] stroke-linecap-round stroke-linejoin-round transition-all hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/vytal-bridge-158a60422/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BMWPjNyvdQ3Wd3OEqTQXL1g%3D%3D" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
                    <svg className="h-4.5 w-4.5 fill-none stroke-current text-brand-light-teal hover:text-blue-600 stroke-[2] stroke-linecap-round stroke-linejoin-round transition-all hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://www.facebook.com/share/1J79uV4atp/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" title="Facebook Page">
                    <svg className="h-4.5 w-4.5 fill-current text-brand-light-teal hover:text-blue-600 transition-all hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Legal Disclaimers & Useful Links Column */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-brand-heading uppercase tracking-wider">Legal Framework</h4>
              <div className="space-y-1 text-brand-text">
                <a href="#" className="hover:text-brand-teal flex items-center gap-1 py-0.5 transition-colors">
                  Privacy Policy <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
                <a href="#" className="hover:text-brand-teal flex items-center gap-1 py-0.5 transition-colors">
                  Terms of Service & Platform Licensing <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
                <a href="#" className="hover:text-brand-teal flex items-center gap-1 py-0.5 transition-colors">
                  HIPAA Security & Disclosure Statement <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
                <a href="#" className="hover:text-brand-teal flex items-center gap-1 py-0.5 transition-colors">
                  Institutional Review Board (IRB) Trials <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </div>
            </div>

          </div>

          {/* Strict Medical Disclaimer and Copyright */}
          <div className="border-t border-brand-border pt-8 space-y-4">
            <div className="bg-brand-dark border border-brand-border rounded-xl p-4 text-[11px] leading-relaxed max-w-5xl mx-auto text-brand-text" id="medical-disclaimer-box">
              <span className="font-semibold text-brand-heading uppercase block mb-1">⚠️ Medical Disclaimer & Scope of Service</span>
              Vytal Bridge is a software platform designed to gather digital patient-reported outcomes and synchronize remote sensor vitals. The platform is not a continuous critical care monitoring device, does not contain automated life-support triggers, and does not serve as an emergency response service. In the event of acute clinical symptoms, immediate labor pain, bleeding, or decreased fetal movement, patients must immediately contact emergency dispatch (e.g., 911 in the US) or present directly to the nearest labor triage facility.
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-brand-light-teal gap-2">
              <span>&copy; {new Date().getFullYear()} Vytal Bridge Inc. All rights reserved. Made for clinical safety.</span>
              <span className="flex items-center gap-1.5 text-brand-light-teal">
                <HelpCircle className="h-3.5 w-3.5 text-brand-teal" /> Need clinical pilot access? Contact our board.
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* Modular Demo Request Modal */}
      <DemoRequestModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      {/* Floating Clinical Support Chat Interface */}
      <SupportChat />

      {/* Non-intrusive Exit-Intent resource offer popup */}
      <ExitIntentPopup />

    </div>
  );
}
