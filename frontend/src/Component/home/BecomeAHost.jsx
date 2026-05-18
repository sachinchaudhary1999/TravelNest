import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { userDataContext } from "../../Context/UserContext";

const STATS = [
  { value: "10K+", label: "Active Hosts" },
  { value: "2K+",  label: "Properties" },
  { value: "50+",  label: "Cities" },
];

function BecomeAHost() {
  const { isDarkMode } = useTheme();
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (userData) {
      navigate("/createlistings");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className={`w-full py-10 ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

        <div className={`relative w-full rounded-3xl overflow-hidden ${
          isDarkMode ? "bg-slate-800" : "bg-[#fff5f5]"
        }`}>

          <div className="flex flex-col lg:flex-row items-center gap-8 px-8 md:px-14 py-12">

            {/* LEFT CONTENT */}
            <div className="flex-1 flex flex-col gap-5 z-10">

              {/* DECORATIVE DOT */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF385C] animate-pulse" />
                <p className={`text-xs font-bold tracking-[2px] uppercase ${
                  isDarkMode ? "text-slate-400" : "text-gray-500"
                }`}>
                  Join our community
                </p>
              </div>

              <h2 className={`text-3xl md:text-4xl font-extrabold leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Become a Host on <br />
                <span className="text-[#FF385C]">TravelNest</span>
              </h2>

              <p className={`text-sm md:text-base leading-relaxed max-w-sm ${
                isDarkMode ? "text-slate-400" : "text-gray-500"
              }`}>
                Earn income by sharing your property with thousands of travelers across India.
              </p>

              <button
                onClick={handleClick}
                className="w-fit flex items-center justify-center h-12 px-8 rounded-full bg-[#FF385C] hover:bg-[#E31C5F] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
              >
                Start Hosting
              </button>

              {/* STATS */}
              <div className="flex items-center gap-8 pt-2">
                {STATS.map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    <div className="flex flex-col">
                      <p className={`text-xl font-extrabold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {stat.value}
                      </p>
                      <p className={`text-xs mt-0.5 ${
                        isDarkMode ? "text-slate-400" : "text-gray-500"
                      }`}>
                        {stat.label}
                      </p>
                    </div>
                    {i < STATS.length - 1 && (
                      <div className={`w-px h-8 ${
                        isDarkMode ? "bg-slate-600" : "bg-gray-200"
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex-1 w-full max-w-[480px] relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=85"
                  alt="Become a host"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* FLOATING BADGE */}
              <div className={`absolute -bottom-4 -left-4 rounded-2xl shadow-lg px-5 py-3 ${
                isDarkMode ? "bg-slate-700" : "bg-white"
              }`}>
                <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  ₹25,000 / month
                </p>
                <p className={`text-xs mt-0.5 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Avg. host earnings
                </p>
              </div>
            </div>

          </div>

          {/* DECORATIVE CIRCLE — background */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FF385C]/5 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[#FF385C]/5 pointer-events-none" />

        </div>
      </div>
    </section>
  );
}

export default BecomeAHost;