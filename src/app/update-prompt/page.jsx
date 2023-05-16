'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { css } from '@emotion/react'
import { ClipLoader } from 'react-spinners'

import Form from '@components/Form'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const EditPrompt = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert('No prompt id found')

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
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

  useEffect(() => {
    setIsLoading(true)

    const getPrompt = async () => {
      try {
        const res = await fetch(`/api/prompt/${promptId}`)
        if (!res.ok) throw new Error('Failed to fetch prompt')

        const prompt = await res.json()
        setPost({
          prompt: prompt.prompt,
          tag: prompt.tag,
        })
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (promptId) getPrompt()
  }, [promptId])

  return (
    <>
      <ClipLoader
        color={'#123abc'}
        loading={isLoading}
        css={override}
        size={150}
      />
      {!isLoading && (
        <Form
          type="Editar"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  )
}

export default EditPrompt
