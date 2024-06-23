import { Request, Response } from "express";
import httpStatus from "http-status";
import IGenericResponseDto from "../types/IgenericResponseDto";

const notFoundHandler = (req: Request, res: Response) => {
	const response: IGenericResponseDto = {
		status: httpStatus.NOT_FOUND,
		success: false,
		message: "resource not found",
	};

	return res.status(response.status).json(response);
};

export default notFoundHandler;
