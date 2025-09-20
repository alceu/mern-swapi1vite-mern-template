import express from 'express';
import statsRouter from './stats';

const apiRouter = express.Router();

apiRouter.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

apiRouter.use('/stats', statsRouter);

export default apiRouter;
