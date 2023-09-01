"use client"

import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const handleLogout = async () => {
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log('error', error)
    } else {
      console.log('success, redirect to login page')
      router.push('/login')
    }
  }

  return (
    <button
      className='btn-primary'
      onClick={handleLogout}
    >Log out</button>
  )
}
