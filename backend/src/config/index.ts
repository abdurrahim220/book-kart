import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  fronted_url: process.env.FRONTED_URL,
  NODE_ENV: process.env.NODE_ENV,
};
