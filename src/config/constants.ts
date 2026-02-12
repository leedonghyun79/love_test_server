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
      당신은 관계 심리학 전문가이자 따뜻한 조언가입니다. 두 사람의 관계 온도 진단 결과 점수인 '${score}'점과 
      상세 응답 데이터를 분석하여, 현재 이 커플이 겪고 있는 심리적 역동을 파악하고 맞춤형 조언을 제공해주세요.

      [진단 점수]: ${score}점
      [상세 응답]: ${JSON.stringify(answers)}

      반드시 아래 JSON 형식으로만 응답해주세요.
      모든 값은 한국어로 작성해야 하며, 점수가 낮을 때는 위로와 해결책을, 점수가 높을 때는 격려와 유지 팁을 담아주세요.
      JSON 외에 어떠한 설명이나 마크다운 코드블럭도 포함하지 마십시오.

      {
        "score": ${score},
        "summary": "현재 관계 상태를 한 줄로 정의 (예: 서로의 마음을 확인하고 싶은 '소강상태')",
        "analysis": "응답에 기반한 심층 관계 분석 (4-5문장)",
        "advice": "관계 개선을 위한 따뜻하고 구체적인 조언",
        "action_tip": "오늘 당장 실천할 수 있는 작은 행동 팁"
      }
    `;
