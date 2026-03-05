import mongoose from "mongoose";
const ticketSchema = mongoose.Schema(
  {
    tenant: { type: mongoose.Types.ObjectId, ref: "User" },
    listing: { type: mongoose.Types.ObjectId, ref: "Listing" },
    moveIn: { type: mongoose.Types.ObjectId, ref: "MoveIn" },
    subject: { type: String },
    category: {
      type: String,
      enum: [
        "maintenance",
        "payment",
        "document",
        "complaint",
        "general",
        "emergency",
      ],
    },
    priority: { type: String, enum: ["low", "medium", "high", "urgent"] },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
    },
    messages: [
      {
        sender: { type: mongoose.Types.ObjectId, ref: "User" },
        senderRole: { type: String, enum: ["CUSTOMER", "OWNER"] },
        message: [{ type: String }],
        attachments: [{ url: { type: String }, name: { type: String } }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
    assignedTo: { type: mongoose.Types.ObjectId, ref: "User" },
    resolvedAt: { type: Date },
    closedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);
