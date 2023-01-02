import { check } from 'express-validator'

export const validationRules = [
  check('login')
    .not()
    .isEmpty()
    .withMessage('Enter login!')
    .isString()
    .withMessage('Enter login!'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Enter password!')
    .isString()
    .withMessage('Enter password!'),
]
