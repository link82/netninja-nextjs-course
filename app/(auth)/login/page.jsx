import React from 'react'
import LoginForm from './LoginForm'

// if you use route groups the page.jsx file in the root of the group will be used as homepage page,
// so only one group can have it
export default function Login() {
  return (
    <main>
      <LoginForm />
    </main>
  )
}
