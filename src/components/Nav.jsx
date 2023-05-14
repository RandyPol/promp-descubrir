'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { singIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const isUserLogged = true
  return (
    <nav
      className="flex-between w-full
    mb-16 pt-3"
    >
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Company logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PrompDescubrir</p>
      </Link>

      {/* Response design */}
      <div className="sm:flex hidden">
        {isUserLogged ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Crear Publicación
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Cerrar sesión
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                alt="Profile"
                width={35}
                height={35}
              />
            </Link>
          </div>
        ) : (
          <>
            <Link href="/login" className="flex gap-2 flex-center" />
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
