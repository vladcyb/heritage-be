import { Router } from 'express'
import { loginRoutes } from './login'
import { personRoutes } from './person'
import { authMiddleware } from '#middleware/authMiddleware'
import { refreshRoutes } from './refresh'
import { registerRoutes } from './register'

export const routes = Router()

routes.use('/register', registerRoutes)
routes.use('/login', loginRoutes)
routes.use('/person', authMiddleware, personRoutes)
routes.use('/refresh', authMiddleware, refreshRoutes)
