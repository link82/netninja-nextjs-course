// we are inside a route handler
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
// we need to access cookies (supabase uses cookies to store the session)
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  // let's parse the URL
  const url = new URL(request.url)

  // get the code from the query string
  const code = url.searchParams.get('code')

  if (code) {
    // start a session
    const supabase = createRouteHandlerClient({ cookies })
    // passes the code to the supabase client, to create a session
    const authRes = await supabase.auth.exchangeCodeForSession(code)
    // get the session
    const { user, session, error } = authRes

    console.log('user', user)
    console.log('session', session)
    console.log('error', error)

    // if (error) {
    //   return NextResponse.redirect('/login', {
    //     status: 302,
    //   })
    // } else {
    //   // set the cookie
    //   return NextResponse.redirect('/dashboard', {
    //     status: 302,
    //     headers: {
    //       'Set-Cookie': session?.setCookie
    //     }
    //   })
    // }
  }

  return NextResponse.redirect(url.origin)
}