import { Request, Response } from 'express'
import { Person } from '#models'
import { HandleServerError } from '#shared/helpers/HandleServerError'
import { resultResponse } from '#shared/responses'


export const deletePerson = async (req: Request, res: Response) => {
  try {
    const result = await Person.deleteOne({ _id: req.params._id })
    res.json(resultResponse(result))
  } catch(e) {
    HandleServerError(e, res)
  }
}
