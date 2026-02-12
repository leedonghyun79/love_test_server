import { Router, Request, Response } from 'express';
import { analyzeLove } from '../services/geminiService';

const router = Router();

/**
 * POST /api/ai/analyze-love
 */
router.post('/analyze-love', async (req: Request, res: Response): Promise<void> => {
  try {
    const { score, answers } = req.body;

    if (score === undefined || !answers) {
      res.status(400).json({
        success: false,
        message: '진단 점수와 응답 데이터를 제공해주세요.'
      });
      return;
    }

    const analysis = await analyzeLove({ score, answers });

    res.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in analyze-love:', error);
    res.status(500).json({
      success: false,
      message: error.message || '분석 중 오류가 발생했습니다.'
    });
  }
});

export default router;
