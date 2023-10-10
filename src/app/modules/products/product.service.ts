import { ObjectId } from "mongodb";

import { productSearchableFields } from "./product.constent";
import { IProduct, IProductFilters } from "./product.interface";
import { Product } from "./product.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import cloudinary from "../../../config/cloudinary";

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

const products = async (filters: IProductFilters) => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map((fields) => ({
        [fields]: {
          $regex: searchTerm,
          $options: "i"
        }
      }))
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value
      }))
    });
  }

  const whereConditionsData =
    andConditions.length > 0
      ? {
          $and: andConditions
        }
      : {};

  const result = await Product.find(whereConditionsData);
  return result;
};

const productDetails = async (id: string) => {
  const result = await Product.findOne({ _id: new ObjectId(id) });
  return result;
};
const productCategory = async () => {
  const result = await Product.find();
  return result;
};
const productReview = async (id: string, comment: string) => {
  try {
    const result = await Product.updateOne(
      { _id: new ObjectId(id) },
      { $push: { comments: comment } }
    );
    if (result.modifiedCount !== 1) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Product not found or comment not added"
      );
    }
    return result;
  } catch (error) {
    console.error("error updating Product:", error);
    return Promise.reject(error);
  }
};
const productReviewGet = async (id: string) => {
  const result = await Product.findOne({ _id: new ObjectId(id) });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
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

export const ProductService = {
  addNewProduct,
  products,
  productDetails,
  productReview,
  productReviewGet,
  productEdit,
  productDelete,
  productCategory
};
