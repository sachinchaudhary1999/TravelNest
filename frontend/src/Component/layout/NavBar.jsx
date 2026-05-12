import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FiChevronDown,
  FiGlobe,
  FiHeart,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSettings,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import { userDataContext } from "../../Context/UserContext";
import { authDataContext } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";

import axios from "axios";
import logo from "../../assets/TravelNest Logo.png";

function Navbar() {

  const navigate = useNavigate();

  const { userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { isDarkMode, toggleTheme } = useTheme();

  const [showMenu, setShowMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const menuRef = useRef(null);

  // OUTSIDE CLICK — closes dropdown
  useEffect(() => {
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // LOGOUT
  const handleLogOut = async () => {
    try {
      await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUserData(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setShowMenu(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-[#111827]/95 backdrop-blur-xl">

      {/* ── MAIN ROW ──────────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 h-[70px] md:h-[80px] flex items-center justify-between gap-3">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer select-none flex-shrink-0"
        >
          <img
            src={logo}
            alt="TravelNest"
            className="h-[70px] md:h-[88px] w-auto object-contain"
          />
        </div>

        {/* SEARCH BAR — desktop only */}
        <div className="hidden lg:flex items-center justify-between w-[430px] h-14 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-2 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
          <div className="flex items-center flex-1">
            <button className="px-5 text-sm font-semibold text-gray-900 dark:text-white">
              Anywhere
            </button>
            <div className="w-[1px] h-5 bg-gray-200 dark:bg-slate-700" />
            <button className="px-5 text-sm font-medium text-gray-700 dark:text-slate-300">
              Any week
            </button>
            <div className="w-[1px] h-5 bg-gray-200 dark:bg-slate-700" />
            <button className="px-5 text-sm font-medium text-gray-500 dark:text-slate-400">
              Add guests
            </button>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#FF385C] hover:bg-[#E31C5F] flex items-center justify-center transition-all duration-300">
            <FiSearch className="text-white w-4 h-4" />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div ref={menuRef} className="flex items-center gap-2 md:gap-3">

          {/* MOBILE SEARCH ICON — hidden on lg */}
          <button
            onClick={() => setShowMobileSearch(prev => !prev)}
            className="lg:hidden w-10 h-10 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] flex items-center justify-center transition-all duration-300"
          >
            {showMobileSearch
              ? <FiX className="w-4 h-4 text-gray-700 dark:text-white" />
              : <FiSearch className="w-4 h-4 text-gray-700 dark:text-white" />
            }
          </button>

          {/* BECOME A HOST — hidden on mobile */}
          <button
            onClick={() => userData ? navigate("/listingpage1") : navigate("/login")}
            className="hidden md:flex items-center justify-center h-10 px-4 lg:px-5 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-sm font-semibold text-gray-900 dark:text-white hover:border-[#FF385C] transition-all duration-300 whitespace-nowrap"
          >
            Become a Host
          </button>

          {/* GLOBE — hidden on mobile */}
          <button className="hidden md:flex w-10 h-10 rounded-full items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300">
            <FiGlobe className="w-5 h-5 text-gray-700 dark:text-slate-300" />
          </button>

          {/* PROFILE AVATAR */}
          {userData && (
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm hover:scale-[1.03] transition-all duration-300 flex-shrink-0"
            >
              {userData.profilePic ? (
                <img
                  src={userData.profilePic}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#FF385C] flex items-center justify-center text-sm font-semibold text-white">
                  {userData?.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </button>
          )}

          {/* HAMBURGER MENU BUTTON */}
          <button
            onClick={() => setShowMenu(prev => !prev)}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] flex items-center justify-center hover:shadow-md transition-all duration-300"
          >
            <FiMenu className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>

          {/* DROPDOWN MENU */}
          {showMenu && (
            <div className="absolute top-[66px] md:top-[74px] right-2 w-[calc(100vw-16px)] sm:w-[320px] md:w-[290px] rounded-[20px] border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden p-2 z-50">

              {/* LINKS */}
              <div className="flex flex-col gap-1">
                <DropdownItem label="Explore" onClick={() => { navigate("/"); setShowMenu(false); }} />
                <DropdownItem label="Experiences" />

                {userData && (
                  <>
                    <DropdownItem
                      label="Wishlist"
                      icon={<FiHeart />}
                      onClick={() => { navigate("/wishlist"); setShowMenu(false); }}
                    />
                    <DropdownItem
                      label="Profile"
                      icon={<FiUser />}
                      onClick={() => { navigate("/profile"); setShowMenu(false); }}
                    />
                  </>
                )}

                {/* BECOME A HOST — visible in dropdown on mobile only */}
                <div className="md:hidden">
                  <DropdownItem
                    label="Become a Host"
                    onClick={() => {
                      userData ? navigate("/listingpage1") : navigate("/login");
                      setShowMenu(false);
                    }}
                  />
                </div>
              </div>

              {/* DIVIDER */}
              <div className="my-2 border-t border-gray-200 dark:border-slate-800" />

              {/* SETTINGS */}
              <div className="flex flex-col gap-1">
                <DropdownItem label="Settings" icon={<FiSettings />} />

                {/* THEME TOGGLE */}
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

              {/* DIVIDER */}
              <div className="my-2 border-t border-gray-200 dark:border-slate-800" />

              {/* AUTH */}
              {!userData ? (
                <div className="flex flex-col gap-1">
                  <DropdownItem label="Login" onClick={() => { navigate("/login"); setShowMenu(false); }} />
                  <DropdownItem label="Sign Up" onClick={() => { navigate("/signup"); setShowMenu(false); }} />
                </div>
              ) : (
                <DropdownItem
                  label="Logout"
                  icon={<FiLogOut />}
                  danger
                  onClick={handleLogOut}
                />
              )}

            </div>
          )}

        </div>
      </div>

      {/* ── MOBILE SEARCH BAR — slides in below navbar ────────────────── */}
      {showMobileSearch && (
        <div className="lg:hidden px-4 pb-3 border-t border-gray-100 dark:border-slate-800 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl">
          <div className="flex items-center gap-2 mt-3 h-12 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] px-4 shadow-sm">
            <FiSearch className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search destinations, stays..."
              autoFocus
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none"
            />
            <button className="w-8 h-8 rounded-full bg-[#FF385C] hover:bg-[#E31C5F] flex items-center justify-center flex-shrink-0 transition-all duration-300">
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