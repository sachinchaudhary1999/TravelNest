import React, { useContext, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../../Context/ListingContext";
import { useTheme } from "../../Context/ThemeContext";
import { categories } from "./categoryData";
import Card from "../Card";

const PAGE_SIZE = 5;

function SkeletonCard({ isDarkMode }) {
  return (
    <div className={`w-full rounded-2xl overflow-hidden border shadow-sm ${
      isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
    }`}>
      <div className={`w-full h-[200px] animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
      <div className="p-4 flex flex-col gap-3">
        <div className={`h-3 w-2/3 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
        <div className={`h-3 w-1/2 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
        <div className={`h-4 w-1/3 rounded-full animate-pulse mt-1 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
      </div>
    </div>
  );
}

function ComingSoonCard({ isDarkMode, label }) {
  return (
    <div className={`w-full rounded-2xl overflow-hidden border shadow-sm ${
      isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
    }`}>
      <div className={`w-full h-[200px] flex flex-col items-center justify-center gap-3 ${
        isDarkMode ? "bg-slate-700/50" : "bg-gray-50"
      }`}>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
          isDarkMode ? "bg-slate-600" : "bg-gray-100"
        }`}>
          🏡
        </div>
        <p className={`text-xs font-semibold ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
          Coming Soon
        </p>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className={`text-[13px] truncate ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
              {label || "Stay"} listing
            </p>
            <p className={`text-sm font-semibold truncate ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              {/* More {label || "stay"}s coming soon */}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <span className={`text-sm font-bold ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
            {/* More {label || "stay"}s coming soon */}
          </span>
        </div>
      </div>
    </div>
  );
}

function SeeAllCard({ isDarkMode, onClick, previews }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm ${
        isDarkMode
          ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
          : "bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md"
      }`}
    >
      <div className="w-full h-[200px] flex items-center justify-center">
        <div className="relative w-28 h-24">
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
              className="absolute bottom-0 left-0 w-20 h-20 rounded-xl object-cover shadow-md -rotate-3 border-2 border-white dark:border-slate-700"
            />
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <p className={`text-[13px] ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              View all properties
            </p>
            <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              See all listings
            </p>
          </div>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
            isDarkMode ? "bg-slate-700" : "bg-gray-100"
          }`}>
            <FiChevronRight className={`w-4 h-4 ${isDarkMode ? "text-white" : "text-gray-700"}`} />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-sm font-bold text-[#FF385C]">Explore →</span>
        </div>
      </div>
    </button>
  );
}

function TrendingStays({ activeCategory }) {
  const { newListData, listingLoading } = useContext(listingDataContext);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [shifted, setShifted] = useState(false);

  React.useEffect(() => { setShifted(false); }, [activeCategory, newListData]);

  const activeCat = categories.find(c => c.key === activeCategory);
  const sectionTitle = activeCategory === "trending"
    ? "Trending Stays"
    : `${activeCat?.label || ""} Stays`;
  const sectionSub = activeCategory === "trending"
    ? "Explore top-rated stays loved by travelers"
    : `Browse all available ${activeCat?.label?.toLowerCase() || ""} stays`;

  const hasMore = newListData.length > PAGE_SIZE;

  // shifted=false → first 5 real cards
  // shifted=true  → cards[1..4] + SeeAll
  const visibleListings = shifted
    ? newListData.slice(1, 5)
    : newListData.slice(0, 5);

  const handleSeeAll = () => {
    const query = activeCategory !== "trending" ? `?category=${activeCategory}` : "";
    navigate(`/listings${query}`);
  };

  // ✅ Always fill to exactly 5 slots
  // When shifted: 4 real cards + 1 SeeAll = 5 (no placeholders needed)
  // When not shifted: real cards + placeholders to fill up to 5
  const seeAllSlot = shifted ? 1 : 0;
  const filledSlots = visibleListings.length + seeAllSlot;
  const placeholderCount = Math.max(0, PAGE_SIZE - filledSlots);

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

          {/* ✅ ARROWS — always visible when not loading */}
          {!listingLoading && (
            <div className="flex items-center gap-2">
              {/* LEFT — only when shifted */}
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

              {/* ✅ RIGHT — always visible, shows See All on click */}
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
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <SkeletonCard key={i} isDarkMode={isDarkMode} />
            ))}
          </div>

        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            {/* REAL LISTING CARDS */}
            {visibleListings.map((listing) => (
              <Card key={listing._id} listing={listing} />
            ))}

            {/* ✅ PLACEHOLDERS — fill remaining slots to always make 5 */}
            {Array.from({ length: placeholderCount }).map((_, i) => (
              <ComingSoonCard
                key={`placeholder-${i}`}
                isDarkMode={isDarkMode}
                label={activeCat?.label || ""}
              />
            ))}

            {/* ✅ SEE ALL — appears when shifted (replaces one placeholder slot) */}
            {shifted && (
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