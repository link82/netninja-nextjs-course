"use client"
import React from 'react'

export default function error({ error, reset }) {
  return (
    <main className="text-center">
      <h2 className="text-4xl">On no!</h2>
      <p>{error.message}</p>
      <button
        onClick={reset}
        className='btn-primary mx-auto my-4'
      >
        Try again
      </button>
    </main>
  )
}
