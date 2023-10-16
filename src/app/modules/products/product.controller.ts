import httpStatus from "http-status";
import {Request, Response} from 'express';
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IProduct } from "./product.interface";
import { ProductService } from "./product.service";
import pick from "../../../shared/pick";
import { productFilterableFields } from "./product.constent";
import { UpdateWriteOpResult } from "mongoose";

//notice
// we have product to access only admin and we write code inside admin folder so that we also read very well. and other product method product folder

const products = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, productFilterableFields)
    const result = await ProductService.products(filters);
    sendResponse<IProduct[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Product retrieved Successfully",
        data: result
    })
})
const productCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.productCategory();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Product retrieved Successfully",
        data: result
    })
})
const productDetails = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.productDetails(req.params.id);
    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Product retrieved Successfully",
        data: result
    })
})
const productReview = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const comment = req.body.comment;
    const result = await ProductService.productReview(id, comment);
    sendResponse<UpdateWriteOpResult | null>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Product Review added Successfully",
        data: result
    })
})
const productReviewGet = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ProductService.productReviewGet(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Product Review Successfully",
        data: result
    })
})


export const ProductsController = {
    productDetails,
    productReviewGet,
    productReview,
    products,
    productCategory
}