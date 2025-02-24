import { IUser } from "../module/user/user.interface";

export interface IGoogleAuthResponse {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  }