import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { User, UserModel } from '#models'
import { errorResponse, resultResponse } from '#shared/responses'
import { authConstants } from '#controllers/AuthController/authConstants'
import { HandleServerError } from '#shared/helpers/HandleServerError'

export const login = async (req: Request<any, any, UserModel>, res: Response) => {
  try {
    const { login, password } = req.body
    const user = await User.findOne({ login })

    if (!user) {
      res.json(errorResponse(authConstants.INVALID_USER_DATA))
      return
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.json(errorResponse(authConstants.INVALID_USER_DATA))
      return
    }

    req.session._id = user._id

    res.json(resultResponse({
      login,
    }))
  } catch (e) {
    HandleServerError(e, res)
  }
}
