import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import BaseError from "../errors/baseError";
import ValidationError from "../errors/validationError";
import IGenericResponseDto from "../types/IgenericResponseDto";

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    if(error instanceof BaseError){
        const response: IGenericResponseDto = {
            success: false,
            status: error.status,
            message: error.message
        }

        return res.status(response.status).json(response)
    }

    if(error instanceof ValidationError){
		const response: IGenericResponseDto = {
			status: error.status,
			success: false,
			message: error.message,
			errors: error.errors
		};

		return res.status(error.status).json(response);
	}

    console.log(error)

    const response: IGenericResponseDto = {
        success: false,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'erro interno de servidor'
    }

    return res.status(response.status).json(response)
}

export default errorHandler