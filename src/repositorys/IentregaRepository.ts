import IcreateEntregaRequest from "../types/IcreateEntregaRequest";
import Ientrega from "../types/Ientrega";

interface IentregaRepository {
    list(limit: number, offset: number): Promise<{ data: Ientrega[]; count: number; }>;
    getById(id: number): Promise<Ientrega | null>;
    create(createEntregaRequest: IcreateEntregaRequest): Promise<Ientrega>;
  }

export default IentregaRepository