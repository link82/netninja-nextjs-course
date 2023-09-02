import { NextResponse } from "next/server"
// To force it to be dynamic, you can add a dynamic export
// export const dynamic = 'force-dynamic' // <- needed only for GET requests

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function DELETE(request, { params }) {
  const id = params.id
  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.from('tickets').delete().eq('id', id)

  // no longer needed, we set permissions on the table to avoid other users to delete tickets
  // const { data: ticket } = await supabase.from('tickets').select().eq('id', params.id).single()
  // if (ticket.user_email === data.session.user.email) {
  //   const { data: deletedTicket } = await supabase.from('tickets').delete().eq('id', params.id).single()
  //   return NextResponse.json(deletedTicket, {
  //     status: 200,
  //     headers: {
  //       'Cache-Control': 's-maxage=60, stale-while-revalidate'
  //     }
  //   })
  // }

  return NextResponse.json({ error })
}