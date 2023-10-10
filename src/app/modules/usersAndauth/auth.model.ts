import { Schema, model } from "mongoose"
import bcrypt from "bcrypt";
import { bcryptHelpers } from "../../../helpers/bcrycptHelpers"
import { IUserAndLogin, UserModel } from "./auth.interface"

export const userSchema = new Schema<IUserAndLogin, UserModel>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'user']
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    country: {
        type: String,
    },
    address:{
        type: String,
    },
    city: {
        type: String,
    },
    postcode: {
        type: Number,
    },
    googleId: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    otp: {
        type: String,
    },
},{
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})




bcryptHelpers.passwordMatched(userSchema)


export const User = model<IUserAndLogin, UserModel>('User', userSchema)