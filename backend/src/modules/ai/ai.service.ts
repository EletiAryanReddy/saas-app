import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export const generateAIResponse = async (
  prompt: string,
  workspaceId?: string,
  userId?: string
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error(error);
    throw new Error("Gemini AI Error");
  }
};

export const getAIHistory = async () => {
  return [];
};