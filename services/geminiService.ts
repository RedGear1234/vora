import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

declare var process: {
  env: {
    API_KEY: string;
  };
};

export const geminiService = {
  async getShoppingAdvice(userQuery: string, availableProducts: Product[]) {
    // Initialize right before making the call to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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

    // Access .text property directly
    return response.text || "I'm sorry, I'm unable to provide shopping advice at the moment.";
  },

  async generateProductDescription(productName: string, category: string) {
    // Initialize right before making the call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a compelling, professional e-commerce description for a product named "${productName}" in the "${category}" category. Focus on benefits and quality. Keep it under 150 characters.`,
    });
    // Access .text property directly
    return response.text || "";
  },

  async suggestSimilarProducts(productId: string, allProducts: Product[]) {
    const target = allProducts.find(p => p.id === productId);
    if (!target) return [];

    // Initialize right before making the call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
      // Access .text property directly
      const jsonStr = response.text?.trim() || "[]";
      const ids = JSON.parse(jsonStr);
      return allProducts.filter(p => ids.includes(p.id));
    } catch (e) {
      return allProducts.slice(0, 3);
    }
  }
};