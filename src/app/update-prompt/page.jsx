'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setSubmitting(true)

  //   try {
  //     const res = await fetch('/api/prompt/new', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         prompt: post.prompt,
  //         userId: isUserLogged?.user.id,
  //         tag: post.tag,
  //       }),
  //     })

  //     if (res.ok) {
  //       router.push('/')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setSubmitting(false)
  //   }
  // }

  useEffect(() => {
    const getPrompt = async () => {
      const res = await fetch(`/api/prompt/${promptId}`)
      const prompt = await res.json()
      setPost({
        prompt: prompt.prompt,
        tag: prompt.tag,
      })
    }
    if (promptId) getPrompt()
  }, [promptId])

  return (
    <Form
      type="Editar"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={() => console.log('submit')}
    />
  )
}

export default EditPrompt
