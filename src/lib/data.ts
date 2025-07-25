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
  title: string;
  image: string;
  author: string;
  publishedDate: string;
  excerpt: string;
  href: string;
  isFeatured?: boolean;
  aiHint?: string;
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
    slug: 'hair',
    description: 'Achieve your best hair day, every day.',
    Icon: Scissors,
  },
  {
    name: 'Lingerie',
    slug: 'lingerie-bids',
    description: 'Feel confident and sexy with our curated lingerie collections.',
    Icon: Gem,
  },
  {
    name: 'Heels',
    slug: 'heels-bids',
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
    slug: 'travel-deals',
    description: 'Escape and recharge with our curated travel picks.',
    Icon: Plane,
  },
  {
    name: 'Sexual Protection/Awareness',
    slug: 'protection',
    description:
      'Prioritize your health with essential protection and awareness resources.',
    Icon: ShieldCheck,
  },
  {
    name: 'Safety Tools',
    slug: 'safety-bids',
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
      title: 'Mastering the Smoky Eye: A Step-by-Step Guide',
      image: 'https://placehold.co/800x600',
      author: 'Glamour Guru',
      publishedDate: '2024-05-15',
      excerpt: "The smoky eye is a timeless look that adds instant drama and sophistication. In this guide, we'll break down the technique into simple, easy-to-follow steps for a flawless finish every time.",
      href: '#',
      isFeatured: true,
      aiHint: 'smoky eye makeup'
    },
    {
      id: 'mu2',
      title: 'The Ultimate Guide to Finding Your Perfect Foundation Shade',
      image: 'https://placehold.co/600x400',
      author: 'Alex Rey',
      publishedDate: '2024-05-10',
      excerpt: "Finding the right foundation shade can be a game-changer. Say goodbye to guesswork with our comprehensive guide to understanding undertones and testing shades.",
      href: '#',
      aiHint: 'foundation shades'
    },
  ],
  skincare: [
    {
      id: 'sc1',
      title: 'Building a Skincare Routine for Glowing Skin',
      image: 'https://placehold.co/800x600',
      author: 'Dr. Evelyn Reed',
      publishedDate: '2024-05-20',
      excerpt: 'A consistent skincare routine is the secret to radiant, healthy skin. Learn the essential steps and products you need to build a routine that works for you, from cleansing to sun protection.',
      href: '#',
      isFeatured: true,
      aiHint: 'skincare routine'
    },
  ],
  'safety-bids': [
     {
      id: 'st3',
      title: 'Top 5 Micro-Compact Firearms for Personal Safety',
      image: 'https://placehold.co/800x600',
      author: 'Chris Kyle',
      publishedDate: '2024-05-01',
      excerpt: 'When it comes to personal protection, size and reliability matter. We review the top 5 micro-compact firearms on the market, focusing on ease of use, concealability, and safety features for responsible owners.',
      href: '#',
      aiHint: 'compact handgun'
    },
    {
      id: 'st1',
      title: 'Traveling Solo? Essential Self-Defense Tips for Women',
      image: 'https://placehold.co/600x800',
      author: 'Samantha Jones',
      publishedDate: '2024-04-28',
      excerpt: "Exploring the world on your own is an empowering experience. Boost your confidence with these practical self-defense tips and situational awareness techniques for female solo travelers.",
      href: '#',
      isFeatured: true,
      aiHint: 'solo traveler'
    },
  ],
  pleasure: [
    {
      id: 'pl1',
      title: '5 Must-Have Pleasure Accessories for Ultimate Self-Care',
      image: 'https://placehold.co/800x600',
      author: 'Dr. Ruth',
      publishedDate: '2024-04-25',
      excerpt: 'Self-care goes beyond bubble baths and face masks. Explore our top 5 pleasure accessories designed to enhance your intimacy and personal well-being, because you deserve it.',
      href: '#',
      isFeatured: true,
      aiHint: 'silk sheets'
    },
  ],
  entertainment: [
    {
      id: 'en1',
      title: 'Book Review: "Circe" by Madeline Miller',
      image: 'https://placehold.co/600x800',
      author: 'Literary Lori',
      publishedDate: '2024-05-18',
      excerpt: 'A deep dive into Madeline Miller\'s "Circe," a powerful and mesmerizing retelling of the Greek goddess\'s story of self-discovery, strength, and finding her own power in a world of gods and mortals.',
      href: '#',
      aiHint: 'ancient scroll'
    },
     {
      id: 'en2',
      title: 'Top 10 Travel Games for Your Next Road Trip',
      image: 'https://placehold.co/800x600',
      author: 'Gamer Gabby',
      publishedDate: '2024-05-12',
      excerpt: 'Long drives don\'t have to be boring. Keep everyone entertained with our list of the top 10 games to play in the car, from classic license plate challenges to modern app-based trivia.',
      href: '#',
      aiHint: 'playing cards'
    },
  ],
  'travel-deals': [
     {
      id: 'td1',
      title: 'Top 25 Road Trip Accessories You Need This Summer',
      image: 'https://placehold.co/1200x800',
      author: 'Wanderlust Wendy',
      publishedDate: '2024-05-22',
      excerpt: "Hitting the open road? Don't leave home without these essentials. We've compiled a list of the top 25 road trip accessories, highlighting 10 must-haves for a comfortable, safe, and unforgettable journey.",
      href: '#',
      isFeatured: true,
      aiHint: 'open road'
    },
    {
      id: 'td2',
      title: 'America\'s Local Eats: 25 Hidden Gems Across the US',
      image: 'https://placehold.co/1200x800',
      author: 'Foodie Frank',
      publishedDate: '2024-05-19',
      excerpt: 'Forget the big chains. We\'re taking you on a culinary tour of America\'s best-kept secrets, from a legendary burger joint in California (Bunz) to a crawfish shack in Vegas (Hot and Juicy). Your tastebuds will thank you.',
      href: '#',
      aiHint: 'diner sign'
    },
  ],
  hair: [],
  fragrance: [],
  wellness: [],
  'home-security': [],
  'digital-safety': [],
  'self-defense': [],
  'lingerie-bids': [],
  'heels-bids': [],
  protection: [],
  entrepreneurial: [],
};
