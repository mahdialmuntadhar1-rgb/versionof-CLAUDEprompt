import { GoogleGenAI } from "@google/genai";
import { CuratedEvent } from "../types";

const key = process.env.GEMINI_API_KEY || null;
const ai = key ? new GoogleGenAI({ apiKey: key }) : null;

export async function generateCuratedEvents(
  city: string,
  language: string
): Promise<CuratedEvent[]> {
  if (!ai) {
    console.warn("Gemini API key not found. Returning mock events.");
    return [
      {
        id: 'e1',
        eventName: 'Baghdad Food Festival',
        city: 'Baghdad',
        governorate: 'Baghdad',
        suggestedDate: 'March 15-20',
        description: 'A celebration of Iraqi culinary heritage in the heart of the capital.',
        category: 'Food',
        aiCurated: true
      },
      {
        id: 'e2',
        eventName: 'Erbil Tech Summit',
        city: 'Erbil',
        governorate: 'Erbil',
        suggestedDate: 'April 5',
        description: 'Connecting innovators and entrepreneurs across the Kurdistan region.',
        category: 'Technology',
        aiCurated: true
      }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 4 fictional but highly realistic upcoming events for the city of ${city} in Iraq. 
      Return the response as a JSON array of objects with these fields:
      id (string), eventName (string), city (string), governorate (string), suggestedDate (string), description (string), category (string).
      The language of the content should be ${language === 'en' ? 'English' : language === 'ar' ? 'Arabic' : 'Kurdish'}.
      Ensure aiCurated is true for all.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const events = JSON.parse(response.text) as CuratedEvent[];
    return events.map(e => ({ ...e, aiCurated: true }));
  } catch (error) {
    console.error("Error generating events:", error);
    return [];
  }
}
