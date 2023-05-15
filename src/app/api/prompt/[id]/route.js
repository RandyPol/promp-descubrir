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
