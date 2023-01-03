import { AuthController } from '#controllers/AuthController'
import { Router } from 'express'

export const registerRoutes = Router()

registerRoutes.post('/', AuthController.register)
