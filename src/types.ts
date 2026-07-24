export type CategoryId = 'daily-packs' | 'sleep' | 'digestion' | 'energy';

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  subtitle: string;
  price: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  dosage: string;
  tag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  rating: number;
  quote: string;
  role: string;
  verified: boolean;
  category: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  imageUrl: string;
  content: string[];
  author: string;
}

export interface QuizState {
  primaryGoal: string;
  cycleOrSleepDetails: string;
  diet: string;
  stressLevel: string;
  ageGroup: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
  topics: string[];
  frequency: string;
  subscribedAt: string;
}

