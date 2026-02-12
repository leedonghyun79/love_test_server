/**
 * 애플리케이션 전역 상수 정의
 */

/** Gemini AI 모델 설정 */
export const GEMINI_CONFIG = {
  model: 'gemini-2.5-flash',
  temperature: 0.7,
  maxOutputTokens: 2048,
};

/** 허용할 Origin 목록 */
export const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  '*',
];

// ============================================
// AI Analysis Prompts
// ============================================

/**
 * Love Relationship Analysis Prompt
 */
export const LOVE_ANALYSIS_PROMPT = (score: number, answers: any) => `
  You are an expert in relationship psychology and a warm, empathetic advisor.
  Analyze the following couple's relationship diagnosis score of '${score}' out of 100, and their detailed response data.
  Identify the psychological dynamics they are experiencing and provide personalized guidance.

  [DIAGNOSIS DATA]
  - Score: ${score}
  - Detailed Responses: ${JSON.stringify(answers)}

  [INSTRUCTIONS]
  - All content in the JSON fields must be written in Korean.
  - If the score is low, provide comfort and practical solutions.
  - If the score is high, provide warm encouragement and tips to maintain the healthy bond.
  - Response ONLY in the following JSON format. Do not include any markdown code blocks (like \`\`\`json) or conversational text outside the JSON.


  {
    "score": ${score},
    "summary": "Define the current relationship status in one pithy sentence in Korean",
    "analysis": "Provide a deep psychological analysis based on the responses in Korean (4-5 sentences)",
    "advice": "Give warm and specific advice to improve or maintain the relationship in Korean",
    "action_tip": "Suggest one small, immediately actionable habit or action for today in Korean"
  }
`;
