import status from 'http-status';
import ApiError from '../../error/ApiError';
import { Cart } from '../cart/cart.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { razorpay } from '../../utils/razorpay';
import { config } from '../../config';
import crypto from 'crypto';

const createOrUpdateOrder = async (userId: string, payload: IOrder) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    throw new ApiError('Cart is empty', status.BAD_REQUEST);
  }

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.product.finalPrice * item.quantity,
    0,
  );

  let order = await Order.findOne({ user: userId, paymentStatus: 'pending' });
  if (order) {
    order.orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));
    order.totalAmount = totalAmount;
    order.shippingAddress = payload.shippingAddress;
    order.paymentMethod = payload.paymentMethod;
    order.paymentDetails = payload.paymentDetails;
    order.productStatus = 'processing';
  } else {
    order = new Order({
      user: userId,
      orderItems: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      paymentStatus: 'pending',
      totalAmount,
      paymentDetails: payload.paymentDetails,
      productStatus: 'processing',
    });
  }
  await order.save();
  if (order.paymentStatus === 'success') {
    await Cart.findOneAndDelete({ user: userId });
  }
  return order;
};

const getAllOrders = async () => {
  const orders = await Order.find()
    .populate('user')
    .populate('orderItems.product');
  return orders;
};
const getOrderById = async (id: string) => {
  const orders = await Order.findById(id)
    .populate('user')
    .populate('orderItems.product');
  if (!orders) {
    throw new ApiError('Order not found', status.NOT_FOUND);
  }
  return orders;
};

const createPaymentWithRazorpay = async (id: string) => {
  const orders = await Order.findById(id);

  if (!orders) {
    throw new ApiError('Order not found', status.NOT_FOUND);
  }
  const razorPayOrder = await razorpay.orders.create({
    amount: Math.round(orders.totalAmount * 100),
    currency: 'INR',
    receipt: orders._id.toString(),
  });
  return razorPayOrder;
};

const handleRazorPayWebHook = async (payload: any, signature: string) => {
  const secret = config.rAZORPAY_WEBHOOK_SECRET_KEY as string;

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(payload));
  const digest = shasum.digest('hex');

  if (digest !== signature) {
    throw new Error('Invalid signature, webhook request not verified');
  }

  const payment_id = payload.payment.entity.id;
  const orderId = payload.payment.entity.order_id;

  await Order.updateOne(
    { 'paymentDetails.razorpay_order_id': orderId },
    {
      $set: {
        paymentStatus: 'success',
        productStatus: 'processing',
        'paymentDetails.razorpay_payment_id': payment_id,
      },
    },
  );
};

export const OrderService = {
  createOrUpdateOrder,
  getAllOrders,
  getOrderById,
  createPaymentWithRazorpay,
  handleRazorPayWebHook,
};
