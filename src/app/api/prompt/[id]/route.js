// Create a GET route for a single prompt
import { connectToDatabase } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (req, res, { params }) => {
  try {
    await connectToDatabase()
    const prompt = await Prompt.findById(params.id).populate('creator')

    if (!prompt) return new Response('Prompt not found', { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response('Failed to get prompt', { status: 500 })
  }
}

// Update the Prompt
export const PATCH = async (req, res, { params }) => {
  const { prompt, tag } = await req.json()
  try {
    await connectToDatabase()
    const oldPrompt = await Prompt.findById(params.id)

    if (!oldPrompt) return new Response('Prompt not found', { status: 404 })

    oldPrompt.prompt = prompt
    oldPrompt.tag = tag

    await oldPrompt.save()

    return new Response(JSON.stringify(oldPrompt), { status: 200 })
  } catch (error) {
    return new Response('Failed to update prompt', { status: 500 })
  }
}

// Delete the Prompt
export const DELETE = async (req, res, { params }) => {
  try {
    await connectToDatabase()
    await Prompt.findByIdAndRemove(params.id)

    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500 })
  }
}
