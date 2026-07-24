import { Product, Testimonial, JournalArticle } from '../types';

export const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuA-VjCaZ5-98Cbzl_R36sOt4nxWMlz7PtwFVo87I4EnUtv2-aWBJVmEGRUkv_FhLWO7FZZhAkR5yjD1Ufh6gaDK834cZ2gWH_DO5e6T-8hLTF6arHskTM0L1INHjC2fxUC8Gc_wmomiNtTA1dgvJhJsbecvkdP0jqD7Ba-XBcdYzIq9cjJTMtHeAXIFpZ72RO5cjfH7HWhvLv6RjRmc4XQ25zDgP-mPFTbjCUDmYBWUS7UF3CVsEoLBnhhFdRo7vvSF2IdybfERC4w";

export const PRODUCTS: Product[] = [
  {
    id: 'daily-packs',
    name: 'Daily Essential Pack',
    category: 'daily-packs',
    subtitle: 'Cycle, Skin & Essential Vitality',
    price: 48.00,
    rating: 4.9,
    reviewsCount: 328,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVA2nO4VVkPPMMbFZTnvsTzFrSYBYnHgXpTPMLVX7xszqS9IXQ8HCs9cmNDHy17XYGhZ0Krf8E5P7c-WqQVbvRVDaHNVd1E9I48_ypi-wU5qbfasGeyrcByaAGePLxCkFbO2eUIOLIUS0RYrKydKEkpa8EL91uKLUuOEfJYT4yJJdV1yEoQ7ta9iPbaPtolFreV1xouWVDl1zM7cGFET3f8LWK7Ik8wF-qY3Zgdmfiy2EiNpC4Go17Fv-h67kgZaeTIyuZr2vkctc',
    description: 'A pre-portioned 30-day sachet system designed to support hormonal rhythm, cellular energy, and radiant skin from within.',
    ingredients: ['Activated Folate (Quatrefolic®)', 'Magnesium Glycinate', 'Organic Shatavari', 'Vitamin D3 + K2', 'Evening Primrose Oil'],
    benefits: ['Reduces PMS & cycle cramps', 'Enhances collagen & skin clarity', 'Balances mood & stress response'],
    dosage: 'Take 1 daily sachet with water after breakfast.',
    tag: 'Bestseller'
  },
  {
    id: 'sleep',
    name: 'Botanical Sleep Elixir',
    category: 'sleep',
    subtitle: 'Restorative Sleep & Nervous System Calming',
    price: 42.00,
    rating: 4.8,
    reviewsCount: 214,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtONXDGbrRO5AXSG4kk_J7lt6s6FBYtf5E2sJdSzpG7o4_eVf5PEn4UCE8X5IDHRwAwKhlZyBLqviz8WuW9MYn4P1w_2cA9nc0aZKpP_GNeSM5vrly-DFP62fehHBtuJ_MEjCY01wmNCR_ArfK3Pb_pqD25Kf_EuYv2-bv-svLqFa00WyyF4HY_1sOuCYyRquFYc2eAz-6Dx0mkRD_1WtuH5qhmbewnYOTCQgVWIJWKn_sl--ZyhCL5sJFlx7hhF_nE0zvjpR_tso',
    description: 'A concentrated herbal droplet formula infused with adaptogens to quiet racing thoughts and induce deep, non-groggy restorative REM sleep.',
    ingredients: ['Passionflower Extract', 'Organic Ashwagandha (KSM-66)', 'L-Theanine', 'Chamomile Distillate', 'Lemon Balm'],
    benefits: ['Fall asleep within 20 minutes', 'Wake up refreshed without grogginess', 'Soothes nighttime cortisol spikes'],
    dosage: '1ml under tongue 30 minutes before bed.',
    tag: 'Community Favorite'
  },
  {
    id: 'digestion',
    name: 'Gut Clarity Tonic',
    category: 'digestion',
    subtitle: 'Microbiome Support & Bloat Relief',
    price: 38.00,
    rating: 4.9,
    reviewsCount: 189,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOsrRcp_yvNGwz2Iz-T1yiZdU4PEfzYeL5cHJdciHC0RDOrfyXifj45koxPac_szgq9UfUqAkjSIAIvg_J56tnNWom7uzSS_JqT6n6OQ2cgq-FZc94STT2MV_i2yHa5XvbHLwb-i8kL-mXUubY4ou3WYBepYZ_IhZzte5HaZO-ycEIMuFHz8ZrCJjQ2mo4QbBBjortIbPeahhvTCLtPB183kt-J5bci5hK6HMMShlq9wVXy1uRNRimpUn_6C7_5jAtWBFVJU7FnLo',
    description: 'A soothing bio-fermented digestive enzyme and probiotic formula designed to relieve bloating, soothe gut irritation, and nourish good gut bacteria.',
    ingredients: ['Sprouted Ginger Root', 'Organic Fermented Lemon Peel', '15-Strain Spore Probiotics', 'Marshmallow Root', 'Dandelion Leaf'],
    benefits: ['Eliminates post-meal bloat', 'Supports optimal nutrient absorption', 'Promotes gut-skin axis harmony'],
    dosage: 'Mix 1 scoop with chilled water or herbal tea before main meal.',
    tag: 'Pure Clean'
  },
  {
    id: 'energy',
    name: 'Matcha Vitality Blend',
    category: 'energy',
    subtitle: 'Sustained Focus & Cellular Stamina',
    price: 44.00,
    rating: 4.9,
    reviewsCount: 267,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFCXVcQg7_a87NIatkeg2mNkV4KFhGrIjQ-M7Su8-653zIwjnaUW6MSh3UP7ZLG517iozv6xgsIZ8S0ELHPEJ2NbFscG91FI_nWFIJL-tY1F4JQiyMcsNsmJoEhWUPaJIc2gDc-1qNG-7XU4zJ8yEktgKKnumZfH423QdJBJBEpbzLjpBMqy7YZL2dLPkWVwW69dgTbr8abPZziOS-PEgf0_pzeKLy97unlMPVS5DMEpwo3rqY60rWZUO4L3gRQNuL_lvEXqf--Xc',
    description: 'Ceremonial grade Uji matcha combined with functional Cordyceps mushrooms and L-Theanine for steady, calm energy without jitters or crashes.',
    ingredients: ['First-Harvest Organic Ceremonial Matcha', 'Cordyceps Militaris Extract', 'L-Theanine', 'MCT Oil Powder'],
    benefits: ['4-6 hours clean, sustained focus', 'Zero caffeine crashes or jitters', 'Rich in antioxidant EGCG'],
    dosage: 'Whisk 1 tsp into warm water or oat milk every morning.',
    tag: 'Organic Harvest'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah C.',
    initials: 'SC',
    rating: 5,
    quote: 'My skin has never looked clearer. The daily packs are so convenient for my busy schedule.',
    role: 'Verified Buyer',
    verified: true,
    category: 'Daily Packs'
  },
  {
    id: 't2',
    name: 'James L.',
    initials: 'JL',
    rating: 5,
    quote: 'Finally found a sleep supplement that doesn\'t leave me groggy. Highly recommend PureForm.',
    role: 'Verified Buyer',
    verified: true,
    category: 'Sleep'
  },
  {
    id: 't3',
    name: 'Maya E.',
    initials: 'ME',
    rating: 5,
    quote: 'The quiz was surprisingly accurate. I feel so much more energized throughout the day.',
    role: 'Verified Buyer',
    verified: true,
    category: 'Energy'
  },
  {
    id: 't4',
    name: 'Elena R.',
    initials: 'ER',
    rating: 5,
    quote: 'My post-meal bloating completely vanished within a week. Truly transformative formulas.',
    role: 'Verified Buyer',
    verified: true,
    category: 'Digestion'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'j1',
    title: 'Nurturing your cycle with nature.',
    subtitle: 'Understanding the four infradian phases and how targeted botanicals support hormonal balance.',
    category: 'Featured Story',
    readTime: '4 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB24Rna-0q1p7fqRSvhZnH1MZ4xvAWzmd4JARdToGcQki7HYmIy-agZ2eG1fekgH_HkooAWZGmaaydv_2uFIlbPrgRHLJZiPg1gdcU8asm-SBh2mqnySs6EXgT5RVwLJ8h0p01WYwggJdLLmGBv8cJ0aIErMm9Wn8vrcMzW1Kd-D1ObSO4v67nWtVKcCOJRDn2ygF1qs53f_VTm_jsDZ1bhB4F-HWKncTOU5jz7-E6b17z7QNDi3AkbKM9JllvMIigNBRAkWIZ1c4',
    author: 'Dr. Evelyn Vance, Naturopathic Physician',
    content: [
      'The female monthly cycle consists of four distinct phases: Follicular, Ovulatory, Luteal, and Menstrual. Each phase brings shifting hormonal requirements that influence energy levels, mood, digestion, and skin vitality.',
      'In the Follicular phase, rising estrogen demands antioxidant support and B-vitamins to encourage follicle development and sustained energy. During the Luteal phase, progesterone peaks, often bringing fluid retention and mood shifts that respond wonderfully to Magnesium Glycinate and Shatavari.',
      'By aligning your daily supplement routine with your natural infradian rhythm, you work alongside your biology rather than against it, cultivating a state of effortless equilibrium.'
    ]
  },
  {
    id: 'j2',
    title: 'The PureForm Method',
    subtitle: 'Discover the science behind our bio-available ingredients and how we formulate for long-term health.',
    category: 'Formulation Science',
    readTime: '3 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-VjCaZ5-98Cbzl_R36sOt4nxWMlz7PtwFVo87I4EnUtv2-aWBJVmEGRUkv_FhLWO7FZZhAkR5yjD1Ufh6gaDK834cZ2gWH_DO5e6T-8hLTF6arHskTM0L1INHjC2fxUC8Gc_wmomiNtTA1dgvJhJsbecvkdP0jqD7Ba-XBcdYzIq9cjJTMtHeAXIFpZ72RO5cjfH7HWhvLv6RjRmc4XQ25zDgP-mPFTbjCUDmYBWUS7UF3CVsEoLBnhhFdRo7vvSF2IdybfERC4w',
    author: 'PureForm Science Lab',
    content: [
      'Standard synthetic vitamins often use low-grade salts that pass through the digestive tract largely unabsorbed. At PureForm, every ingredient is selected for maximum bio-identical absorption.',
      'We utilize activated folate (Quatrefolic®) instead of synthetic folic acid, chelated minerals that bypass gut irritations, and standardized herbal extracts verified by third-party HPLC testing.',
      'Our commitment is 100% transparency: no artificial fillers, no magnesium stearate, and no synthetic colorants.'
    ]
  }
];
