import React from "react";
import { ShieldCheck, Heart, Stethoscope, Users, Baby } from "lucide-react";

export default function MeetTheTeam() {
  const visuals = [
    {
      specialty: "Maternal-Fetal Telemetry",
      image: "/assets/images/dr_sarah_jenkins_1783952527348.jpg",
      icon: <Stethoscope className="h-4 w-4 text-brand-coral" />,
      tag: "Clinical Advisory"
    },
    {
      specialty: "Community Health Support",
      image: "/assets/images/dr_michael_ndlovu_1783952539509.jpg",
      icon: <Users className="h-4 w-4 text-brand-teal" />,
      tag: "Regional Care Outreach"
    }
  ];

  return (
    <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-10" id="meet-the-team-section">
      {/* Decorative gradient blur with custom soft pink and warm beige */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-pink/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-50px] w-64 h-64 bg-brand-light-pink/35 rounded-full filter blur-[80px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center md:text-left space-y-3 relative z-10">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-pink/20 text-brand-heading border border-brand-pink/30 uppercase tracking-wider">
          <Baby className="h-3.5 w-3.5 mr-1.5 text-brand-coral" /> Maternal & Infant Safety
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-heading tracking-tight">
          Clinical Oversight & Care Telemetry
        </h2>
        <p className="text-brand-light-teal text-sm sm:text-base max-w-2xl">
          Continuous, verified patient vitals monitoring backed by certified health technologies and newborn safety initiatives.
        </p>
      </div>

      {/* Grid of Team Members and Newborn Safety Initiative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Clinicians Column (8 Cols on large screens) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {visuals.map((member, idx) => (
            <div 
              key={idx}
              className="border border-brand-border/60 hover:border-brand-pink/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md group bg-brand-dark-card"
              id={`team-member-${idx}`}
            >
              <div className="space-y-4">
                {/* Image & Icon Frame */}
                <div className="relative h-64 w-full rounded-xl overflow-hidden bg-brand-dark border border-brand-border">
                  <img 
                    src={member.image} 
                    alt={member.specialty} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Translucent overlay pink corner */}
                  <div className="absolute bottom-2 right-2 bg-brand-dark-card/95 backdrop-blur-sm p-2 rounded-lg border border-brand-pink/30 shadow-sm flex items-center gap-1.5">
                    {member.icon}
                    <span className="text-[10px] font-bold text-brand-heading uppercase tracking-wide">{member.specialty}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-semibold bg-brand-pink/20 text-brand-heading border border-brand-pink/35 uppercase tracking-wider">
                    {member.tag}
                  </span>
                  <p className="text-xs text-brand-light-teal leading-relaxed pt-1">
                    Continuous monitoring support with real-time encrypted data streaming.
                  </p>
                </div>
              </div>

              {/* Verified badge */}
              <div className="mt-4 pt-3 border-t border-brand-border/30 flex items-center gap-1.5 text-[10px] text-brand-light-teal font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-teal" /> Verified Active Telemetry Node
              </div>
            </div>
          ))}
        </div>

        {/* Baby Focus Banner Column (4 Cols on large screens) */}
        <div className="lg:col-span-4 bg-brand-dark/40 border border-brand-pink/30 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
          {/* Subtle translucent pink background patterns */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-pink/20 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-pink text-brand-heading uppercase tracking-widest">
              Infant Safety Focus
            </span>
            <div className="relative h-48 w-full rounded-xl overflow-hidden border border-brand-pink/40 bg-brand-dark-card">
              <img 
                src="/assets/images/newborn_baby_pink_1783952552875.jpg" 
                alt="Newborn Baby Care" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h4 className="text-base font-semibold text-brand-heading">
              The Vytal Infant Protocol
            </h4>
            <p className="text-xs text-brand-text leading-relaxed">
              Our clinical scope extends seamlessly to neonatal transition. Continuous remote monitoring helps detect critical changes early, giving families and medical teams precious peace of mind.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-pink/30 flex items-center gap-1.5 text-[10px] text-brand-coral font-bold relative z-10 uppercase tracking-wider">
            <Heart className="h-3.5 w-3.5 fill-brand-coral text-brand-coral animate-pulse" /> Safeguarding the Next Generation
          </div>
        </div>

      </div>
    </div>
  );
}
