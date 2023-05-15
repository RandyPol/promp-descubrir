'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {
  const router = useRouter()
  const { data: isUserLogged } = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: isUserLogged?.user.id,
          tag: post.tag,
        }),
      })

      if (res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Crear"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  )
}

export default EditPrompt
