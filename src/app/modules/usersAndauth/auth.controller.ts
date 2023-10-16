import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  ILoginAndUserResponse,
  ILoginAndUserResponseVerify,
  IUserAndLogin
} from "./auth.interface";
import { AuthUserService } from "./auth.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AuthUserService.createUser(data);
  sendResponse<ILoginAndUserResponseVerify>(res, {
    statusCode: httpStatus.OK,
    success: true,
    messages: "Account Created OTP sended to your Email",
    data: result
  });
});

const verify = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const result = await AuthUserService.verify(email, otp);
  sendResponse<ILoginAndUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    messages: "OTP verified successfully",
    data: result
  });
});

const profileGet = catchAsync(async (req: Request, res: Response) => {
  const user = req.userData;
  const result = await AuthUserService.profileGet(user!.userId);
  sendResponse<IUserAndLogin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    messages: "User get own data Successfully",
    data: result
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const editData = req.body;
  const user = req.userData;
  const result = await AuthUserService.updateUser(user, editData);
  sendResponse<IUserAndLogin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    messages: "User update own data Successfully",
    data: result
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.userData;
  const { ...updateData } = req.body;
  await AuthUserService.changePassword(user, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    messages: "Change Password Successfully"
  });
});

// login and facebook and google auth start

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AuthUserService.loginUser(data);
  sendResponse<ILoginAndUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    messages: "User login Successfully",
    data: result
  });
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);
  if (!req.user) {
    // Handle the case where user data is not available
    throw new ApiError(httpStatus.NOT_FOUND, "user not exist");
  }
  const user = req.user as IUserAndLogin;
  const result = await AuthUserService.googleLogin(user);
  sendResponse<ILoginAndUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    messages: "User login Successfully",
    data: result
  });
});
//end of auth

export const AuthUserController = {
  createUser,
  googleLogin,
  loginUser,
  profileGet,
  updateUser,
  changePassword,
  verify
};
