import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiStar, FiShield, FiHeadphones, FiTag } from "react-icons/fi";
import { userDataContext } from "../../Context/UserContext";
import { useTheme } from "../../Context/ThemeContext";

// ─────────────────────────────────────────────────────────────────────────────
// HERO IMAGE CONFIG
// To change the hero image, update the `src` value below.
// You can use:
//   - A direct image URL:  "https://example.com/your-image.jpg"
//   - A local import:      import heroImg from "../../assets/your-image.jpg"
//                          then set  src: heroImg
// ─────────────────────────────────────────────────────────────────────────────
const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=85",
  alt: "Luxury villa with pool",
};

const trustBadges = [
  { icon: <FiTag className="w-5 h-5 text-[#FF385C]" />,        label: "Best Price",     sub: "Guarantee" },
  { icon: <FiHeadphones className="w-5 h-5 text-[#FF385C]" />, label: "24/7 Support",   sub: "Always here" },
  { icon: <FiShield className="w-5 h-5 text-[#FF385C]" />,     label: "Secure Booking", sub: "Trusted by thousands" },
];

function HeroSection() {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  const { isDarkMode } = useTheme();

  const handleExplore = () => {
    const section = document.getElementById("listings-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleBecomeHost = () => {
    if (userData) {
      navigate("/listingpage1");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className={`w-full overflow-hidden ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

          {/* ── LEFT CONTENT ────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Tag line */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF385C] animate-pulse" />
              <p className={`text-xs font-bold tracking-[2px] uppercase ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                Discover. Stay. Enjoy.
              </p>
            </div>

            {/* Headline */}
            <h1 className={`text-4xl md:text-5xl lg:text-[52px] font-[800] leading-[1.1] tracking-[-1.5px] ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Find stays that <br />
              feel like{" "}
              <span className="text-[#FF385C]">home</span>
            </h1>

            {/* Sub-text */}
            <p className={`text-base leading-relaxed max-w-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Book villas, cabins, apartments and unique stays across India.
              Anywhere. Anytime.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExplore}
                className="flex items-center gap-2 h-12 px-6 rounded-full bg-[#FF385C] hover:bg-[#E31C5F] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explore Stays
                <FiArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleBecomeHost}
                className={`flex items-center justify-center h-12 px-6 rounded-full border font-semibold text-sm transition-all duration-300 ${
                  isDarkMode
                    ? "border-slate-600 bg-transparent text-white hover:border-white"
                    : "border-gray-300 bg-white text-gray-900 hover:border-gray-900"
                }`}
              >
                Become a Host
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? "bg-slate-800" : "bg-red-50"}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold leading-none ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {badge.label}
                    </p>
                    <p className={`text-[11px] mt-0.5 ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
                      {badge.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT IMAGE ──────────────────────────────────────────── */}
          <div className="flex-1 w-full relative">
            <div className="relative rounded-3xl overflow-hidden w-full aspect-[4/3] shadow-2xl">
              <img
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rating Badge — top-right */}
            <div className={`absolute top-4 right-4 rounded-2xl shadow-lg px-4 py-3 flex flex-col items-center min-w-[90px] ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
              <div className="flex items-center gap-1">
                <FiStar className="w-4 h-4" style={{ fill: "#FBBF24", color: "#FBBF24" }} />
                <span className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>4.8</span>
              </div>
              <p className={`text-[11px] mt-0.5 ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>2,450 reviews</p>
            </div>

            {/* Happy Guests Badge — bottom-right */}
            <div className={`absolute bottom-4 right-4 rounded-2xl shadow-lg px-4 py-3 ${isDarkMode ? "bg-slate-800" : "bg-white"}`}>
              <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>10K+</p>
              <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>Happy Guests</p>
              <div className="flex items-center mt-2 -space-x-2">
                {[
                  "https://i.pravatar.cc/32?img=1",
                  "https://i.pravatar.cc/32?img=2",
                  "https://i.pravatar.cc/32?img=3",
                  "https://i.pravatar.cc/32?img=4",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="guest"
                    className={`w-7 h-7 rounded-full object-cover border-2 ${isDarkMode ? "border-slate-800" : "border-white"}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;