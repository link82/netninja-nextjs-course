import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import DeleteButton from './DeleteButton'
// needed to tell next.js which pages to generate (no longer needed, we have auth in place, we can't statically generate this page)
// export async function generateStaticParams() {
// 	const res = await fetch('http://localhost:4000/tickets')
// 	// remember: json is an async function
// 	const tickets = await res.json()
// 	return tickets.map(el => el.id)
// }

// avoid generating all possible pages
export const dynamicParams = true

// dynamic metadata
export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: ticket } = await supabase.from('tickets').select().eq('id', params.id).single() // filter records by id
  return {
    title: `Ticket - ${ticket?.title || 'Ticket not found'}`,
  }
}

async function getTicket(id) {

  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from('tickets').select().eq('id', id).single() // filter records by id

  if (!data) { // 404
    return notFound()
  }

  return data
}

export default async function TicketDetails({ params }) {
  const id = params.id
  const ticket = await getTicket(id)

  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()


  if (!ticket) {
    notFound()
  }

  return (
    <main>
      <nav>
        <h2>Ticket details</h2>
        {
          data?.session?.user && data.session.user.email === ticket.user_email &&
          <DeleteButton 
            id={id}
            />
        }
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
