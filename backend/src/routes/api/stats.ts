
import express, { Request, Response } from 'express';
import {
  registerSearchQuery,
  getTopFiveQueries,
} from '../../services/SearchStatsService';

const router = express.Router();

// POST /api/stats/search
router.post('/search', (req: Request, res: Response) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  registerSearchQuery(query);
  res.status(200).json({ message: 'Query registered successfully' });
});

// GET /api/stats/top-searches
router.get('/top-searches', (req: Request, res: Response) => {
  const topFive = getTopFiveQueries();
  res.status(200).json(topFive);
});

export default router;
