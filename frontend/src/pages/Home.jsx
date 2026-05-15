import React, { useContext, useState } from 'react'
import Navbar from '../Component/layout/NavBar'
import Footer from '../Component/layout/Footer'
import HeroSection from '../Component/home/HeroSection'
import FloatingSearch from '../Component/home/FloatingSearch'
import Categories from '../Component/home/Categories'
import TrendingStays from '../Component/home/TrendingStays'
import CapitalCities from '../Component/home/CapitalCities'
import LuxuryBanner from '../Component/home/LuxuryBanner'
import PopularDestinations from '../Component/home/PopularDestinations'
import WhyChooseUs from '../Component/home/WhyChooseUs'
import BecomeAHost from '../Component/home/BecomeAHost'
import Testimonials from '../Component/home/Testimonials'
import FAQ from '../Component/home/FAQ'
import { useTheme } from '../Context/ThemeContext'

function Home() {
  const { isDarkMode } = useTheme()
  const [activeCategory, setActiveCategory] = useState("trending")

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
       <CapitalCities />
      <LuxuryBanner />
      <PopularDestinations />
      <WhyChooseUs />
      <BecomeAHost />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Home
