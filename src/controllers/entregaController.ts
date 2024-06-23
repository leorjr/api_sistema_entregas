import { Request, Response } from "express";
import httpStatus from "http-status";
import IentregaService from "../services/IentregaService";

class EntregaController{
    constructor(
        private readonly service: IentregaService
    ){}

    list(req: Request, res: Response){
        const response = this.service.list()
        return res.status(httpStatus.OK).json(response)
    }

    getById(req: Request, res: Response){
        const response = this.service.getById()
        return res.status(httpStatus.OK).json(response)
    }

    create(req: Request, res: Response){
        const response = this.service.create()
        return res.status(httpStatus.OK).json(response)
    }
}

export default EntregaController;