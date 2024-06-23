import { NextFunction, Request, Response } from "express";
import statusCode from "http-status";

import * as yup from "yup";
import ValidationError from "../errors/validationError";


const validateRequestBody = (schema: yup.ObjectSchema<any>) =>{
	return async (
		req: Request, 
		res: Response, 
		next: NextFunction
	) =>{
		try{
			await schema.validate(req.body, {abortEarly: false});
			next();
		}catch(error: any){
			if(error instanceof yup.ValidationError)
				next(new ValidationError(statusCode.BAD_REQUEST, error.errors));
			next(error);
		}
	};
};

export default validateRequestBody;