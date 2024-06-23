import { Request, Response } from "express";
import httpStatus from "http-status";
import IentregaService from "../services/IentregaService";
import IGenericResponseDto from "../types/IgenericResponseDto";

class EntregaController{
    constructor(
        private readonly service: IentregaService
    ){}

    async list(req: Request, res: Response){
        const data = await this.service.list()

        const response: IGenericResponseDto = {
			success: true,
			status: httpStatus.OK,
			data,
		};
        
        return res.status(httpStatus.OK).json(response)
    }

    async getById(req: Request, res: Response){
        const {id} = req.params;

        const data = await this.service.getById(Number(id))

        const response: IGenericResponseDto = {
			success: true,
			status: httpStatus.OK,
			data,
		};

        return res.status(httpStatus.OK).json(response)
    }

    async create(req: Request, res: Response){
        const {nome, data, partida, destino} = req.body
        
        const _data = await this.service.create({nome, data: new Date(data), partida, destino})

        const response: IGenericResponseDto = {
			success: true,
			status: httpStatus.OK,
			data: _data,
		};

        return res.status(httpStatus.OK).json(response)
    }
}

export default EntregaController;