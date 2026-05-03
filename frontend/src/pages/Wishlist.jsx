import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { userDataContext } from '../Context/UserContext'
import Card from '../Component/Card'

function Wishlist() {
  const navigate = useNavigate()
  const { userData } = useContext(userDataContext)
  const wishlist = userData?.wishlist || []

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-8 md:px-10'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
            <FaArrowLeftLong className='text-white w-4 h-4' />
          </button>
          <h1 className='text-2xl font-bold text-gray-800'>Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className='text-center py-20'>
            <p className='text-4xl mb-4'>❤️</p>
            <p className='text-xl text-gray-400 mb-2'>No saved listings</p>
            <p className='text-gray-400 text-sm mb-6'>Tap the heart on any listing to save it here</p>
            <button className='px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600' onClick={() => navigate("/")}>Explore listings</button>
          </div>
        ) : (
          <div className='flex flex-wrap gap-6 justify-center md:justify-start'>
            {wishlist.map(l => <Card key={l._id} listing={l} />)}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
