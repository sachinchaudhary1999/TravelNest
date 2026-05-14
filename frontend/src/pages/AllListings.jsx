import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../Component/layout/Navbar";
import Footer from "../Component/layout/Footer";
import Card from "../Component/Card";
import Categories from "../Component/home/Categories";
import { listingDataContext } from "../Context/ListingContext";
import { useTheme } from "../Context/ThemeContext";

function AllListings() {
  const { newListData, getListing, totalPages, currentPage, listingLoading } = useContext(listingDataContext);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "trending"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const category = searchParams.get("category") || "";
    const filters = category && category !== "trending" ? { category } : {};
    getListing(1, filters);
  }, []);

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#0f172a]" : "bg-gray-50"}`}>
      <Navbar />

      {/* STICKY CATEGORIES */}
      <div className="pt-[70px] md:pt-[80px] sticky top-[70px] md:top-[80px] z-40">
        <Categories
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-8">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {activeCategory === "trending"
              ? "All Stays"
              : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Stays`}
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
            {listingLoading ? "Loading..." : `${newListData.length} properties found`}
          </p>
        </div>

        {/* SKELETON */}
        {listingLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
                <div className={`w-full h-[200px] animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                <div className="p-4 flex flex-col gap-3">
                  <div className={`h-3 w-3/4 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                  <div className={`h-3 w-1/2 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                  <div className={`h-4 w-1/3 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                </div>
              </div>
            ))}
          </div>

        ) : newListData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className={`text-xl ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
              No listings found
            </p>
            <p className={`text-sm ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
              Try a different category
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-2 h-11 px-6 rounded-full bg-[#FF385C] text-white text-sm font-semibold hover:bg-[#E31C5F] transition-all"
            >
              Back to Home
            </button>
          </div>

        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {newListData.map((listing) => (
                <Card key={listing._id} listing={listing} />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => {
                      const filters = activeCategory !== "trending" ? { category: activeCategory } : {};
                      getListing(p, filters);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition ${
                      p === currentPage
                        ? "bg-[#FF385C] text-white"
                        : isDarkMode
                          ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default AllListings;