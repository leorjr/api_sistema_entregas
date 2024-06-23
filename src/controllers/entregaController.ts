import { Request, Response } from "express";
import httpStatus from "http-status";
import IentregaService from "../services/IentregaService";
import IGenericResponseDto from "../types/IgenericResponseDto";

class EntregaController{
    constructor(
        private readonly service: IentregaService
    ){}

    async list(req: Request, res: Response) {
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;
        
        const { data, count } = await this.service.list(limit, offset);
        
        return this.createResponse(res, httpStatus.OK, {entregas: data, count});
    }

    async getById(req: Request, res: Response){
        const { id } = req.params;

        const data = await this.service.getById(Number(id));
        
        return this.createResponse(res, httpStatus.OK, data);
    }

    async create(req: Request, res: Response){
        const { nome, data, partida, destino } = req.body;
            
        const createdData = await this.service.create({
            nome, 
            data: new Date(data), 
            partida, 
            destino
        });
        
        return this.createResponse(res, httpStatus.CREATED, createdData);
    }

    private createResponse(res: Response, status: number, data: any, message?: string) {
        const response: IGenericResponseDto = {
            success: true,
            status,
            data,
            message,
        };
        return res.status(status).json(response);
    }
}

export default EntregaController;