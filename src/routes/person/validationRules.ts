import { check, param } from 'express-validator'
import { MUST_BE_MONGO_ID, MUST_BE_STRING } from '../../shared/constants/errors/validation'
import { allowedSortKeys } from '../../shared/constants'
import { SexEnum } from '../../enums/SexEnum'
import { isISO8601DateOnly } from '../../shared/helpers/isISO8601DateOnly'


export const createPersonRules = [
  check('surname')
    .isString()
    .withMessage(MUST_BE_STRING)
    .optional(),
  check('name')
    .isString()
    .withMessage(MUST_BE_STRING)
    .optional(),
  check('patronymic')
    .isString()
    .withMessage(MUST_BE_STRING)
    .optional(),
  check('sex')
    .isIn([SexEnum.M, SexEnum.F])
    .withMessage('Must be in range 0-1'),
  check('nearest.mother')
    .isMongoId()
    .withMessage(MUST_BE_MONGO_ID)
    .optional(),
  check('nearest.father')
    .isMongoId()
    .withMessage(MUST_BE_MONGO_ID)
    .optional(),
  check('dateOfBirth')
    .custom((value) => isISO8601DateOnly(value))
    .withMessage('Date must be in format YYYY-MM-DD')
    .optional(),
]

export const getPersonRules = [
  check('sortBy')
    .isObject()
    .optional()
    .withMessage('Must by of type object')
    .custom((values) => (
      Object.entries(values).every((entry) => allowedSortKeys.includes(entry[0]) && typeof entry[1] === 'number')
    )),
  check('search')
    .isString()
    .withMessage(MUST_BE_STRING)
    .optional(),
]

export const deletePersonRules = [
  param('_id').isMongoId().withMessage(MUST_BE_MONGO_ID),
]

export const updatePersonRules = [
  param('_id')
    .isMongoId()
    .withMessage(MUST_BE_MONGO_ID),
  check('dateOfBirth')
    .custom((value) => isISO8601DateOnly(value))
    .withMessage('Date must be in format YYYY-MM-DD')
    .optional(),
  check('sex')
    .isIn([SexEnum.M, SexEnum.F])
    .withMessage('Must be in range 0-1'),
  check('nearest.father')
    .isMongoId()
    .withMessage(MUST_BE_MONGO_ID)
    .optional(),
  check('nearest.mother')
    .isMongoId()
    .withMessage(MUST_BE_MONGO_ID)
    .optional(),
]
