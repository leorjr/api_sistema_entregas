import db from "../database"
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
        const partida = await db.coordenadas.create({
            data:{
                lat: createEntregaRequest.partida.lat,
                long: createEntregaRequest.partida.long
            },
            select:{
                id: true
            }
        })

        const destino = await db.coordenadas.create({
            data:{
                lat: createEntregaRequest.destino.lat,
                long: createEntregaRequest.destino.long
            },
            select:{
                id: true
            }
        })

        const entrega = await db.entregas.create({
            data:{
                nome: createEntregaRequest.nome,
                data: createEntregaRequest.data,
                partida: partida.id,
                destino: destino.id
            }
        })

        return entrega
    }
}

export default EntregaRepository