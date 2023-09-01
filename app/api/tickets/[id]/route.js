import { NextResponse } from "next/server"
// To force it to be dynamic, you can add a dynamic export
export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  const res = await fetch(`http://localhost:4000/tickets/${params.id}`)

  if (!res.ok) {
    return NextResponse.json({ message: 'Not found' }, {
      status: 404
    })
  }

  const ticket = await res.json()
  // response wrapper
  return NextResponse.json(ticket, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate'
    }
  })
}