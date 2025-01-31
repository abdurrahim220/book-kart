import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config';
import cookiesParser from 'cookie-parser';
import notFound from './middleware/notFoun';
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: config.fronted_url,
    credentials: true,
  }),
);
app.use(cookiesParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

app.use(notFound);

export default app;
