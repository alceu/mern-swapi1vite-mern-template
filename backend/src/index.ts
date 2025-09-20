import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://root:password@localhost:27017')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

import routes from './routes';

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});