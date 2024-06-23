import Icoordenada from "./Icoordenada";

interface IcreateEntregaRequest{
    nome: string
    data: Date
    partida: Icoordenada
    destino: Icoordenada
}

export default IcreateEntregaRequest;