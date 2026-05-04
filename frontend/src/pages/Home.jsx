import React, { useContext } from 'react'
import Nav from '../Component/Nav'
import Card from '../Component/Card'
import { listingDataContext } from '../Context/ListingContext'
import { userDataContext } from '../Context/UserContext'

function Home() {
  const { newListData, getListing, totalPages, currentPage } = useContext(listingDataContext)
  const { userLoading } = useContext(userDataContext)

  if (userLoading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-500'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      <Nav />
      <div className='pt-[220px] px-4 md:px-10 pb-10 max-w-[1480px] mx-auto'>
        {newListData.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 gap-4'>
            <p className='text-2xl text-gray-400'>No listings found</p>
            <p className='text-gray-400'>Try a different category or search term</p>
          </div>
        ) : (
          <>
            <div className='flex flex-wrap gap-6 justify-center'>
              {newListData.map(listing => (
                <Card key={listing._id} listing={listing} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='flex justify-center gap-2 mt-10'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition ${p === currentPage ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => getListing(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home
