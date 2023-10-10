import { Model } from "mongoose";

export type IProduct = {
  name: string;
  price: number;
  discountPrice: number;
  rating: number;
  stock: number;
  brand: string;
  description: string[];
  category: string;
  subcategory: string;
  features: string[];
  images: string;
  comments?: string[];
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;


export type IProductFilters = {
  searchTerm?: string;
  name?: string;
  brand?: string;
  subcategory?: string;
  category?:string
}
