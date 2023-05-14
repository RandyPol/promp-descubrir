'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { singIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  return (
    <nav
      className="flex-between w-full
    mb-16 pt-3"
    >
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Companys log"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PrompDescubrir</p>
      </Link>
    </nav>
  )
}

export default Nav
