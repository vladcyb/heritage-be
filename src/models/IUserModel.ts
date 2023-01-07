import { IPersonModel } from './IPersonModel'

export interface IUserModel {
  login: string
  password: string
  persons: IPersonModel[]
}
