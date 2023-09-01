// route handlers
// available only inside app folder

// allows you to create custom request handlers for your API
// this allows to fetch data from client components

import { NextResponse } from "next/server"

// API path will be /api/tickets

// NB: this is a static route handler, it will be cached and called only once, like a server component

// To force it to be dynamic, you can add a dynamic export
export const dynamic = 'force-dynamic'

/* It would default to dynamic if:
  - you use Request object on a GET request
  - you use any other HTTP method than GET
  - you use dynamic function like cookies or headers
*/

// Supabase
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(request) {
  const ticket = await request.json()

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies })

  // get current user session
  const { data: { session } } = await supabase.auth.getSession()

  // insert the data
  const { data, error } = await supabase.from('tickets')
    .insert({
      ...ticket,
      user_email: session.user.email,
    })
    .select()
    .single()

  return NextResponse.json({ data, error })
}

export async function GET() {
  const res = await fetch('http://localhost:4000/tickets')
  const tickets = await res.json()

  // response wrapper
  return NextResponse.json(tickets, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate'
    }
  })
}