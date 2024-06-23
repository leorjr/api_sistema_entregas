import Entrega from "../models/Entrega";
import IentregaRepository from "../repositorys/IentregaRepository";
import IcreateEntregaRequest from "../types/IcreateEntregaRequest";
import Ientrega from "../types/Ientrega";
import IentregaService from "./IentregaService";

class EntregaService implements IentregaService{
    constructor(
        private readonly repository: IentregaRepository
    ){}
    
    async list() {
        const _data: Ientrega[] = await this.repository.list()
        const data = _data.map(item => new Entrega(item.id, item.nome, item.data))
        return data
    }

    async getById(id: number) {
        const data = await this.repository.getById(id)

        if(!data)
            throw new Error(`entrega com id ${id} não encontrada`)

        const entrega = new Entrega(data.id, data.nome, data.data)

        return entrega
    }

    async create(createEntregaRequest: IcreateEntregaRequest) {
        const data = await this.repository.create(createEntregaRequest)
        return data
    }
}

export default EntregaService