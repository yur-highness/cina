import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables.");
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateChatResponse = async (
  userMessage: string, 
  history: { role: 'user' | 'model', text: string }[]
): Promise<string> => {
  const client = getClient();
  if (!client) return "I'm sorry, I cannot connect to the AI service right now. Please check your API key.";

  try {
    const formattedHistory = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      history: formattedHistory,
      config: {
        systemInstruction: `You are 'CineBot', a helpful and enthusiastic movie expert assistant for the CineSphere booking platform. 
        Your goal is to help users find movies, decide what to watch, and answer questions about cinema.
        - Keep answers concise and engaging.
        - If asked for recommendations, suggest 3 distinct options with a brief reason.
        - You can simulate knowing about the 'current' movies playing in CineSphere (Cyber Horizon, The Last Alchemist, etc.) if the user asks what is playing.
        - Be polite and fun.`
      }
    });

    const response = await chat.sendMessage({ message: userMessage });
    return response.text || "I'm speechless! Could you try asking that again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble processing your request right now.";
  }
};