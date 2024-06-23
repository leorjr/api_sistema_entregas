import { PrismaClient } from "@prisma/client";
import express from "express";
import errorHandler from "./middlewares/errorHandler";
import notFoundHandler from "./middlewares/notFoundHandler";
import router from "./routes";

const app = express()
const prisma = new PrismaClient();

app.use(express.json())
app.use('/api', router)
app.use(notFoundHandler)
app.use(errorHandler);

async function connectToDatabase() {
    try {
        await prisma.$connect();
        console.log(' 🎲 Conectado ao banco de dados com sucesso');
    } catch (error) {
        console.error('❌ Erro ao conectar ao banco de dados:', error);
        process.exit(1); 
    }
}

connectToDatabase();

export default app