'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const supabase = createClient()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else if (data.session) {
        // Email confirmation is off, so sign-up returns a live session.
        // Send them straight in rather than asking for an email that won't arrive.
        router.push('/dashboard')
        router.refresh()
      } else {
        // Confirmation is on: no session until they click the emailed link.
        setSuccess('Check your email to confirm your account, then log in.')
        setMode('login')
      }
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fdf6f0 0%, #f0f7f4 100%)',
      fontFamily: "'Georgia', serif",
      padding: '1rem',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🪺</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#2d4a3e', letterSpacing: '-0.02em', margin: 0 }}>NestNote</h1>
          <p style={{ color: '#7a9e8e', fontSize: '0.9rem', marginTop: '0.35rem', fontStyle: 'italic' }}>Postpartum care, thoughtfully tracked</p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 24px rgba(45,74,62,0.08)', border: '1px solid rgba(45,74,62,0.08)' }}>
          <div style={{ display: 'flex', background: '#f5f9f7', borderRadius: '10px', padding: '4px', marginBottom: '1.75rem' }}>
            {['login', 'signup'].map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(null); setSuccess(null) }}
                style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.2s', background: mode === m ? 'white' : 'transparent', color: mode === m ? '#2d4a3e' : '#7a9e8e', boxShadow: mode === m ? '0 1px 4px rgba(45,74,62,0.12)' : 'none' }}>
                {m === 'login' ? 'Log in' : 'Sign up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#2d4a3e', marginBottom: '0.4rem' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1.5px solid #dde8e3', borderRadius: '8px', fontSize: '0.95rem', color: '#2d4a3e', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                onFocus={(e) => e.target.style.borderColor = '#4a9e7e'}
                onBlur={(e) => e.target.style.borderColor = '#dde8e3'} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#2d4a3e', marginBottom: '0.4rem' }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6}
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1.5px solid #dde8e3', borderRadius: '8px', fontSize: '0.95rem', color: '#2d4a3e', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                onFocus={(e) => e.target.style.borderColor = '#4a9e7e'}
                onBlur={(e) => e.target.style.borderColor = '#dde8e3'} />
              {mode === 'signup' && <p style={{ fontSize: '0.75rem', color: '#7a9e8e', margin: '0.4rem 0 0' }}>At least 6 characters.</p>}
            </div>

            {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>}
            {success && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.85rem', marginBottom: '1rem' }}>{success}</div>}

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '0.75rem', background: loading ? '#a8c5b8' : '#2d4a3e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
              {loading ? '…' : mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}