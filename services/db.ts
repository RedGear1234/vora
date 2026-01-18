
import { Product, Feedback } from '../types';
import { INITIAL_PRODUCTS, MOCK_FEEDBACK } from './mockData';

/**
 * Simulates a MongoDB interaction layer.
 * You can replace these implementations with real fetch() calls to your 
 * Node/MongoDB backend in the future.
 */
export const db = {
  // Simulate GET /api/products
  async getProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(INITIAL_PRODUCTS), 400); // Simulate network latency
    });
  },

  // Simulate GET /api/products/:id
  async getProductById(id: string): Promise<Product | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = INITIAL_PRODUCTS.find(p => p.id === id);
        resolve(product);
      }, 300);
    });
  },

  // Simulate GET /api/feedback
  async getFeedback(): Promise<Feedback[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_FEEDBACK), 500);
    });
  },

  // Simulate GET /api/search?q=...
  async searchProducts(query: string): Promise<Product[]> {
    return new Promise((resolve) => {
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
