import { Router } from "express";

const loggerTest = Router()

loggerTest.get('/', (req,res) => {
    req.logger.info('estamos en producccion y esto es una info')
    res.send({message: 'prueba de logger'})
})

export default loggerTest