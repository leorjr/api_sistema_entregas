import express, { Request, Response } from "express"
import httpStatus from "http-status"

const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response)=>{
    return res.status(httpStatus.OK).json({message: "hello, from index"})
})

export default app