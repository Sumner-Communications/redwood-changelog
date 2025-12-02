'use client'

import { useId, useState } from 'react'

import { Button } from '@/components/Button'

export function SignUpForm() {
  let id = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-8 rounded-lg bg-sky-500/10 px-4 py-3 text-sm text-sky-300">
        {message}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative isolate mt-8 flex items-center pr-1"
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        required
        type="email"
        autoComplete="email"
        name="email"
        id={id}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        disabled={status === 'loading'}
        className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-hidden disabled:opacity-50 sm:text-[0.8125rem]/6"
      />
      <Button type="submit" arrow disabled={status === 'loading'}>
        {status === 'loading' ? 'Subscribing...' : 'Get updates'}
      </Button>
      <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15" />
      <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
      {status === 'error' && (
        <p className="absolute -bottom-6 left-0 text-xs text-red-400">
          {message}
        </p>
      )}
    </form>
  )
}
