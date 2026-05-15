import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FiChevronDown, FiGlobe, FiHeart, FiLogOut, FiMenu,
  FiMoon, FiSearch, FiSettings, FiSun, FiUser, FiX,
  FiMessageSquare, FiBookmark, FiList,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../../Context/UserContext";
import { authDataContext } from "../../Context/AuthContext";
import { listingDataContext } from "../../Context/ListingContext";
import { useTheme } from "../../Context/ThemeContext";
import axios from "axios";
// import logo from "../../assets/TravelNest Logo.png";
import Logo from "../Logo";

function Navbar() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { handleSearch, setSearchData } = useContext(listingDataContext);
  const { isDarkMode, toggleTheme } = useTheme();

  const [showMenu, setShowMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");


  //new function adding for search
const [showSuggestions, setShowSuggestions] = useState(false);
const [activeIndex, setActiveIndex] = useState(-1);

const searchRef = useRef(null);

const recentSearches = [
  "Goa",
  "Manali",
  "Dubai",
  "Bali",
];

const trendingDestinations = [
  "New York",
  "Paris",
  "Tokyo",
  "Maldives",
];



  const menuRef = useRef(null);

  // OUTSIDE CLICK
  useEffect(() => {
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ LIVE SEARCH — debounced 300ms like old Nav
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim()) {
        handleSearch(searchInput);
      } else {
        setSearchData([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // LOGOUT
  const handleLogOut = async () => {
    try {
      await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true });
      setUserData(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setShowMenu(false);
  };

  // ✅ correct avatar field name
  const avatarSrc = userData?.avatar || userData?.avatar || null;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-[#111827]/95 backdrop-blur-xl">

      {/* MAIN ROW */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 h-[70px] md:h-[80px] flex items-center justify-between gap-3">

        {/* LOGO */}
          <div onClick={() => navigate("/")} className="cursor-pointer flex-shrink-0">
          <Logo />
           </div>

        {/* SEARCH BAR — desktop */}




      {/* SEARCH BAR — desktop */}
<div
  ref={searchRef}
  className="hidden lg:block relative w-[520px]"
>
  {/* SEARCH CONTAINER */}
  <div
    className="flex items-center justify-between
    h-14 rounded-full
    border border-gray-200/70 dark:border-slate-700
    bg-white/90 dark:bg-slate-900/90
    backdrop-blur-xl
    shadow-lg shadow-black/5 dark:shadow-black/20
    px-2
    transition-all duration-300
    hover:shadow-xl
    focus-within:ring-2 focus-within:ring-[#FF385C]/30"
  >
    {/* LEFT */}
    <div className="flex items-center flex-1 px-3 gap-3">
      <FiSearch className="text-gray-400 dark:text-slate-500 w-4 h-4" />

      <input
        type="text"
        placeholder="Search destinations, stays..."
        value={searchInput}
        onFocus={() => setShowSuggestions(true)}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(searchInput);
            setShowSuggestions(false);
          }
        }}
        className="flex-1 bg-transparent
        text-sm font-medium
        text-gray-800 dark:text-white
        placeholder:text-gray-400 dark:placeholder:text-slate-500
        outline-none"
      />
    </div>

    {/* SEARCH BUTTON */}
    <button
      onClick={() => {
        handleSearch(searchInput);
        setShowSuggestions(false);
      }}
      className="group
      w-10 h-10 rounded-full
      bg-[#FF385C]
      hover:bg-[#E31C5F]
      active:scale-95
      flex items-center justify-center
      transition-all duration-300
      shadow-md hover:shadow-lg"
    >
      <FiSearch className="text-white w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
    </button>
  </div>

  {/* SUGGESTIONS DROPDOWN */}
  {showSuggestions && (
    <div
      className="absolute top-16 left-0 w-full
      rounded-[28px]
      border border-gray-200 dark:border-slate-800
      bg-white dark:bg-[#111827]
      shadow-[0_20px_60px_rgba(0,0,0,0.18)]
      overflow-hidden z-50 p-4
      animate-in fade-in duration-200"
    >
      {/* RECENT SEARCHES */}
      {!searchInput && (
        <>
          <div className="mb-5">
            <h3
              className="text-xs font-semibold uppercase
              tracking-wider text-gray-400 mb-3"
            >
              Recent Searches
            </h3>

            <div className="flex flex-col gap-1">
              {recentSearches.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchInput(item);
                    handleSearch(item);
                    setShowSuggestions(false);
                  }}
                  className="flex items-center gap-3
                  px-3 py-3 rounded-2xl
                  hover:bg-gray-100 dark:hover:bg-slate-800
                  transition-all duration-200 text-left"
                >
                  <div
                    className="w-10 h-10 rounded-xl
                    bg-gray-100 dark:bg-slate-800
                    flex items-center justify-center"
                  >
                    <FiSearch className="text-gray-500" />
                  </div>

                  <div>
                    <p
                      className="text-sm font-medium
                      text-gray-800 dark:text-white"
                    >
                      {item}
                    </p>

                    <p className="text-xs text-gray-400">
                      Previous search
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* TRENDING DESTINATIONS */}
          <div>
            <h3
              className="text-xs font-semibold uppercase
              tracking-wider text-gray-400 mb-3"
            >
              Trending Destinations
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {trendingDestinations.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchInput(item);
                    handleSearch(item);
                    setShowSuggestions(false);
                  }}
                  className="h-14 rounded-2xl
                  border border-gray-200 dark:border-slate-700
                  hover:border-[#FF385C]
                  hover:bg-pink-50 dark:hover:bg-slate-800
                  transition-all duration-300
                  text-sm font-medium
                  text-gray-700 dark:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ACTIVE SEARCH */}
      {searchInput && (
        <div className="flex flex-col gap-1">
          <button
            onClick={() => {
              handleSearch(searchInput);
              setShowSuggestions(false);
            }}
            className="flex items-center gap-3
            px-3 py-3 rounded-2xl
            hover:bg-gray-100 dark:hover:bg-slate-800
            transition-all"
          >
            <div
              className="w-10 h-10 rounded-xl
              bg-pink-100 dark:bg-slate-800
              flex items-center justify-center"
            >
              <FiSearch className="text-[#FF385C]" />
            </div>

            <div className="text-left">
              <p
                className="text-sm font-medium
                text-gray-800 dark:text-white"
              >
                Search for "{searchInput}"
              </p>

              <p className="text-xs text-gray-400">
                Explore destinations & stays
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  )}
</div>

        {/* <div className="hidden lg:flex items-center justify-between w-[430px] h-14 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-2 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
          <div className="flex items-center flex-1 px-2">
            <input
              type="text"
              placeholder="Search destinations, stays..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none"
            />
          </div>
          <button
            onClick={() => handleSearch(searchInput)}
            className="w-10 h-10 rounded-full bg-[#FF385C] hover:bg-[#E31C5F] flex items-center justify-center transition-all duration-300"
          >
            <FiSearch className="text-white w-4 h-4" />
          </button>
        </div> */}

        {/* RIGHT SIDE */}
        <div ref={menuRef} className="flex items-center gap-2 md:gap-3">

          {/* MOBILE SEARCH TOGGLE */}
          <button
            onClick={() => setShowMobileSearch(prev => !prev)}
            className="lg:hidden w-10 h-10 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] flex items-center justify-center transition-all duration-300"
          >
            {showMobileSearch
              ? <FiX className="w-4 h-4 text-gray-700 dark:text-white" />
              : <FiSearch className="w-4 h-4 text-gray-700 dark:text-white" />
            }
          </button>

          {/* BECOME A HOST */}
          <button
            onClick={() => userData ? navigate("/listingpage1") : navigate("/login")}
            className="hidden md:flex items-center justify-center h-10 px-4 lg:px-5 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-sm font-semibold text-gray-900 dark:text-white hover:border-[#FF385C] transition-all duration-300 whitespace-nowrap"
          >
            Become a Host
          </button>

          {/* GLOBE */}
          <button className="hidden md:flex w-10 h-10 rounded-full items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300">
            <FiGlobe className="w-5 h-5 text-gray-700 dark:text-slate-300" />
          </button>

          {/* ✅ QUICK ACCESS ICONS — wishlist + messages when logged in */}
          {userData && (
            <>
              <button
                onClick={() => navigate("/wishlist")}
                className="hidden md:flex w-10 h-10 rounded-full items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                <FiHeart className="w-5 h-5 text-[#FF385C]" />
              </button>
              <button
                onClick={() => navigate("/messages")}
                className="hidden md:flex w-10 h-10 rounded-full items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                <FiMessageSquare className="w-5 h-5 text-gray-700 dark:text-slate-300" />
              </button>
            </>
          )}

          {/* PROFILE AVATAR */}
          {userData && (
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm hover:scale-[1.03] transition-all duration-300 flex-shrink-0"
            >
              {avatarSrc ? (
                <img src={avatarSrc} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#FF385C] flex items-center justify-center text-sm font-semibold text-white">
                  {userData?.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </button>
          )}

          {/* HAMBURGER */}
          <button
            onClick={() => setShowMenu(prev => !prev)}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] flex items-center justify-center hover:shadow-md transition-all duration-300"
          >
            <FiMenu className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>

          {/* DROPDOWN */}
          {showMenu && (
            <div className="absolute top-[66px] md:top-[74px] right-2 w-[calc(100vw-16px)] sm:w-[320px] md:w-[290px] rounded-[20px] border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden p-2 z-50">

              <div className="flex flex-col gap-1">
                <DropdownItem label="Explore" onClick={() => { navigate("/"); setShowMenu(false); }} />

                {userData ? (
                  <>
                    <DropdownItem label="Profile"      icon={<FiUser />}          onClick={() => { navigate("/profile");   setShowMenu(false); }} />
                    <DropdownItem label="My Listings"  icon={<FiList />}          onClick={() => { navigate("/mylisting"); setShowMenu(false); }} />
                    <DropdownItem label="My Bookings"  icon={<FiBookmark />}      onClick={() => { navigate("/mybooking"); setShowMenu(false); }} />
                    <DropdownItem label="Wishlist"     icon={<FiHeart />}         onClick={() => { navigate("/wishlist");  setShowMenu(false); }} />
                    <DropdownItem label="Messages"     icon={<FiMessageSquare />} onClick={() => { navigate("/messages");  setShowMenu(false); }} />
                  </>
                ) : null}

                {/* BECOME A HOST — mobile only */}
                <div className="md:hidden">
                  <DropdownItem
                    label="Become a Host"
                    onClick={() => { userData ? navigate("/listingpage1") : navigate("/login"); setShowMenu(false); }}
                  />
                </div>
              </div>

              <div className="my-2 border-t border-gray-200 dark:border-slate-800" />

              <div className="flex flex-col gap-1">
                <DropdownItem label="Settings" icon={<FiSettings />} />
                <button
                  onClick={toggleTheme}
                  className="w-full px-4 py-3 rounded-2xl flex items-center justify-between text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
                >
                  <div className="flex items-center gap-3">
                    {isDarkMode ? <FiMoon /> : <FiSun />}
                    Theme
                  </div>
                  <FiChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="my-2 border-t border-gray-200 dark:border-slate-800" />

              {!userData ? (
                <div className="flex flex-col gap-1">
                  <DropdownItem label="Login"   onClick={() => { navigate("/login");  setShowMenu(false); }} />
                  <DropdownItem label="Sign Up" onClick={() => { navigate("/signup"); setShowMenu(false); }} />
                </div>
              ) : (
                <>
                  <DropdownItem label="List your home" onClick={() => { navigate("/listingpage1"); setShowMenu(false); }} />
                  <DropdownItem label="Logout" icon={<FiLogOut />} danger onClick={handleLogOut} />
                </>
              )}

            </div>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {showMobileSearch && (
        <div className="lg:hidden px-4 pb-3 border-t border-gray-100 dark:border-slate-800 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl">
          <div className="flex items-center gap-2 mt-3 h-12 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] px-4 shadow-sm">
            <FiSearch className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search destinations, stays..."
              autoFocus
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none"
            />
            <button
              onClick={() => handleSearch(searchInput)}
              className="w-8 h-8 rounded-full bg-[#FF385C] hover:bg-[#E31C5F] flex items-center justify-center flex-shrink-0 transition-all duration-300"
            >
              <FiSearch className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

    </nav>
  );
}

function DropdownItem({ label, icon, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-800 ${
        danger ? "text-red-500" : "text-gray-700 dark:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default Navbar;