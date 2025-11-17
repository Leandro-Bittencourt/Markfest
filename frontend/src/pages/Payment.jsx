import React, {useState} from 'react'
import { createClient } from '../api'

export default function PaymentPage({apiBase, token}){
  const client = createClient(apiBase, token)
  const [eventId,setEventId] = useState(1)
  const [amount,setAmount] = useState(10)
  const [msg,setMsg] = useState(null)

  const pay = async ()=>{
    setMsg(null)
    try{
      const res = await client.post('/payment-service/payments',{eventId,amount})
      setMsg({type:'success', text: JSON.stringify(res.data)})
    }catch(e){ setMsg({type:'error', text: e.response?.data || e.message}) }
  }

  return (
    <div className="card">
      <h2>Payment</h2>
      <div className="row">
        <label>Event ID</label>
        <input type="number" value={eventId} onChange={e=>setEventId(Number(e.target.value))} />
        <label>Amount</label>
        <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
        <button onClick={pay}>Pay</button>
      </div>
      {msg && <div className={"msg " + msg.type}>{String(msg.text)}</div>}
    </div>
  )
}
