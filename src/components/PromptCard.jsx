'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('')
  const { data: isUserLogged } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const handleCopy = () => {
    setCopied(prompt.prompt)
    navigator.clipboard.writeText(prompt.prompt)

    setTimeout(() => setCopied(''), 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt="user profile image"
            width={35}
            height={35}
            className="rounded-full"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === prompt.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt="clipboard icon"
            width={15}
            height={15}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>

      {isUserLogged?.user.id === prompt.creator._id &&
        pathName === '/profile' && (
          <div className="flex justify-end items-center gap-5 mt-5">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Editar
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Eliminar
            </p>
          </div>
        )}
    </div>
  )
}

export default PromptCard
