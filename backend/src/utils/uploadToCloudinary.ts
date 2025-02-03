/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import ApiError from '../error/ApiError';
import httpStatus from 'http-status';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Create Cloudinary storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bookkart',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
    resource_type: 'auto',
  } as any,
});

// File filter for image files only
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApiError( 'Only image files are allowed!',httpStatus.BAD_REQUEST,));
  }
};

// Configure Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

// Middleware for handling multiple image uploads
const uploadProductImages = upload.fields([
  { name: 'image', maxCount: 5 }, // Allow up to 5 images
]);

// Middleware to format cloudinary response
const formatCloudinaryResponse = (
  req: Express.Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || !('image' in req.files)) {
    return next();
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  req.body.image = files['image'].map((file: any) => file.path);
  next();
};

export const fileUpload = {
  uploadProductImages,
  formatCloudinaryResponse,
};