import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Clock, User, ArrowRight, ShieldCheck, Heart, Sparkles, X, ChevronRight } from "lucide-react";

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  date: string;
  badge: string;
  color: string;
}

const INSIGHTS_ARTICLES: Article[] = [
  {
    id: "preeclampsia-prevention",
    category: "Safety Guide",
    title: "Preeclampsia Prevention: Smart Vitals to Monitor at Home",
    excerpt: "Learn which physiological changes in the second and third trimesters serve as silent indicators of gestational hypertension.",
    content: [
      "Preeclampsia is a serious blood pressure disorder that typically begins after 20 weeks of pregnancy. It affects up to 8% of pregnancies globally and remains a leading cause of maternal mortality, particularly in resource-limited clinics.",
      "Because preeclampsia can develop silently with few obvious symptoms, home monitoring of key physiological vitals has become a cornerstone of preventative obstetrics. At Vytal Bridge, our research highlights three specific indicators that expecting mothers and remote teams should watch:",
      "1. Systolic and Diastolic Blood Pressure: A sudden spike—specifically above 140/90 mmHg—is the most clear diagnostic criteria. Regular daily spot-checking is essential.",
      "2. Rapid Swelling or Weight Shifts: Sudden fluid retention, especially in the face and hands, is a major clinical warning sign.",
      "3. Rest Heart Rate Volatility: High continuous resting pulse rates can indicate systemic vascular resistance.",
      "By connecting clinical-grade home sensors directly to our decentralized database, Vytal Bridge ensures that your local ob-gyn receives an automated alert the moment these markers drift, buying valuable days for intervention."
    ],
    author: {
      name: "Dr. Evelyn Ramirez",
      role: "Chief of OB/GYN, Vytal Board",
      avatar: "🩺"
    },
    readTime: "5 min read",
    date: "July 10, 2026",
    badge: "Clinical Alert",
    color: "brand-pink"
  },
  {
    id: "newborn-safety",
    category: "Neonatal Care",
    title: "The Crucial First Hours: Newborn Care & Vitals Networks",
    excerpt: "How continuous pulse oximetry and non-invasive temperature mapping secure the fragile neonate transition.",
    content: [
      "The transition from intrauterine life to the external environment is the most physically challenging journey a human will ever make. For newborns, the first 24 to 72 hours are highly critical for respiratory and thermal adaptation.",
      "Remote care telemetry during this postpartum transition drastically reduces neonatal complications by highlighting issues before they manifest as acute distress:",
      "• Pulse Oximetry (SpO2): Monitoring blood oxygen saturation helps detect Congenital Heart Disease (CCHD) and silent respiratory hypoxia early.",
      "• Thermal Control: Neonates lose heat rapidly. Subtle skin temperature mapping alerts caregivers to hypothermia, which otherwise drains calories and triggers metabolic stress.",
      "Our trials in the Manzini Medical Centre focus on placing lightweight, comfortable clinical wraps on newborns, bridging continuous infant data directly to regional neonatologists."
    ],
    author: {
      name: "Dr. Thabo Dlamini",
      role: "Neonatal Specialist, Manzini Health",
      avatar: "👶"
    },
    readTime: "4 min read",
    date: "June 28, 2026",
    badge: "Neonatal Focus",
    color: "brand-teal"
  },
  {
    id: "maternal-trial-eswatini",
    category: "Case Study",
    title: "Gestational Hypertension: Bridging Care Gaps in Eswatini",
    excerpt: "A deep dive into our ongoing clinical trials in Manzini, testing remote telemetry against rural healthcare barriers.",
    content: [
      "In many parts of Southern Africa, expectant mothers must travel hours over rugged terrain to reach secondary healthcare facilities for simple blood pressure assessments.",
      "Vytal Bridge is actively deploying remote monitoring nodes across Manzini, Eswatini. This case study details how cellular-enabled home health units have changed local outcomes:",
      "By putting simple, solar-rechargeable monitoring devices into mothers' hands, we bypassed the geographic barriers. In our pilot of 120 expectant mothers:",
      "• Over 14 silent hypertensive crises were successfully intercepted and managed.",
      "• Average travel times to simple diagnostic checkups fell by 70%.",
      "• Emergency hospitalizations dropped, as care teams could coordinate mild medication therapies early.",
      "Building trust and saving lives is more than a slogan—it is a measurable outcome of linking continuous, decentralized telemetry directly to physicians."
    ],
    author: {
      name: "Sister Temalangeni Nxumalo",
      role: "Lead Trial Coordinator",
      avatar: "📋"
    },
    readTime: "6 min read",
    date: "June 15, 2026",
    badge: "Trial Outcomes",
    color: "brand-coral"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 90,
    }
  }
};

export default function MaternalInsights() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="space-y-10" id="maternal-insights-section">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-brand-teal text-xs font-semibold uppercase tracking-wider bg-brand-teal/10 px-3 py-1.5 rounded-full border border-brand-teal/20">
            <BookOpen className="h-3 w-3" />
            <span>Maternal Health Insights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-heading tracking-tight">
            Clinical Knowledge & Authority
          </h2>
          <p className="text-brand-text text-sm max-w-2xl">
            Read medical insights, preventative safety guides, and Eswatini clinical trial updates vetted directly by our clinical advisory board.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-brand-dark border border-brand-border px-3.5 py-1.5 rounded-xl text-xs text-brand-light-teal">
          <ShieldCheck className="h-4 w-4 text-brand-teal" />
          <span>Vetted by Medical Professionals</span>
        </div>
      </div>

      {/* Card Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {INSIGHTS_ARTICLES.map((article, idx) => (
          <motion.div
            key={article.id}
            variants={cardVariants}
            className="bg-brand-dark-card border border-brand-border/60 hover:border-brand-pink/60 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group relative overflow-hidden"
            id={`insight-card-${article.id}`}
          >
            {/* Soft decorative background glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-pink/5 rounded-full filter blur-xl pointer-events-none group-hover:bg-brand-pink/10 transition-all" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-brand-light-teal uppercase tracking-widest bg-brand-dark px-2.5 py-1 rounded-md border border-brand-border">
                  {article.category}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-semibold bg-brand-pink text-brand-heading uppercase tracking-wider">
                  {article.badge}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-serif font-bold text-brand-heading leading-snug group-hover:text-brand-coral transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-brand-text leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-brand-border/40 flex flex-col gap-4">
              {/* Author profile and reading time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-brand-dark border border-brand-border flex items-center justify-center text-sm shadow-inner">
                    {article.author.avatar}
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-brand-heading leading-none">{article.author.name}</h5>
                    <p className="text-[9px] text-brand-light-teal mt-0.5 leading-none">{article.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-[10px] text-brand-light-teal font-mono">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Action Trigger */}
              <button
                onClick={() => setSelectedArticle(article)}
                className="w-full bg-brand-dark hover:bg-brand-teal hover:text-white border border-brand-border text-brand-heading py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <span>Read Full Insight</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Quote Accent */}
      <div className="bg-brand-dark/40 border border-brand-border rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-coral animate-pulse" />
          <span className="text-brand-text">
            Do you publish research? Join our clinical review panel or submit clinical briefs.
          </span>
        </div>
        <a 
          href="mailto:hello@vytalbridge.com"
          className="text-brand-teal hover:text-brand-coral font-bold flex items-center gap-1 transition-colors"
        >
          <span>Contact Clinical Board</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Reading Article Modal (Overlay) */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-brand-dark/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-brand-dark-card border border-brand-border rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl relative z-10 flex flex-col"
              id="article-detail-modal"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-border/60 flex justify-between items-start gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-brand-light-teal uppercase tracking-widest bg-brand-dark px-2 py-0.5 rounded border border-brand-border">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-brand-heading leading-snug">
                    {selectedArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 hover:bg-brand-dark text-brand-light-teal hover:text-brand-heading rounded-lg border border-transparent hover:border-brand-border transition-all cursor-pointer flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 text-xs text-brand-text leading-relaxed">
                {/* Author profile block */}
                <div className="bg-brand-dark/50 border border-brand-border/40 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-center text-lg">
                      {selectedArticle.author.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brand-heading">{selectedArticle.author.name}</h4>
                      <p className="text-[10px] text-brand-light-teal">{selectedArticle.author.role}</p>
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-brand-light-teal/80 space-y-0.5 font-semibold font-mono text-left sm:text-right">
                    <div>Published: {selectedArticle.date}</div>
                    <div>Duration: {selectedArticle.readTime}</div>
                  </div>
                </div>

                {selectedArticle.content.map((paragraph, i) => (
                  <p key={i} className="text-xs text-brand-text leading-relaxed font-normal">
                    {paragraph}
                  </p>
                ))}

                <div className="bg-brand-teal/5 border border-brand-teal/20 p-4 rounded-xl flex items-start gap-3 mt-8">
                  <Heart className="h-4 w-4 text-brand-teal flex-shrink-0 mt-0.5 fill-brand-teal/20" />
                  <div className="space-y-1">
                    <h5 className="text-[11px] font-bold text-brand-heading">Patient Care Connection</h5>
                    <p className="text-[10px] text-brand-light-teal">
                      This informative guide serves our public clinical outreach. Secure continuous remote care queue registrations are currently enrolling expecting mothers in Southern Africa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-brand-dark/50 border-t border-brand-border/60 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white text-xs font-bold py-2 px-5 rounded-xl cursor-pointer shadow-sm transition-all"
                >
                  Close Insight
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
