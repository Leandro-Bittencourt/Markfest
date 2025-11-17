import React, {useEffect, useState} from 'react'
import { createClient } from '../api'

function Row({r, onDelete}){
  return (
    <tr>
      <td>{r.id}</td>
      <td>{r.userId}</td>
      <td>{r.eventId}</td>
      <td>{r.status}</td>
      <td>{r.paid ? 'yes' : 'no'}</td>
      <td>{new Date(r.createdAt).toLocaleString()}</td>
      <td><button onClick={()=>onDelete(r.id)}>Delete</button></td>
    </tr>
  )
}

export default function RegistrationsPage({apiBase, token}){
  const [userId, setUserId] = useState(1)
  const [eventId, setEventId] = useState(2)
  const [list, setList] = useState([])
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)

  const client = createClient(apiBase, token)

  const create = async () => {
    setBusy(true); setMsg(null)
    try{
      const res = await client.post('/participation-service/registrations',{userId, eventId})
      setMsg({type:'success', text: 'Created: ' + res.data.id})
      fetchList()
    }catch(e){ setMsg({type:'error', text: e.response?.data || e.message}) }
    setBusy(false)
  }

  const fetchList = async () => {
    setBusy(true); setMsg(null)
    try{
      const res = await client.get(`/participation-service/registrations/user/${userId}`)
      setList(res.data || [])
    }catch(e){ setMsg({type:'error', text: e.response?.data || e.message}) }
    setBusy(false)
  }

  const del = async (id) => {
    if (!confirm('Delete registration '+id+'?')) return
    setBusy(true); setMsg(null)
    try{
      await client.delete(`/participation-service/registrations/${id}`)
      setMsg({type:'success', text: 'Deleted '+id})
      fetchList()
    }catch(e){ setMsg({type:'error', text: e.response?.data || e.message}) }
    setBusy(false)
  }

  useEffect(()=>{ fetchList() }, [])

  return (
    <div className="card">
      <h2>Registrations</h2>
      <div className="row">
        <label>User ID</label>
        <input type="number" value={userId} onChange={e=>setUserId(Number(e.target.value))} />
        <label>Event ID</label>
        <input type="number" value={eventId} onChange={e=>setEventId(Number(e.target.value))} />
      </div>
      <div className="row">
        <button onClick={create} disabled={busy}>Create</button>
        <button onClick={fetchList} disabled={busy}>Refresh</button>
      </div>
      {msg && <div className={"msg " + msg.type}>{String(msg.text)}</div>}

      <table className="tbl">
        <thead><tr><th>Id</th><th>User</th><th>Event</th><th>Status</th><th>Paid</th><th>Created</th><th></th></tr></thead>
        <tbody>
          {list.map(r => <Row key={r.id} r={r} onDelete={del} />)}
        </tbody>
      </table>
    </div>
  )
}
