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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await res.json()

      setPosts(data)
      setLoading(false)
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
      <ClipLoader
        color={'#123abc'}
        loading={loading}
        css={override}
        size={150}
      />
      {!loading && (
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
