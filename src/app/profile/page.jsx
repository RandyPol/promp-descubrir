'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { css } from '@emotion/react'
import { ClipLoader } from 'react-spinners'

import Profile from '@components/Profile'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const ProfilePage = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user.id}/posts`)
        if (!res.ok) throw new Error('Failed to fetch user posts')
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    if (session?.user.id) fetchData()
  }, [session])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const confirmDelete = confirm(
      '¿Estás seguro de que quieres eliminar esta consigna?'
    )

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        })

        const updatePosts = posts.filter((p) => p._id !== post._id)

        setPosts(updatePosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <ClipLoader
          color={'#123abc'}
          loading={isLoading}
          css={override}
          size={150}
        />
      ) : (
        <Profile
          name="Account"
          desc="Perfil personalizado basado en las creaciones de consignas del usuario."
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default ProfilePage
