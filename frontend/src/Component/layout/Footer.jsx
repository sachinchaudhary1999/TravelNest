import React, { useState } from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import {
  FiArrowRight,
  FiGlobe,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

import Container from "./Container";

function Footer() {
  return (
    <footer
      className="
        mt-6
        bg-white
        dark:bg-slate-950
        border-t
        border-gray-200
        dark:border-slate-800
      "
    >
      {/* ── NEWSLETTER CTA ─────────────────────────────────────────────────────
          Mobile  : stacked column, full-width input + button, smaller text
          Tablet+ : row layout with fixed-width input, heading left-aligned
          Desktop : same as tablet with slightly more horizontal padding
      ──────────────────────────────────────────────────────────────────────── */}
      <Container className="pt-6 sm:pt-8">
        <div
          className="
            relative overflow-hidden rounded-2xl
            bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950
            px-4 py-5 sm:px-6 lg:px-10 lg:py-5
            flex flex-col lg:flex-row
            items-start lg:items-center
            justify-between
            gap-4
          "
        >
          {/* LEFT – headline + subtext */}
          <div className="w-full lg:max-w-xl">
            <h2
              className="
                text-base sm:text-lg lg:text-xl
                font-[800] tracking-[-0.5px]
                text-white leading-tight
              "
            >
              Get travel inspiration &amp; exclusive offers
            </h2>

            <p className="mt-1 text-slate-300 text-xs leading-relaxed">
              Join our newsletter and get the best deals straight to your inbox.
            </p>
          </div>

          {/* RIGHT – email input + subscribe button
              Mobile  : each full-width, stacked vertically
              SM+     : side-by-side row, input fixed width             */}
          <div
            className="
              w-full lg:w-auto
              flex flex-col sm:flex-row
              items-stretch sm:items-center
              gap-2
            "
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full sm:w-[240px] lg:w-[260px]
                h-10 rounded-full
                border border-slate-700 bg-slate-900
                px-4 text-sm text-white
                placeholder:text-slate-400
                outline-none focus:border-[#FF385C]
                transition-all
              "
            />

            <button
              className="
                w-full sm:w-auto
                h-10 px-5 rounded-full
                bg-[#FF385C] hover:bg-[#E31C5F]
                text-white text-sm font-semibold
                transition-all duration-300
                flex items-center justify-center gap-2
                whitespace-nowrap
              "
            >
              Subscribe
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>

      {/* ── MAIN FOOTER GRID ───────────────────────────────────────────────────
          Mobile  : single column — brand block full-width, link columns
                    become collapsible accordions to save vertical space
          Tablet  : 2-col grid, brand left + link columns right
          Desktop : 6-col grid — brand spans 2, each link col spans 1
      ──────────────────────────────────────────────────────────────────────── */}
      <Container>
        <div
          className="
            py-6 sm:py-8
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6
            gap-0 sm:gap-6 lg:gap-6
          "
        >
          {/* BRAND – full-width on mobile, spans 2 cols on sm and lg */}
          <div
            className="
              col-span-1 sm:col-span-2 lg:col-span-2
              pb-6 sm:pb-0
              border-b border-gray-100 dark:border-slate-800
              sm:border-none
            "
          >
            {/* Logo */}
            <h2 className="text-xl font-black tracking-[-1px] text-[#FF385C]">
              TravelNest
            </h2>

            <p
              className="
                mt-2 max-w-xs
                text-xs leading-relaxed
                text-gray-500 dark:text-slate-400
              "
            >
              Find unique stays across India. Book villas, cabins, apartments,
              and more with ease.
            </p>

            {/* Social icons */}
            <div className="mt-4 flex items-center gap-2">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaYoutube />} />
            </div>

            {/* App-store badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <AppBadge label="Google Play" sublabel="GET IT ON" />
              <AppBadge label="App Store" sublabel="Download on the" />
            </div>
          </div>

          {/* ── LINK COLUMNS ─────────────────────────────────────────────────
              Desktop : always-visible static columns (no accordion)
              Mobile  : each column is an accordion — tap header to expand
                        This prevents a huge wall of links on small screens
          ──────────────────────────────────────────────────────────────────── */}
          <FooterColumn
            title="Support"
            links={[
              "Help Center",
              "Cancellation Options",
              "Contact Us",
              "Privacy Policy",
              "Terms & Conditions",
            ]}
          />

          <FooterColumn
            title="Hosting"
            links={[
              "Become a Host",
              "Host Resources",
              "Community",
              "Responsible Hosting",
            ]}
          />

          <FooterColumn
            title="Company"
            links={["About Us", "Careers", "Press", "Blog", "Investors"]}
          />

          <FooterColumn
            title="Legal"
            links={[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "Guest Refund Policy",
            ]}
          />
        </div>
      </Container>

      {/* ── BOTTOM BAR ─────────────────────────────────────────────────────────
          Mobile  : copyright row centered on top, language/currency below
          SM+     : single row, copyright left — language/currency right
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-200 dark:border-slate-800">
        <Container>
          <div
            className="
              py-3
              flex flex-col sm:flex-row
              items-center justify-between
              gap-2 sm:gap-3
            "
          >
            {/* Copyright + quick links */}
            <div
              className="
                flex flex-wrap justify-center sm:justify-start
                items-center gap-2 sm:gap-3
                text-xs text-gray-500 dark:text-slate-400
              "
            >
              <span>© 2026 TravelNest Inc.</span>
              <span className="hidden sm:inline text-gray-300 dark:text-slate-600">
                ·
              </span>
              <span>Privacy</span>
              <span>Terms</span>
              <span>Sitemap</span>
            </div>

            {/* Language + currency */}
            <div className="flex items-center gap-3">
              <button
                className="
                  flex items-center gap-1.5
                  text-xs font-medium
                  text-gray-700 dark:text-slate-300
                  hover:text-[#FF385C] transition-colors
                "
              >
                <FiGlobe className="w-3.5 h-3.5" />
                India (IN)
              </button>

              <button
                className="
                  text-xs font-medium
                  text-gray-700 dark:text-slate-300
                  hover:text-[#FF385C] transition-colors
                "
              >
                INR ₹
              </button>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

/* ── SUB-COMPONENTS ──────────────────────────────────────────────────────────── */

/**
 * FooterColumn
 *
 * Responsive behaviour:
 *  - Desktop (lg+) : static column, always expanded, no chevron shown.
 *  - Mobile/Tablet  : accordion — clicking the title toggles the link list
 *                     so small screens don't get overwhelmed with links.
 *
 * Uses local `open` state; no extra library required.
 */
function FooterColumn({ title, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        border-b border-gray-100 dark:border-slate-800
        lg:border-none
      "
    >
      {/* Column header
          Mobile/tablet : acts as accordion toggle (cursor-pointer, chevron)
          Desktop       : non-interactive label (pointer-events-none, no chevron) */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="
          w-full
          flex items-center justify-between
          py-3 lg:py-0 lg:mb-3
          text-xs font-semibold uppercase tracking-wide
          text-gray-900 dark:text-white
          lg:pointer-events-none lg:cursor-default
        "
      >
        {title}

        {/* Chevron — hidden on desktop via lg:hidden */}
        <span className="lg:hidden text-gray-400" aria-hidden="true">
          {open ? (
            <FiChevronUp className="w-4 h-4" />
          ) : (
            <FiChevronDown className="w-4 h-4" />
          )}
        </span>
      </button>

      {/* Link list
          Mobile : max-height transition controls open/close animation
          Desktop: always visible (lg:max-h-none overrides the collapse)      */}
      <div
        className={`
          flex flex-col gap-2
          overflow-hidden transition-[max-height] duration-300 ease-in-out
          ${open ? "max-h-60 pb-3" : "max-h-0"}
          lg:max-h-none lg:pb-0
        `}
      >
        {links.map((link) => (
          <button
            key={link}
            className="
              text-left
              text-xs text-gray-500 dark:text-slate-400
              hover:text-[#FF385C]
              transition-all duration-300
            "
          >
            {link}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * SocialIcon
 * Compact 32×32 circular icon button with hover accent.
 */
function SocialIcon({ icon }) {
  return (
    <button
      className="
        w-8 h-8 rounded-full
        border border-gray-200 dark:border-slate-700
        bg-gray-50 dark:bg-slate-900
        flex items-center justify-center
        text-xs text-gray-600 dark:text-slate-300
        hover:text-[#FF385C] hover:border-[#FF385C]
        transition-all duration-300
      "
    >
      {icon}
    </button>
  );
}

/**
 * AppBadge
 * Minimal pill badge linking to app stores.
 */
function AppBadge({ label, sublabel }) {
  return (
    <a
      href="#"
      className="
        flex items-center gap-1.5
        rounded-lg border border-gray-300 dark:border-slate-700
        px-3 py-1.5
        hover:border-[#FF385C] transition-all
      "
    >
      <span className="leading-none">
        <span className="block text-[8px] text-gray-500 dark:text-slate-400">
          {sublabel}
        </span>
        <span className="font-semibold text-xs text-gray-800 dark:text-white">
          {label}
        </span>
      </span>
    </a>
  );
}

export default Footer;