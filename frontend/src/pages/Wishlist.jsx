// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FaArrowLeftLong } from "react-icons/fa6"
// import { userDataContext } from '../Context/UserContext'
// import NavBar from '../Component/layout/NavBar'
// import Footer from '../Component/layout/Footer'
// import Card from '../Component/Card'

// function Wishlist() {
//   const navigate = useNavigate()
//   const { userData } = useContext(userDataContext)
//   const wishlist = userData?.wishlist || []

//   return (
//     <div className='min-h-screen bg-gray-50 px-4 py-8 md:px-10'>
//       <NavBar />
//       <div className='max-w-5xl mx-auto'>
//         <div className='flex items-center gap-4 mb-8'>
//           <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
//             <FaArrowLeftLong className='text-white w-4 h-4' />
//           </button>
//           <h1 className='text-2xl font-bold text-gray-800'>Wishlist</h1>
//         </div>

//         {wishlist.length === 0 ? (
//           <div className='text-center py-20'>
//             <p className='text-4xl mb-4'>❤️</p>
//             <p className='text-xl text-gray-400 mb-2'>No saved listings</p>
//             <p className='text-gray-400 text-sm mb-6'>Tap the heart on any listing to save it here</p>
//             <button className='px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600' onClick={() => navigate("/")}>Explore listings</button>
//           </div>
//         ) : (
//           <div className='flex flex-wrap gap-6 justify-center'>
//             {wishlist.map(l => <Card key={l._id} listing={l} />)}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default Wishlist


import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeftLong,
} from "react-icons/fa6";

import {
  FiHeart,
  FiGrid,
  FiList,
  FiShare2,
} from "react-icons/fi";

import { userDataContext } from "../Context/UserContext";

import NavBar from "../Component/layout/NavBar";
import Footer from "../Component/layout/Footer";
import Card from "../Component/Card";

function Wishlist() {

  const navigate = useNavigate();

  const { userData } =
    useContext(userDataContext);

  const wishlist =
    userData?.wishlist || [];

  /*
    ONLY UI STATE
    NO LOGIC CHANGED
  */

  const [gridView, setGridView] =
    useState(true);

  return (
    <div
      className="
        min-h-screen
        bg-[#FAFAFA]
      "
    >
      {/* NAVBAR */}

      <NavBar />

      {/* MAIN */}

      <div
        className="
          pt-10
          pb-16
          px-4
          md:px-8
          lg:px-10
          max-w-[1600px]
          mx-auto
        "
      >
        {/* TOP HEADER */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-6
            mb-10
          "
        >
          {/* LEFT */}

          <div
            className="
              flex
              items-start
              gap-5
            "
          >
            {/* BACK BUTTON */}

            <button
              onClick={() => navigate("/")}
              className="
                w-14
                h-14
                rounded-full
                bg-[#FFF1F2]
                flex
                items-center
                justify-center
                hover:scale-105
                transition-all
                duration-300
              "
            >
              <FaArrowLeftLong
                className="
                  w-5
                  h-5
                  text-[#FF385C]
                "
              />
            </button>

            {/* TITLE */}

            <div>
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <h1
                  className="
                    text-[42px]
                    leading-none
                    font-[800]
                    tracking-[-2px]
                    text-slate-900
                  "
                >
                  Wishlist
                </h1>

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#FFF1F2]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FiHeart
                    className="
                      w-5
                      h-5
                      text-[#FF385C]
                      fill-[#FF385C]
                    "
                  />
                </div>
              </div>

              <p
                className="
                  mt-2
                  text-[17px]
                  text-slate-500
                "
              >
                {wishlist.length} places saved
              </p>
            </div>
          </div>

          {/* RIGHT */}

          {wishlist.length > 0 && (
            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              {/* SHARE */}

              <button
                className="
                  h-14
                  px-6
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  flex
                  items-center
                  gap-3
                  text-[16px]
                  font-semibold
                  text-slate-800
                  hover:shadow-md
                  transition-all
                  duration-300
                "
              >
                <FiShare2 className="w-5 h-5" />

                Share Wishlist
              </button>

              {/* VIEW TOGGLE */}

              <div
                className="
                  h-14
                  p-1
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  flex
                  items-center
                  gap-1
                "
              >
                <button
                  onClick={() =>
                    setGridView(true)
                  }
                  className={`
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300

                    ${
                      gridView
                        ? `
                          bg-[#FFF1F2]
                          text-[#FF385C]
                        `
                        : `
                          text-slate-500
                        `
                    }
                  `}
                >
                  <FiGrid className="w-5 h-5" />
                </button>

                <button
                  onClick={() =>
                    setGridView(false)
                  }
                  className={`
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300

                    ${
                      !gridView
                        ? `
                          bg-[#FFF1F2]
                          text-[#FF385C]
                        `
                        : `
                          text-slate-500
                        `
                    }
                  `}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* EMPTY STATE */}

        {wishlist.length === 0 ? (

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              py-24
            "
          >
            <div
              className="
                w-24
                h-24
                rounded-full
                bg-[#FFF1F2]
                flex
                items-center
                justify-center
                mb-6
              "
            >
              <FiHeart
                className="
                  w-10
                  h-10
                  text-[#FF385C]
                "
              />
            </div>

            <h2
              className="
                text-[34px]
                font-[800]
                tracking-[-1px]
                text-slate-900
              "
            >
              No saved listings
            </h2>

            <p
              className="
                mt-3
                text-[17px]
                text-slate-500
                text-center
                max-w-md
                leading-relaxed
              "
            >
              Tap the heart icon on any
              property to save your
              favorite stays here.
            </p>

            <button
              onClick={() =>
                navigate("/")
              }
              className="
                mt-8
                h-14
                px-8
                rounded-2xl
                bg-[#FF385C]
                hover:bg-[#E31C5F]
                text-white
                text-[15px]
                font-semibold
                shadow-lg
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              Explore Listings
            </button>
          </div>

        ) : (

          <>
            {/* GRID */}

            <div
              className={`
                grid
                gap-7

                ${
                  gridView
                    ? `
                      grid-cols-1
                      sm:grid-cols-2
                      lg:grid-cols-3
                      xl:grid-cols-5
                    `
                    : `
                      grid-cols-1
                    `
                }
              `}
            >
              {wishlist.map(listing => (

                <Card
                  key={listing._id}
                  listing={listing}
                />

              ))}
            </div>

            {/* FOOTER INFO */}

            <div
              className="
                flex
                items-center
                justify-center
                mt-14
              "
            >
              <p
                className="
                  text-[16px]
                  text-slate-500
                "
              >
                Showing{" "}
                <span
                  className="
                    font-semibold
                    text-slate-800
                  "
                >
                  {wishlist.length}
                </span>{" "}
                of{" "}
                <span
                  className="
                    font-semibold
                    text-slate-800
                  "
                >
                  {wishlist.length}
                </span>{" "}
                places
              </p>
            </div>

            {/* PAGINATION UI */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                mt-6
              "
            >
              <button
                className="
                  w-12
                  h-12
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-400
                  flex
                  items-center
                  justify-center
                "
              >
                ←
              </button>

              <button
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#FFF1F2]
                  text-[#FF385C]
                  font-semibold
                "
              >
                1
              </button>

              <button
                className="
                  w-12
                  h-12
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-500
                  flex
                  items-center
                  justify-center
                "
              >
                →
              </button>
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}

      <Footer />
    </div>
  );
}

export default Wishlist;