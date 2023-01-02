import { Request, Response } from 'express'
import { Person } from '../../../models/mongo/Person'
import { errorResponse, resultArray, resultResponse } from '../../../shared/responses'
import { HandleServerError } from '../../../shared/helpers/HandleServerError'
import { ObjectId } from 'mongodb'

export const getPerson = async (req: Request, res: Response) => {
  try {
    const { params: { _id } } = req
    const { search } = req.body

    if (_id) {
      if (!ObjectId.isValid(_id)) {
        res.status(404).json(errorResponse(`Человек с _id=${_id} не найден.`))
        return
      }
      const found = await Person.findOne({ _id })
        .populate({
          path: 'nearest.father nearest.mother',
        })

      if (!found) {
        res.status(404).json(errorResponse(`Человек с _id=${_id} не найден.`))
        return
      }
      res.json(resultResponse(found))
      return
    }

    if (typeof search === 'string' && search.length) {
      const found = await Person
        .find({
          $text: {
            $search: search,
          },
        })
        .select('-nearest')
      res.json(resultArray(found))
      return
    }

    const found = await Person
      .find()
      .sort(req.body.sortBy)
      .select('-nearest')
    res.json(resultArray(found))
  } catch(e) {
    HandleServerError(e, res)
  }
}
