import { Router } from 'express'
import { validate } from './validate'
import { validationRules } from './validationRules'
import { AuthController } from '#controllers/AuthController'

export const loginRoutes = Router()

loginRoutes.post('/', validationRules, validate, AuthController.login)
