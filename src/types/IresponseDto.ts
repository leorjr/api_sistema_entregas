import Entrega from "../models/Entrega";

interface IlistResponseDto{
    data: Entrega[]
    count: number
}

export default IlistResponseDto;