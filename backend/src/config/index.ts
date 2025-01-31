import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  fronted_url: process.env.FRONTED_URL,
  NODE_ENV: process.env.NODE_ENV,
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
  jWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  jWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
};
