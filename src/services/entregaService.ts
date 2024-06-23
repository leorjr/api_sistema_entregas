import httpStatus from "http-status";
import BaseError from "../errors/baseError";
import Entrega from "../models/Entrega";
import IentregaRepository from "../repositorys/IentregaRepository";
import IcreateEntregaRequest from "../types/IcreateEntregaRequest";
import IentregaService from "./IentregaService";

class EntregaService implements IentregaService {
    constructor(private readonly repository: IentregaRepository) {}
    async list(limit: number, offset: number): Promise<{data: Entrega[], count:number}> {
        const { data, count } = await this.repository.list(limit, offset);
        const entregas = data.map(item => new Entrega(item.id, item.nome, item.data));
        return {
            data: entregas,
            count
        };

    }

    async getById(id: number): Promise<Entrega> {
        const data = await this.repository.getById(id);
        if (!data) throw new BaseError(httpStatus.NOT_FOUND, `Entrega com id ${id} não encontrada`);
        return new Entrega(data.id, data.nome, data.data);
    }

    async create(createEntregaRequest: IcreateEntregaRequest): Promise<Entrega> {
        const data = await this.repository.create(createEntregaRequest);
        return new Entrega(data.id, data.nome, data.data);
    }
}

export default EntregaService;