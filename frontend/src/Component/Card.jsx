import React, {useContext,useState,} from "react";

import { useNavigate } from "react-router-dom";

import {FaStar,FaHeart,FaRegHeart,FaCamera} from "react-icons/fa";

import { GiConfirmed } from "react-icons/gi";

import { userDataContext } from "../Context/UserContext";

import { listingDataContext } from "../Context/ListingContext";

import { authDataContext } from "../Context/AuthContext";

import axios from "axios";

import { toast } from "react-toastify";

function Card({
  listing,
  showCancelButton,
  bookingId,
  onCancel,
  index,
}) {
  const navigate = useNavigate();

  const { userData, getCurrentUser } =
    useContext(userDataContext);

  const { handleViewCard } = useContext(
    listingDataContext
  );

  const { serverUrl } = useContext(
    authDataContext
  );

  const [imgIdx, setImgIdx] = useState(0);

  const [wishlistLoading, setWishlistLoading] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  if (!listing) return null;

  const images = listing.images || [];

  const isWishlisted =
    userData?.wishlist?.some(
      w => (w._id || w) === listing._id
    );

  const handleClick = () => {
    if (userData)
      handleViewCard(listing._id);
    else navigate("/login");
  };

  const handleWishlist = async e => {
    e.stopPropagation();

    if (!userData) {
      navigate("/login");

      return;
    }

    setWishlistLoading(true);

    try {
      await axios.post(
        serverUrl +
          `/api/wishlist/toggle/${listing._id}`,
        {},
        { withCredentials: true }
      );

      await getCurrentUser();
    } catch (err) {
      toast.error(
        "Could not update wishlist"
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  const avgRating = listing.ratings
    ? listing.ratings.toFixed(1)
    : "New";

  return (
    <div
      className={`
        w-[320px]
        max-w-[90vw]
        rounded-2xl
        overflow-hidden
        cursor-pointer
        group
        bg-white
        dark:bg-slate-800
        border
        border-gray-100
        dark:border-slate-700
        shadow-[0_4px_20px_rgba(0,0,0,0.08)]
        dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]
        hover:-translate-y-1
        hover:scale-[1.02]
        transition-all
        duration-500
        animate-fade-in
        ${index ? 'animation-delay-300' : ''}
      `}
    >
      {/* IMAGE */}

      <div
        className="
          relative
          w-full
          h-56
          overflow-hidden
          bg-gray-100
          dark:bg-slate-700
        "
      >
        {images.length > 0 ? (
          <img
            src={images[imgIdx]}
            alt={listing.title}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
            onClick={handleClick}
          />
        ) : (
          <div
            className="
              w-full
              h-full
              flex
              items-center
              justify-center
              text-gray-400
              dark:text-slate-400
            "
          >
            No image
          </div>
        )}

        {/* WISHLIST */}

        <button
          className="
            absolute
            top-4
            right-4
            z-10
            w-10
            h-10
            rounded-full
            bg-black/20
            backdrop-blur-md
            flex
            items-center
            justify-center
            transition-all
            duration-300
          "
          onClick={handleWishlist}
          disabled={wishlistLoading}
        >
          {isWishlisted ? (
            <FaHeart className="w-5 h-5 text-[#FF385C]" />
          ) : (
            <FaRegHeart className="w-5 h-5 text-white" />
          )}
        </button>

        {/* BOOKED */}

        {showCancelButton && (
          <div
            className="
              absolute
              top-4
              left-4
              bg-green-500
              text-white
              text-xs
              px-3
              py-1.5
              rounded-full
              flex
              items-center
              gap-1
              font-medium
            "
          >
            <GiConfirmed className="w-3 h-3" />
            Booked
          </div>
        )}

        {/* IMAGE DOTS */}

        {images.length > 1 && (
          <div
            className="
              absolute
              bottom-4
              left-1/2
              -translate-x-1/2
              flex
              gap-1.5
            "
          >
            {images.map((_, i) => (
              <button
                key={i}
                className={`
                  w-1.5
                  h-1.5
                  rounded-full
                  transition-all
                  ${
                    i === imgIdx
                      ? "bg-white scale-125"
                      : "bg-white/50"
                  }
                `}
                onClick={e => {
                  e.stopPropagation();

                  setImgIdx(i);
                }}
              />
            ))}
          </div>
        )}

        {/* ARROWS */}

        {images.length > 1 && (
          <>
            <button
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                w-8
                h-8
                rounded-full
                bg-white/90
                flex
                items-center
                justify-center
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-300
                shadow-md
              "
              onClick={e => {
                e.stopPropagation();

                setImgIdx(
                  i =>
                    (i - 1 + images.length) %
                    images.length
                );
              }}
            >
              ‹
            </button>

            <button
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                w-8
                h-8
                rounded-full
                bg-white/90
                flex
                items-center
                justify-center
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-300
                shadow-md
              "
              onClick={e => {
                e.stopPropagation();

                setImgIdx(
                  i => (i + 1) % images.length
                );
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* CONTENT */}

      <div
        className="p-4"
        onClick={handleClick}
      >
        {/* TOP */}

        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3
              className="
                text-[15px]
                font-semibold
                text-gray-900
                dark:text-white
                truncate
              "
            >
              {listing.landMark},{" "}
              {listing.city}
            </h3>

            <p
              className="
                text-sm
                text-gray-500
                dark:text-slate-400
                truncate
              "
            >
              {listing.title}
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-1
              text-sm
              text-gray-700
              dark:text-slate-300
              flex-shrink-0
            "
          >
            <FaStar className="text-[#FF385C] w-3.5 h-3.5" />

            <span>{avgRating}</span>
          </div>
        </div>

        {/* PRICE */}

        <div className="mt-4">
          <span
            className="
              text-[15px]
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            ₹{listing.rent}
          </span>

          <span
            className="
              text-sm
              text-gray-500
              dark:text-slate-400
            "
          >
            {" "}
            / night
          </span>
        </div>
      </div>

      {/* CANCEL */}

      {showCancelButton && (
        <div className="px-4 pb-4">
          <button
            className="
              w-full
              h-11
              rounded-2xl
              border
              border-red-300
              text-red-500
              text-sm
              font-medium
              hover:bg-red-50
              dark:hover:bg-red-500/10
              transition-all
              duration-300
            "
            onClick={e => {
              e.stopPropagation();

              setShowConfirm(true);
            }}
          >
            Cancel Booking
          </button>

          {/* CONFIRM */}

          {showConfirm && (
            <div
              className="
                absolute
                inset-0
                rounded-3xl
                bg-white/95
                dark:bg-slate-900/95
                backdrop-blur-md
                flex
                flex-col
                items-center
                justify-center
                gap-4
                z-20
                p-6
              "
            >
              <p
                className="
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                  text-center
                "
              >
                Cancel this booking?
              </p>

              <div className="flex gap-3">
                <button
                  className="
                    h-11
                    px-5
                    rounded-2xl
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    text-sm
                    font-medium
                    transition-all
                  "
                  onClick={e => {
                    e.stopPropagation();

                    onCancel(bookingId);

                    setShowConfirm(false);
                  }}
                >
                  Yes, Cancel
                </button>

                <button
                  className="
                    h-11
                    px-5
                    rounded-2xl
                    bg-gray-100
                    dark:bg-slate-700
                    text-gray-700
                    dark:text-white
                    text-sm
                    font-medium
                    hover:bg-gray-200
                    dark:hover:bg-slate-600
                    transition-all
                  "
                  onClick={e => {
                    e.stopPropagation();

                    setShowConfirm(false);
                  }}
                >
                  Keep it
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Card;
