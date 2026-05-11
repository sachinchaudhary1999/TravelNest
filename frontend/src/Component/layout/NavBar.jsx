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

import { userDataContext } from "../Context/UserContext";

function Navbar() {
  const navigate = useNavigate();

  const { userData } =
    useContext(userDataContext);

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

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // OUTSIDE CLICK

  useEffect(() => {
    const handler = e => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
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
        dark:bg-slate-950/80
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
        {/* LEFT */}

        <div
          onClick={() => navigate("/")}
          className="
            flex-shrink-0
            cursor-pointer
            select-none
          "
        >
          <h1
            className="
              text-[34px]
              font-black
              tracking-[-2px]
              leading-none
            "
          >
            <span
              className="
                text-slate-900
                dark:text-white
              "
            >
              Travel
            </span>

            <span className="text-[#FF385C]">
              Nest
            </span>
          </h1>
        </div>

        {/* CENTER SEARCH */}

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
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            shadow-[0_4px_20px_rgba(0,0,0,0.06)]
            px-2
            transition-all
            duration-300
            hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]
          "
        >
          {/* SEARCH TEXT */}

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

          {/* SEARCH BUTTON */}

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
          className="
            flex
            items-center
            gap-2
          "
          ref={menuRef}
        >
          {/* WISHLIST */}

          {userData && (
            <button
              onClick={() =>
                navigate("/wishlist")
              }
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
              <FiHeart
                className="
                  w-5
                  h-5
                  text-[#FF385C]
                "
              />
            </button>
          )}

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
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
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

          {/* MENU + AVATAR */}

          <button
            onClick={() =>
              setShowMenu(prev => !prev)
            }
            className="
              h-12
              pl-4
              pr-2
              rounded-full
              border
              border-gray-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              flex
              items-center
              gap-3
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

            {userData ? (
              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-[#FF385C]
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {userData.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>
            ) : (
              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-gray-200
                  dark:bg-slate-700
                  flex
                  items-center
                  justify-center
                "
              >
                <FiUser
                  className="
                    w-4
                    h-4
                    text-gray-700
                    dark:text-slate-300
                  "
                />
              </div>
            )}
          </button>

          {/* DROPDOWN */}

          {showMenu && (
            <div
              className="
                absolute
                top-[74px]
                right-0
                w-[290px]
                rounded-[28px]
                border
                border-gray-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-900
                shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                overflow-hidden
                p-2
              "
            >
              {/* TOP LINKS */}

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
                  dark:border-slate-700
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
                  dark:border-slate-700
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