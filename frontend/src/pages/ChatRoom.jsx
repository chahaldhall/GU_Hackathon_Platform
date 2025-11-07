import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'

let socket

export default function ChatRoom() {
  const { teamId } = useParams()
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState('')
  const bottomRef = useRef()

  useEffect(() => {
    // Fetch historical messages
    const token = localStorage.getItem('token')
    axios.get(`/api/chat/team/${teamId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setMessages(res.data))
      .catch(() => {})
  }, [teamId])

  useEffect(() => {
    socket = io(import.meta.env.VITE_API_ORIGIN || 'http://localhost:5000')
    socket.emit('joinTeamRoom', teamId)
    socket.on('newMessage', (msg) => setMessages((prev) => [...prev, msg]))
    return () => {
      socket.emit('leaveTeamRoom', teamId)
      socket.disconnect()
    }
  }, [teamId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage(e) {
    e.preventDefault()
    const senderId = localStorage.getItem('userId')
    if (!content.trim() || !senderId) return
    socket.emit('sendMessage', { teamId, senderId, content })
    setContent('')
  }

  return (
    <div className="card h-[70vh] flex flex-col">
      <div className="font-semibold mb-2">Team Chat</div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m) => (
          <div key={m._id} className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-gu-gold" />
            <div>
              <div className="text-sm font-medium">{m.sender?.name || 'Member'}</div>
              <div className="text-sm">{m.content}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="mt-3 flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 border rounded-md px-3 py-2"
          placeholder="Type a message"
        />
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
    </div>
  )
}








