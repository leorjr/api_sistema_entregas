import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import httpStatus from "http-status";

const app = express()
const prisma = new PrismaClient();

app.use(express.json())

app.get('/', (req: Request, res: Response)=>{
    return res.status(httpStatus.OK).json({message: "hello, from index"})
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