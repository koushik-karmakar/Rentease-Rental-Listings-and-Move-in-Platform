import mongoose from "mongoose";
const visitSchema =new mongoose.Schema(
  {
    listing: {
      type: mongoose.Types.ObjectId,
    },

    tenant: {
      type: mongoose.Types.ObjectId,
    },

    requestedDate: {
      type: Date,
    },

    scheduledDate: {
      type: Date,
    },

    visitedAt: { type: Date },

    status: {
      type: String,
      enum: [
        "requested",
        "scheduled",
        "visited",
        "decision_pending",
        "accepted",
        "declined",
        "cancelled",
      ],
    },

    tenantDecision: {
      type: String,
      enum: ["interested", "not_interested", "pending"],
    },

    notes: {
      type: String,
    },

    adminNotes: {
      type: String,
    },

    listingSnapshot: {
      title: {
        type: String,
      },
      address: {
        type: String,
      },
      monthlyRent: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);
export const Visit = mongoose.model("Visit", visitSchema);
