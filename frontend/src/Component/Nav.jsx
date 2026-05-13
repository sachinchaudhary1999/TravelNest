import React, {useContext,useEffect,useRef,useState,} from "react";
import { FiSearch } from "react-icons/fi";
import {GiHamburgerMenu,GiFamilyHouse, GiWoodCabin,} from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import {MdWhatshot,MdBedroomParent,MdOutlinePool,MdSettings,} from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import {IoBedOutline,IoChatbubblesOutline,} from "react-icons/io5";
import { FaTreeCity, FaHeart } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import axios from "axios";

const categories = [
  {
    key: "trending",
    label: "Trending",
    icon: <MdWhatshot className="w-7 h-7" />,
  },

  {
    key: "villa",
    label: "Villa",
    icon: <GiFamilyHouse className="w-7 h-7" />,
  },

  {
    key: "farmHouse",
    label: "Farm House",
    icon: <FaTreeCity className="w-7 h-7" />,
  },

  {
    key: "poolHouse",
    label: "Pool House",
    icon: <MdOutlinePool className="w-7 h-7" />,
  },

  {
    key: "rooms",
    label: "Rooms",
    icon: (
      <MdBedroomParent className="w-7 h-7" />
    ),
  },

  {
    key: "flat",
    label: "Flat",
    icon: (
      <BiBuildingHouse className="w-7 h-7" />
    ),
  },

  {
    key: "pg",
    label: "PG",
    icon: <IoBedOutline className="w-7 h-7" />,
  },

  {
    key: "cabin",
    label: "Cabins",
    icon: <GiWoodCabin className="w-7 h-7" />,
  },

  {
    key: "shops",
    label: "Shops",
    icon: (
      <SiHomeassistantcommunitystore className="w-7 h-7" />
    ),
  },
];

function Nav() {
  const [showPopup, setShowPopup] =
    useState(false);

  const [showSettings, setShowSettings] =
    useState(false);

  const [activeCat, setActiveCat] =
    useState("trending");

  const [input, setInput] = useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  const [isDarkMenu, setIsDarkMenu] =
    useState(false);

  const popupRef = useRef(null);

  const navigate = useNavigate();

  const { serverUrl } = useContext(
    authDataContext
  );

  const { userData, setUserData } =
    useContext(userDataContext);

  const {
    listingData,
    setNewListData,
    searchData,
    handleSearch,
    handleViewCard,
    setSearchData,
  } = useContext(listingDataContext);

  const adminUrl =
    import.meta.env.VITE_ADMIN_URL ||
    "";

  // THEME

  useEffect(() => {
    const storedTheme =
      localStorage.getItem("theme");

    if (storedTheme === "dark") {
      setIsDarkMenu(true);

      document.documentElement.classList.add(
        "dark"
      );
    } else {
      setIsDarkMenu(false);

      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, []);

  useEffect(() => {
    if (isDarkMenu) {
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
  }, [isDarkMenu]);

  // SEARCH

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(input);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  // OUTSIDE CLICK

  useEffect(() => {
    const handler = e => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target)
      ) {
        setShowPopup(false);

        setShowSettings(false);
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
        { withCredentials: true }
      );

      setUserData(null);

      navigate("/");
    } catch (error) {
      console.log(error);
    }

    setShowPopup(false);

    setShowSettings(false);
  };

  // CATEGORY

  const handleCategory = cat => {
    setActiveCat(cat);

    if (cat === "trending") {
      setNewListData(listingData);
    } else {
      setNewListData(
        listingData.filter(
          l => l.category === cat
        )
      );
    }
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-700 shadow-sm">
      {/* TOP NAVBAR */}

      <div className="container-primary h-[80px] flex items-center justify-between gap-4">
        {/* LOGO */}

        <div
          className="cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <h1 className="text-3xl font-extrabold tracking-[-1px] text-[#FF385C]">
            TravelNest
          </h1>
        </div>

        {/* SEARCH */}

        <div className="hidden md:flex relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search destinations..."
            value={input}
            onChange={e =>
              setInput(e.target.value)
            }
            className="
              w-full
              h-14
              rounded-full
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              text-gray-900
              dark:text-white
              placeholder:text-gray-400
              dark:placeholder:text-slate-500
              px-6
              outline-none
              shadow-sm
              focus:border-[#FF385C]
              transition-all
            "
          />

          <button
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              w-10
              h-10
              rounded-full
              bg-[#FF385C]
              hover:bg-[#E31C5F]
              flex
              items-center
              justify-center
              transition-all
            "
          >
            <FiSearch className="text-white w-4 h-4" />
          </button>
        </div>

        {/* RIGHT */}

        <div
          className="flex items-center gap-3"
          ref={popupRef}
        >
          <span
            onClick={() =>
              navigate("/listingpage1")
            }
            className="
              hidden
              md:block
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
              cursor-pointer
              hover:bg-gray-100
              dark:hover:bg-slate-800
              transition-all
            "
          >
            Become a Host
          </span>

          {userData && (
            <>
              <button
                onClick={() =>
                  navigate("/wishlist")
                }
                className="
                  w-11
                  h-11
                  rounded-full
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-100
                  dark:hover:bg-slate-800
                  transition-all
                "
              >
                <FaHeart className="text-[#FF385C]" />
              </button>

              <button
                onClick={() =>
                  navigate("/messages")
                }
                className="
                  w-11
                  h-11
                  rounded-full
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-100
                  dark:hover:bg-slate-800
                  transition-all
                "
              >
                <IoChatbubblesOutline className="w-5 h-5" />
              </button>
            </>
          )}

          {/* PROFILE */}

          <button
            onClick={() =>
              setShowPopup(prev => !prev)
            }
            className="
              h-12
              px-4
              rounded-full
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              flex
              items-center
              gap-3
              hover:shadow-md
              transition-all
            "
          >
            <GiHamburgerMenu className="w-5 h-5" />

            {!userData ? (
              <CgProfile className="w-7 h-7" />
            ) : (
              <span
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-[#FF385C]
                  text-white
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-semibold
                "
              >
                {userData.name
                  .charAt(0)
                  .toUpperCase()}
              </span>
            )}
          </button>

          {/* POPUP */}

          {showPopup && (
            <div
              className="
                absolute
                top-[110%]
                right-0
                w-60
                rounded-3xl
                overflow-hidden
                bg-white
                dark:bg-slate-800
                border
                border-gray-200
                dark:border-slate-700
                shadow-2xl
                z-50
              "
            >
              {!userData ? (
                <>
                  <MenuItem
                    label="Login"
                    onClick={() => {
                      navigate("/login");

                      setShowPopup(false);

                      setShowSettings(false);
                    }}
                  />

                  <MenuItem
                    label="Sign Up"
                    onClick={() => {
                      navigate("/signup");

                      setShowPopup(false);

                      setShowSettings(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    label="My Profile"
                    onClick={() => {
                      navigate("/profile");

                      setShowPopup(false);

                      setShowSettings(false);
                    }}
                  />

                  <MenuItem
                    label="My Listings"
                    onClick={() => {
                      navigate("/mylisting");

                      setShowPopup(false);

                      setShowSettings(false);
                    }}
                  />

                  <MenuItem
                    label="My Bookings"
                    onClick={() => {
                      navigate("/mybooking");

                      setShowPopup(false);

                      setShowSettings(false);
                    }}
                  />

                  <MenuItem
                    label="Wishlist"
                    onClick={() => {
                      navigate("/wishlist");

                      setShowPopup(false);

                      setShowSettings(false);
                    }}
                  />

                  <MenuItem
                    label="Messages"
                    onClick={() => {
                      navigate("/messages");

                      setShowPopup(false);

                      setShowSettings(false);
                    }}
                  />

                  

                  {/* SETTINGS */}

                  <MenuItem
                    label="Settings"
                    icon={<MdSettings />}
                    onClick={() =>
                      setShowSettings(prev => !prev)
                    }
                  />

                  {showSettings && (
                    <div
                      className="
                        px-5
                        py-4
                        border-t
                        border-gray-200
                        dark:border-slate-700
                        bg-gray-50
                        dark:bg-slate-900
                      "
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p
                            className="
                              text-sm
                              font-semibold
                              text-gray-900
                              dark:text-white
                            "
                          >
                            Dark Theme
                          </p>

                          <p
                            className="
                              text-xs
                              text-gray-500
                              dark:text-slate-400
                              mt-1
                            "
                          >
                            Toggle site dark mode
                          </p>
                        </div>

                        {/* TOGGLE */}

                        <button
                          type="button"
                          onClick={() =>
                            setIsDarkMenu(
                              prev => !prev
                            )
                          }
                          className={`
                            relative
                            inline-flex
                            h-6
                            w-11
                            items-center
                            rounded-full
                            transition-all
                            duration-300
                            ${
                              isDarkMenu
                                ? "bg-[#FF385C]"
                                : "bg-gray-300 dark:bg-slate-700"
                            }
                          `}
                        >
                          <span
                            className={`
                              inline-block
                              h-5
                              w-5
                              transform
                              rounded-full
                              bg-white
                              transition-all
                              duration-300
                              ${
                                isDarkMenu
                                  ? "translate-x-5"
                                  : "translate-x-1"
                              }
                            `}
                          />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-200 dark:border-slate-700" />

                  <MenuItem
                    label="List your home"
                    onClick={() => {
                      navigate("/listingpage1");

                      setShowPopup(false);

                      setShowSettings(false);
                    }}
                  />

                  <MenuItem
                    label="Logout"
                    danger
                    onClick={handleLogOut}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH */}

      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search anywhere..."
            value={input}
            onChange={e =>
              setInput(e.target.value)
            }
            className="
              w-full
              h-14
              rounded-full
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              text-gray-900
              dark:text-white
              px-5
              outline-none
            "
          />

          <button
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              w-10
              h-10
              rounded-full
              bg-[#FF385C]
              flex
              items-center
              justify-center
            "
          >
            <FiSearch className="text-white" />
          </button>
        </div>
      </div>

      {/* CATEGORY BAR */}

      <div className="w-full h-20 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-700 flex items-center gap-8 overflow-x-auto px-6 md:justify-center">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() =>
              handleCategory(cat.key)
            }
            className={`
              flex flex-col items-center gap-1
              text-xs
              flex-shrink-0
              pb-1
              border-b-2
              transition-all
              ${
                activeCat === cat.key
                  ? "border-black dark:border-white text-black dark:text-white"
                  : "border-transparent text-gray-500 dark:text-slate-400"
              }
            `}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MenuItem({
  label,
  onClick,
  danger,
  icon,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        px-5
        py-3
        text-sm
        flex
        items-center
        gap-2
        text-left
        transition-all
        hover:bg-gray-50
        dark:hover:bg-slate-700
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

export default Nav;