interface Ientrega {
    id: number;
    nome: string;
    data: Date;
    partida: number;
    destino: number;
    CoordenadasPartida: {
      lat: string;
      long: string;
    };
    CoordenadasDestino: {
      lat: string;
      long: string;
    };
  }
  
  export default Ientrega;