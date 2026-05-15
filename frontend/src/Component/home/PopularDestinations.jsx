import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { authDataContext } from "../../Context/AuthContext";
import axios from "axios";

const DESTINATIONS = [
  { city: "Goa",       image: "https://images.unsplash.com/photo-1587922546307-776227941871?w=600&q=80" },
  { city: "Manali",    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80" },
  { city: "Jaipur",    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80" },
  { city: "Kerala",    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80" },
  { city: "Mumbai",    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80" },
  { city: "Udaipur",   image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80" },
  { city: "Delhi",     image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80" },
  { city: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80" },
  { city: "Shimla",    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80" },
  { city: "Pune",      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { city: "Kolkata",   image: "https://images.unsplash.com/photo-1558618047-f4e60cdc1339?w=600&q=80" },
  { city: "Gurugram",  image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80" },
];

function SeeAllCard({ isDarkMode, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden aspect-[3/4] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 border ${
        isDarkMode
          ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
          : "bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md"
      }`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isDarkMode ? "bg-slate-700" : "bg-gray-200"
      }`}>
        <FiChevronRight className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-700"}`} />
      </div>
      <div className="text-center px-3">
        <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Show all
        </p>
        <p className={`text-[11px] mt-0.5 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
          View all properties
        </p>
      </div>
    </button>
  );
}

function PopularDestinations() {
  const { isDarkMode } = useTheme();
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  // ✅ Always show all destinations — never hide
  // counts start as null (not loaded yet)
  const [destinations, setDestinations] = useState(
    DESTINATIONS.map(d => ({ ...d, count: null }))
  );
  const [shifted, setShifted] = useState(false);

  useEffect(() => {
    // ✅ Fetch counts in background per city
    // Even if backend fails — cards still show with "Coming soon"
    DESTINATIONS.forEach(({ city }, i) => {
      axios
        .get(`${serverUrl}/api/listing/get`, {
          params: { city, limit: 1, page: 1 },
        })
        .then(result => {
          const total = typeof result.data?.total === "number"
            ? result.data.total : 0;
          setDestinations(prev =>
            prev.map((d, idx) => idx === i ? { ...d, count: total } : d)
          );
        })
        .catch(() => {
          // ✅ On failure — just show 0, card still visible
          setDestinations(prev =>
            prev.map((d, idx) => idx === i ? { ...d, count: 0 } : d)
          );
        });
    });
  }, [serverUrl]);

  const handleClick = (city) => {
    navigate(`/destinations/${city.toLowerCase()}`);
  };

  const handleSeeAll = () => {
    // Navigate to first destination page
    navigate(`/destinations/${destinations[0].city.toLowerCase()}`);
  };

  // ✅ Same logic as CapitalCities + TrendingStays
  // shifted=false → show first 5 cards, right arrow only
  // shifted=true  → show cards[1..4] + See All, left arrow only
  const visibleDestinations = shifted
    ? destinations.slice(1, 5)
    : destinations.slice(0, 5);

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

          {/* ARROWS */}
          <div className="flex items-center gap-2 mt-1">
            {shifted && (
              <button
                onClick={() => setShifted(false)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  isDarkMode
                    ? "border-slate-600 text-white hover:bg-slate-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
            )}
            {!shifted && (
              <button
                onClick={() => setShifted(true)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  isDarkMode
                    ? "border-slate-600 text-white hover:bg-slate-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* DESTINATION GRID — always 5 cols */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

          {/* 4 or 5 destination cards */}
          {visibleDestinations.map(({ city, image, count }) => (
            <button
              key={city}
              onClick={() => handleClick(city)}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer"
            >
              <img
                src={image}
                alt={city}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm leading-tight">{city}</p>
                <p className="text-white/70 text-[11px] mt-0.5">
                  {count === null
                    ? "Loading..."
                    : count > 0
                      ? `${count}+ stays`
                      : "Coming soon"}
                </p>
              </div>
            </button>
          ))}

          {/* ✅ See All — only when shifted */}
          {shifted && (
            <SeeAllCard
              isDarkMode={isDarkMode}
              onClick={handleSeeAll}
            />
          )}

        </div>

      </div>
    </section>
  );
}

export default PopularDestinations;