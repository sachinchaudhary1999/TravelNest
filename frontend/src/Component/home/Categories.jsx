import React, { useContext, useState } from "react";
import { MdWhatshot, MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { listingDataContext } from "../../Context/ListingContext";
import { useTheme } from "../../Context/ThemeContext";

const categories = [
  { key: "trending",  label: "Trending",   icon: <MdWhatshot className="w-6 h-6" /> },
  { key: "villa",     label: "Villas",      icon: <GiFamilyHouse className="w-6 h-6" /> },
  { key: "farmHouse", label: "Farm House",  icon: <FaTreeCity className="w-6 h-6" /> },
  { key: "poolHouse", label: "Pool House",  icon: <MdOutlinePool className="w-6 h-6" /> },
  { key: "rooms",     label: "Rooms",       icon: <MdBedroomParent className="w-6 h-6" /> },
  { key: "flat",      label: "Flats",       icon: <BiBuildingHouse className="w-6 h-6" /> },
  { key: "pg",        label: "PG",          icon: <IoBedOutline className="w-6 h-6" /> },
  { key: "cabin",     label: "Cabins",      icon: <GiWoodCabin className="w-6 h-6" /> },
  { key: "shops",     label: "Shops",       icon: <SiHomeassistantcommunitystore className="w-6 h-6" /> },
];

function Categories() {
  const { getListing } = useContext(listingDataContext);
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState("trending");

  const handleCategory = (key) => {
    setActiveCategory(key);
    const filters = key === "trending" ? {} : { category: key };
    getListing(1, filters);
    const section = document.getElementById("listings-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`w-full py-3 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-3 lg:px-6">
        <div className="flex items-center justify-center gap-3 lg:gap-5 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategory(cat.key)}
              className={`
                flex flex-col items-center gap-1.5
                px-2.5 py-2
                flex-shrink-0
                transition-all duration-200
                ${activeCategory === cat.key
                  ? "text-[#FF385C]"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-red-100"
                  : isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
              }`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium whitespace-nowrap">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;