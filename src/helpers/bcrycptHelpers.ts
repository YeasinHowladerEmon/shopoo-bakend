//Hash password
import bcrypt from "bcrypt";
import config from "../config";
import { Document, Schema } from "mongoose";
import {
  IUserAndLogin,
  UserModel
} from "../app/modules/usersAndauth/auth.interface";
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};

const passwordMatched = (schema: Schema<IUserAndLogin, UserModel>) => {
  schema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
  };
};

export const bcryptHelpers = {
  hashPassword,
  passwordMatched
};
