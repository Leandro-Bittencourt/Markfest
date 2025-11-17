import React, {useEffect, useState} from 'react'
import { createClient } from '../api'

export default function EventsPage({apiBase, token}){
  const client = createClient(apiBase, token)
  const [events,setEvents] = useState([])
  const [busy,setBusy] = useState(false)

  useEffect(()=>{ (async ()=>{
    setBusy(true)
    try{ const res = await client.get('/event-service/events'); setEvents(res.data || []) }
    catch(e){ console.error(e) }
    setBusy(false)
  })() },[])

  return (
    <div className="card">
      <h2>Events</h2>
      {busy ? <div>Loading...</div> : (
        <table className="tbl">
          <thead><tr><th>Id</th><th>Title</th><th>Starts</th><th>Price</th></tr></thead>
          <tbody>
            {events.map(ev=> (
              <tr key={ev.id}>
                <td>{ev.id}</td>
                <td>{ev.title}</td>
                <td>{ev.startsAt ? new Date(ev.startsAt).toLocaleString() : ''}</td>
                <td>{ev.price ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
