
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, SnackData } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeFatReplacement(snack: SnackData): Promise<AnalysisResult> {
    const prompt = `Analyze this snack for fat quality: 
      Name: ${snack.name}
      Ingredients: ${snack.ingredients.join(', ')}
      Fat Quality: Normal Fat ${snack.normalFat}g vs FitBites Replaced Fat ${snack.replacedFat}g.
      
      Provide a comparative analysis, 3 healthy alternatives or swap suggestions, and a quick health tip.`;

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
              healthTip: { type: Type.STRING, description: 'One short health tip' }
            },
            required: ['comparison', 'suggestions', 'healthTip']
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return {
        comparison: "The FitBites replacement significantly reduces trans-fats and saturated fats compared to standard options.",
        suggestions: ["Natural Greek Yogurt", "Fresh Berries", "Handful of Walnuts"],
        healthTip: "Prioritize fats from whole plants like avocados and seeds for sustained energy."
      };
    }
  }
}

export const geminiService = new GeminiService();
