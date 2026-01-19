import { Product, Feedback } from '../types';
import { INITIAL_PRODUCTS, MOCK_FEEDBACK } from './mockData';

/**
 * ARCHITECTURE FOR MONGODB INTEGRATION:
 * 
 * 1. BACKEND: Create a Node.js/Express server (e.g., in a /server folder).
 * 2. DATABASE: Use Mongoose to connect to your MongoDB Atlas cluster.
 * 3. SCHEMA: Define a Product schema that matches the Product interface in types.ts.
 * 4. API: Create endpoints:
 *    - GET /api/products
 *    - GET /api/products/:id
 *    - GET /api/search?q=...
 * 
 * 5. FRONTEND: Replace the implementations below with real fetch() calls.
 *    Example: return fetch('/api/products').then(res => res.json());
 */

export const db = {
  // Simulate GET /api/products
  async getProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      // Swap this with: return fetch('/api/products').then(res => res.json());
      setTimeout(() => resolve(INITIAL_PRODUCTS), 400); 
    });
  },

  // Simulate GET /api/products/:id
  async getProductById(id: string): Promise<Product | undefined> {
    return new Promise((resolve) => {
      // Swap this with: return fetch(`/api/products/${id}`).then(res => res.json());
      setTimeout(() => {
        const product = INITIAL_PRODUCTS.find(p => p.id === id);
        resolve(product);
      }, 300);
    });
  },

  // Simulate GET /api/feedback
  async getFeedback(): Promise<Feedback[]> {
    return new Promise((resolve) => {
      // Swap this with: return fetch('/api/feedback').then(res => res.json());
      setTimeout(() => resolve(MOCK_FEEDBACK), 500);
    });
  },

  // Simulate GET /api/search?q=...
  async searchProducts(query: string): Promise<Product[]> {
    return new Promise((resolve) => {
      // Swap this with: return fetch(`/api/search?q=${encodeURIComponent(query)}`).then(res => res.json());
      setTimeout(() => {
        const q = query.toLowerCase();
        const results = INITIAL_PRODUCTS.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
        resolve(results);
      }, 600);
    });
  }
};