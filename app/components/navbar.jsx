import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from './dojo-logo.png'
import LogoutButton from '../components/LogoutButton'

export default function Navbar({ user }) {
  return (
    <nav>
      <Image
        src={Logo}
        alt='Dojo Helpdesk logo'
        width={70}
        placeholder='blur'
        quality={100}
      />
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className='mr-auto'>Tickets</Link>
      { 
        user &&
        <>
          Hello {user.email}
        </>
      }
      <LogoutButton />
    </nav>
  )
}
