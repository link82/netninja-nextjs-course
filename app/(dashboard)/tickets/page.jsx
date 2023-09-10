import React, { Suspense } from 'react'
import TicketList from './TicketList'
import Loading from '../loading'
import Link from 'next/link'

export const metadata = {
  title: 'Tickets - Helpdesk',
}

export default function Tickets() {
  return (
    <main>
      <nav>
        <div className="w-full mb-4">
          <div className="w-full flex">
            <h2>Tickets</h2>
            <Link href="/tickets/create" className=' ml-auto'>
              <button className="btn-primary">Open a new ticket</button>
            </Link>
          </div>
          <p>Currently open tickets.</p>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  )
}
