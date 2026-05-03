import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi"
import { MdBedroomParent, MdOutlinePool } from "react-icons/md"
import { SiHomeassistantcommunitystore } from "react-icons/si"
import { IoBedOutline } from "react-icons/io5"
import { FaTreeCity } from "react-icons/fa6"
import { BiBuildingHouse } from "react-icons/bi"
import { listingDataContext } from '../Context/ListingContext'

const categories = [
  { key: "villa", label: "Villa", icon: <GiFamilyHouse className='w-8 h-8' /> },
  { key: "farmHouse", label: "Farm House", icon: <FaTreeCity className='w-8 h-8' /> },
  { key: "poolHouse", label: "Pool House", icon: <MdOutlinePool className='w-8 h-8' /> },
  { key: "rooms", label: "Rooms", icon: <MdBedroomParent className='w-8 h-8' /> },
  { key: "flat", label: "Flat", icon: <BiBuildingHouse className='w-8 h-8' /> },
  { key: "pg", label: "PG", icon: <IoBedOutline className='w-8 h-8' /> },
  { key: "cabin", label: "Cabin", icon: <GiWoodCabin className='w-8 h-8' /> },
  { key: "shops", label: "Shop / Studio", icon: <SiHomeassistantcommunitystore className='w-8 h-8' /> },
]

function ListingPage2() {
  const navigate = useNavigate()
  const { category, setCategory } = useContext(listingDataContext)

  return (
    <div className='min-h-screen bg-white px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/listingpage1")}>
            <FaArrowLeftLong className='text-white w-4 h-4' />
          </button>
          <h1 className='text-2xl font-bold text-gray-800'>Choose a category</h1>
          <span className='ml-auto text-sm text-gray-400'>Step 2 of 3</span>
        </div>

        <p className='text-gray-500 mb-6'>Which of these best describes your place?</p>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 text-sm font-medium transition hover:border-gray-400 ${category === cat.key ? "border-gray-900 bg-gray-50" : "border-gray-200 text-gray-600"}`}
              onClick={() => setCategory(cat.key)}
            >
              <span className={category === cat.key ? "text-gray-900" : "text-gray-500"}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <button
          className='w-full mt-8 py-3.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl disabled:opacity-50 transition'
          disabled={!category}
          onClick={() => navigate("/listingpage3")}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default ListingPage2
