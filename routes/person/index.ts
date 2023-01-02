import { Router } from 'express'
import { createPersonRules, deletePersonRules, getPersonRules, updatePersonRules } from './validationRules'
import { PersonController } from '../../controllers/PersonController'
import { ValidationController } from '../../controllers/ValidationController'

export const personRoutes = Router()

const { defaultValidation } = ValidationController

/* Create Person */
personRoutes.post('/', createPersonRules, defaultValidation, PersonController.createPerson)

/* Get Person */
personRoutes.post('/get/:_id?', getPersonRules, defaultValidation, PersonController.getPerson)

/* Delete Person */
personRoutes.delete('/:_id', deletePersonRules, defaultValidation, PersonController.deletePerson)

/* Update Person*/
personRoutes.put('/:_id', updatePersonRules, defaultValidation, PersonController.updatePerson)
