import { Request, Response } from "express";
import httpStatus from "http-status";
import IentregaService from "../services/IentregaService";

class EntregaController{
    constructor(
        private readonly service: IentregaService
    ){}

    async list(req: Request, res: Response){
        const response = await this.service.list()
        return res.status(httpStatus.OK).json(response)
    }

    async getById(req: Request, res: Response){
        const {id} = req.params;
        const response = await this.service.getById(Number(id))
        return res.status(httpStatus.OK).json(response)
    }

    async create(req: Request, res: Response){
        const {nome, data, partida, destino} = req.body
        const response = await this.service.create({nome, data: new Date(data), partida, destino})
        return res.status(httpStatus.OK).json(response)
    }
}

export default EntregaController;