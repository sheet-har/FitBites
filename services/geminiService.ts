
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, SnackData } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }



  async analyzeFatReplacement(snack: SnackData): Promise<AnalysisResult> {
    if (!this.ai) {
      console.warn("Gemini AI not initialized: Missing API Key");
      return {
        comparison: "The FitBites replacement focuses on using healthier fats like MCTs and plant-based alternatives.",
        suggestions: ["Natural Greek Yogurt", "Fresh Berries", "Handful of Walnuts"],
        healthTip: "Prioritize fats from whole plants like avocados and seeds for sustained energy.",
        estimatedCalories: 150
      };
    }
    const prompt = `Analyze this snack for fat quality: 
      Name: ${snack.name}
      Ingredients: ${snack.ingredients.join(', ')}
      Fat Quality: Normal Fat ${snack.normalFat}g vs FitBites Replaced Fat ${snack.replacedFat}g.
      
      Provide a comparative analysis, 3 healthy alternatives or swap suggestions, a quick health tip, and an estimated calorie count per serving.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              comparison: { type: Type.STRING, description: 'Comparison of fats' },
              suggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 healthy snack swap suggestions'
              },
              healthTip: { type: Type.STRING, description: 'One short health tip' },
              estimatedCalories: { type: Type.NUMBER, description: 'Estimated calorie count per serving' }
            },
            required: ['comparison', 'suggestions', 'healthTip', 'estimatedCalories']
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return {
        comparison: "The FitBites replacement significantly reduces trans-fats and saturated fats compared to standard options.",
        suggestions: ["Natural Greek Yogurt", "Fresh Berries", "Handful of Walnuts"],
        healthTip: "Prioritize fats from whole plants like avocados and seeds for sustained energy.",
        estimatedCalories: 150
      };
    }
  }
}

export const geminiService = new GeminiService();
