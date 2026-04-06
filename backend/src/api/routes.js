import express from 'express';
import { recommendDestination, generatePlanning, extractSummary } from '../agents/travelAgent.js';

const router = express.Router();

// 目的地推荐
router.post('/destination/recommend', async (req, res) => {
  try {
    const { types, budget, season } = req.body;

    if (!types || !budget || !season) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const result = await recommendDestination({ types, budget, season });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 行程规划
router.post('/planning/generate', async (req, res) => {
  try {
    const { destination, days, budget, preferences } = req.body;

    if (!destination || !days || !budget) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const result = await generatePlanning({ destination, days, budget, preferences });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 攻略摘要
router.post('/summary/extract', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Missing content' });
    }

    const result = await extractSummary({ content });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;