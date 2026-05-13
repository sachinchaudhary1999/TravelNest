import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Listing from "./models/listing.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const HOST_ID = "69f31c4d4e0e4a3146e217fc";

const cityConfig = {
  Goa: {
    categories: [
      "villa",
      "resort",
      "beach house",
    ],

    imageQueries: [
      "goa luxury villa",
      "goa beach resort",
      "goa private pool villa",
      "goa beach house interior",
    ],

    landmarks: [
      "Baga Beach",
      "Candolim",
      "Anjuna",
      "Calangute",
    ],

    descriptions: [
      "Beautiful beachside property with modern interiors and relaxing vibes.",
      "Luxury stay near Goa beaches with premium amenities and pool access.",
      "Perfect vacation stay for families and couples near the beach.",
      "Enjoy peaceful sunsets and stylish interiors in this luxury property.",
    ],
  },

  Manali: {
    categories: [
      "cabin",
      "mountain cottage",
      "villa",
    ],

    imageQueries: [
      "manali luxury cabin",
      "manali mountain stay",
      "manali snowy cottage",
      "manali wooden cabin interior",
    ],

    landmarks: [
      "Old Manali",
      "Solang Valley",
      "Mall Road",
    ],

    descriptions: [
      "Cozy mountain retreat with breathtaking valley views.",
      "Luxury wooden cabin surrounded by snowy mountains.",
      "Perfect getaway for nature lovers and adventure seekers.",
      "Warm and peaceful stay with beautiful Himalayan scenery.",
    ],
  },

  Mumbai: {
    categories: [
      "apartment",
      "penthouse",
      "flat",
    ],

    imageQueries: [
      "mumbai luxury apartment",
      "mumbai penthouse",
      "modern apartment mumbai",
    ],

    landmarks: [
      "Bandra",
      "Marine Drive",
      "Juhu",
    ],

    descriptions: [
      "Modern apartment located in the heart of the city.",
      "Luxury penthouse with amazing skyline views.",
      "Stylish stay with premium interiors and comfort.",
      "Perfect urban getaway with easy access to attractions.",
    ],
  },

  Jaipur: {
    categories: [
      "haveli",
      "villa",
      "heritage home",
    ],

    imageQueries: [
      "jaipur royal haveli",
      "jaipur heritage villa",
      "luxury haveli interior",
    ],

    landmarks: [
      "Pink City",
      "Amer Fort",
      "Hawa Mahal",
    ],

    descriptions: [
      "Royal heritage property with traditional Rajasthani architecture.",
      "Elegant stay with luxurious interiors and cultural charm.",
      "Experience royal living in this beautiful heritage home.",
      "Peaceful and luxurious property inspired by royal palaces.",
    ],
  },

  Kashmir: {
    categories: [
      "houseboat",
      "cabin",
      "villa",
    ],

    imageQueries: [
      "kashmir luxury houseboat",
      "kashmir cabin stay",
      "kashmir mountain villa",
    ],

    landmarks: [
      "Dal Lake",
      "Gulmarg",
      "Pahalgam",
    ],

    descriptions: [
      "Peaceful stay surrounded by beautiful lakes and mountains.",
      "Luxury houseboat experience with stunning scenic views.",
      "Relaxing getaway perfect for nature lovers.",
      "Beautiful mountain retreat with premium comfort.",
    ],
  },
};

const amenitiesList = [
  "wifi",
  "pool",
  "parking",
  "ac",
  "tv",
  "kitchen",
  "laundry",
  "pets",
  "fireplace",
];

function randomItem(arr) {
  return arr[
    Math.floor(Math.random() * arr.length)
  ];
}

function randomAmenities() {
  return amenitiesList.filter(
    () => Math.random() > 0.4
  );
}

function randomPrice(city) {
  const ranges = {
    Goa: [4000, 25000],
    Manali: [3000, 15000],
    Mumbai: [5000, 35000],
    Jaipur: [3000, 20000],
    Kashmir: [4000, 18000],
  };

  const [min, max] = ranges[city];

  return (
    Math.floor(Math.random() * (max - min)) +
    min
  );
}

async function getCoordinates(place) {
  try {
    const res = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          key: process.env.OPENCAGE_API_KEY,
          q: place,
          limit: 1,
        },
      }
    );

    const result = res.data.results[0];

    if (!result) {
      return {
        latitude: 0,
        longitude: 0,
      };
    }

    return {
      latitude: result.geometry.lat,
      longitude: result.geometry.lng,
    };
  } catch (err) {
    return {
      latitude: 0,
      longitude: 0,
    };
  }
}

async function getImages(query) {
  try {
    const imageCount =
      Math.floor(Math.random() * 6) + 5;

    const res = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        params: {
          query,
          per_page: imageCount,
        },

        headers: {
          Authorization:
            process.env.PEXELS_API_KEY,
        },
      }
    );

    return res.data.photos.map(
      (photo) => photo.src.large2x
    );
  } catch (err) {
    return [];
  }
}

async function uploadToCloudinary(imageUrl) {
  try {
    const result =
      await cloudinary.uploader.upload(
        imageUrl,
        {
          folder: "travelnest",

          transformation: [
            {
              width: 1200,
              crop: "limit",
            },

            {
              quality: "auto",
            },

            {
              fetch_format: "auto",
            },
          ],
        }
      );

    return result.secure_url;
  } catch (err) {
    return null;
  }
}

async function generateListings(count = 100) {
  const listings = [];

  const cities = Object.keys(cityConfig);

  for (let i = 0; i < count; i++) {
    try {
      console.log(
        `Generating listing ${i + 1}/${count}`
      );

      const city = randomItem(cities);

      const config = cityConfig[city];

      const category = randomItem(
        config.categories
      );

      const landmark = randomItem(
        config.landmarks
      );

      const imageQuery = randomItem(
        config.imageQueries
      );

      const description = randomItem(
        config.descriptions
      );

      const coordinates =
        await getCoordinates(
          `${landmark}, ${city}, India`
        );

      const internetImages =
        await getImages(imageQuery);

      const uploadedImages =
        await Promise.all(
          internetImages.map(
            uploadToCloudinary
          )
        );

      const validImages =
        uploadedImages.filter(Boolean);

      if (validImages.length === 0) {
        console.log(
          `Skipping listing because no images found`
        );

        continue;
      }

      const listing = {
        title: `${category} in ${city}`,

        description,

        images: validImages,

        rent: randomPrice(city),

        city,

        landMark: landmark,

        address: `${landmark}, ${city}, India`,

        category,

        maxGuests:
          Math.floor(Math.random() * 10) + 2,

        bedrooms:
          Math.floor(Math.random() * 5) + 1,

        bathrooms:
          Math.floor(Math.random() * 4) + 1,

        amenities: randomAmenities(),

        latitude: coordinates.latitude,

        longitude: coordinates.longitude,

        ratingsTotal: 0,

        ratingsCount: 0,

        ratings: (
          Math.random() * (5 - 3.5) +
          3.5
        ).toFixed(1),

        status: "approved",

        bookedDates: [],

        host: new mongoose.Types.ObjectId(
          HOST_ID
        ),

        createdAt: new Date(),

        updatedAt: new Date(),
      };

      listings.push(listing);
    } catch (err) {
      console.log(
        `Error generating listing ${i + 1}`
      );
    }
  }

  return listings;
}

async function seed() {
  try {
    console.log(
      "Generating listings..."
    );

    const listings =
      await generateListings(100);

    console.log(
      `Saving ${listings.length} listings to MongoDB...`
    );

    await Listing.insertMany(listings);

    console.log(
      "Listings added successfully"
    );

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seed();