"use client" // must be in double quotes

import React, { useState } from 'react'
import { useRouter }  from 'next/navigation'

export default function CreateForm() {

  const router = useRouter()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [priority, setPriority] = useState('low')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const res = await fetch('http://localhost:4000/tickets', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        priority,
        user_email: 'foo@bar.com'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      router.refresh()
      router.push('/tickets')
    } else {
      console.error('Error creating ticket')
    }


  }

  return (
    <form className='w-1/2'
      onSubmit={handleSubmit}>
      <label>
        <span>Title:</span>
        <input
          required 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Description:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select 
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button 
          className="btn-primary" 
          disabled={isLoading}
        >
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  )
}
