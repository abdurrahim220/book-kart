import { Types } from "mongoose";

export type IWishList = {
  user: Types.ObjectId;
  products: Types.ObjectId[];
};