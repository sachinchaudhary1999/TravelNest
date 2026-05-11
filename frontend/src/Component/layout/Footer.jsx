import React from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import {
  FiArrowRight,
  FiGlobe,
} from "react-icons/fi";

import Container from "./Container";

function Footer() {
  return (
    <footer
      className="
        mt-24
        bg-white
        dark:bg-slate-950
        border-t
        border-gray-200
        dark:border-slate-800
      "
    >
      {/* NEWSLETTER CTA */}

      <Container className="pt-24">
        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-gradient-to-r
            from-slate-950
            via-slate-900
            to-slate-950
            px-8
            py-10
            lg:px-14
            lg:py-14
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-8
          "
        >
          {/* LEFT */}

          <div>
            <h2
              className="
                text-3xl
                lg:text-4xl
                font-[800]
                tracking-[-2px]
                text-white
              "
            >
              Get travel inspiration &
              exclusive offers
            </h2>

            <p
              className="
                mt-3
                text-slate-300
                text-base
                max-w-xl
                leading-relaxed
              "
            >
              Join our newsletter and
              discover luxury villas,
              hidden destinations, and
              special travel deals.
            </p>
          </div>

          {/* RIGHT */}

          <div
            className="
              w-full
              lg:w-auto
              flex
              flex-col
              sm:flex-row
              items-center
              gap-4
            "
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                sm:w-[340px]
                h-14
                rounded-full
                border
                border-slate-700
                bg-slate-900
                px-6
                text-white
                placeholder:text-slate-400
                outline-none
                focus:border-[#FF385C]
              "
            />

            <button
              className="
                w-full
                sm:w-auto
                h-14
                px-8
                rounded-full
                bg-[#FF385C]
                hover:bg-[#E31C5F]
                text-white
                font-semibold
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-2
              "
            >
              Subscribe

              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>

      {/* MAIN FOOTER GRID */}

      <Container>
        <div
          className="
            py-20
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            gap-12
          "
        >
          {/* BRAND */}

          <div className="lg:col-span-2">
            <h2
              className="
                text-4xl
                font-black
                tracking-[-2px]
                text-[#FF385C]
              "
            >
              TravelNest
            </h2>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-relaxed
                text-gray-500
                dark:text-slate-400
              "
            >
              Discover luxury villas,
              cabins, apartments, and
              unforgettable travel
              experiences across India
              and beyond.
            </p>

            {/* SOCIALS */}

            <div
              className="
                mt-8
                flex
                items-center
                gap-4
              "
            >
              <SocialIcon
                icon={<FaFacebookF />}
              />

              <SocialIcon
                icon={<FaInstagram />}
              />

              <SocialIcon
                icon={<FaTwitter />}
              />

              <SocialIcon
                icon={<FaYoutube />}
              />
            </div>
          </div>

          {/* SUPPORT */}

          <FooterColumn
            title="Support"
            links={[
              "Help Center",
              "Cancellation Options",
              "Safety Information",
              "Contact Us",
            ]}
          />

          {/* HOSTING */}

          <FooterColumn
            title="Hosting"
            links={[
              "Become a Host",
              "Host Resources",
              "Community",
              "Responsible Hosting",
            ]}
          />

          {/* COMPANY */}

          <FooterColumn
            title="Company"
            links={[
              "About Us",
              "Careers",
              "Press",
              "Investors",
            ]}
          />
        </div>
      </Container>

      {/* LEGAL */}

      <Container>
        <div
          className="
            pb-16
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            gap-12
          "
        >
          <div className="lg:col-span-2" />

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

      {/* BOTTOM BAR */}

      <div
        className="
          border-t
          border-gray-200
          dark:border-slate-800
        "
      >
        <Container>
          <div
            className="
              py-6
              flex
              flex-col
              lg:flex-row
              items-center
              justify-between
              gap-5
            "
          >
            {/* COPYRIGHT */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-5
                text-sm
                text-gray-500
                dark:text-slate-400
              "
            >
              <span>
                © 2026 TravelNest Inc.
              </span>

              <span>Privacy</span>

              <span>Terms</span>

              <span>Sitemap</span>
            </div>

            {/* RIGHT */}

            <div
              className="
                flex
                items-center
                gap-5
              "
            >
              {/* LANGUAGE */}

              <button
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-slate-300
                "
              >
                <FiGlobe className="w-4 h-4" />

                English (IN)
              </button>

              {/* CURRENCY */}

              <button
                className="
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-slate-300
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

function FooterColumn({
  title,
  links,
}) {
  return (
    <div>
      <h3
        className="
          text-sm
          font-semibold
          uppercase
          tracking-wide
          text-gray-900
          dark:text-white
        "
      >
        {title}
      </h3>

      <div
        className="
          mt-6
          flex
          flex-col
          gap-4
        "
      >
        {links.map((link) => (
          <button
            key={link}
            className="
              text-left
              text-sm
              text-gray-500
              dark:text-slate-400
              hover:text-[#FF385C]
              transition-all
              duration-300
            "
          >
            {link}
          </button>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <button
      className="
        w-11
        h-11
        rounded-full
        border
        border-gray-200
        dark:border-slate-700
        bg-gray-50
        dark:bg-slate-900
        flex
        items-center
        justify-center
        text-gray-600
        dark:text-slate-300
        hover:text-[#FF385C]
        hover:border-[#FF385C]
        transition-all
        duration-300
      "
    >
      {icon}
    </button>
  );
}

export default Footer;