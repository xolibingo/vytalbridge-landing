import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp 
} from "firebase/firestore";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  User as FirebaseUser
} from "firebase/auth";
import { db, auth } from "./firebase";

export interface FirestoreWaitlist {
  id?: string;
  name: string;
  email: string;
  role: string;
  signupDate: string;
  position: number;
  referrals: number;
  referralCode: string;
  timestamp: any;
}

export interface FirestoreSubscriber {
  id?: string;
  email: string;
  signupDate: string;
  timestamp: any;
}

export interface SentEmail {
  id?: string;
  recipient: string;
  subject: string;
  body: string;
  type: "waitlist_welcome" | "newsletter_confirmation" | "account_creation";
  timestamp: any;
  status: "dispatched" | "delivered";
}

// Helper to request the actual backend server to dispatch real emails
async function sendActualEmail(recipient: string, subject: string, body: string, type: string) {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: recipient, subject, body, type })
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to post email to SMTP server proxy endpoint:", err);
    return null;
  }
}

// Global real-time state listeners
export function listenToWaitlist(callback: (list: FirestoreWaitlist[]) => void) {
  const q = query(collection(db, "waitlist"), orderBy("position", "asc"));
  return onSnapshot(q, (snapshot) => {
    const list: FirestoreWaitlist[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() } as FirestoreWaitlist);
    });
    callback(list);
  }, (error) => {
    console.error("Error listening to waitlist:", error);
  });
}

export function listenToSubscribers(callback: (list: FirestoreSubscriber[]) => void) {
  return onSnapshot(collection(db, "subscribers"), (snapshot) => {
    const list: FirestoreSubscriber[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() } as FirestoreSubscriber);
    });
    callback(list);
  }, (error) => {
    console.error("Error listening to subscribers:", error);
  });
}

export function listenToSentEmails(callback: (list: SentEmail[]) => void) {
  const q = query(collection(db, "sent_emails"), orderBy("timestamp", "desc"));
  return onSnapshot(q, (snapshot) => {
    const list: SentEmail[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() } as SentEmail);
    });
    callback(list);
  }, (error) => {
    console.error("Error listening to sent emails:", error);
  });
}

// Add Waitlist Entry with simulated SMTP email dispatch + actual email delivery request
export async function addWaitlistEntry(name: string, email: string, role: string, referrals = 0) {
  // Check if already registered
  const q = query(collection(db, "waitlist"), where("email", "==", email.toLowerCase().trim()));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const existingDoc = snap.docs[0];
    return { id: existingDoc.id, ...existingDoc.data() } as FirestoreWaitlist;
  }

  // Get current size to calculate next position
  const allSnap = await getDocs(collection(db, "waitlist"));
  const position = allSnap.size + 1;

  const initials = name.replace(/[^a-zA-Z0-9\s]/g, "").substring(0, 3).toUpperCase() || "VYT";
  const referralCode = `${initials}${Math.floor(100 + Math.random() * 900)}`;

  const entryData = {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    role,
    signupDate: new Date().toISOString().split('T')[0],
    position,
    referrals,
    referralCode,
    timestamp: Timestamp.now()
  };

  const docRef = await addDoc(collection(db, "waitlist"), entryData);

  const subject = "Welcome to the Vytal Bridge Maternal Queue 🌸";
  const body = `Hello ${name},\n\nYour clinical maternal care queue slot has been secured. Your position is #${position}.\n\nShare your custom referral code to bypass 3 people per referral: ${window.location.origin}?ref=${referralCode}\n\nOur team is active in Manzini, Eswatini. Support line: +268 76585309.\n\nWarmly,\nThe Vytal Bridge Clinical Team`;

  // 1. Post to the actual server-side SMTP dispatcher
  const emailRes = await sendActualEmail(email.toLowerCase().trim(), subject, body, "waitlist_welcome");
  const isSmtpSuccess = emailRes && emailRes.mode === "smtp";

  // 2. Trigger persistent record for SMTP UI console log display
  await addDoc(collection(db, "sent_emails"), {
    recipient: email.toLowerCase().trim(),
    subject,
    body,
    type: "waitlist_welcome",
    timestamp: Timestamp.now(),
    status: isSmtpSuccess ? "delivered" : "dispatched"
  });

  return { id: docRef.id, ...entryData } as FirestoreWaitlist;
}

// Add Newsletter Subscriber with actual email dispatch request
export async function addSubscriber(email: string) {
  const cleanEmail = email.toLowerCase().trim();
  const q = query(collection(db, "subscribers"), where("email", "==", cleanEmail));
  const snap = await getDocs(q);
  if (!snap.empty) {
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as FirestoreSubscriber;
  }

  const subData = {
    email: cleanEmail,
    signupDate: new Date().toISOString().split('T')[0],
    timestamp: Timestamp.now()
  };

  const docRef = await addDoc(collection(db, "subscribers"), subData);

  const subject = "Subscribed to Vytal Bridge Clinical Dispatch 🩺";
  const body = `Hello,\n\nThank you for subscribing to Vytal Bridge's clinical research and maternal trial dispatches.\n\nYou will receive official briefs directly to your inbox at ${cleanEmail}.\n\nIf you represent a clinical facility in Eswatini or Southern Africa, feel free to reply to coordinate a sandbox dashboard demo.\n\nBest regards,\nVytal Bridge Research Division`;

  // 1. Post to the actual server-side SMTP dispatcher
  const emailRes = await sendActualEmail(cleanEmail, subject, body, "newsletter_confirmation");
  const isSmtpSuccess = emailRes && emailRes.mode === "smtp";

  // 2. Trigger persistent record for SMTP UI console log display
  await addDoc(collection(db, "sent_emails"), {
    recipient: cleanEmail,
    subject,
    body,
    type: "newsletter_confirmation",
    timestamp: Timestamp.now(),
    status: isSmtpSuccess ? "delivered" : "dispatched"
  });

  return { id: docRef.id, ...subData } as FirestoreSubscriber;
}

// Custom Auth with user collection profile matching and actual email dispatch
export async function registerUserAccount(email: string, password: string, name: string, role: string) {
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const user = credential.user;

  // Update profile name
  await updateProfile(user, { displayName: name.trim() });

  // Save profile to users collection
  const profileData = {
    uid: user.uid,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    role,
    createdAt: Timestamp.now()
  };

  await addDoc(collection(db, "users"), profileData);

  const subject = "Your Vytal Bridge Clinical Portal Account Created 🛡️";
  const body = `Welcome ${name},\n\nYour clinical dashboard and secure credential set has been successfully registered on Vytal Bridge.\n\nAccount Role: ${role}\nClinical Sandbox: Active\n\nPlease ensure your device adheres to HIPAA workstation rules before launching active telemetry screens.\n\nBest,\nSecurity Operations & Telemetry Node`;

  // 1. Post to actual server-side SMTP dispatcher
  const emailRes = await sendActualEmail(email.toLowerCase().trim(), subject, body, "account_creation");
  const isSmtpSuccess = emailRes && emailRes.mode === "smtp";

  // 2. Send registration confirmation email
  await addDoc(collection(db, "sent_emails"), {
    recipient: email.toLowerCase().trim(),
    subject,
    body,
    type: "account_creation",
    timestamp: Timestamp.now(),
    status: isSmtpSuccess ? "delivered" : "dispatched"
  });

  return user;
}

export async function loginUserAccount(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return credential.user;
}

export async function logoutUserAccount() {
  await signOut(auth);
}

export async function addDemoRequest(clinicName: string, contactName: string, email: string, phoneNumber: string, notes: string) {
  const requestData = {
    clinicName: clinicName.trim(),
    contactName: contactName.trim(),
    email: email.toLowerCase().trim(),
    phoneNumber: phoneNumber.trim(),
    notes: notes.trim(),
    timestamp: Timestamp.now()
  };
  const docRef = await addDoc(collection(db, "demo_requests"), requestData);

  const subject = "Vytal Bridge Sandbox Demo Request Confirmed 🗓️";
  const body = `Hello ${contactName},\n\nWe have received your institutional sandbox demonstration request for ${clinicName}.\n\nOur advisory board has allocated a sandbox trial node. A specialist will call you at ${phoneNumber} within 24 hours.\n\nWarm regards,\nClinical Trials Coordinator`;

  // 1. Post to actual server-side SMTP dispatcher for the requester
  const emailRes = await sendActualEmail(email.toLowerCase().trim(), subject, body, "newsletter_confirmation");
  const isSmtpSuccess = emailRes && emailRes.mode === "smtp";

  // Trigger simulated email dispatch for institutional trial confirmation
  await addDoc(collection(db, "sent_emails"), {
    recipient: email.toLowerCase().trim(),
    subject,
    body,
    type: "newsletter_confirmation",
    timestamp: Timestamp.now(),
    status: isSmtpSuccess ? "delivered" : "dispatched"
  });

  // 2. Also send notification email to Bingosamu@gmail.com
  const adminSubject = `🚨 New Demo Request: ${clinicName.trim()}`;
  const adminBody = `A new clinic dashboard demo request has been submitted on Vytal Bridge.\n\n` +
    `Details of Request:\n` +
    `- Clinic Name: ${clinicName.trim()}\n` +
    `- Contact Person: ${contactName.trim()}\n` +
    `- Contact Email: ${email.toLowerCase().trim()}\n` +
    `- Contact Phone: ${phoneNumber.trim()}\n` +
    `- Integration Notes: ${notes.trim() || "None provided"}\n\n` +
    `Please follow up with them at your earliest convenience.`;

  const adminEmailRes = await sendActualEmail("Bingosamu@gmail.com", adminSubject, adminBody, "newsletter_confirmation");
  const isAdminSmtpSuccess = adminEmailRes && adminEmailRes.mode === "smtp";

  await addDoc(collection(db, "sent_emails"), {
    recipient: "Bingosamu@gmail.com",
    subject: adminSubject,
    body: adminBody,
    type: "newsletter_confirmation",
    timestamp: Timestamp.now(),
    status: isAdminSmtpSuccess ? "delivered" : "dispatched"
  });

  return docRef.id;
}
