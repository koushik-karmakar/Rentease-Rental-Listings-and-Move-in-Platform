import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    description: {
      type: String,
    },
    property_type: {
      type: String,
      enum: ["apartment", "house", "studio", "commercial"],
      default: "house",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "review", "published", "rented", "archived"],
      default: "draft",
    },

    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zip: {
        type: String,
      },
    },

    rent: {
      monthly: { type: Number },
      deposit: { type: Number },
      maintenanceCharges: { type: Number },
    },

    details: {
      bedrooms: { type: Number },
      bathrooms: { type: Number },
      area: { type: Number }, //sqf
      floor: { type: Number },
      totalFloors: { type: Number },
      furnishing: {
        type: String,
        enum: ["unfurnished", "semi - furnished", "fully - furnished"],
      },
    },

    amenities: [{ type: String }],
    rules: [{ type: String }],
    images: [
      {
        url: { type: String },
        caption: { type: String },
        isPrimary: { type: Boolean },
      },
    ],

    availability: {
      availableFrom: { type: Date },
      minimumStay: { type: Number },
      maximumStay: { type: Number },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: { type: Date },
    publishedAt: { type: Date },
    createdAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

export const Listing = mongoose.model("Listing", listingSchema);
