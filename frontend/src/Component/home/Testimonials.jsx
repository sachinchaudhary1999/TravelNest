import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";

const REVIEWS = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Delhi",
    avatar: "https://i.pravatar.cc/80?img=11",
    rating: 5,
    text: "Amazing stay! The villa was beautiful and the host was super friendly. Will definitely come back again!",
  },
  {
    id: 2,
    name: "Neha Verma",
    location: "Mumbai",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    text: "Everything was perfect. Clean, comfortable and peaceful. Exactly what we needed for our family trip.",
  },
  {
    id: 3,
    name: "Aman Khan",
    location: "Bangalore",
    avatar: "https://i.pravatar.cc/80?img=13",
    rating: 5,
    text: "Best booking experience ever. The property matched exactly with the pictures. Highly recommended!",
  },
  {
    id: 4,
    name: "Priya Singh",
    location: "Jaipur",
    avatar: "https://i.pravatar.cc/80?img=9",
    rating: 5,
    text: "Loved every moment of our stay. The location was perfect and the amenities were top notch.",
  },
  {
    id: 5,
    name: "Vikram Patel",
    location: "Goa",
    avatar: "https://i.pravatar.cc/80?img=15",
    rating: 5,
    text: "Incredible experience from booking to checkout. The host was very responsive and helpful throughout.",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  const { isDarkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 3;
  const maxIndex = REVIEWS.length - visibleCount;

  const prev = () => setCurrentIndex(i => Math.max(i - 1, 0));
  const next = () => setCurrentIndex(i => Math.min(i + 1, maxIndex));

  const visibleReviews = REVIEWS.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className={`w-full py-12 ${isDarkMode ? "bg-[#0f172a]" : "bg-white"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              What our guests say
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Real experiences from real travelers
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                currentIndex === 0
                  ? isDarkMode ? "border-slate-700 text-slate-600 cursor-not-allowed" : "border-gray-200 text-gray-300 cursor-not-allowed"
                  : isDarkMode ? "border-slate-600 text-white hover:bg-slate-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                currentIndex >= maxIndex
                  ? isDarkMode ? "border-slate-700 text-slate-600 cursor-not-allowed" : "border-gray-200 text-gray-300 cursor-not-allowed"
                  : isDarkMode ? "border-slate-600 text-white hover:bg-slate-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className={`flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-gray-100 shadow-sm hover:shadow-md"
              }`}
            >
              <StarRating count={review.rating} />

              <p className={`text-sm leading-relaxed flex-1 ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                "{review.text}"
              </p>

              <div className={`flex items-center gap-3 pt-2 border-t ${isDarkMode ? "border-slate-700" : "border-gray-100"}`}>
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {review.name}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 h-2 bg-[#FF385C]"
                  : isDarkMode ? "w-2 h-2 bg-slate-600 hover:bg-slate-500" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;