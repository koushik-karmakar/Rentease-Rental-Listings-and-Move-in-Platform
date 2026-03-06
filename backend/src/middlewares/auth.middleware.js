import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiErrorHandler from "../utils/ApiErrorHandler.js";
import { User } from "../models/user.model.js";
const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new ApiErrorHandler(401);
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiErrorHandler(401, "Access token expired");
    }
    throw new ApiErrorHandler(401, "Invalid access token");
  }

  if (!decoded?._id) {
    throw new ApiErrorHandler(401, "Invalid token payload");
  }

  const user = await User.findById(decoded._id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiErrorHandler(401, "User no longer exists");
  }

  req.user = user;
  next();
});
export { verifyJWT };
