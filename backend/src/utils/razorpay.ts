import Razorpay from 'razorpay';
import { config } from '../config';

export const razorpay = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID as string,
  key_secret: config.RAZORPAY_KEY_SECRET as string,
});
