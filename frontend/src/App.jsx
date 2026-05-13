import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { userDataContext } from './Context/UserContext'

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import MyListing from './pages/MyListing'
import EditListing from './pages/EditListing'
import ViewCard from './pages/ViewCard'
import MyBooking from './pages/MyBooking'
import Booked from './pages/Booked'
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'
import Messages from './pages/Messages'
import Chat from './pages/Chat'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DestinationPage from './pages/DestinationPage'

function PrivateRoute({ children }) {
  const { userData, userLoading } = useContext(userDataContext)
  if (userLoading) return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>
  return userData ? children : <Navigate to="/login" />
}

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/destinations/:city' element={<DestinationPage />} />

        <Route path='/listingpage1' element={<ListingPage1 />} />
        <Route path='/listingpage2' element={<ListingPage2 />} />
        <Route path='/listingpage3' element={<ListingPage3 />} />
        <Route path='/mylisting' element={<PrivateRoute><MyListing /></PrivateRoute>} />
        <Route path='/editlisting/:id' element={<PrivateRoute><EditListing /></PrivateRoute>} />
        <Route path='/viewcard' element={<ViewCard />} />
        <Route path='/mybooking' element={<PrivateRoute><MyBooking /></PrivateRoute>} />
        <Route path='/booked' element={<PrivateRoute><Booked /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/wishlist' element={<PrivateRoute><Wishlist /></PrivateRoute>} />
        <Route path='/messages' element={<PrivateRoute><Messages /></PrivateRoute>} />
        <Route path='/chat/:bookingId' element={<PrivateRoute><Chat /></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App
