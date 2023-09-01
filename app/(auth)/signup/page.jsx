"use client"

import React from 'react'
import SignUpForm from './SignupForm'

import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()

  const onSuccessfulSignUp = () => {
    router.push('/verify')
  }

  return (
    <main>
      <SignUpForm onSuccess={onSuccessfulSignUp} />
    </main>
  )
}
