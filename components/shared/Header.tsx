import Image from 'next/image'
import Link from 'next/link'
import imageAsset from '../../public/assets/images/logo.svg'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import NavItem from './NavItems'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    // <header className='w-full border-b'>
        <div className='wrapper flex items-center justify-between'>
            <Link href="/" className='w-36'>
                <Image 
                    src={imageAsset}
                    width={128} 
                    height={38}
                    alt='Evently logo'
                />
            </Link>

            <SignedIn>
                <nav className='md:flex-between hidden w-full max-w-xs'>
                    <NavItem />
                </nav>
            </SignedIn>


            <div className='flex w-32 justify-end gap-3'> 
                <SignedIn>
                    <UserButton afterSignOutUrl='/'/>
                    <MobileNav />
                </SignedIn>
                <SignedOut>
                    <Button variant='destructive' asChild className='rounded-full' size={'lg'}>
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                </SignedOut>
            </div>
        </div>
    // </header>
  )
}

export default Header