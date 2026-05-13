// import React, { useContext, useRef } from "react";
// import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
// import { listingDataContext } from "../../Context/ListingContext";
// import { useTheme } from "../../Context/ThemeContext";
// import { categories } from "./categoryData";
// import Card from "../Card";

// function SkeletonCard({ isDarkMode }) {
//   return (
//     <div className={`w-[280px] flex-shrink-0 rounded-2xl overflow-hidden border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"}`}>
//       <div className={`w-full h-[200px] animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
//       <div className="p-4 flex flex-col gap-3">
//         <div className={`h-3 w-3/4 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
//         <div className={`h-3 w-1/2 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
//         <div className={`h-4 w-1/3 rounded-full animate-pulse mt-1 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
//       </div>
//     </div>
//   );
// }

// function TrendingStays({ activeCategory }) {
//   const { newListData, getListing, totalPages, currentPage, listingLoading } = useContext(listingDataContext);
//   const { isDarkMode } = useTheme();
//   const scrollRef = useRef(null);

//   const activeCat = categories.find(c => c.key === activeCategory);
//   const sectionTitle = activeCategory === "trending" ? "Trending Stays" : `${activeCat?.label || ""} Stays`;
//   const sectionSub = activeCategory === "trending" ? "Explore top-rated stays loved by travelers" : `Browse all available ${activeCat?.label?.toLowerCase() || ""} stays`;

//   const scroll = (dir) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className={`w-full py-10 ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
//       <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

//         {/* HEADER */}
//         <div className="flex items-start justify-between mb-6">
//           <div>
//             <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//               {sectionTitle}
//             </h2>
//             <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
//               {sectionSub}
//             </p>
//           </div>
//         </div>

//         {/* SKELETON */}
//         {listingLoading ? (
//           <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <SkeletonCard key={i} isDarkMode={isDarkMode} />
//             ))}
//           </div>

//         ) : newListData.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16 gap-3">
//             <p className={`text-xl ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>No listings found</p>
//             <p className={`text-sm ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>Try a different category or search term</p>
//           </div>

//         ) : (
//           <div className="relative group">
//             <button
//               onClick={() => scroll("left")}
//               className="absolute -left-4 top-[45%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
//             >
//               <FiChevronLeft className="w-5 h-5 text-gray-700" />
//             </button>

//             <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
//               {newListData.map((listing) => (
//                 <div key={listing._id} className="flex-shrink-0">
//                   <Card listing={listing} />
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={() => scroll("right")}
//               className="absolute -right-4 top-[45%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
//             >
//               <FiChevronRight className="w-5 h-5 text-gray-700" />
//             </button>
//           </div>
//         )}

//         {/* PAGINATION */}
//         {!listingLoading && totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//               <button
//                 key={p}
//                 onClick={() => getListing(p)}
//                 className={`w-9 h-9 rounded-full text-sm font-medium transition ${
//                   p === currentPage
//                     ? "bg-[#FF385C] text-white"
//                     : isDarkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {p}
//               </button>
//             ))}
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

// export default TrendingStays;


import React, { useContext, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { listingDataContext } from "../../Context/ListingContext";
import { useTheme } from "../../Context/ThemeContext";
import { categories } from "./categoryData";
import Card from "../Card";

function SkeletonCard({ isDarkMode }) {
  return (
    <div className={`flex-1 min-w-0 rounded-2xl overflow-hidden border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"}`}>
      <div className={`w-full h-[200px] animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
      <div className="p-4 flex flex-col gap-3">
        <div className={`h-3 w-3/4 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
        <div className={`h-3 w-1/2 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
        <div className={`h-4 w-1/3 rounded-full animate-pulse mt-1 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
      </div>
    </div>
  );
}

const PAGE_SIZE = 5;

function TrendingStays({ activeCategory }) {
  const { newListData, getListing, totalPages, currentPage, listingLoading } = useContext(listingDataContext);
  const { isDarkMode } = useTheme();
  const [localPage, setLocalPage] = useState(0);

  // Reset local page when category changes
  React.useEffect(() => { setLocalPage(0); }, [activeCategory]);

  const activeCat = categories.find(c => c.key === activeCategory);
  const sectionTitle = activeCategory === "trending" ? "Trending Stays" : `${activeCat?.label || ""} Stays`;
  const sectionSub = activeCategory === "trending" ? "Explore top-rated stays loved by travelers" : `Browse all available ${activeCat?.label?.toLowerCase() || ""} stays`;

  // Paginate locally — 5 cards per page
  const totalLocalPages = Math.ceil(newListData.length / PAGE_SIZE);
  const visibleListings = newListData.slice(localPage * PAGE_SIZE, (localPage + 1) * PAGE_SIZE);

  const handlePrev = () => {
    if (localPage > 0) {
      setLocalPage(p => p - 1);
    } else if (currentPage > 1) {
      // Go to previous backend page
      getListing(currentPage - 1, activeCategory !== "trending" ? { category: activeCategory } : {});
      setLocalPage(0);
    }
  };

  const handleNext = () => {
    if (localPage < totalLocalPages - 1) {
      setLocalPage(p => p + 1);
    } else if (currentPage < totalPages) {
      // Fetch next backend page
      getListing(currentPage + 1, activeCategory !== "trending" ? { category: activeCategory } : {});
      setLocalPage(0);
    }
  };

  const canGoPrev = localPage > 0 || currentPage > 1;
  const canGoNext = localPage < totalLocalPages - 1 || currentPage < totalPages;

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

          {/* ARROWS — in header, always visible */}
          {!listingLoading && newListData.length > PAGE_SIZE && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={!canGoPrev}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  canGoPrev
                    ? isDarkMode
                      ? "border-slate-600 text-white hover:bg-slate-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    : isDarkMode
                      ? "border-slate-800 text-slate-700 cursor-not-allowed"
                      : "border-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  canGoNext
                    ? isDarkMode
                      ? "border-slate-600 text-white hover:bg-slate-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    : isDarkMode
                      ? "border-slate-800 text-slate-700 cursor-not-allowed"
                      : "border-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
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

        ) : newListData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className={`text-xl ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
              No listings found
            </p>
            <p className={`text-sm ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
              Try a different category or search term
            </p>
          </div>

        ) : (
          <>
            {/* CARDS GRID — no overflow, no scroll */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {visibleListings.map((listing) => (
                <Card key={listing._id} listing={listing} />
              ))}
            </div>

            {/* PAGE INDICATOR */}
            {newListData.length > PAGE_SIZE && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: totalLocalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLocalPage(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === localPage
                        ? "w-6 h-2 bg-[#FF385C]"
                        : isDarkMode
                          ? "w-2 h-2 bg-slate-600 hover:bg-slate-500"
                          : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}

export default TrendingStays;