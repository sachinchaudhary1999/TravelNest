import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { authDataContext } from '../Context/AuthContext'
import { userDataContext } from '../Context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { IoSend } from 'react-icons/io5'

function Chat() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { userData } = useContext(userDataContext)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [otherUser, setOtherUser] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const [msgRes, bookRes] = await Promise.all([
          axios.get(serverUrl + `/api/message/booking/${bookingId}`, { withCredentials: true }),
          axios.get(serverUrl + `/api/booking/mybookings`, { withCredentials: true }),
        ])
        setMessages(msgRes.data)
        const booking = bookRes.data.find(b => b._id === bookingId)
        if (booking) {
          const isHost = booking.host?._id === userData?._id
          setOtherUser(isHost ? booking.guest : booking.host)
        }
      } catch (err) {
        toast.error("Could not load messages")
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [bookingId])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setSending(true)
    try {
      const r = await axios.post(serverUrl + `/api/message/send/${bookingId}`, { text }, { withCredentials: true })
      setMessages(prev => [...prev, r.data])
      setText("")
    } catch (err) {
      toast.error("Could not send message")
    } finally {
      setSending(false)
    }
  }

  if (loading) return <div className='flex items-center justify-center h-screen'><div className='animate-spin rounded-full h-10 w-10 border-b-2 border-red-500' /></div>

  return (
    <div className='h-screen flex flex-col bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3'>
        <button className='w-9 h-9 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/messages")}>
          <FaArrowLeftLong className='text-white w-3.5 h-3.5' />
        </button>
        {otherUser && (
          <>
            {otherUser.avatar
              ? <img src={otherUser.avatar} className='w-9 h-9 rounded-full object-cover' alt="" />
              : <div className='w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-sm'>
                  {otherUser.name?.charAt(0).toUpperCase()}
                </div>
            }
            <p className='font-semibold text-gray-800'>{otherUser.name}</p>
          </>
        )}
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto px-4 py-6 space-y-3'>
        {messages.length === 0 && (
          <p className='text-center text-gray-400 text-sm py-10'>No messages yet. Say hello!</p>
        )}
        {messages.map(m => {
          const isMine = m.sender?._id === userData?._id || m.sender === userData?._id
          return (
            <div key={m._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              {!isMine && (
                <div className='w-7 h-7 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold mr-2 self-end flex-shrink-0'>
                  {m.sender?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={`max-w-xs md:max-w-md px-4 py-2.5 rounded-2xl text-sm ${isMine ? "bg-red-500 text-white rounded-br-sm" : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"}`}>
                <p>{m.text}</p>
                <p className={`text-xs mt-1 ${isMine ? "text-red-200" : "text-gray-400"}`}>
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className='bg-white border-t border-gray-200 px-4 py-3 flex gap-3 items-center'>
        <input
          type="text"
          className='flex-1 border-2 border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-red-400 transition'
          placeholder='Type a message...'
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          type="submit" disabled={sending || !text.trim()}
          className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-red-600 transition'
        >
          <IoSend className='text-white w-4 h-4' />
        </button>
      </form>
    </div>
  )
}

export default Chat
