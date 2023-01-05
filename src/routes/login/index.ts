import { Router } from 'express'

import { AuthController } from '#controllers/AuthController'

import { validate } from './validate'
import { validationRules } from './validationRules'

export const loginRoutes = Router()

loginRoutes.post('/', validationRules, validate, AuthController.login)
