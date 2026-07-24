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

export interface OrderTrackingStep {
  status: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  imageUrl: string;
  quantity: number;
  price: number;
  isSubscription: boolean;
}

export interface DetailedOrder {
  id: string;
  date: string;
  estimatedDelivery?: string;
  status: 'Processing' | 'Formulating' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  carrier: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  trackingSteps: OrderTrackingStep[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  memberSince: string;
  tier: string;
  streakDays: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
  topics: string[];
  frequency: string;
  subscribedAt: string;
}

