import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
    },

    password: {
      type: String,
    },

    refreshToken: {
      type: String,
    },

    provider: {
      type: String,
      enum: ["LOCAL", "GOOGLE"],
      default: "LOCAL",
    },
  },
  {
    timestamps: true,
  },
);
adminSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.isAdminPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAdminAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

adminSchema.methods.generateAdminRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};
export const Admin = mongoose.model("Admin", adminSchema);
