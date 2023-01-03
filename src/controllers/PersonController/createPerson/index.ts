import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import { Person, PersonModel } from '#models'
import { errorResponse, resultResponse } from '#shared/responses'
import { SOMETHING_WENT_WRONG_ERROR } from '#shared/constants/errors/messages'
import { HandleServerError } from '#shared/helpers/HandleServerError'


type CheckType = {
  ok: boolean,
  found?: boolean,
}

const checkExistence = async (_id: ObjectId): Promise<CheckType> => {
  try {
    const found = await Person.findOne({ _id })
    if (found) {
      return {
        ok: true,
        found: true,
      }
    }
    return {
      ok: true,
      found: false,
    }
  } catch (e) {
    return {
      ok: false,
    }
  }
}


export const createPerson = async (req: Request<any, any, PersonModel>, res: Response) => {
  try {
    const data = matchedData(req, {
      locations: ['body'],
    })
    const person = new Person(data)

    const { nearest } = person

    if (nearest?.mother) {
      const result = await checkExistence(nearest.mother)
      if (!result.ok) {
        res.status(500).json(errorResponse(SOMETHING_WENT_WRONG_ERROR))
        return
      }
      if (!result.found) {
        res.status(400).json(errorResponse(`A person with id=${nearest.mother} not found.`))
        return
      }
    }

    if (nearest?.father) {
      const result = await checkExistence(nearest.father)
      if (!result.ok) {
        res.status(500).json(errorResponse(SOMETHING_WENT_WRONG_ERROR))
        return
      }
      if (!result.found) {
        res.status(400).json(errorResponse(`A person with id=${nearest.father} not found.`))
        return
      }
    }

    await person.save()
    res.json(resultResponse(person))
  } catch(e) {
    HandleServerError(e, res)
  }
}
