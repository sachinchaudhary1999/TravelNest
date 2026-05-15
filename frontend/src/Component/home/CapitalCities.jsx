import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { authDataContext } from "../../Context/AuthContext";
import axios from "axios";

const CAPITALS = [
  { city: "Delhi",      country: "India",          image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80" },
  { city: "Mumbai",     country: "India",          image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80" },
  { city: "Bangalore",  country: "India",          image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80" },
  { city: "Jaipur",     country: "India",          image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80" },
  { city: "Kolkata",    country: "India",          image: "https://images.unsplash.com/photo-1558618047-f4e60cdc1339?w=600&q=80" },
  { city: "Chennai",    country: "India",          image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80" },
  { city: "Goa",        country: "India",          image: "https://images.unsplash.com/photo-1587922546307-776227941871?w=600&q=80" },
  { city: "Manali",     country: "India",          image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80" },
  { city: "Paris",      country: "France",         image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80" },
  { city: "London",     country: "United Kingdom", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
  { city: "Tokyo",      country: "Japan",          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" },
  { city: "New York",   country: "USA",            image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&q=80" },
  { city: "Dubai",      country: "UAE",            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" },
  { city: "Singapore",  country: "Singapore",      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80" },
  { city: "Bangkok",    country: "Thailand",       image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80" },
  { city: "Beijing",    country: "China",          image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80" },
  { city: "Sydney",     country: "Australia",      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { city: "Barcelona",  country: "Spain",          image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80" },
  { city: "Amsterdam",  country: "Netherlands",    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80" },
  { city: "Rome",       country: "Italy",          image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80" },
  { city: "Istanbul",   country: "Turkey",         image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80" },
  { city: "Bali",       country: "Indonesia",      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
  { city: "Abu Dhabi",  country: "UAE",            image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80" },
  { city: "Kathmandu",  country: "Nepal",          image: "https://images.unsplash.com/photo-1582654291086-b8899893c8cc?w=600&q=80" },
  { city: "Phuket",     country: "Thailand",       image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&q=80" },
  { city: "Maldives",   country: "Maldives",       image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80" },
];

function SeeAllCard({ isDarkMode, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden aspect-[4/3] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 border ${
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
          Show all properties
        </p>
        <p className={`text-[11px] mt-0.5 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
          Explore all capitals
        </p>
      </div>
    </button>
  );
}

function CapitalCities() {
  const { isDarkMode } = useTheme();
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  // null = not loaded yet, used for sorting
  const [cities, setCities] = useState(
    CAPITALS.map(c => ({ ...c, count: null, countLoaded: false }))
  );
  const [allLoaded, setAllLoaded] = useState(false);
  const [sortedCities, setSortedCities] = useState([]);

  // ✅ shifted: false = show first 5, true = show cities[1..4] + See All
  const [shifted, setShifted] = useState(false);

  useEffect(() => {
    let completed = 0;

    CAPITALS.forEach(({ city }, i) => {
      axios
        .get(`${serverUrl}/api/listing/get`, {
          params: { city, limit: 1, page: 1 },
        })
        .then(result => {
          const total = typeof result.data?.total === "number"
            ? result.data.total : 0;

          setCities(prev => {
            const updated = prev.map((c, idx) =>
              idx === i ? { ...c, count: total, countLoaded: true } : c
            );
            completed++;
            if (completed === CAPITALS.length) {
              // ✅ Sort: highest count first, 0-count after
              const sorted = [...updated].sort((a, b) => {
                if (b.count === 0 && a.count === 0) return 0;
                if (b.count === 0) return -1;
                if (a.count === 0) return 1;
                return b.count - a.count;
              });
              setSortedCities(sorted);
              setAllLoaded(true);
            }
            return updated;
          });
        })
        .catch(() => {
          completed++;
          setCities(prev =>
            prev.map((c, idx) =>
              idx === i ? { ...c, count: 0, countLoaded: true } : c
            )
          );
          if (completed === CAPITALS.length) {
            setAllLoaded(true);
          }
        });
    });
  }, [serverUrl]);

  // Use sortedCities once loaded, otherwise raw cities
  const displayCities = allLoaded ? sortedCities : cities;

  // ✅ Same logic as TrendingStays:
  // shifted=false → first 5 cities
  // shifted=true  → cities[1..4] + SeeAll
  const visibleCities = shifted
    ? displayCities.slice(1, 5)
    : displayCities.slice(0, 5);

  const handleCityClick = (city) => {
    navigate(`/destinations/${city.toLowerCase().replace(/ /g, "-")}`);
  };

  const handleSeeAll = () => {
    navigate("/listings");
  };

  return (
    <section className={`w-full py-10 ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Capital City Listings
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Stay in the heart of the world's most beautiful capitals
            </p>
          </div>

          {/* ✅ ARROWS — same logic as TrendingStays */}
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

        {/* CITY CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

          {/* 4 or 5 city cards */}
          {visibleCities.map(({ city, country, image, count, countLoaded }) => (
            <button
              key={city}
              onClick={() => handleCityClick(city)}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer"
            >
              <img
                src={image}
                alt={city}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <p className="text-white/70 text-[10px] font-medium uppercase tracking-wide">
                  {country}
                </p>
                <p className="text-white font-bold text-sm leading-tight">{city}</p>
                <p className="text-white/60 text-[11px] mt-0.5">
                  {!countLoaded
                    ? "Loading..."
                    : count > 0
                      ? `${count} Stays`
                      : "Coming soon"}
                </p>
              </div>
            </button>
          ))}

          {/* ✅ See All — only visible when shifted */}
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

export default CapitalCities;
