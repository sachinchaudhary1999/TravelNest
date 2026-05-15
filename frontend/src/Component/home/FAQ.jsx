import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";

const FAQS = [
  {
    id: 1,
    question: "How does booking work?",
    answer: "Browse listings, select your dates and guests, then click Book Now. You'll receive a confirmation email instantly. Payment is processed securely at the time of booking."
  },
  {
    id: 2,
    question: "How do I become a host?",
    answer: "Click 'Become a Host' in the navbar or on the homepage. Create your listing by adding photos, description, pricing and availability. Once submitted, your listing goes live immediately."
  },
  {
    id: 3,
    question: "What is the cancellation policy?",
    answer: "Cancellation policies vary by listing — each host sets their own policy (Flexible, Moderate, or Strict). You can find the cancellation policy on each listing's detail page before booking."
  },
  {
    id: 4,
    question: "Can I modify my booking?",
    answer: "Yes. Go to My Bookings in your profile, select the booking you want to change, and click Modify. Changes are subject to host approval and availability."
  },
  {
    id: 5,
    question: "Is my payment secure?",
    answer: "Absolutely. All payments are processed through our secure payment gateway with full encryption. We never store your card details on our servers."
  },
  {
    id: 6,
    question: "What if I need help during my stay?",
    answer: "You can message your host directly through the app at any time. For urgent issues, our 24/7 support team is available via the Help Center or through the Messages section."
  },
];

function FAQItem({ faq, isDarkMode }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(p => !p)}
      className={`w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
        open
          ? isDarkMode
            ? "bg-slate-800 border-slate-600"
            : "bg-white border-gray-200 shadow-sm"
          : isDarkMode
            ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600"
            : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
      }`}
    >
      {/* QUESTION ROW */}
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <span className={`text-sm font-semibold text-left ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {faq.question}
        </span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          open
            ? "bg-[#FF385C] text-white"
            : isDarkMode
              ? "bg-slate-700 text-slate-300"
              : "bg-gray-100 text-gray-500"
        }`}>
          {open
            ? <FiChevronUp className="w-4 h-4" />
            : <FiChevronDown className="w-4 h-4" />
          }
        </div>
      </div>

      {/* ANSWER */}
      {open && (
        <div className={`px-5 pb-4 text-sm leading-relaxed text-left border-t ${
          isDarkMode ? "text-slate-400 border-slate-700" : "text-gray-500 border-gray-100"
        }`}>
          <p className="pt-3">{faq.answer}</p>
        </div>
      )}
    </button>
  );
}

function FAQ() {
  const { isDarkMode } = useTheme();

  const leftFaqs = FAQS.slice(0, 3);
  const rightFaqs = FAQS.slice(3, 6);

  return (
    <section className={`w-full py-12 ${isDarkMode ? "bg-[#0f172a]" : "bg-gray-50"}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Everything you need to know about TravelNest
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm font-semibold text-[#FF385C] hover:text-[#E31C5F] transition-colors duration-200 flex-shrink-0">
            View all FAQs
            <FiChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-3">
            {leftFaqs.map(faq => (
              <FAQItem key={faq.id} faq={faq} isDarkMode={isDarkMode} />
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-3">
            {rightFaqs.map(faq => (
              <FAQItem key={faq.id} faq={faq} isDarkMode={isDarkMode} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default FAQ;