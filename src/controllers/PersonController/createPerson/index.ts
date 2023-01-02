import { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import { PersonModel } from '../../../models/PersonModel'
import { Person } from '../../../models/mongo/Person'
import { errorResponse, resultResponse } from '../../../shared/responses'
import { SOMETHING_WENT_WRONG_ERROR } from '../../../shared/constants/errors/messages'
import { HandleServerError } from '../../../shared/helpers/HandleServerError'


type CheckType = {
  ok: boolean,
  found?: boolean,
}

const checkExistence = async (_id: string): Promise<CheckType> => {
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

    const {
      nearest: {
        mother,
        father,
      },
    } = person

    if (mother) {
      const result = await checkExistence(mother)
      if (!result.ok) {
        res.status(500).json(errorResponse(SOMETHING_WENT_WRONG_ERROR))
        return
      }
      if (!result.found) {
        res.status(400).json(errorResponse(`A person with id=${mother} not found.`))
        return
      }
    }

    if (father) {
      const result = await checkExistence(father)
      if (!result.ok) {
        res.status(500).json(errorResponse(SOMETHING_WENT_WRONG_ERROR))
        return
      }
      if (!result.found) {
        res.status(400).json(errorResponse(`A person with id=${father} not found.`))
        return
      }
    }

    await person.save()
    res.json(resultResponse(person))
  } catch(e) {
    HandleServerError(e, res)
  }
}
