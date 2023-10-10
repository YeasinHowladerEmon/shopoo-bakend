import { Schema, model } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";

export const ProductSchema = new Schema<IProduct, ProductModel>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    description: {
        type: [String],
        required: true,
        default: [],
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
        required: true,
        default: [],
    },
    images: {
        type: String,
        required: true,
    },
    comments: {
        type: [String],
        default: [],
    }
},{
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

export const Product = model<IProduct, ProductModel>('Product', ProductSchema)