import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { UserModel } from '../../../models/UserModel'
import { User } from '../../../models/mongo/User'
import { errorResponse, resultResponse } from '../../../shared/responses'
import { HandleServerError } from '../../../shared/helpers/HandleServerError'
import { authConstants } from '../authConstants'

export const register = async (req: Request<any, any, UserModel>, res: Response) => {
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
