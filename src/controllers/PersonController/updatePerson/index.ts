import { Request, Response } from 'express'
import { HandleServerError } from '../../../shared/helpers/HandleServerError'
import { Person } from '../../../models/mongo/Person'
import { errorResponse, resultResponse } from '../../../shared/responses'
import { UpdatePersonRequestType } from './types'


export const updatePerson = async (req: Request<any, any, UpdatePersonRequestType>, res: Response) => {
  try {
    const { _id } = req.params
    const { nearest } = req.body

    const oldPerson = await Person.findOne({ _id })

    if (!oldPerson) {
      res.status(404).json(errorResponse(`Person with id=${_id} not found!`))
      return
    }

    if (nearest) {
      if (nearest.father) {
        const { father: fatherId } = nearest
        const father = await Person.findOne({ _id: fatherId })
        if (!father) {
          res.status(400).json(errorResponse({
            error: `Person with id=${fatherId} not found (nearest.father)!`,
          }))
          return
        }
      }
      if (nearest.mother) {
        const { mother: motherId } = nearest
        const mother = await Person.findOne({ _id: motherId })
        if (!mother) {
          res.status(400).json(errorResponse({
            error: `Person with id=${motherId} not found (nearest.mother)!`,
          }))
          return
        }
      }
    }

    const result = await Person.replaceOne(
      { _id },
      req.body,
      { new: false },
    )
    res.json(resultResponse(result))
  } catch(e) {
    HandleServerError(e, res)
  }
}
