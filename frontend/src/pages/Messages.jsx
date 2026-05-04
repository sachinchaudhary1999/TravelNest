import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { authDataContext } from '../Context/AuthContext'
import { userDataContext } from '../Context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { IoChatbubblesOutline } from 'react-icons/io5'

function Messages() {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { userData } = useContext(userDataContext)
  const [convos, setConvos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const r = await axios.get(serverUrl + "/api/message/conversations", { withCredentials: true })
        setConvos(r.data)
      } catch (err) {
        toast.error("Could not load messages")
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if (loading) return <div className='flex items-center justify-center h-screen'><div className='animate-spin rounded-full h-10 w-10 border-b-2 border-red-500' /></div>

  return (
    <div className='min-h-screen bg-gray-50 px-4 md:px-10 py-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
            <FaArrowLeftLong className='text-white w-4 h-4' />
          </button>
          <h1 className='text-2xl font-bold text-gray-800'>Messages</h1>
        </div>

        {convos.length === 0 ? (
          <div className='text-center py-20'>
            <IoChatbubblesOutline className='w-16 h-16 text-gray-300 mx-auto mb-4' />
            <p className='text-xl text-gray-400'>No conversations yet</p>
            <p className='text-gray-400 text-sm mt-1'>Messages appear here after booking</p>
          </div>
        ) : (
          <div className='space-y-2'>
            {convos.map(({ booking, unread, lastMessage }) => {
              const isHost = booking.host?._id === userData?._id
              const other = isHost ? booking.guest : booking.host
              return (
                <div
                  key={booking._id}
                  className='bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition'
                  onClick={() => navigate(`/chat/${booking._id}`)}
                >
                  {other?.avatar
                    ? <img src={other.avatar} className='w-12 h-12 rounded-full object-cover flex-shrink-0' alt="" />
                    : <div className='w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold flex-shrink-0'>
                        {other?.name?.charAt(0).toUpperCase()}
                      </div>
                  }
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <p className='font-semibold text-gray-800 truncate'>{other?.name}</p>
                      {lastMessage && <p className='text-xs text-gray-400 flex-shrink-0'>{new Date(lastMessage.createdAt).toLocaleDateString()}</p>}
                    </div>
                    <p className='text-sm text-gray-500 truncate'>{booking.listing?.title}</p>
                    {lastMessage && <p className='text-sm text-gray-400 truncate mt-0.5'>{lastMessage.text}</p>}
                  </div>
                  {unread > 0 && (
                    <span className='w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0'>{unread}</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
