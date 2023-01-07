import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { IUserModel, User } from '#models'
import { errorResponse, resultResponse } from '#shared/responses'
import { authConstants } from '#controllers/AuthController/authConstants'
import { HandleServerError } from '#shared/helpers/HandleServerError'

export const register = async (req: Request<any, any, IUserModel>, res: Response) => {
  try {
    const { login, password } = req.body
    const user = await User.findOne({ login })

    if (user) {
      res.json(errorResponse(authConstants.USER_EXISTS))
      return
    }

    const hashPassword = bcrypt.hashSync(password, 13)
    const newUser = new User({ login, password: hashPassword })
    await newUser.save()

    req.session._id = newUser._id

    res.json(resultResponse({
      login,
    }))
  } catch (e) {
    HandleServerError(e, res)
  }
}
