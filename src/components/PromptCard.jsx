'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ prompt, handleTagClick }) => {
  const [copied, setCopied] = useState(false)
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

        <div className="copy_btn" onClick={() => {}}>
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
    </div>
  )
}

export default PromptCard
