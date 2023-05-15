'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/profile'

const page = () => {
  return (
    <Profile
      name="John"
      desc="Personilized profile based on the user"
      data={[]}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  )
}

export default page
