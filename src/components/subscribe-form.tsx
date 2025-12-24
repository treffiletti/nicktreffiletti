'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface SubscribeFormProps {
  className?: string
  placeholder?: string
  buttonText?: string
}

export function SubscribeForm({
  className = '',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe'
}: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: ''
  })

  // Extract UTM parameters from URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      setUtmParams({
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || ''
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          ...utmParams
        }),
      })

      const data = await response.json()

      if (data.ok) {
        setStatus('success')
        setEmail('')
        trackEvent.newsletterSubscribe()
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
        <div className="flex-1">
          <label htmlFor="email-subscribe" className="sr-only">
            Email address
          </label>
          <input
            id="email-subscribe"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            disabled={status === 'loading'}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? 'Subscribing...' : buttonText}
        </button>
      </form>

      {/* Status messages with aria-live for screen readers */}
      <div aria-live="polite" className="mt-2 text-sm">
        {status === 'success' && (
          <p className="text-green-600 dark:text-green-400">
            ✓ Success! Check your email for the Platform Architecture Scorecard.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 dark:text-red-400">
            ✗ {errorMessage}
          </p>
        )}
      </div>
    </div>
  )
}
