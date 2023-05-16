import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const devName = 'RandyPol'
  const devLinkedIn = 'https://www.linkedin.com/in/randypol/'
  const devGithub = 'https://github.com/RandyPol'

  return (
    <footer class="bg-gray-200 text-gray-900 py-4 px-4">
      <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0 items-center">
        <p class="text-md font-satoshi">
          Developed by {devName} &copy; {currentYear}
        </p>
        <div class="flex space-x-6">
          <Link href={devLinkedIn} target="_blank">
            <FaLinkedin size={20} color="blue" />
          </Link>
          <Link href={devGithub} target="_blank">
            <FaGithub size={20} color="black" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
