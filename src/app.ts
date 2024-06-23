import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import httpStatus from "http-status";
import db from "./database";

const app = express()
const prisma = new PrismaClient();

app.use(express.json())

app.get('/', async (req: Request, res: Response)=>{
    try{
        const response = await prisma.entregas.findMany({
            include: {
                CoordenadasPartida: true,
                CoordenadasDestino: true,
            },
          });

          const result = response.map(({ CoordenadasPartida, CoordenadasDestino, partida, destino, ...entrega }) => ({
            ...entrega,
            partida: {
              lat: CoordenadasPartida.lat,
              long: CoordenadasPartida.long,
            },
            destino: {
              lat: CoordenadasDestino.lat,
              long: CoordenadasDestino.long,
            },
          }));

        return res.status(httpStatus.OK).json(result)
    }catch(err){
        return res.status(httpStatus.BAD_REQUEST).json({message:`${err}`})
    }finally{
        await db.$disconnect()
    }
})

app.get('/:id', async (req: Request, res: Response)=>{
    const {id} = req.params;
    try{
        const response = await db.entregas.findFirst({
            where:{
                id: Number(id)
            },
            include: {
                CoordenadasPartida: true,
                CoordenadasDestino: true,
            },
        })

        if (!response) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Entrega não encontrada" });
        }

        const { CoordenadasPartida, CoordenadasDestino, partida, destino, ...entrega } = response;
        const result = {
        ...entrega,
        partida: {
            lat: CoordenadasPartida.lat,
            long: CoordenadasPartida.long,
        },
        destino: {
            lat: CoordenadasDestino.lat,
            long: CoordenadasDestino.long,
        },
        };

        return res.status(httpStatus.OK).json(result)
    }catch(err){
        return res.status(httpStatus.BAD_REQUEST).json({message:`${err}`})
    }finally{
        await db.$disconnect()
    }
})

app.post('/', async (req: Request, res: Response)=>{

    const {nome, data, partida, destino} = req.body

    try{
        const coordPartida = await db.coordenadas.create({
            data:{
                lat: partida.lat,
                long: partida.long
            },
            select:{
                id: true
            }
        })

        const coordDestino = await db.coordenadas.create({
            data:{
                lat: destino.lat,
                long: destino.long
            },
            select:{
                id: true
            }
        })

        const entrega = await db.entregas.create({
            data:{
                nome,
                data: new Date(data),
                partida: coordPartida.id,
                destino: coordDestino.id
            }
        })

        return res.status(httpStatus.OK).json(entrega)
    }catch(err){
        return res.status(httpStatus.BAD_REQUEST).json({message:`${err}`})
    }
})

async function connectToDatabase() {
    try {
        await prisma.$connect();
        console.log('Conectado ao banco de dados com sucesso 🎲');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1); 
    }
}

connectToDatabase();

export default app