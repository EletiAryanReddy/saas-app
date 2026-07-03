import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const generateAIResponse = async (
  prompt: string,
  workspaceId?: string,
  userId?: string
) => {
  try {
    const completion =
      await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });
   
    return (
      completion.choices[0]?.message?.content ||
      "No response generated"
    );
  } catch (error) {
    console.error(error);
    throw new Error("OpenRouter AI Error");
  }
};

export const getAIHistory = async () => {
  return [];
};