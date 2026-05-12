import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
import { authDataContext } from "../../Context/AuthContext";
import axios from "axios";

const DESTINATIONS = [
  {
    city: "Goa",
    image: "https://images.unsplash.com/photo-1587922546307-776227941871?w=600&q=80",
  },
  {
    city: "Manali",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
  },
  {
    city: "Jaipur",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
  },
  {
    city: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
  },
  {
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",
  },
  {
    city: "Udaipur",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
  },
];

function PopularDestinations() {
  const { isDarkMode } = useTheme();
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  // { Goa: 12, Manali: 5, ... }
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      const results = await Promise.allSettled(
        DESTINATIONS.map(({ city }) =>
          axios.get(`${serverUrl}/api/listing/getAllListing`, {
            params: { city, limit: 100, page: 1 },
          })
        )
      );

      const newCounts = {};
      results.forEach((result, i) => {
        if (result.status === "fulfilled") {
          newCounts[DESTINATIONS[i].city] =
            result.value.data?.listings?.length ?? 0;
        } else {
          newCounts[DESTINATIONS[i].city] = 0;
        }
      });
      setCounts(newCounts);
    };

    fetchCounts();
  }, [serverUrl]);

  const handleClick = (city) => {
    navigate(`/destinations/${city.toLowerCase()}`);
  };

  return (
    <section className={`w-full py-10 ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Popular Destinations
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Handpicked destinations for your next getaway
            </p>
          </div>
          <button
            onClick={() => navigate("/destinations")}
            className="flex items-center gap-1 text-sm font-semibold text-[#FF385C] hover:text-[#E31C5F] transition-colors duration-200 mt-1 flex-shrink-0"
          >
            View all
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DESTINATIONS.map(({ city, image }) => (
            <button
              key={city}
              onClick={() => handleClick(city)}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer"
            >
              {/* IMAGE */}
              <img
                src={image}
                alt={city}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* TEXT */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm">{city}</p>
                <p className="text-white/70 text-[11px] mt-0.5">
                  {counts[city] !== undefined
                    ? `${counts[city]}+ stays`
                    : "Loading..."}
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PopularDestinations;