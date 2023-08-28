import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">Nothing to see in here!</h2>
      <p>We could not find the ticket you were looking for</p>
      <p>
        Go Back to the <Link href="/tickets">Tickets list</Link>.
      </p>
    </main>
  )
}
