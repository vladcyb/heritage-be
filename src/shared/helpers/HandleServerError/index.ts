import { Response } from 'express'
import { errorResponse } from '../../responses'
import { SOMETHING_WENT_WRONG_ERROR } from '../../constants/errors/messages'

export const HandleServerError = (e: unknown, res: Response) => {
  console.log(e)
  res.status(500).send(errorResponse(SOMETHING_WENT_WRONG_ERROR))
}
