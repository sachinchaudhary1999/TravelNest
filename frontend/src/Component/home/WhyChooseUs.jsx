import React from "react";
import { FiShield, FiHeadphones, FiCreditCard, FiTag, FiZap } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";

const FEATURES = [
  { icon: FiShield,      title: "Verified Properties",   sub: "All properties are checked for your safety." },
  { icon: FiHeadphones,  title: "24/7 Support",          sub: "We're here anytime you need us." },
  { icon: FiCreditCard,  title: "Secure Payments",       sub: "Multiple payment options with full security." },
  { icon: FiTag,         title: "Best Price Guarantee",  sub: "Get the best deals every time." },
  { icon: FiZap,         title: "Instant Booking",       sub: "Book your stay instantly with ease." },
];

function WhyChooseUs() {
  const { isDarkMode } = useTheme();

  return (
    <section className={`w-full py-12 ${isDarkMode ? "bg-[#0f172a]" : "bg-gray-50"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

        {/* HEADER */}
        <div className="mb-10">
          <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Why choose TravelNest?
          </h2>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 hover:shadow-md ${
                  isDarkMode
                    ? "bg-slate-800/60 hover:bg-slate-800"
                    : "bg-white hover:shadow-gray-100"
                }`}
              >
                {/* ICON */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? "bg-slate-700 text-[#FF385C]" : "bg-red-50 text-[#FF385C]"
                }`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* TEXT */}
                <div>
                  <p className={`text-sm font-bold leading-snug ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {feature.title}
                  </p>
                  <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                    {feature.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;