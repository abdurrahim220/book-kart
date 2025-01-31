import mongoose from 'mongoose';
import { config } from './config';
import app from './app';

const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connected');
  } catch (error) {
    console.log('Failed to connect database', error);
    process.exit(1);
  }
};

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

connectDB();
