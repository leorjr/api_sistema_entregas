import { Router } from "express"
import EntregaFactory from "../factorys/entregaFactory"
import asyncHandler from "../middlewares/asyncHandler"
import validateRequestBody from "../middlewares/validateRequestBody"
import createEntregaSchema from "../schemas/createEntregaSchema"

const entregasRouter = Router()
const entregaController = EntregaFactory.createController()

entregasRouter.get('/', asyncHandler(entregaController.list.bind(entregaController)))
entregasRouter.get('/:id', asyncHandler(entregaController.getById.bind(entregaController)))
entregasRouter.post('/', validateRequestBody(createEntregaSchema), asyncHandler(entregaController.create.bind(entregaController)))

export default entregasRouter