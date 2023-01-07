import { model, Schema } from 'mongoose'

import { SexEnum } from '#enums/SexEnum'


const personSchema = new Schema({
  surname: String,
  name: String,
  patronymic: String,
  dateOfBirth: String,
  sex: {
    type: Number,
    enum: SexEnum,
  },
  nearest: {
    mother: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
    father: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  },
}, {
  collection: 'persons',
})


personSchema.index({
  surname: 'text',
  name: 'text',
  patronymic: 'text',
})

export const Person = model('Person', personSchema)
