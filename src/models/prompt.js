import { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Necesitas un prompt'],
  },
  tag: {
    type: String,
    required: [true, 'Necesitas un tag'],
  },
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt
