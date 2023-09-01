"use client";

import React, { useState } from 'react'

// client only version of @supabase/auth-client
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignUpForm({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const supabase = createClientComponentClient()

    try {
      console.log('signing up')
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          privacy: privacyAccepted,
          privacy_accepted_at: new Date(),
          terms: termsAccepted,
          terms_accepted_at: new Date(),
          emailRedirectToken: `${process.env.BASE_URL}/api/auth/callback` // callback url for user verification
        }
      })

      if (error) {
        console.log('error', error)
        setError(error.message)
      } else {
        console.log('success, redirect to verify email page')
        if (onSuccess)
          onSuccess()
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center">
        Sign up
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
        <label htmlFor="remember">Privacy</label>
        <input type="checkbox" id="privacy" className="form-control" value={privacyAccepted} onChange={e => setPrivacyAccepted(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="remember">Terms</label>
        <input type="checkbox" id="terms" className="form-control" value={termsAccepted} onChange={e => setTermsAccepted(e.target.value)} />
      </div>
      <button type="submit" className="btn-primary">Sign up</button>
    </form>
  )
}
