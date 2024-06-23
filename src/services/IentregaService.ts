import Entrega from "../models/Entrega"
import IcreateEntregaRequest from "../types/IcreateEntregaRequest"

interface IentregaService{
    list(): Promise<Entrega[]>
    getById(id: number): Promise<Entrega>
    create(createEntregaRequest: IcreateEntregaRequest): Promise<Entrega>
}

export default IentregaService