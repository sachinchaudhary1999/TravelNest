// import React, { useContext } from "react";
// import { MdWhatshot, MdBedroomParent, MdOutlinePool } from "react-icons/md";
// import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
// import { FaTreeCity } from "react-icons/fa6";
// import { BiBuildingHouse } from "react-icons/bi";
// import { IoBedOutline } from "react-icons/io5";
// import { SiHomeassistantcommunitystore } from "react-icons/si";
// import { listingDataContext } from "../../Context/ListingContext";
// import { useTheme } from "../../Context/ThemeContext";
// import { categories } from "./categoryData";

// const iconMap = {
//   trending:  <MdWhatshot className="w-6 h-6" />,
//   villa:     <GiFamilyHouse className="w-6 h-6" />,
//   farmHouse: <FaTreeCity className="w-6 h-6" />,
//   poolHouse: <MdOutlinePool className="w-6 h-6" />,
//   rooms:     <MdBedroomParent className="w-6 h-6" />,
//   flat:      <BiBuildingHouse className="w-6 h-6" />,
//   pg:        <IoBedOutline className="w-6 h-6" />,
//   cabin:     <GiWoodCabin className="w-6 h-6" />,
//   shops:     <SiHomeassistantcommunitystore className="w-6 h-6" />,
// };

// const activeClass   = "border-b-2 border-[#FF385C] text-[#FF385C]";
// const inactiveLight = "border-b-2 border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300";
// const inactiveDark  = "border-b-2 border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600";

// function Categories({ activeCategory, onCategoryChange }) {
//   const { getListing } = useContext(listingDataContext);
//   const { isDarkMode } = useTheme();

//   const handleCategory = (key) => {
//     onCategoryChange(key);
//     const filters = key === "trending" ? {} : { category: key };
//     getListing(1, filters);
//   };

//   return (
//     <div className={isDarkMode ? "w-full border-b bg-[#0f172a] border-slate-800" : "w-full border-b bg-white border-gray-200"}>
//       <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">
//         <div className="flex items-center overflow-x-auto scrollbar-hide">
//           {categories.map((cat) => {
//             const isActive = activeCategory === cat.key;
//             const btnClass = isActive ? activeClass : isDarkMode ? inactiveDark : inactiveLight;

//             return (
//               <button
//                 key={cat.key}
//                 onClick={() => handleCategory(cat.key)}
//                 className={`flex flex-col items-center gap-1.5 px-5 py-4 flex-shrink-0 transition-all duration-200 ${btnClass}`}
//               >
//                 {iconMap[cat.key]}
//                 <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Categories;


import React, { useContext } from "react";
import { MdWhatshot, MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { listingDataContext } from "../../Context/ListingContext";
import { useTheme } from "../../Context/ThemeContext";
import { categories } from "./categoryData";

const iconMap = {
  trending:  <MdWhatshot className="w-6 h-6" />,
  villa:     <GiFamilyHouse className="w-6 h-6" />,
  farmHouse: <FaTreeCity className="w-6 h-6" />,
  poolHouse: <MdOutlinePool className="w-6 h-6" />,
  rooms:     <MdBedroomParent className="w-6 h-6" />,
  flat:      <BiBuildingHouse className="w-6 h-6" />,
  pg:        <IoBedOutline className="w-6 h-6" />,
  cabin:     <GiWoodCabin className="w-6 h-6" />,
  shops:     <SiHomeassistantcommunitystore className="w-6 h-6" />,
};

function Categories({ activeCategory, onCategoryChange }) {
  const { getListing } = useContext(listingDataContext);
  const { isDarkMode } = useTheme();

  const handleCategory = (key) => {
    onCategoryChange(key);
    const filters = key === "trending" ? {} : { category: key };
    getListing(1, filters);
  };

  return (
    <div className={isDarkMode ? "w-full border-b bg-[#0f172a] border-slate-800" : "w-full border-b bg-white border-gray-200"}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;

            return (
              <button
                key={cat.key}
                onClick={() => handleCategory(cat.key)}
                className={`
                  flex flex-col items-center justify-center gap-2
                  flex-1 min-w-[60px] py-3
                  border-b-2 transition-all duration-200
                  ${isActive
                    ? isDarkMode
                      ? "border-white text-white"
                      : "border-gray-900 text-gray-900"
                    : isDarkMode
                      ? "border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-500"
                      : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
                  }
                `}
              >
                {iconMap[cat.key]}
                <span className="text-[11px] font-medium whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Categories;