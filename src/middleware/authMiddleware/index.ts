import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { errorResponse } from '#shared/responses'
import { User } from '#models'


dotenv.config()

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.session

  if (!mongoose.isValidObjectId(_id)) {
    res.status(401).json(errorResponse('Unauthorized'))
    return
  }

  const user = await User.findOne({ _id })

  if (!user) {
    res.status(401).json(errorResponse('Unauthorized'))
    return
  }
  next()
}
