import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  collection: 'users',
})

export const User = model('User', userSchema)
