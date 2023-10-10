import mongoose, { Model } from "mongoose";

export type IUserAndLogin = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  phone?: number;
  country?: string;
  address?: string;
  city?: string;
  postcode?: number;
  googleId?: string;
  facebookId?: string;
  otp: string;
};
export type ILoginAndUserResponse = {
  email?: string;
  accessToken: string;
};
export type ILoginAndUserResponseVerify = {
  email?: string;
};

export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUserAndLogin>;

// export type UserModel = Model<IUserAndLogin, Record<string, unknown>>;
