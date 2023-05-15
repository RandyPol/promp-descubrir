'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/profile'

const ProfilePage = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await res.json()

      setPosts(data)
    }
    if (session?.user.id) fetchData()
  }, [session])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    console.log('delete')
  }

  return (
    <>
      <Profile
        name="John"
        desc="Perfil personalizado basado en las creaciones de consignas del usuario."
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default ProfilePage
