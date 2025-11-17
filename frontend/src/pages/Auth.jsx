import React, {useState} from 'react'
import { createClient } from '../api'

export default function AuthPage({onLogin, apiBase}){
  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('senha123')
  const [busy,setBusy] = useState(false)
  const [msg,setMsg] = useState(null)

  const client = createClient(apiBase, null)

  const register = async () => {
    setBusy(true); setMsg(null)
    try{
      const res = await client.post('/auth-service/auth/register',{email,password})
      setMsg({type:'success', text: 'Registered'})
    }catch(e){ setMsg({type:'error', text: e.response?.data || e.message}) }
    setBusy(false)
  }

  const login = async () => {
    setBusy(true); setMsg(null)
    try{
      const res = await client.post('/auth-service/auth/login',{email,password})
      const token = res.data?.token || res.data
      if (!token) throw new Error('No token in response')
      onLogin(token)
    }catch(e){ setMsg({type:'error', text: e.response?.data || e.message}) }
    setBusy(false)
  }

  return (
    <div className="card">
      <h2>Login / Register</h2>
      <label>Email</label>
      <input value={email} onChange={e=>setEmail(e.target.value)} />
      <label>Password</label>
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
      <div className="row">
        <button onClick={login} disabled={busy}>Login</button>
        <button onClick={register} disabled={busy}>Register</button>
      </div>
      {msg && <div className={"msg " + msg.type}>{String(msg.text)}</div>}
    </div>
  )
}
