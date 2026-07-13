export interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  role: 'expecting-mother' | 'healthcare-professional' | 'partner' | 'other';
  signupDate: string;
  position: number;
  referrals: number;
  referralCode: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl?: string;
  rating: number;
  verified: boolean;
}

export interface FeatureDetail {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  badge: string;
  visualMockup: string;
}
