import httpStatus from "http-status";
import BaseError from "../errors/baseError";
import Entrega from "../models/Entrega";
import IentregaRepository from "../repositorys/IentregaRepository";
import IcreateEntregaRequest from "../types/IcreateEntregaRequest";
import IentregaService from "./IentregaService";

class EntregaService implements IentregaService {
    constructor(private readonly repository: IentregaRepository) {}
  
    async list(limit: number, offset: number): Promise<{ data: Entrega[]; count: number }> {
      const { data, count } = await this.repository.list(limit, offset);
      const entregas = data.map(item => new Entrega(item.id, item.nome, item.data, { lat: item.CoordenadasPartida.lat, long: item.CoordenadasPartida.long }, { lat: item.CoordenadasDestino.lat, long: item.CoordenadasDestino.long }));
      return {
        data: entregas,
        count
      };
    }
  
    async getById(id: number): Promise<Entrega> {
      const data = await this.repository.getById(id);
      if (!data) throw new BaseError(httpStatus.NOT_FOUND, `Entrega com id ${id} não encontrada`);
      return new Entrega(data.id, data.nome, data.data, { lat: data.CoordenadasPartida.lat, long: data.CoordenadasPartida.long }, { lat: data.CoordenadasDestino.lat, long: data.CoordenadasDestino.long });
    }
  
    async create(createEntregaRequest: IcreateEntregaRequest): Promise<Entrega> {
      const data = await this.repository.create(createEntregaRequest);
      return new Entrega(data.id, data.nome, data.data, { lat: data.CoordenadasPartida.lat, long: data.CoordenadasPartida.long }, { lat: data.CoordenadasDestino.lat, long: data.CoordenadasDestino.long });
    }
  }
  
  export default EntregaService;