import httpStatus from "http-status"
import db from "../database"
import BaseError from "../errors/baseError"
import IcreateEntregaRequest from "../types/IcreateEntregaRequest"
import Ientrega from "../types/Ientrega"
import IentregaRepository from "./IentregaRepository"

class EntregaRepository implements IentregaRepository{
    
    async list(): Promise<Ientrega[]> {
        const data = await db.entregas.findMany()
        return data
    }

    async getById(id: number): Promise<Ientrega | null> {
        const data = await db.entregas.findFirst({
            where: {
                id
            }
        })
        return data
    }

    async create(createEntregaRequest: IcreateEntregaRequest): Promise<Ientrega> {
        let partida = await this.getCoordenada(
            createEntregaRequest.partida.lat,
            createEntregaRequest.partida.long
        );
        if (!partida) {
            partida = await db.coordenadas.create({
                data: {
                    lat: createEntregaRequest.partida.lat,
                    long: createEntregaRequest.partida.long
                },
                select: {
                    id: true
                }
            });
        }

        let destino = await this.getCoordenada(
            createEntregaRequest.destino.lat,
            createEntregaRequest.destino.long
        );

        if (!destino) {
            destino = await db.coordenadas.create({
                data: {
                    lat: createEntregaRequest.destino.lat,
                    long: createEntregaRequest.destino.long
                },
                select: {
                    id: true
                }
            });
        }

        const entregaExists = await this.exists(
            createEntregaRequest.nome,
            createEntregaRequest.data,
            partida.id,
            destino.id
        );

        if (entregaExists) {
            throw new BaseError(httpStatus.CONFLICT, 'entrega já cadastrada anteriormente');
        }

        const entrega = await db.entregas.create({
            data: {
                nome: createEntregaRequest.nome,
                data: createEntregaRequest.data,
                partida: partida.id,
                destino: destino.id
            }
        });

        return entrega;
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
        const coordenada = await db.coordenadas.findFirst({
            where: {
                lat,
                long
            },
            select: {
                id: true
            }
        });

        return coordenada;
    }
}

export default EntregaRepository