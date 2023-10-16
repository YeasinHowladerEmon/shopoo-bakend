import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IProduct } from "../products/product.interface";
import httpStatus from "http-status";
import { AdminService } from "./admin.service";
import { IUserAndLogin } from "../usersAndauth/auth.interface";

//notice
// we have product to access only admin and we write code inside admin folder so that we also read very well. and other product method product folder


const addNewProduct = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.addNewProduct(req.body);
    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Product Create Successfully",
        data: result
    })
});

const productEdit = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const editData = req.body;
    const result = await AdminService.productEdit(id, editData);
    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Product edited Successfully",
        data: result
    })
})
const productDelete = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.productDelete(req.params.id);
    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "Product delete Successfully",
        data: result
    })
})

const userDelete = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.userDelete(req.params.id);
    sendResponse<IUserAndLogin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "user delete Successfully",
        data: result
    })
})

const usersGet = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.usersGet();
    sendResponse<IUserAndLogin[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        messages: "user delete Successfully",
        data: result
    })
})



export const AdminController = {
    addNewProduct,
    productDelete,
    productEdit,
    userDelete,
    usersGet
}