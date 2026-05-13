// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiArrowRight } from "react-icons/fi";
// import { useTheme } from "../../Context/ThemeContext";
// import { authDataContext } from "../../Context/AuthContext";
// import axios from "axios";

// const DESTINATIONS = [
//   {
//     city: "Goa",
//     image: "https://images.unsplash.com/photo-1587922546307-776227941871?w=600&q=80",
//   },
//   {
//     city: "Manali",
//     image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
//   },
//   {
//     city: "Jaipur",
//     image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
//   },
//   {
//     city: "Kerala",
//     image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
//   },
//   {
//     city: "Mumbai",
//     image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",
//   },
//   {
//     city: "Udaipur",
//     image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
//   },
// ];

// function PopularDestinations() {
//   const { isDarkMode } = useTheme();
//   const { serverUrl } = useContext(authDataContext);
//   const navigate = useNavigate();

//   // { Goa: 12, Manali: 5, ... }
//   const [counts, setCounts] = useState({});

//   useEffect(() => {
//     const fetchCounts = async () => {
//       const results = await Promise.allSettled(
//         DESTINATIONS.map(({ city }) =>
//           axios.get(`${serverUrl}/api/listing/getAllListing`, {
//             params: { city, limit: 100, page: 1 },
//           })
//         )
//       );

//       const newCounts = {};
//       results.forEach((result, i) => {
//         if (result.status === "fulfilled") {
//           newCounts[DESTINATIONS[i].city] =
//             result.value.data?.listings?.length ?? 0;
//         } else {
//           newCounts[DESTINATIONS[i].city] = 0;
//         }
//       });
//       setCounts(newCounts);
//     };

//     fetchCounts();
//   }, [serverUrl]);

//   const handleClick = (city) => {
//     navigate(`/destinations/${city.toLowerCase()}`);
//   };

//   return (
//     <section className={`w-full py-10 ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
//       <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

//         {/* HEADER */}
//         <div className="flex items-start justify-between mb-6">
//           <div>
//             <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//               Popular Destinations
//             </h2>
//             <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
//               Handpicked destinations for your next getaway
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/destinations")}
//             className="flex items-center gap-1 text-sm font-semibold text-[#FF385C] hover:text-[#E31C5F] transition-colors duration-200 mt-1 flex-shrink-0"
//           >
//             View all
//             <FiArrowRight className="w-4 h-4" />
//           </button>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
//           {DESTINATIONS.map(({ city, image }) => (
//             <button
//               key={city}
//               onClick={() => handleClick(city)}
//               className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer"
//             >
//               {/* IMAGE */}
//               <img
//                 src={image}
//                 alt={city}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//               />

//               {/* OVERLAY */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//               {/* TEXT */}
//               <div className="absolute bottom-0 left-0 right-0 p-3">
//                 <p className="text-white font-bold text-sm">{city}</p>
//                 <p className="text-white/70 text-[11px] mt-0.5">
//                   {counts[city] !== undefined
//                     ? `${counts[city]}+ stays`
//                     : "Loading..."}
//                 </p>
//               </div>
//             </button>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

// export default PopularDestinations;


import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { authDataContext } from "../../Context/AuthContext";
import axios from "axios";

const DESTINATIONS = [
  { city: "Goa" },
  { city: "Manali" },
  { city: "Jaipur" },
  { city: "Kerala" },
  { city: "Mumbai" },
  { city: "Udaipur" },
  { city: "Delhi" },
  { city: "Bangalore" },
  { city: "Shimla" },
  { city: "Pune" },
  { city: "Kolkata" },
  { city: "Gurugram" },
];

const CITY_IMAGES = {
  goa:       "https://images.unsplash.com/photo-1587922546307-776227941871?w=600&q=80",
  manali:    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
  jaipur:    "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
  kerala:    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
  mumbai:    "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",
  udaipur:   "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
  delhi:     "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
  bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80",
  shimla:    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
  pune:      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  kolkata:   "https://images.unsplash.com/photo-1558618047-f4e60cdc1339?w=600&q=80",
  gurugram:  "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80";

function PopularDestinations() {
  const { isDarkMode } = useTheme();
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // One lightweight request per city — limit=1 just to get total count
        const results = await Promise.allSettled(
          DESTINATIONS.map(({ city }) =>
            axios.get(`${serverUrl}/api/listing/get`, {
              params: { city, limit: 1, page: 1 },
            })
          )
        );

        const populated = [];
        results.forEach((result, i) => {
          if (result.status === "fulfilled") {
            const total = result.value.data?.total || 0;
            // Only show cities that actually have listings
            if (total > 0) {
              populated.push({
                city: DESTINATIONS[i].city,
                count: total,
                image: CITY_IMAGES[DESTINATIONS[i].city.toLowerCase()] || FALLBACK_IMAGE,
              });
            }
          }
        });

        // Sort by most listings, show top 6
        populated.sort((a, b) => b.count - a.count);
        setDestinations(populated.slice(0, 6));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [serverUrl]);

  const handleClick = (city) => {
    navigate(`/destinations/${city.toLowerCase()}`);
  };

  // SKELETON LOADING
  if (loading) {
    return (
      <section className={`w-full py-10 ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">
          <div className="h-7 w-52 rounded-lg bg-gray-200 dark:bg-slate-700 animate-pulse mb-2" />
          <div className="h-4 w-72 rounded-lg bg-gray-100 dark:bg-slate-800 animate-pulse mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-2xl aspect-[3/4] animate-pulse ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render section if no cities have listings
  if (destinations.length === 0) return null;

  return (
    <section className={`w-full py-10 ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Popular Destinations
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Handpicked destinations for your next getaway
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-sm font-semibold text-[#FF385C] hover:text-[#E31C5F] transition-colors duration-200 mt-1 flex-shrink-0"
          >
            View all
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* DESTINATION GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {destinations.map(({ city, count, image }) => (
            <button
              key={city}
              onClick={() => handleClick(city)}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer"
            >
              {/* IMAGE */}
              <img
                src={image}
                alt={city}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* CITY INFO */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm leading-tight">{city}</p>
                <p className="text-white/70 text-[11px] mt-0.5">{count}+ stays</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PopularDestinations;