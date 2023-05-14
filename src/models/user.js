import { Schema, model, models } from 'mongoose'

const UserScema = new Schema({
  email: {
    type: String,
    required: [true, 'El correo es requerido'],
    unique: [true, 'El correo ya existe'],
  },
  username: {
    type: String,
    required: [true, 'El nombre de usuario es requerido'],
    unique: [true, 'El nombre de usuario ya existe'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'El nombre de usuario no es válido',
    ],
  },
  image: {
    type: String,
  },
})

const User = model.User || model('User', UserScema)

export default User
