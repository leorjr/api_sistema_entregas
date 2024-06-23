import { Router } from "express"
import EntregaFactory from "../factorys/entregaFactory"

const entregasRouter = Router()
const entregaController = EntregaFactory.createController()

entregasRouter.get('/', entregaController.list.bind(entregaController))
entregasRouter.get('/:id', entregaController.getById.bind(entregaController))
entregasRouter.post('/', entregaController.create.bind(entregaController))

export default entregasRouter