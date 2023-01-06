import { Router } from 'express'

import { AuthController } from '#controllers/AuthController'

export const registerRoutes = Router()

registerRoutes.post('/', AuthController.register)
