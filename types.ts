
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  material: string;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  isAiGenerated?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Feedback {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export enum Category {
  ELECTRONICS = 'Electronics',
  FASHION = 'Fashion',
  HOME = 'Home & Living',
  BEAUTY = 'Beauty',
  SPORTS = 'Sports'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
