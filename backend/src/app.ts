import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config';
import cookieParser from 'cookie-parser';

import notFound from './middleware/notFoun';
import globalErrorHandler from './middleware/globalErrorHandler';
import router from './router';
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: config.fronted_url,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
