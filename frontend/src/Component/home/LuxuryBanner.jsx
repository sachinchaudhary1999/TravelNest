import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";

function LuxuryBanner() {
  const { isDarkMode } = useTheme();

  const handleExplore = () => {
    const section = document.getElementById("listings-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full px-4 md:px-6 lg:px-10 py-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative w-full h-[280px] md:h-[320px] rounded-3xl overflow-hidden">

          {/* BACKGROUND IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85"
            alt="Luxury stays across India"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14 max-w-lg">

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Experience luxury stays <br className="hidden md:block" />
              across India
            </h2>

            <p className="mt-3 text-sm md:text-base text-white/75 leading-relaxed">
              From serene mountains to tropical beaches, <br className="hidden md:block" />
              find the perfect stay for every mood.
            </p>

            <button
              onClick={handleExplore}
              className="mt-6 w-fit flex items-center gap-2 h-11 px-6 rounded-full bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Explore Now
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default LuxuryBanner;