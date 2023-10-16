import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IProduct } from "../products/product.interface";
import cloudinary from "../../../config/cloudinary";
import { Product } from "../products/product.model";
import { ObjectId } from "mongodb";
import { User } from "../usersAndauth/auth.model";

//notice
// we have product to access only admin and we write code inside admin folder so that we also read very well. and other product method product folder

const addNewProduct = async (
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  try {
    if (!payload.images) {
      throw new ApiError(httpStatus.BAD_REQUEST, "No file uploaded");
    }

    const result = await cloudinary.uploader.upload(payload.images);

    payload.images = result?.secure_url;
    const finalResult = await Product.create(payload);
    return finalResult;
  } catch (error) {
    console.error(error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Something going on");
  }
};

const productEdit = async (id: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(
    { _id: new ObjectId(id) },
    payload,
    { new: true }
  );
  return result;
};

const productDelete = async (id: string) => {
  const result = await Product.findByIdAndDelete({
    _id: new ObjectId(id)
  });
  return result;
};

const userDelete = async (id: string) => {
  const result = await User.findByIdAndDelete({
    _id: new ObjectId(id)
  });
  return result;
};

const usersGet = async () => {
  const result = await User.find({});
  return result;
};

export const AdminService = {
  addNewProduct,
  productDelete,
  productEdit,
  userDelete,
  usersGet
};
