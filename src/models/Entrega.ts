class Entrega {
    id: number;
    nome: string;
    data: Date;
    partida: { lat: string; long: string };
    destino: { lat: string; long: string };
  
    constructor(id: number, nome: string, data: Date, partida: { lat: string; long: string }, destino: { lat: string; long: string }) {
      this.id = id;
      this.nome = nome;
      this.data = data;
      this.partida = partida;
      this.destino = destino;
    }
  }
  
  export default Entrega;