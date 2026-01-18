import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

declare var process: {
  env: {
    API_KEY: string;
  };
};

const apiKey = (process.env.API_KEY as string) || '';
const ai = new GoogleGenAI({ apiKey });

export const geminiService = {
  async getShoppingAdvice(userQuery: string, availableProducts: Product[]) {
    const productsContext = availableProducts.map(p => 
      `${p.name} ($${p.price}) - ${p.description}`
    ).join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful shopping assistant for Vora Market. 
      Users will ask questions about products. Recommend the best items from our inventory.
      
      Inventory:
      ${productsContext}
      
      User Question: ${userQuery}`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  },

  async generateProductDescription(productName: string, category: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a compelling, professional e-commerce description for a product named "${productName}" in the "${category}" category. Focus on benefits and quality. Keep it under 150 characters.`,
    });
    return response.text;
  },

  async suggestSimilarProducts(productId: string, allProducts: Product[]) {
    const target = allProducts.find(p => p.id === productId);
    if (!target) return [];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on the product "${target.name}" (${target.category}), select exactly 3 similar product IDs from this list:
      ${allProducts.map(p => `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}`).join('\n')}
      
      Return ONLY the IDs as a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    try {
      const ids = JSON.parse(response.text.trim());
      return allProducts.filter(p => ids.includes(p.id));
    } catch (e) {
      return allProducts.slice(0, 3);
    }
  }
};