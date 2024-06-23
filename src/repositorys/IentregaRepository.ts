import IcreateEntregaRequest from "../types/IcreateEntregaRequest"
import Ientrega from "../types/Ientrega"

interface IentregaRepository{
    list(): Promise<Ientrega[]>
    getById(id: number): Promise<Ientrega | null>
    create(createEntregaRequest: IcreateEntregaRequest): Promise<Ientrega>
}

export default IentregaRepository