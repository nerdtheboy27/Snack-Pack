import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SnackRecommendation } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment");
    throw new Error("API Key is missing. Please set process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSnackRecommendation = async (mood: string): Promise<SnackRecommendation> => {
  const ai = getAiClient();
  
  const prompt = `Suggest a creative, delicious, and modern snack based on this user mood/craving: "${mood}". 
  The snack should sound appetizing and fit a modern "foodie" startup vibe. 
  Provide a short description, estimated calories, 2-3 tags (e.g., 'Crunchy', 'Vegan', 'Sweet'), and a reason why it matches the mood.`;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "Creative name of the snack" },
      description: { type: Type.STRING, description: "Mouth-watering short description" },
      calories: { type: Type.NUMBER, description: "Estimated calories per serving" },
      tags: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "2-3 descriptive tags"
      },
      matchReason: { type: Type.STRING, description: "Why this fits the user's input" }
    },
    required: ["name", "description", "calories", "tags", "matchReason"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as SnackRecommendation;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};