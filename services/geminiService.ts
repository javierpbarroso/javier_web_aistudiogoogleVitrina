
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDescription = async (itemName: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escribe una descripción publicitaria corta y atractiva (máximo 150 caracteres) para un artículo llamado "${itemName}" que pertenece a la categoría "${category}". Enfócate en sus beneficios.`,
    });
    return response.text || "No se pudo generar una descripción.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Descripción generada automáticamente para " + itemName;
  }
};
