import React, { useContext, useRef } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { listingDataContext } from "../../Context/ListingContext";
import { useTheme } from "../../Context/ThemeContext";
import { categories } from "./categoryData";
import Card from "../Card";

function TrendingStays({ activeCategory }) {
  const { newListData, getListing, totalPages, currentPage } = useContext(listingDataContext);
  const { isDarkMode } = useTheme();
  const scrollRef = useRef(null);

  const activeCat = categories.find(c => c.key === activeCategory);
  const sectionTitle = activeCategory === "trending"
    ? "Trending Stays"
    : `${activeCat?.label || ""} Stays`;
  const sectionSub = activeCategory === "trending"
    ? "Explore top-rated stays loved by travelers"
    : `Browse all available ${activeCat?.label?.toLowerCase() || ""} stays`;

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -340 : 340,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={`w-full py-10 ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {sectionTitle}
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              {sectionSub}
            </p>
          </div>
        </div>

        {/* CARDS */}
        {newListData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className={`text-xl ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
              No listings found
            </p>
            <p className={`text-sm ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
              Try a different category or search term
            </p>
          </div>
        ) : (
          <div className="relative group">

            {/* LEFT ARROW */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-[45%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* SCROLLABLE ROW */}
            <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
              {newListData.map((listing) => (
                <div key={listing._id} className="flex-shrink-0">
                  <Card listing={listing} />
                </div>
              ))}
            </div>

            {/* RIGHT ARROW */}
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-[45%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                className={`w-9 h-9 rounded-full text-sm font-medium transition ${
                  p === currentPage
                    ? "bg-[#FF385C] text-white"
                    : isDarkMode
                      ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => getListing(p)}
              >
                {p}
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default TrendingStays;