import { jsPDF } from "jspdf";

/**
 * Generates and downloads a beautifully branded, clinical-standard PDF of the 
 * Vytal Bridge Pregnancy Care Tips Guide with full visual styling.
 */
export function generatePregnancyGuidePDF() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // A4 size: 210 x 297 mm
  
  // 1. Draw Brand Outer Border
  doc.setDrawColor(18, 94, 93); // #125E5D deep clinical teal-green
  doc.setLineWidth(0.8);
  doc.rect(8, 8, 194, 281);

  // 2. Premium Header Card Accent
  doc.setFillColor(10, 47, 29); // #0A2F1D deep obsidian pine-green
  doc.rect(10, 10, 190, 36, "F");

  // Subtle Header Decorative line
  doc.setFillColor(224, 77, 118); // #E04D76 vivid pink/coral indicator accent
  doc.rect(10, 46, 190, 1.5, "F");

  // 3. Header Branding Text
  doc.setTextColor(255, 255, 255);
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.text("VYTAL BRIDGE CLINICAL DISPATCH", 16, 21);
  
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(235, 247, 238); // #EBF7EE fresh light mint green
  doc.text("HIPAA Compliant Remote Patient Telemetry and Maternal Care Platform", 16, 27);
  doc.text("Manzini Medical Centre, Ground Floor, Manzini, Eswatini", 16, 32);
  
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(224, 77, 118); // Highlight coral
  doc.text("OFFICIAL HEALTH RESOURCE • ISSUED JULY 2026", 16, 39);

  // 4. Document Title Section
  doc.setTextColor(10, 47, 29); // obsidian green
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(13);
  doc.text("MATERNAL CARE GUIDE: SAFE PREGNANCY VITALS TIPS", 14, 58);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(80, 111, 93); // #506F5D Calm sage green
  doc.text("Compiled by the Vytal Bridge Board of Clinical Advisors and Maternal-Fetal Specialists", 14, 63);

  // 5. Grid/Sections content
  let y = 74;
  const margin = 14;
  const width = 182;

  function addSection(title: string, points: string[]) {
    // Draw small indicator box
    doc.setFillColor(18, 94, 61); // deep botanical green
    doc.rect(margin, y - 3.5, 3, 3.5, "F");

    // Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(18, 94, 61);
    doc.text("  " + title, margin + 1, y);
    y += 6;

    // Bullet points
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(34, 44, 38); // #222C26 Dark charcoal
    
    points.forEach(point => {
      const splitText = doc.splitTextToSize("•  " + point, width - 4);
      doc.text(splitText, margin + 2, y);
      y += (splitText.length * 4.5) + 2.5;
    });
    y += 2;
  }

  addSection("1. Hydration & Vitals Tracking", [
    "Keep hydration levels exceptionally high. Aim for 2.5 to 3.0 liters of clean water daily to support active placental blood flow and amniotic fluid levels.",
    "Monitor your blood pressure daily at the same time. Normal reference readings should be below 120/80 mmHg.",
    "Contact your clinical midwife team immediately if your systolic blood pressure rises above 140 mmHg or your diastolic blood pressure rises above 90 mmHg."
  ]);

  addSection("2. Nutrition & Micronutrients Support", [
    "Prioritize natural folate-rich foods (spinach, lentils, asparagus, citrus) and continuous medical iron supplementation under professional OB/GYN advice.",
    "Avoid all raw, unpasteurized, or undercooked animal products to completely eliminate high risks of listeriosis or toxoplasmosis."
  ]);

  addSection("3. Continuous Telemetry Awareness", [
    "Remote vital logging allows your primary healthcare providers to detect subtle symptoms of stress or pre-eclampsia before physical warning signs become acute.",
    "Keep your wearable sync monitors active, fully charged, and near your mobile bridge node during active daylight hours."
  ]);

  addSection("4. Red Flag Symptoms (Seek Emergency Care Immediately)", [
    "Sudden, severe headaches that do not resolve with standard paracetamol medication.",
    "Visual anomalies (temporary blurring, flashing lights, floating spots, or sudden light sensitivity).",
    "Sudden, severe swelling of the face, hands, fingers, or ankles (indicates blood volume fluid shifts).",
    "Decreased fetal movement (less than 10 fetal kicks or distinct movements in a continuous 2-hour window after 28 weeks gestation)."
  ]);

  // 6. Professional Footer Accent Cards
  y = 258;
  doc.setDrawColor(228, 223, 217); // #E4DFD9 warm organic border
  doc.setLineWidth(0.4);
  doc.line(12, y, 198, y);
  y += 4.5;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(224, 77, 118); // Coral red alert text
  doc.text("⚠️ EMERGENCY DISCLAIMER SCOPE OF SERVICE:", 12, y);
  y += 3.5;

  doc.setFont("Helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(80, 111, 93); // Sage green subtext
  doc.text("Vytal Bridge is a software platform and not an emergency triage monitor or automatic life-support dispatcher.", 12, y);
  y += 3;
  doc.text("If you experience acute bleeding, constant abdominal pain, or suspect labor has started, present directly to your nearest hospital.", 12, y);
  
  y += 5.5;
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(10, 47, 29); // Deep dark forest text
  doc.text("Web: vytalbridge.com  |  Tel: +268 76585309  |  Email: hello@vytalbridge.com  |  Manzini, Eswatini", 12, y);

  // 7. Save and trigger native user client download
  doc.save("Vytal_Bridge_Pregnancy_Care_Tips_Guide.pdf");
}
