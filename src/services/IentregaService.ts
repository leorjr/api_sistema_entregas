import Entrega from "../models/Entrega"
import IcreateEntregaRequest from "../types/IcreateEntregaRequest"
import IlistResponseDto from "../types/IresponseDto"

interface IentregaService{
    list(limit: number, offset: number): Promise<IlistResponseDto>
    getById(id: number): Promise<Entrega>
    create(createEntregaRequest: IcreateEntregaRequest): Promise<Entrega>
}

export default IentregaService