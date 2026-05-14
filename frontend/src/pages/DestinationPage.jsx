import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiChevronLeft, FiChevronRight, FiSearch, FiX } from "react-icons/fi";
import Navbar from "../Component/layout/NavBar";
import Footer from "../Component/layout/Footer";
import Card from "../Component/Card";
import { authDataContext } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import axios from "axios";

const CAPITALS = [
  { city: "Delhi",      country: "India",          image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&q=85" },
  { city: "Mumbai",     country: "India",          image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1400&q=85" },
  { city: "Bangalore",  country: "India",          image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1400&q=85" },
  { city: "Jaipur",     country: "India",          image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1400&q=85" },
  { city: "Kolkata",    country: "India",          image: "https://images.unsplash.com/photo-1558618047-f4e60cdc1339?w=1400&q=85" },
  { city: "Chennai",    country: "India",          image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1400&q=85" },
  { city: "Goa",        country: "India",          image: "https://images.unsplash.com/photo-1587922546307-776227941871?w=1400&q=85" },
  { city: "Manali",     country: "India",          image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1400&q=85" },
  { city: "Hyderabad",  country: "India",          image: "https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=1400&q=85" },
  { city: "Pune",       country: "India",          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85" },
  { city: "Paris",      country: "France",         image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=85" },
  { city: "London",     country: "United Kingdom", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1400&q=85" },
  { city: "Tokyo",      country: "Japan",          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&q=85" },
  { city: "New York",   country: "USA",            image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1400&q=85" },
  { city: "Dubai",      country: "UAE",            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=85" },
  { city: "Singapore",  country: "Singapore",      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1400&q=85" },
  { city: "Bangkok",    country: "Thailand",       image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1400&q=85" },
  { city: "Beijing",    country: "China",          image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1400&q=85" },
  { city: "Sydney",     country: "Australia",      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85" },
  { city: "Barcelona",  country: "Spain",          image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1400&q=85" },
  { city: "Amsterdam",  country: "Netherlands",    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1400&q=85" },
  { city: "Rome",       country: "Italy",          image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1400&q=85" },
  { city: "Istanbul",   country: "Turkey",         image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1400&q=85" },
  { city: "Bali",       country: "Indonesia",      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&q=85" },
  { city: "Abu Dhabi",  country: "UAE",            image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1400&q=85" },
  { city: "Kathmandu",  country: "Nepal",          image: "https://images.unsplash.com/photo-1582654291086-b8899893c8cc?w=1400&q=85" },
  { city: "Phuket",     country: "Thailand",       image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1400&q=85" },
  { city: "Maldives",   country: "Maldives",       image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1400&q=85" },
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85";

function DestinationPage() {
  const { city } = useParams();
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { isDarkMode } = useTheme();
  const scrollRef = useRef(null);

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [capitalSearch, setCapitalSearch] = useState("");

  // Handle multi-word cities like "new-york" → "New York"
  const cityLabel = city
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const matchedCapital = CAPITALS.find(
    c => c.city.toLowerCase() === cityLabel.toLowerCase()
  );
  const heroImage = matchedCapital?.image || FALLBACK_IMAGE;
  const countryLabel = matchedCapital?.country || "";

  const fetchListings = async (page = 1) => {
    setLoading(true);
    try {
      const result = await axios.get(`${serverUrl}/api/listing/get`, {
        params: { city: cityLabel, page, limit: 12 },
      });
      const data = result.data;
      setListings(data.listings || []);
      setTotalPages(data.pages || 1);
      setCurrentPage(data.page || 1);
      setTotalCount(data.total || 0);
    } catch (err) {
      console.log(err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchListings(1);
    setCapitalSearch("");
  }, [city]);

  // Auto scroll switcher to active city
  useEffect(() => {
    if (scrollRef.current) {
      const activeBtn = scrollRef.current.querySelector("[data-active='true']");
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [city]);

  const handleCapitalClick = (capitalCity) => {
    navigate(`/destinations/${capitalCity.toLowerCase().replace(/ /g, "-")}`);
    setCapitalSearch("");
  };

  const scrollCapitals = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  const filteredCapitals = CAPITALS.filter(c =>
    capitalSearch.trim() === "" ||
    c.city.toLowerCase().includes(capitalSearch.toLowerCase()) ||
    c.country.toLowerCase().includes(capitalSearch.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#0f172a]" : "bg-gray-50"}`}>
      <Navbar />

      {/* HERO BANNER */}
      <div className="relative w-full h-[280px] md:h-[360px] mt-[70px] md:mt-[80px]">
        <img
          src={heroImage}
          alt={cityLabel}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-200"
        >
          <FiArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* CITY INFO */}
        <div className="absolute bottom-8 left-6 md:left-10">
          {countryLabel && (
            <div className="flex items-center gap-2 mb-2">
              <FiMapPin className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">{countryLabel}</span>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {cityLabel}
          </h1>
          <p className="text-white/70 text-sm mt-1">
            {loading
              ? "Fetching stays..."
              : totalCount === 0
                ? "No stays found"
                : `${totalCount} stays available`}
          </p>
        </div>
      </div>

      {/* CAPITAL SWITCHER */}
      <div className={`sticky top-[70px] md:top-[80px] z-40 border-b ${
        isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-gray-200"
      }`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="flex items-center gap-2 py-1.5">

            {/* SEARCH INPUT */}
            <div className={`flex items-center gap-2 h-8 px-3 rounded-full border flex-shrink-0 transition-all duration-200 ${
              isDarkMode
                ? "bg-slate-800 border-slate-700 focus-within:border-slate-500"
                : "bg-gray-50 border-gray-200 focus-within:border-gray-400"
            }`}>
              <FiSearch className={`w-3.5 h-3.5 flex-shrink-0 ${isDarkMode ? "text-slate-400" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Search city or country..."
                value={capitalSearch}
                onChange={e => setCapitalSearch(e.target.value)}
                className={`w-36 text-xs outline-none bg-transparent ${
                  isDarkMode
                    ? "text-white placeholder:text-slate-500"
                    : "text-gray-900 placeholder:text-gray-400"
                }`}
              />
              {capitalSearch && (
                <button onClick={() => setCapitalSearch("")} className="flex-shrink-0">
                  <FiX className={`w-3 h-3 ${isDarkMode ? "text-slate-400 hover:text-white" : "text-gray-400 hover:text-gray-700"}`} />
                </button>
              )}
            </div>

            {/* DIVIDER */}
            <div className={`w-px h-5 flex-shrink-0 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />

            {/* LEFT ARROW */}
            <button
              onClick={() => scrollCapitals("left")}
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                isDarkMode
                  ? "text-slate-400 hover:text-white hover:bg-slate-800"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            {/* SCROLLABLE CAPITALS */}
            <div
              ref={scrollRef}
              className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide flex-1"
            >
              {filteredCapitals.map(({ city: capCity, country }) => {
                const isActive = capCity.toLowerCase() === cityLabel.toLowerCase();
                return (
                  <button
                    key={capCity}
                    data-active={isActive}
                    onClick={() => handleCapitalClick(capCity)}
                    className={`flex flex-col items-center gap-0.5 px-3 py-2.5 flex-shrink-0 border-b-2 transition-all duration-200 ${
                      isActive
                        ? isDarkMode
                          ? "border-white text-white"
                          : "border-gray-900 text-gray-900"
                        : isDarkMode
                          ? "border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-500"
                          : "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-xs font-semibold whitespace-nowrap">{capCity}</span>
                    <span className={`text-[10px] whitespace-nowrap ${
                      isActive
                        ? isDarkMode ? "text-slate-300" : "text-gray-500"
                        : isDarkMode ? "text-slate-600" : "text-gray-300"
                    }`}>
                      {country}
                    </span>
                  </button>
                );
              })}

              {/* NO RESULTS */}
              {filteredCapitals.length === 0 && (
                <p className={`text-xs px-4 py-3 flex-shrink-0 whitespace-nowrap ${
                  isDarkMode ? "text-slate-500" : "text-gray-400"
                }`}>
                  No results for "{capitalSearch}"
                </p>
              )}
            </div>

            {/* RIGHT ARROW */}
            <button
              onClick={() => scrollCapitals("right")}
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                isDarkMode
                  ? "text-slate-400 hover:text-white hover:bg-slate-800"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiChevronRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>

      {/* LISTINGS */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-10">

        <div className="mb-6">
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Stays in {cityLabel}
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
            Browse all available properties
          </p>
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
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

        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className={`text-xl ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
              No stays found in {cityLabel}
            </p>
            <p className={`text-sm ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
              Try exploring other destinations
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-2 h-11 px-6 rounded-full bg-[#FF385C] text-white text-sm font-semibold hover:bg-[#E31C5F] transition-all"
            >
              Explore other stays
            </button>
          </div>

        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {listings.map((listing) => (
                <Card key={listing._id} listing={listing} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      fetchListings(p);
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

export default DestinationPage;