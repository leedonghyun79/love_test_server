import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG, LOVE_ANALYSIS_PROMPT } from '../config/constants';

let genAI: GoogleGenerativeAI | null = null;

if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  WARNING: GEMINI_API_KEY is not set in environment variables');
} else {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

export interface AnalyzeLoveParams {
  score: number;
  answers: any;
}

export interface LoveAnalysisResult {
  score: number;
  summary: string;
  analysis: string;
  advice: string;
  action_tip: string;
}

/**
 * 관계 진단 분석 API
 */
export async function analyzeLove(params: AnalyzeLoveParams): Promise<LoveAnalysisResult> {
  if (!genAI) {
    throw new Error('Gemini API가 초기화되지 않았습니다. GEMINI_API_KEY를 .env 파일에 설정해주세요.');
  }

  const { score, answers } = params;
  const model = genAI.getGenerativeModel({ model: GEMINI_CONFIG.model });

  const prompt = LOVE_ANALYSIS_PROMPT(score, answers);

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.substring(firstBrace, lastBrace + 1);
    }

    return JSON.parse(text) as LoveAnalysisResult;
  } catch (error: any) {
    console.error('Error analyzing love:', error);
    throw new Error(`관계 분석 중 오류가 발생했습니다: ${error.message || error}`);
  }
}
