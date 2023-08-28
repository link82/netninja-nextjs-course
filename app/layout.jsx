import './globals.css'
import { Rubik } from 'next/font/google'
const rubik = Rubik({ subsets: ['latin'] })

// default metadata for all pages
export const metadata = {
  title: 'Helpdesk',
  description: 'Helpdesk service for Dojo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        {children}
      </body>
    </html>
  )
}
