import mongoose from "mongoose";
const moveInSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Types.ObjectId,
      ref: "Listing",
    },
    tenant: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    visit: {
      type: mongoose.Types.ObjectId,
      ref: "Visit",
    },
    status: {
      type: String,
      enum: [
        "initiated",
        "documents_pending",
        "documents_submitted",
        "agreement_pending",
        "active",
        "completed",
        "terminated",
      ],
    },
    moveInDate: { type: Date },
    moveOutDate: { type: Date },
    stayDuration: { type: Number },
    monthlyRent: { type: Number },
    depositPaid: { type: Boolean },
    depositAmount: { type: Number },
    documents: [
      {
        name: { type: String },
        url: { type: String },
        status: {
          type: String,
          enum: ["pending", "uploaded", "verified", "rejected"],
        },
        uploadedAt: { type: Date },
        notes: { type: String },
      },
    ],
    agreementSigned: { type: Boolean },
    agreementSignedAt: { type: Date },
    agreementUrl: { type: String },
    inventoryList: [
      {
        name: { type: String },
        condition: {
          type: String,
          enum: ["excellent", "good", "fair", "poor"],
        },
        quantity: { type: Number },
        notes: { type: String },
      },
    ],
    checklist: [
      {
        item: { type: String },
        completed: { type: Boolean },
        completedAt: { type: Date },
        completedBy: {
          type: mongoose.Types.ObjectId,
        },
      },
    ],
    listingSnapshot: {
      title: String,
      address: String,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
export const MoveIn = mongoose.model("MoveIn", moveInSchema);
