import httpStatus from "http-status";
import db from "../database";
import BaseError from "../errors/baseError";
import Entrega from "../models/Entrega";
import IcreateEntregaRequest from "../types/IcreateEntregaRequest";
import Ientrega from "../types/Ientrega";
import IentregaRepository from "./IentregaRepository";



class EntregaRepository implements IentregaRepository {
    async list(limit: number, offset: number): Promise<{ data: Entrega[]; count: number; }> {
        const [data, count] = await Promise.all([
            db.entregas.findMany({
                skip: offset,
                take: limit,
            }),
            db.entregas.count()
        ]);
        return { data, count };
    }

    async getById(id: number): Promise<Ientrega | null> {
        return db.entregas.findFirst({
            where: { id }
        });
    }

    async create(createEntregaRequest: IcreateEntregaRequest): Promise<Ientrega> {
        const partida = await this.ensureCoordenada(createEntregaRequest.partida.lat, createEntregaRequest.partida.long);
        const destino = await this.ensureCoordenada(createEntregaRequest.destino.lat, createEntregaRequest.destino.long);

        const entregaExists = await this.exists(createEntregaRequest.nome, createEntregaRequest.data, partida.id, destino.id);
        if (entregaExists) {
            throw new BaseError(httpStatus.CONFLICT, 'Entrega já cadastrada anteriormente');
        }

        return db.entregas.create({
            data: {
                nome: createEntregaRequest.nome,
                data: createEntregaRequest.data,
                partida: partida.id,
                destino: destino.id
            }
        });
    }

    async exists(nome: string, data: Date, partidaId: number, destinoId: number): Promise<boolean> {
        const existingEntrega = await db.entregas.findFirst({
            where: {
                nome,
                data,
                partida: partidaId,
                destino: destinoId
            }
        });
        return existingEntrega !== null;
    }

    async getCoordenada(lat: string, long: string): Promise<{ id: number } | null> {
        return db.coordenadas.findFirst({
            where: { lat, long },
            select: { id: true }
        });
    }

    async ensureCoordenada(lat: string, long: string): Promise<{ id: number }> {
        let coordenada = await this.getCoordenada(lat, long);
        if (!coordenada) {
            coordenada = await db.coordenadas.create({
                data: { lat, long },
                select: { id: true }
            });
        }
        return coordenada;
    }
}

export default EntregaRepository;