import { SexEnum } from '#enums/SexEnum'

export interface IPersonModel {
  surname: string
  name: string
  patronymic: string
  dateOfBirth: string
  sex: SexEnum
  nearest: {
    mother: {
      id: string
    }
    father: {
      id: string
    }
  }
}
