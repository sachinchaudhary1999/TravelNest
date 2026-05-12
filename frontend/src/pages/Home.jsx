import React, { useContext, useState } from 'react'
import Navbar from '../Component/layout/Navbar'
import HeroSection from '../Component/home/Herosection'
import FloatingSearch from '../Component/home/FloatingSearch'
import Categories from '../Component/home/Categories'
import TrendingStays from '../Component/home/TrendingStays'
import { userDataContext } from '../Context/UserContext'
import Footer from '../Component/layout/Footer'
import { useTheme } from '../Context/ThemeContext'

function Home() {
  const { userLoading } = useContext(userDataContext)
  const { isDarkMode } = useTheme()
  const [activeCategory, setActiveCategory] = useState("trending")

  if (userLoading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-500'></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>

      <Navbar />

      <div className="pt-[70px] md:pt-[80px]">
        <HeroSection />
        <FloatingSearch />
        <Categories
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div id="listings-section">
        <TrendingStays activeCategory={activeCategory} />
      </div>

      <Footer />
    </div>
  )
}

export default Home