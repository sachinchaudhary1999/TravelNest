import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";
import Navbar from "../Component/layout/Navbar";
import Footer from "../Component/layout/Footer";
import Card from "../Component/Card";
import { authDataContext } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import axios from "axios";

const CITY_IMAGES = {
  goa:       "https://images.unsplash.com/photo-1587922546307-776227941871?w=1400&q=85",
  manali:    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1400&q=85",
  jaipur:    "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1400&q=85",
  kerala:    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1400&q=85",
  mumbai:    "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1400&q=85",
  udaipur:   "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1400&q=85",
  delhi:     "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&q=85",
  bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1400&q=85",
  shimla:    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1400&q=85",
  pune:      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85",
  kolkata:   "https://images.unsplash.com/photo-1558618047-f4e60cdc1339?w=1400&q=85",
  gurugram:  "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&q=85",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85";

function DestinationPage() {
  const { city } = useParams();
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { isDarkMode } = useTheme();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // ✅ This makes "gurugram" → "Gurugram" to match DB exactly
  const cityLabel = city.charAt(0).toUpperCase() + city.slice(1);
  const heroImage = CITY_IMAGES[city.toLowerCase()] || FALLBACK_IMAGE;

  const fetchListings = async (page = 1) => {
    setLoading(true);
    try {
      const result = await axios.get(
        `${serverUrl}/api/listing/get`,
        {
          params: {
            city: cityLabel, // ✅ passes "Gurugram" not "gurugram"
            page,
            limit: 12,
          },
        }
      );
      const data = result.data;
      setListings(data.listings || []);
      setTotalPages(data.pages || 1);
      setCurrentPage(data.page || 1);
      setTotalCount(data.listings?.length || 0);
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
  }, [city]);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#0f172a]" : "bg-gray-50"}`}>
      <Navbar />

      {/* HERO BANNER */}
      <div className="relative w-full h-[280px] md:h-[360px] mt-[70px] md:mt-[80px]">
        <img
          src={heroImage}
          alt={cityLabel}
          className="absolute inset-0 w-full h-full object-cover"
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
          <div className="flex items-center gap-2 mb-2">
            <FiMapPin className="w-4 h-4 text-white/80" />
            <span className="text-white/80 text-sm">India</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {cityLabel}
          </h1>
          <p className="text-white/70 text-sm mt-1">
            {loading
              ? "Fetching stays..."
              : listings.length === 0
                ? "No stays found"
                : `${totalCount} stays available`}
          </p>
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

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF385C]" />
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
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {listings.map((listing) => (
                <Card key={listing._id} listing={listing} />
              ))}
            </div>

            {/* PAGINATION */}
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