import {
  Briefcase,
  Crown,
  Gem,
  Heart,
  HeartPulse,
  Home,
  KeyRound,
  Laptop,
  Music,
  Paintbrush,
  Plane,
  Scissors,
  Shield,
  ShieldCheck,
  Sparkles,
  Wind,
  type LucideIcon,
} from 'lucide-react';

export type Category = {
  name: string;
  slug: string;
  description: string;
  Icon: LucideIcon;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: string;
  affiliateLink: string;
  isFeatured?: boolean;
  attributes: {
    brand?: string;
    skinType?: 'Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'Normal';
    mood?: 'Relaxing' | 'Energizing' | 'Focus';
    safetyLevel?: 'Low' | 'Medium' | 'High';
    vibe?: 'Chic' | 'Natural' | 'Bold';
    quietLevel?: 'Silent' | 'Whisper-Quiet' | 'Moderate';
    power?: 'Battery' | 'Rechargeable' | 'Wired';
    material?: 'Silicone' | 'Stainless Steel' | 'ABS Plastic';
  };
};

export const categories: Category[] = [
  {
    name: 'Makeup',
    slug: 'makeup',
    description: 'Enhance your features with top-rated cosmetics.',
    Icon: Paintbrush,
  },
  {
    name: 'Skincare',
    slug: 'skincare',
    description: 'Nourish your skin for a radiant, healthy glow.',
    Icon: Sparkles,
  },
  {
    name: 'Haircare',
    slug: 'haircare',
    description: 'Achieve your best hair day, every day.',
    Icon: Scissors,
  },
  {
    name: 'Lingerie',
    slug: 'lingerie',
    description: 'Feel confident and sexy with our curated lingerie collections.',
    Icon: Gem,
  },
  {
    name: 'Heels',
    slug: 'heels',
    description: 'Step up your style with the perfect pair of heels.',
    Icon: Crown,
  },
  {
    name: 'Fragrance',
    slug: 'fragrance',
    description: 'Discover your signature scent from curated collections.',
    Icon: Wind,
  },
  {
    name: 'Pleasure',
    slug: 'pleasure',
    description: 'Explore and enhance your personal pleasure and intimacy.',
    Icon: HeartPulse,
  },
  {
    name: 'Wellness',
    slug: 'wellness',
    description: 'Invest in your well-being with self-care essentials.',
    Icon: Heart,
  },
  {
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Music, Books, and Games for your leisure.',
    Icon: Music,
  },
  {
    name: 'Travel Getaways',
    slug: 'travel-getaways',
    description: 'Escape and recharge with our curated travel picks.',
    Icon: Plane,
  },
  {
    name: 'Sexual Protection/Awareness',
    slug: 'sexual-protection-awareness',
    description:
      'Prioritize your health with essential protection and awareness resources.',
    Icon: ShieldCheck,
  },
  {
    name: 'Safety Tools',
    slug: 'safety-tools',
    description: 'Compact and effective tools for personal security.',
    Icon: KeyRound,
  },
  {
    name: 'Home Security',
    slug: 'home-security',
    description: 'Protect your space with smart and simple solutions.',
    Icon: Home,
  },
  {
    name: 'Digital Safety',
    slug: 'digital-safety',
    description: 'Secure your online presence and data.',
    Icon: Laptop,
  },
  {
    name: 'Self-Defense',
    slug: 'self-defense',
    description: 'Empower yourself with knowledge and training.',
    Icon: Shield,
  },
  {
    name: 'Entrepreneurial',
    slug: 'entrepreneurial',
    description: 'Tools and resources for the aspiring female entrepreneur.',
    Icon: Briefcase,
  },
];

export const products: Record<string, Product[]> = {
  makeup: [
    {
      id: 'mu1',
      name: 'Radiant Glow Foundation',
      image: 'https://placehold.co/400x400',
      price: 45.0,
      rating: 4.8,
      isFeatured: true,
      reviews: "Love this foundation! It's lightweight but gives great coverage. It doesn't feel cakey at all and lasts all day. The shade match was perfect for me. Some users say it oxidizes a little, so maybe get a shade lighter.",
      affiliateLink: '#',
      attributes: { brand: 'GlowUp', skinType: 'Combination', vibe: 'Natural' },
    },
    {
      id: 'mu2',
      name: 'Velvet Kiss Lipstick',
      image: 'https://placehold.co/400x400',
      price: 28.0,
      rating: 4.5,
      reviews: "The color is so rich and vibrant. It feels very comfortable on the lips. It's not completely transfer-proof, but it wears off gracefully. A true matte finish without being too drying.",
      affiliateLink: '#',
      attributes: { brand: 'LuxeLips', vibe: 'Bold', material: 'ABS Plastic' },
    },
  ],
  skincare: [
    {
      id: 'sc1',
      name: 'Hydra-Boost Serum',
      image: 'https://placehold.co/400x400',
      price: 75.0,
      rating: 4.9,
      isFeatured: true,
      reviews: 'A game changer for my dry skin. It absorbs quickly and my skin feels so plump and hydrated. I use it morning and night. A bit pricey, but a little goes a long way.',
      affiliateLink: '#',
      attributes: { brand: 'DermaPure', skinType: 'Dry', mood: 'Relaxing' },
    },
    {
      id: 'sc2',
      name: 'Clarifying Clay Mask',
      image: 'https://placehold.co/400x400',
      price: 35.0,
      rating: 4.6,
      reviews: "Great for my oily, acne-prone skin. It really helps to clear out my pores without stripping my skin. I use it once a week. Some people with sensitive skin found it a bit too strong.",
      affiliateLink: '#',
      attributes: { brand: 'ClearSkin', skinType: 'Oily' },
    },
  ],
  'safety-tools': [
    {
      id: 'st1',
      name: 'Defender Personal Alarm',
      image: 'https://placehold.co/400x400',
      price: 29.99,
      rating: 4.9,
      isFeatured: true,
      reviews: "It's incredibly loud! Small enough to fit on my keychain. Gives me peace of mind when walking alone at night. The pin is easy to pull but won't come out accidentally. The flashlight is a nice bonus.",
      affiliateLink: '#',
      attributes: { brand: 'SafeGuard', safetyLevel: 'High', power: 'Battery', material: 'ABS Plastic' },
    },
    {
      id: 'st2',
      name: 'Tactical Defense Pen',
      image: 'https://placehold.co/400x400',
      price: 22.5,
      rating: 4.7,
      reviews: "A sturdy, well-made pen that writes smoothly. The glass breaker tip is solid. It's discreet and doesn't draw attention. A great everyday carry tool for an extra layer of safety.",
      affiliateLink: '#',
      attributes: { brand: 'ArmorInk', safetyLevel: 'Medium', material: 'Stainless Steel' },
    },
  ],
  // Add mock products for other categories
  haircare: [],
  fragrance: [],
  wellness: [],
  'travel-getaways': [],
  'home-security': [],
  'digital-safety': [],
  'self-defense': [],
  lingerie: [],
  heels: [],
  pleasure: [],
  'sexual-protection-awareness': [],
  entrepreneurial: [],
  entertainment: [],
};
