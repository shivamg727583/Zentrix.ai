import openai from "../configs/openai.js";

export const generateText = async ({
  systemPrompt,
  userPrompt,
  maxTokens = 500,
}) => {
  const response = await openai.chat.completions.create({
    model: "gemini-3-flash-preview",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: maxTokens,
  });

  return response.choices?.[0]?.message?.content || "";
};