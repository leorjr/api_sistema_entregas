import IentregaRepository from "./IentregaRepository"

class EntregaRepository implements IentregaRepository{
    
    list() {
        return "hello, from list on repository"
    }

    getById() {
        return "hello, from getById on repository"
    }
    create() {
        return "hello, from create on repository"
    }
}

export default EntregaRepository