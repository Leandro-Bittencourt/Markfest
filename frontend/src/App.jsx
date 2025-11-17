import React, {useState} from 'react'
import Header from './components/Header'
import AuthPage from './pages/Auth'
import RegistrationsPage from './pages/Registrations'
import EventsPage from './pages/Events'
import PaymentPage from './pages/Payment'

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('mf_token') || null)
  const [apiBase, setApiBase] = useState(import.meta.env.VITE_API_BASE || '/')

  const handleLogin = (tok) => {
    localStorage.setItem('mf_token', tok)
    setToken(tok)
  }
  const handleLogout = () => {
    localStorage.removeItem('mf_token')
    setToken(null)
  }

  const [view,setView] = useState('events')

  return (
    <div className="app-root">
      <Header token={token} onLogout={handleLogout} apiBase={apiBase} setApiBase={setApiBase} />
      <main className="container">
        {!token ? (
          <AuthPage onLogin={handleLogin} apiBase={apiBase} />
        ) : (
          <div>
            <div className="row" style={{marginBottom:12}}>
              <button onClick={()=>setView('events')}>Events</button>
              <button onClick={()=>setView('registrations')}>My Registrations</button>
              <button onClick={()=>setView('payment')}>Payment</button>
            </div>
            {view === 'events' && <EventsPage apiBase={apiBase} token={token} />}
            {view === 'registrations' && <RegistrationsPage apiBase={apiBase} token={token} />}
            {view === 'payment' && <PaymentPage apiBase={apiBase} token={token} />}
          </div>
        )}
      </main>
      <footer className="footer">MarkFest — Demo frontend</footer>
    </div>
  )
}
