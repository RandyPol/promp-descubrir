'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: isUserLogged } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(() => {
    const getProvidersData = async () => {
      const providersData = await getProviders()
      setProviders(providersData)
    }
    getProvidersData()
  }, [])

  return (
    <nav
      className="flex-between w-full
    mb-16 pt-3"
    >
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/ai-logo.svg"
          alt="Company logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptDescubrir</p>
      </Link>

      {/* Response design */}
      <div className="sm:flex hidden">
        {isUserLogged?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Crear Publicación
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Cerrar sesión
            </button>
            <Link href="/profile">
              <Image
                src={isUserLogged?.user.image}
                alt="Profile"
                width={35}
                height={35}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Iniciar Sesión
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile design */}
      <div className="sm:hidden flex relative">
        {isUserLogged?.user ? (
          <div className="flex">
            <Image
              src={isUserLogged?.user.image}
              alt="Profile"
              width={35}
              height={35}
              className="rounded-full"
              onClick={() => setToggleMenu((prev) => !prev)}
            />

            {toggleMenu && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleMenu((prev) => !prev)}
                >
                  Mi perfil
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleMenu((prev) => !prev)}
                >
                  Crear Publicación
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut()
                    setToggleMenu((prev) => !prev)
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Iniciar Sesión
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
