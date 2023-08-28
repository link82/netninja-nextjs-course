import React from 'react'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
	const res = await fetch('http://localhost:4000/tickets')
	// remember: json is an async function
	const tickets = await res.json()
	return tickets.map(el => el.id)
}

async function getTicket(id) {
  try {
    const response = await fetch(`http://localhost:4000/tickets/${id}`, {
      next: {
        revalidate: 60 // using generateStaticParams this cannot be zero
      }
    })

    if (!response.ok) { // 404
      return undefined
    }

    return response.json()
  } catch (error) {
    console.error(error)
  }
}

// dynamic metadata
export async function generateMetadata({ params }) {

  const ticket = await getTicket(params.id)

  return {
    title: `Ticket - ${ticket.title}`
  }
}


export default async function TicketDetails({ params }) {
  const id = params.id
  const ticket = await getTicket(id)

  if (!ticket) {
    notFound()
  }

  return (
    <main>
      <nav>
        <h2>Ticket details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
      </div>
      <div className={`pill ${ticket.priority}`}>
        {ticket.priority} priority
      </div>
    </main>
  )
}
