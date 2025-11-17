import React from 'react'

export default function Header({token, onLogout, apiBase, setApiBase}){
  return (
    <header className="header">
      <div className="brand">MarkFest</div>
      <div className="hdr-controls">
        <label>API Base:</label>
        <input value={apiBase} onChange={e=>setApiBase(e.target.value)} placeholder="/ or http://localhost:8083" />
        {token ? <button onClick={onLogout}>Logout</button> : <span className="hint">Not logged</span>}
      </div>
    </header>
  )
}
