import mongoose from 'mongoose';
import { config } from './config';
import app from './app';
import { createSuperAdmin } from './db';

const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    createSuperAdmin();
    console.log('📦 Connected to database');
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  }
};

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});

connectDB();
