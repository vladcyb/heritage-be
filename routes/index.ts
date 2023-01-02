import { Router } from 'express'
import { loginRoutes } from './login'
import { personRoutes } from './person'
import { authMiddleware } from '../middleware/authMiddleware'
import { refreshRoutes } from './refresh'

export const routes = Router()


routes.use('/login', loginRoutes)
routes.use('/person', authMiddleware, personRoutes)
routes.use('/refresh', authMiddleware, refreshRoutes)
