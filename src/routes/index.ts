import { Router } from 'express'

import { authMiddleware } from '#middleware/authMiddleware'

import { loginRoutes } from './login'
import { personRoutes } from './person'
import { refreshRoutes } from './refresh'
import { registerRoutes } from './register'

export const routes = Router()

routes.use('/register', registerRoutes)
routes.use('/login', loginRoutes)
routes.use('/person', authMiddleware, personRoutes)
routes.use('/refresh', authMiddleware, refreshRoutes)
