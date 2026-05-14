import React, { useContext, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../../Context/ListingContext";
import { useTheme } from "../../Context/ThemeContext";
import { categories } from "./categoryData";
import Card from "../Card";

function SkeletonCard({ isDarkMode }) {
  return (
    <div className={`w-full rounded-2xl overflow-hidden border ${
      isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
    }`}>
      <div className={`w-full h-[200px] animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
      <div className="p-4 flex flex-col gap-3">
        <div className={`h-3 w-3/4 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
        <div className={`h-3 w-1/2 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
        <div className={`h-4 w-1/3 rounded-full animate-pulse mt-1 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
      </div>
    </div>
  );
}

function SeeAllCard({ isDarkMode, onClick, previews }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl overflow-hidden border flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isDarkMode
          ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
          : "bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md"
      }`}
      style={{ minHeight: "300px" }}
    >
      <div className="relative w-28 h-24 flex-shrink-0">
        {previews?.[1]?.images?.[0] && (
          <img
            src={previews[1].images[0]}
            alt=""
            className="absolute top-0 right-0 w-20 h-20 rounded-xl object-cover shadow-md rotate-6"
          />
        )}
        {previews?.[0]?.images?.[0] && (
          <img
            src={previews[0].images[0]}
            alt=""
            className="absolute bottom-0 left-0 w-20 h-20 rounded-xl object-cover shadow-md -rotate-3 border-2 border-white"
          />
        )}
      </div>
      <div className="text-center px-4">
        <p className={`text-base font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          See all
        </p>
        <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
          View all properties
        </p>
      </div>
    </button>
  );
}

function TrendingStays({ activeCategory }) {
  const { newListData, listingLoading } = useContext(listingDataContext);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // ✅ false = show first 5 cards, true = show cards 2-5 + See All as 6th
  const [shifted, setShifted] = useState(false);

  React.useEffect(() => { setShifted(false); }, [activeCategory, newListData]);

  const activeCat = categories.find(c => c.key === activeCategory);
  const sectionTitle = activeCategory === "trending"
    ? "Trending Stays"
    : `${activeCat?.label || ""} Stays`;
  const sectionSub = activeCategory === "trending"
    ? "Explore top-rated stays loved by travelers"
    : `Browse all available ${activeCat?.label?.toLowerCase() || ""} stays`;

  const handleSeeAll = () => {
    const query = activeCategory !== "trending" ? `?category=${activeCategory}` : "";
    navigate(`/listings${query}`);
  };

  // ✅ Exactly what to show:
  // shifted=false → first 5 cards
  // shifted=true  → cards[1..4] + SeeAll (card[0] slides out, SeeAll slides in)
  const visibleListings = shifted
    ? newListData.slice(1, 5)   // cards 2,3,4,5
    : newListData.slice(0, 5);  // cards 1,2,3,4,5

  const showSeeAll = shifted;
  const hasEnough = newListData.length >= 5;

  return (
    <section className={`w-full py-10 ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {sectionTitle}
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              {sectionSub}
            </p>
          </div>

          {/* ARROWS */}
          {!listingLoading && hasEnough && (
            <div className="flex items-center gap-2">
              {/* LEFT — only visible when shifted */}
              {shifted && (
                <button
                  onClick={() => setShifted(false)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                    isDarkMode
                      ? "border-slate-600 text-white hover:bg-slate-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* RIGHT — only visible when NOT shifted */}
              {!shifted && (
                <button
                  onClick={() => setShifted(true)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                    isDarkMode
                      ? "border-slate-600 text-white hover:bg-slate-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* SKELETON */}
        {listingLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} isDarkMode={isDarkMode} />
            ))}
          </div>

        ) : newListData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className={`text-xl ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
              No listings found
            </p>
            <p className={`text-sm ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
              Try a different category
            </p>
          </div>

        ) : (
          // ✅ shifted=false → 5 cols, shifted=true → 4 cards + See All = 5 cols
          <div className={`grid gap-4 ${
            showSeeAll
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          }`}>
            {visibleListings.map((listing) => (
              <Card key={listing._id} listing={listing} />
            ))}

            {/* ✅ See All appears ONLY when shifted */}
            {showSeeAll && (
              <SeeAllCard
                isDarkMode={isDarkMode}
                onClick={handleSeeAll}
                previews={newListData.slice(0, 2)}
              />
            )}
          </div>
        )}

      </div>
    </section>
  );
}

export default TrendingStays;