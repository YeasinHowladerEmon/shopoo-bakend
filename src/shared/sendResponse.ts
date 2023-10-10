import { Response } from "express";

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  messages: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | null;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    messages: data.messages || null,
    meta: data.meta || null || undefined,
    data: data.data || null
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
