import React from 'react'
import Navbar from '../components/Navbar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Nested layout example
export default async function DashboardLayout({ children}) {
  // retrieve user session from supabase
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    // server component
    redirect('/login')
  }

  return (
    <>
      <Navbar user={data.session.user} />
      {children}
    </>
  )
}
