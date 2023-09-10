"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addTicket(formData) {
  const ticket = Object.fromEntries(formData)

  const supabase = createServerActionClient({ cookies })

  // get current user session
  const { data: { session } } = await supabase.auth.getSession()

  // insert the data
  const { error } = await supabase.from('tickets')
    .insert({
      ...ticket,
      user_email: session.user.email,
    })

  if (!error) {
    revalidatePath('/tickets')
    redirect('/tickets')
  } else {
    console.log(error)
    throw new Error('Could not add ticket')
  }
}

export async function deleteTicket(id) {
  const supabase = createServerActionClient({ cookies })

  // delete the data
  const { error } = await supabase.from('tickets')
    .delete()
    .eq('id', id)

  if (!error) {
    revalidatePath('/tickets')
    redirect('/tickets')
  } else {
    throw new Error('Could not delete the ticket')
  }
}