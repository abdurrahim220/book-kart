import { Types } from "mongoose"

export type IWhishList={
    user:Types.ObjectId;
    products:Types.ObjectId[];
}

