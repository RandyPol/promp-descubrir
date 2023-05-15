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
  const [loading, setLoading] = useState(true)
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
    const getPrompt = async () => {
      const res = await fetch(`/api/prompt/${promptId}`)
      const prompt = await res.json()
      setPost({
        prompt: prompt.prompt,
        tag: prompt.tag,
      })
      setLoading(false)
    }
    if (promptId) getPrompt()
  }, [promptId])

  return (
    <>
      <ClipLoader
        color={'#123abc'}
        loading={loading}
        css={override}
        size={150}
      />
      {!loading && (
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
