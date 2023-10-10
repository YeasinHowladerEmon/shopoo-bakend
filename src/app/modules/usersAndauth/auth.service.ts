import { ObjectId } from "mongodb";
import { JwtPayload, Secret } from "jsonwebtoken";

import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  ILoginAndUserResponse,
  ILoginAndUserResponseVerify,
  IUserAndLogin
} from "./auth.interface";
import { User } from "./auth.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { bcryptHelpers } from "../../../helpers/bcrycptHelpers";
import sendOTPToUserEmail from "../../../utils/nodeMailer";
import generateRandomOTP from "../../../utils/randomOtp";

//stored data some times for verify user's
interface IPendingRegistration {
  payload: IUserAndLogin;
  otp: string;
}

const pendingRegistrations = new Map<string, IPendingRegistration>();
//
const createUser = async (
  payload: IUserAndLogin
): Promise<ILoginAndUserResponseVerify> => {
  try {
    const { email: userEmail } = payload;
    const existUser = await User.findOne({ email: userEmail });

    if (existUser) {
      throw new ApiError(httpStatus.CONFLICT, "User already exists");
    }

    const otp = generateRandomOTP();

    pendingRegistrations.set(userEmail, { payload, otp });
    await sendOTPToUserEmail(userEmail, otp);
    return {
      email: userEmail
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Error Found ${error}`);
  }
};

const verify = async (
  userEmail: string,
  verifyOtp: string
): Promise<ILoginAndUserResponse> => {
  try {

    const registrationData = pendingRegistrations.get(userEmail);
    if (!registrationData) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Email not found in pending registrations"
      );
    }

    const {payload, otp} = registrationData


    if (otp !== verifyOtp) {
      throw new ApiError(httpStatus.BAD_GATEWAY, "The OTP is Incorrect");
    }

    //hashPassword
    const hashedPassword = await bcryptHelpers.hashPassword(payload.password);
    payload.password = hashedPassword;
    // role assigned
    payload.role = "user";

    const result = await User.create(payload);

    const { _id: userId, email, role } = result;

    const accessToken = jwtHelpers.createToken(
      {
        userId,
        email,
        role
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    pendingRegistrations.delete(userEmail);

    return {
      email,
      accessToken
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Error Found ${error}`);
  }
};

const googleLogin = async (
  payload: IUserAndLogin
): Promise<ILoginAndUserResponse> => {
  try {
    console.log(payload);
    const { googleId: userId, role, email } = payload;

    const accessToken = jwtHelpers.createToken(
      {
        userId,
        email,
        role
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    return {
      email,
      accessToken
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Error Found ${error}`);
  }
};

const loginUser = async (
  payload: IUserAndLogin
): Promise<ILoginAndUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is Incorrect");
  }

  const { _id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role,
      email
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken
  };
};

const profileGet = async (id: string): Promise<IUserAndLogin | null> => {
  const result = await User.findOne({ _id: new ObjectId(id) });
  return result;
};

const updateUser = async (
  user: JwtPayload | null,
  payload: Partial<IUserAndLogin>
) => {
  const result = await User.findOneAndUpdate(
    { _id: new ObjectId(user!.userId) },
    payload,
    { new: true }
  );
  return result;
};

type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
) => {
  const { oldPassword, newPassword } = payload;
  console.log(user);

  const isUserExist = await User.findOne({ _id: new ObjectId(user?.userId) });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Old Password is incorrect");
  }

  const hashedNewPassword = await bcryptHelpers.hashPassword(newPassword);
  isUserExist.password = hashedNewPassword;

  // updating using save()

  isUserExist.save();
};

export const AuthUserService = {
  createUser,
  googleLogin,
  loginUser,
  profileGet,
  updateUser,
  changePassword,
  verify
};
