import IentregaRepository from "../repositorys/IentregaRepository";
import IentregaService from "./IentregaService";

class EntregaService implements IentregaService{
    constructor(
        private readonly repository: IentregaRepository
    ){}
    
    list() {
        const data = this.repository.list()
        return data
    }

    getById() {
        const data = this.repository.getById()
        return data
    }

    create() {
        const data = this.repository.create()
        return data
    }
}

export default EntregaService