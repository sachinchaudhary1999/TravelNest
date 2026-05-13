import React, { useContext, useRef } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { listingDataContext } from "../../Context/ListingContext";
import { useTheme } from "../../Context/ThemeContext";
import { categories } from "./categoryData";
import Card from "../Card";

// ✅ Skeleton card component
function SkeletonCard({ isDarkMode }) {
  return (
    <div className={`w-full rounded-2xl overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-white"} border ${isDarkMode ? "border-slate-700" : "border-gray-100"}`}>
      <div className={`w-full h-[200px] animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
      <div className="p-4 flex flex-col gap-3">
        <div className={`h-3 w-3/4 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
        <div className={`h-3 w-1/2 rounded-full animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
        <div className={`h-4 w-1/3 rounded-full animate-pulse mt-1 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
      </div>
    </div>
  );
}


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

// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiChevronRight } from "react-icons/fi";
// import { listingDataContext } from "../../Context/ListingContext";
// import { useTheme } from "../../Context/ThemeContext";
// import { categories } from "./categoryData";
// import Card from "../Card";

// function TrendingStays({ activeCategory }) {
//   const { newListData, getListing, totalPages, currentPage } = useContext(listingDataContext);
//   const { isDarkMode } = useTheme();
//   const navigate = useNavigate();

//   const activeCat = categories.find(c => c.key === activeCategory);
//   const sectionTitle = activeCategory === "trending"
//     ? "Trending Stays"
//     : `${activeCat?.label || ""} Stays`;
//   const sectionSub = activeCategory === "trending"
//     ? "Explore top-rated stays loved by travelers"
//     : `Browse all available ${activeCat?.label?.toLowerCase() || ""} stays`;

//   // ✅ Only show first 4 listings
//   const displayListings = newListData.slice(0, 4);

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

//           {/* VIEW ALL — only show if more than 4 listings */}
//           {newListData.length > 4 && (
//             <button
//               onClick={() => {
//                 const section = document.getElementById("all-listings");
//                 if (section) section.scrollIntoView({ behavior: "smooth" });
//               }}
//               className="flex items-center gap-1 text-sm font-semibold text-[#FF385C] hover:text-[#E31C5F] transition-colors duration-200 mt-1 flex-shrink-0"
//             >
//               View all properties
//               <FiChevronRight className="w-4 h-4" />
//             </button>
//           )}
//         </div>

//         {/* CARDS — 4 max in a grid */}
//         {displayListings.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16 gap-3">
//             <p className={`text-xl ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
//               No listings found
//             </p>
//             <p className={`text-sm ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
//               Try a different category or search term
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {displayListings.map((listing) => (
//               <Card key={listing._id} listing={listing} />
//             ))}
//           </div>
//         )}

//         {/* SHOW ALL BUTTON — below cards if more exist */}
//         {newListData.length > 4 && (
//           <div id="all-listings" className="mt-10">
//             <div className={`border-t pt-8 ${isDarkMode ? "border-slate-800" : "border-gray-100"}`}>
//               <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//                 All {activeCat?.label || "Stays"}
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {newListData.slice(4).map((listing) => (
//                   <Card key={listing._id} listing={listing} />
//                 ))}
//               </div>

//               {/* PAGINATION */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center gap-2 mt-10">
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//                     <button
//                       key={p}
//                       onClick={() => getListing(p)}
//                       className={`w-9 h-9 rounded-full text-sm font-medium transition ${
//                         p === currentPage
//                           ? "bg-[#FF385C] text-white"
//                           : isDarkMode
//                             ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
//                             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {p}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

// export default TrendingStays;