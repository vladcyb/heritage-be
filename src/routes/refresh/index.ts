import { Router } from 'express'
import { RefreshController } from '#controllers/RefreshController'

export const refreshRoutes = Router()

refreshRoutes.get('/', RefreshController.refresh)
