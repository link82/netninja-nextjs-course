"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
// client only version of @supabase/auth-client
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.log('error', error)
      setError(error.message)
    } else {
      console.log('success, redirect to dashboard')
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center">
        Log in
      </h2>
      {
        error &&
        <div className="error">
          {error}
        </div>
      }
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="remember">Remember me</label>
        <input type="checkbox" id="remember" className="form-control" value={remember} onChange={e => setRemember(e.target.value)} />
      </div>
      <button type="submit" className="btn-primary">Log in</button>
    </form>
  )
}
