'use client'

import { useEffect } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/lib/auth'

const Crest = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 110" fill="none">
    <path d="M50 3 L97 18 L97 60 C97 84 75 103 50 107 C25 103 3 84 3 60 L3 18 Z" fill="#003f8a"/>
    <path d="M50 3 L50 107 C25 103 3 84 3 60 L3 18 Z" fill="#d0021b"/>
    <path d="M50 3 L97 18 L97 60 C97 84 75 103 50 107 Z" fill="#003f8a"/>
    <path d="M18 28 L82 72" stroke="white" strokeWidth="10" strokeLinecap="round"/>
    <text x="32" y="56" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="22" fill="white">A</text>
    <text x="68" y="56" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="22" fill="white">C</text>
    <path d="M50 3 L97 18 L97 60 C97 84 75 103 50 107 C25 103 3 84 3 60 L3 18 Z" fill="none" stroke="#c8a020" strokeWidth="2.5"/>
    <circle cx="50" cy="16" r="2.5" fill="#c8a020"/>
    <circle cx="42" cy="18" r="1.5" fill="#c8a020"/>
    <circle cx="58" cy="18" r="1.5" fill="#c8a020"/>
  </svg>
)

export default function LoginPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) router.replace('/')
  }, [user, loading, router])

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err) {
      console.error('Erro no login:', err)
    }
  }

  if (loading) return null

  return (
    <div style={{
      height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 10% 0%, rgba(208,2,27,.08) 0%, transparent 55%), radial-gradient(ellipse 60% 60% at 90% 100%, rgba(0,63,138,.1) 0%, transparent 55%)',
      }} />

      <div style={{ position: 'relative', width: 380, textAlign: 'center', padding: '0 16px' }}>
        <div style={{ marginBottom: 24 }}>
          <Crest size={72} />
        </div>

        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 26,
          letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text)', marginBottom: 6,
        }}>
          Atlético Cabeceirense
        </div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 11,
          letterSpacing: 4, color: 'var(--ac-red)', textTransform: 'uppercase', marginBottom: 40,
        }}>
          Observação de Jogadores
        </div>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '32px 28px',
        }}>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 24, lineHeight: 1.7 }}>
            Inicia sessão com a tua conta Google para aceder ao sistema de scouting.
          </div>

          <button
            onClick={handleGoogleLogin}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              padding: '12px 20px', borderRadius: 8, cursor: 'pointer',
              background: '#fff', border: '1px solid #ddd', color: '#333',
              fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600,
              transition: 'box-shadow .18s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,.35)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Entrar com Google
          </button>
        </div>
      </div>
    </div>
  )
}
