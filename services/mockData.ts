
import { Product, Category, Feedback } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Linear Knit Cardigan',
    description: 'A masterpiece of texture and form. Italian-spun wool in a structured silhouette.',
    price: 340.00,
    category: Category.FASHION,
    material: 'Italian Wool',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    reviews: 42,
    stock: 12
  },
  {
    id: '2',
    name: 'Oblique Leather Tote',
    description: 'Vegetable-tanned leather with architectural proportions and hidden magnetic closure.',
    price: 580.00,
    category: Category.FASHION,
    material: 'Leather',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200',
    rating: 4.7,
    reviews: 18,
    stock: 5
  },
  {
    id: '3',
    name: 'Santal No. 04',
    description: 'A cold, metallic opening that settles into a warm, creamy sandalwood base.',
    price: 185.00,
    category: Category.BEAUTY,
    material: 'Glass & Essence',
    image: 'https://images.unsplash.com/photo-1594125355945-813c9e992170?auto=format&fit=crop&q=80&w=1200',
    rating: 4.8,
    reviews: 156,
    stock: 25
  },
  {
    id: '4',
    name: 'Titanium Chrono',
    description: 'Ultra-lightweight titanium casing with a sapphire crystal face and minimal dial.',
    price: 950.00,
    category: Category.ELECTRONICS,
    material: 'Titanium',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1200',
    rating: 5.0,
    reviews: 24,
    stock: 3
  },
  {
    id: '5',
    name: 'Mono Frames',
    description: 'Hand-polished acetate in a classic rectangular shape with polarized lenses.',
    price: 220.00,
    category: Category.FASHION,
    material: 'Acetate',
    image: 'https://images.unsplash.com/photo-1511499767350-a1590fdb7318?auto=format&fit=crop&q=80&w=1200',
    rating: 4.6,
    reviews: 64,
    stock: 15
  },
  {
    id: '6',
    name: 'Brutalist Desk Lamp',
    description: 'Solid cast iron base with an adjustable brass arm. Pure functional form.',
    price: 310.00,
    category: Category.HOME,
    material: 'Cast Iron',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    reviews: 31,
    stock: 8
  }
];

export const MOCK_FEEDBACK: Feedback[] = [
  {
    id: 'f1',
    name: 'Alexander Sterling',
    role: 'Architect',
    quote: 'The attention to form and material is unparalleled. Vora has redefined my standard for daily objects.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'f2',
    name: 'Sophia Chen',
    role: 'Art Director',
    quote: 'Rarely do I find a marketplace that curates with such a specific, uncompromising vision. Truly exceptional.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'f3',
    name: 'Marcus Thorne',
    role: 'Collector',
    quote: 'The Santal No. 04 is a revelation. The scent is architectural, evolving beautifully throughout the day.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];
