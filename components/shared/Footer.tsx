import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoIcon from '@/public/assets/images/logo.svg'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center flex-between flex flex-col
      gap-5 p-5 text-center sm:flex-row'>
        <Link href='/'>
          <Image 
          src={LogoIcon}
          width={128}
          height={38}
          alt='logo'
          />
        </Link>
        <p>2024 Evently. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer