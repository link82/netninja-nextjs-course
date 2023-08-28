import React from 'react'
import Link from 'next/link'

export default function AuthLayout({ children }) {
  return (
    <>
      <nav>
        <h1>Dojo Helpdesk</h1>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign up</Link>
      </nav>
      {children}
    </>
  )
}
