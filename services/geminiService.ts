import { GoogleGenAI, Type } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

// Fix: Use process.env.API_KEY to align with coding guidelines and resolve environment variable access issues.
const apiKey = process.env.API_KEY;

if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey });

const articleSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A compelling, headline-worthy title for the fashion article."
    },
    content: {
      type: Type.STRING,
      description: "The full article content, written in markdown format. It should be 6-8 paragraphs long, insightful, and engaging."
    },
    imagePrompt: {
      type: Type.STRING,
      description: "A short, artistic, and descriptive prompt for an AI image generator to create a header image. Example: 'A minimalist studio shot of a futuristic chrome handbag, soft lighting, neutral background'."
    }
  },
  required: ["title", "content", "imagePrompt"],
};

export const generateArticleContent = async (topic: string): Promise<{ title: string; content: string; imagePrompt: string; }> => {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Write a fashion article about: ${topic}`,
    config: {
      systemInstruction: "You are a fashion journalist for a high-end, minimalist publication named 'ENNUI'. Your tone is sophisticated, sharp, and insightful. Write a detailed article (6-8 paragraphs) in markdown. The output must be a single JSON object matching the provided schema.",
      responseMimeType: "application/json",
      responseSchema: articleSchema,
    },
  });

  const jsonText = response.text.trim();
  try {
    const articleData = JSON.parse(jsonText);
    if (!articleData.title || !articleData.content || !articleData.imagePrompt) {
        throw new Error("Generated JSON is missing required fields.");
    }
    return articleData;
  } catch (e) {
      console.error("Failed to parse JSON from Gemini:", jsonText);
      throw new Error("Received invalid JSON from the AI model.");
  }
};

export const generateArticleImage = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: `A sophisticated, editorial fashion photograph in the style of Ennui Atelier. The image should be minimalist, with soft natural lighting, a shallow depth of field, and a neutral, warm color palette (e.g., beige, cream, soft grey). Focus on texture and clean lines. ${prompt}`,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '4:3',
    },
  });
  
  if (response.generatedImages && response.generatedImages.length > 0) {
    // Fix: Correctly access the imageBytes property via the nested image object.
    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  }
  
  throw new Error("Image generation failed or returned no images.");
};