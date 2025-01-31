import jwt from 'jsonwebtoken'
import { IUser } from '../module/user/user.interface'
import { config } from '../config'


export const generateToken = (user:IUser):string=>{
    return jwt.sign({userId:user?._id},config.jWT_REFRESH_SECRET as string)
}