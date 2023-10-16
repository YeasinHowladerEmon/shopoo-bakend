import { ObjectId } from "mongodb";

import { productSearchableFields } from "./product.constent";
import { IProduct, IProductFilters } from "./product.interface";
import { Product } from "./product.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

//notice
// we have product to access only admin and we write code inside admin folder so that we also read very well. and other product method product folder

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



export const ProductService = {
  products,
  productDetails,
  productReview,
  productReviewGet,
  productCategory
};
