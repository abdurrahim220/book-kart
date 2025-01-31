export type ILoginResponse = {
    accessToken: string;
    refreshToken?: string;
    user: {
      _id: string;
      email: string;
      role: string;
    };
  };
  
  export type ILoginPayload = {
    email: string;
    password: string;
  };
  
  export type IRefreshTokenPayload = {
    refreshToken: string;
  };