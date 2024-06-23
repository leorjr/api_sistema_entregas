import { Router } from "express";
import entregasRouter from "./entregas";

const router = Router();

router.use('/entregas', entregasRouter)

export default router;