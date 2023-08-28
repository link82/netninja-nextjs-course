import React from 'react'
import Navbar from '../components/navbar'

// Nested layout example
export default function DashboardLayout({ children}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
