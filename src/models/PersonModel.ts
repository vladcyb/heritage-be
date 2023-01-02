import { SexEnum } from '../enums/SexEnum'

export interface PersonModel {
  surname: string,
  name: string,
  patronymic: string,
  dateOfBirth: string,
  sex: SexEnum,
  nearest: {
    mother: {
      id: string,
    },
    father: {
      id: string,
    },
  },
}
