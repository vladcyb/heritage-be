import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.json({
      ok: false,
      errors: errors.mapped(),
    })
    return
  }
  next()
}
