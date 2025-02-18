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
  super_admin_name: process.env.SUPER_ADMIN_NAME,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  super_admin_phone: process.env.SUPER_ADMIN_PHONE,
  super_admin_profile_picture: process.env.SUPER_ADMIN_PROFILE_PICTURE,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_callback_uri: process.env.GOOGLE_CALLBACK_URL,
};
