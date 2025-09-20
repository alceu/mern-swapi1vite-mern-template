
import express, { Request, Response } from 'express';
import {
  registerSearchQuery,
  getTopFiveQueries,
} from '../../services/SearchStatsService';

const router = express.Router();

// POST /api/stats/search
router.post('/search', async (req: Request, res: Response) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    await registerSearchQuery(query);
    res.status(200).json({ message: 'Query registered successfully' });
  } catch (error) {
    console.error('Error registering search query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/stats/top-searches
router.get('/top-searches', async (req: Request, res: Response) => {
  try {
    const topFive = await getTopFiveQueries();
    res.status(200).json(topFive);
  } catch (error) {
    console.error('Error fetching top five queries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
