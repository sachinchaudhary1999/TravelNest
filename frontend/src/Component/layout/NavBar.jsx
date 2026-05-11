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
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import {
  userDataContext,
} from "../../Context/UserContext";

import {
  authDataContext,
} from "../../Context/AuthContext";

import axios from "axios";

import logo from "../../assets/TravelNest Logo.png";

function Navbar() {

  const navigate = useNavigate();

  const {
    userData,
    setUserData,
  } = useContext(userDataContext);

  const { serverUrl } =
    useContext(authDataContext);

  const [showMenu, setShowMenu] =
    useState(false);

  const [isDark, setIsDark] =
    useState(false);

  const menuRef = useRef(null);

  // THEME

  useEffect(() => {

    const storedTheme =
      localStorage.getItem("theme");

    if (storedTheme === "dark") {

      setIsDark(true);

      document.documentElement.classList.add(
        "dark"
      );

    } else {

      setIsDark(false);

      document.documentElement.classList.remove(
        "dark"
      );
    }

  }, []);

  useEffect(() => {

    if (isDark) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }

  }, [isDark]);

  // OUTSIDE CLICK

  useEffect(() => {

    const handler = e => {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target
        )
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );

  }, []);

  // LOGOUT

  const handleLogOut = async () => {

    try {

      await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setUserData(null);

      navigate("/");

    } catch (error) {

      console.log(error);

    }

    setShowMenu(false);
  };

  return (

    <nav
      className="
        fixed
        top-0
        z-50
        w-full
        border-b
        border-gray-200
        dark:border-slate-800
        bg-white/80
        dark:bg-[#111827]/95
        backdrop-blur-xl
      "
    >
      <div
        className="
          max-w-[1440px]
          mx-auto
          px-4
          md:px-6
          lg:px-10
          h-[80px]
          flex
          items-center
          justify-between
          gap-6
        "
      >

        {/* LOGO */}

        <div
          onClick={() => navigate("/")}
          className="
            flex
            items-center
            cursor-pointer
            select-none
            flex-shrink-0
          "
        >
          <img
            src={logo}
            alt="TravelNest"
            className="
              h-[88px]
              w-auto
              object-contain
            "
          />
        </div>

        {/* SEARCH */}

        <div
          className="
            hidden
            lg:flex
            items-center
            justify-between
            w-[430px]
            h-14
            rounded-full
            border
            border-gray-200
            dark:border-slate-800
            bg-white
            dark:bg-[#0F172A]
            shadow-[0_4px_20px_rgba(0,0,0,0.06)]
            px-2
            transition-all
            duration-300
            hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]
          "
        >

          <div
            className="
              flex
              items-center
              flex-1
            "
          >

            <button
              className="
                px-5
                text-sm
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Anywhere
            </button>

            <div
              className="
                w-[1px]
                h-5
                bg-gray-200
                dark:bg-slate-700
              "
            />

            <button
              className="
                px-5
                text-sm
                font-medium
                text-gray-700
                dark:text-slate-300
              "
            >
              Any week
            </button>

            <div
              className="
                w-[1px]
                h-5
                bg-gray-200
                dark:bg-slate-700
              "
            />

            <button
              className="
                px-5
                text-sm
                font-medium
                text-gray-500
                dark:text-slate-400
              "
            >
              Add guests
            </button>

          </div>

          <button
            className="
              w-10
              h-10
              rounded-full
              bg-[#FF385C]
              hover:bg-[#E31C5F]
              flex
              items-center
              justify-center
              transition-all
              duration-300
            "
          >
            <FiSearch className="text-white w-4 h-4" />
          </button>

        </div>

        {/* RIGHT */}

        <div
          ref={menuRef}
          className="
            flex
            items-center
            gap-3
          "
        >

          {/* HOST */}

          <button
            className="
              hidden
              md:flex
              items-center
              justify-center
              h-11
              px-5
              rounded-full
              border
              border-gray-200
              dark:border-slate-800
              bg-white
              dark:bg-[#0F172A]
              text-sm
              font-semibold
              text-gray-900
              dark:text-white
              hover:border-[#FF385C]
              transition-all
              duration-300
            "
          >
            Become a Host
          </button>

          {/* LANGUAGE */}

          <button
            className="
              hidden
              md:flex
              w-11
              h-11
              rounded-full
              items-center
              justify-center
              hover:bg-gray-100
              dark:hover:bg-slate-800
              transition-all
              duration-300
            "
          >
            <FiGlobe
              className="
                w-5
                h-5
                text-gray-700
                dark:text-slate-300
              "
            />
          </button>

          {/* PROFILE */}

          {userData && (

            <button
              onClick={() =>
                navigate("/profile")
              }
              className="
                w-11
                h-11
                rounded-full
                overflow-hidden
                border-2
                border-white
                dark:border-slate-800
                shadow-sm
                hover:scale-[1.03]
                transition-all
                duration-300
              "
            >

              {userData.profilePic ? (

                <img
                  src={userData.profilePic}
                  alt="profile"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              ) : (

                <div
                  className="
                    w-full
                    h-full
                    bg-[#FF385C]
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  {userData?.name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

              )}

            </button>
          )}

          {/* MENU */}

          <button
            onClick={() =>
              setShowMenu(prev => !prev)
            }
            className="
              w-11
              h-11
              rounded-full
              border
              border-gray-200
              dark:border-slate-800
              bg-white
              dark:bg-[#0F172A]
              flex
              items-center
              justify-center
              hover:shadow-md
              transition-all
              duration-300
            "
          >
            <FiMenu
              className="
                w-5
                h-5
                text-gray-700
                dark:text-white
              "
            />
          </button>

          {/* DROPDOWN */}

          {showMenu && (

            <div
              className="
                absolute
                top-[74px]
                right-2
                w-[290px]
                rounded-[28px]
                border
                border-gray-200
                dark:border-slate-800
                bg-white
                dark:bg-[#111827]
                shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                overflow-hidden
                p-2
              "
            >

              {/* LINKS */}

              <div className="flex flex-col gap-1">

                <DropdownItem
                  label="Explore"
                />

                <DropdownItem
                  label="Experiences"
                />

                {userData && (
                  <>
                    <DropdownItem
                      label="Wishlist"
                      icon={<FiHeart />}
                    />

                    <DropdownItem
                      label="Profile"
                      icon={<FiUser />}
                      onClick={() =>
                        navigate("/profile")
                      }
                    />
                  </>
                )}

              </div>

              {/* DIVIDER */}

              <div
                className="
                  my-2
                  border-t
                  border-gray-200
                  dark:border-slate-800
                "
              />

              {/* SETTINGS */}

              <div className="flex flex-col gap-1">

                <DropdownItem
                  label="Settings"
                  icon={<FiSettings />}
                />

                <button
                  onClick={() =>
                    setIsDark(prev => !prev)
                  }
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-2xl
                    flex
                    items-center
                    justify-between
                    text-sm
                    font-medium
                    text-gray-700
                    dark:text-white
                    hover:bg-gray-100
                    dark:hover:bg-slate-800
                    transition-all
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    {isDark ? (
                      <FiMoon />
                    ) : (
                      <FiSun />
                    )}

                    Theme
                  </div>

                  <FiChevronDown className="w-4 h-4" />

                </button>

              </div>

              {/* DIVIDER */}

              <div
                className="
                  my-2
                  border-t
                  border-gray-200
                  dark:border-slate-800
                "
              />

              {/* AUTH */}

              {!userData ? (

                <div className="flex flex-col gap-1">

                  <DropdownItem
                    label="Login"
                    onClick={() =>
                      navigate("/login")
                    }
                  />

                  <DropdownItem
                    label="Sign Up"
                    onClick={() =>
                      navigate("/signup")
                    }
                  />

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
    </nav>
  );
}

function DropdownItem({
  label,
  icon,
  danger,
  onClick,
}) {

  return (

    <button
      onClick={onClick}
      className={`
        w-full
        px-4
        py-3
        rounded-2xl
        flex
        items-center
        gap-3
        text-sm
        font-medium
        transition-all
        duration-300
        hover:bg-gray-100
        dark:hover:bg-slate-800
        ${
          danger
            ? "text-red-500"
            : "text-gray-700 dark:text-white"
        }
      `}
    >
      {icon}
      {label}
    </button>

  );
}

export default Navbar;