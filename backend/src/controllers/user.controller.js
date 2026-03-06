import { User } from "../models/user.model.js";
import ApiErrorHandler from "../utils/ApiErrorHandler.js";
import ApiResponseHandler from "../utils/ApiResponseHandler.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiErrorHandler(400, "Name, email and password are required");
  }
  if (password.length < 6) {
    throw new ApiErrorHandler(400, "Password must be at least 6 characters");
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new ApiErrorHandler(409, "Email is already registered");

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    provider: "LOCAL",
  });

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const sanitizedUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };

  res
    .status(201)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponseHandler(
        201,
        { user: sanitizedUser, accessToken },
        "Account created successfully",
      ),
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiErrorHandler(400, "Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password",
  );
  if (!user) throw new ApiErrorHandler(401, "Invalid email or password");

  if (user.provider !== "LOCAL") {
    throw new ApiErrorHandler(401, `Please sign in with ${user.provider}`);
  }

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) throw new ApiErrorHandler(401, "Invalid email or password");

  if (!user.isActive) {
    throw new ApiErrorHandler(403, "Account is deactivated. Contact support.");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const sanitizedUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };

  res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponseHandler(
        200,
        { user: sanitizedUser, accessToken },
        "Login successful",
      ),
    );
});

const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiErrorHandler(400, "Invalid cradential");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "name avatar",
  );
  console.log(user);
  res.status(200).json({
    exists: !!user,
    user: user ? { name: user.name, avatar: user.avatar } : null,
  });
});

const checkAuth = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json(new ApiResponseHandler(200, { user }, "User fetched"));
});
export { registerUser, loginUser, checkEmail, checkAuth };
