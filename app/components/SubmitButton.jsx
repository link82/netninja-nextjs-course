"use client"
import React from 'react'

//import {  useFormStatus } from 'next/hooks'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <div>
      <button
        className="btn-primary"
        disabled={pending}
      >
        {!pending && <span>Submit</span>}
        {pending && <span>Submitting...</span>}
      </button>
    </div>
  )
}
