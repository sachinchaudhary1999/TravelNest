import React, { useContext, useState } from "react";
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from "react-icons/fi";
import { listingDataContext } from "../../Context/ListingContext";
import { useTheme } from "../../Context/ThemeContext";

function FloatingSearch() {
  const { getListing } = useContext(listingDataContext);
  const { isDarkMode } = useTheme();

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    // Build filters — only include non-empty values
    const filters = {};
    if (city.trim()) filters.city = city.trim();
    if (guests) filters.maxGuests = guests;

    // Fetch filtered listings from backend
    getListing(1, filters);

    // Scroll down to listings section
    const section = document.getElementById("listings-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full px-4 lg:px-6 py-2.5">
      <div
        className={`max-w-6xl mx-auto rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700">

          {/* WHERE */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 flex-1 min-w-0">
            <FiMapPin className="w-5 h-5 text-[#FF385C] flex-shrink-0" />
            <div className="flex flex-col flex-1 min-w-0">
              <label className={`text-xs font-bold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Where
              </label>
              <input
                type="text"
                placeholder="Search destinations"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`text-base font-medium outline-none bg-transparent placeholder:font-normal w-full ${
                  isDarkMode
                    ? "text-white placeholder:text-gray-500"
                    : "text-gray-900 placeholder:text-gray-400"
                }`}
              />
            </div>
          </div>

          {/* CHECK IN */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 flex-1 min-w-0">
            <FiCalendar className="w-5 h-5 text-[#FF385C] flex-shrink-0" />
            <div className="flex flex-col flex-1 min-w-0">
              <label className={`text-xs font-bold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Check in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className={`text-base font-medium outline-none bg-transparent w-full ${
                  isDarkMode
                    ? "text-white [color-scheme:dark]"
                    : "text-gray-900"
                }`}
              />
            </div>
          </div>

          {/* CHECK OUT */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 flex-1 min-w-0">
            <FiCalendar className="w-5 h-5 text-[#FF385C] flex-shrink-0" />
            <div className="flex flex-col flex-1 min-w-0">
              <label className={`text-xs font-bold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Check out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={`text-base font-medium outline-none bg-transparent w-full ${
                  isDarkMode
                    ? "text-white [color-scheme:dark]"
                    : "text-gray-900"
                }`}
              />
            </div>
          </div>

          {/* GUESTS */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 flex-1 min-w-0">
            <FiUsers className="w-5 h-5 text-[#FF385C] flex-shrink-0" />
            <div className="flex flex-col flex-1 min-w-0">
              <label className={`text-xs font-bold uppercase tracking-wide mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Guests
              </label>
              <input
                type="number"
                placeholder="Add guests"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`text-base font-medium outline-none bg-transparent placeholder:font-normal w-full ${
                  isDarkMode
                    ? "text-white placeholder:text-gray-500"
                    : "text-gray-900 placeholder:text-gray-400"
                }`}
              />
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <div className="px-3 py-2 flex items-center justify-center">
            <button
              onClick={handleSearch}
              className="w-full md:w-auto flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-[#FF385C] hover:bg-[#E31C5F] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
            >
              <FiSearch className="w-4 h-4" />
              Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FloatingSearch;