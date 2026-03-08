import { sendMail } from "../services/mail.service.js";
import { generateOtp } from "../utils/generateOTP.js";
import { User } from "../models/user.model.js";
import ApiErrorHandler from "../utils/ApiErrorHandler.js";
import ApiResponseHandler from "../utils/ApiResponseHandler.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Otp } from "../models/otp.model.js";

const sendEmailOTP = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.verificationStatus?.emailVerified) {
    throw new ApiErrorHandler(400, "Email is already verified");
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  await Otp.findOneAndUpdate(
    { userId: user._id },
    { userId: user._id, email: user.email, otp, expiresAt },
    { upsert: true, new: true },
  );

  await sendMail({
    to: user.email,
    subject: "Your RentEase Email Verification Code",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:10px;vertical-align:middle;">
                    <img
                      src="https://res.cloudinary.com/db7qmdfr2/image/upload/v1772467515/rentease-icon-bg-less_o1pcn9.png"
                      alt="RentEase"
                      width="36"
                      height="36"
                      style="border-radius:10px;display:block;"
                    />
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:24px;font-weight:800;color:#0f2d2b;letter-spacing:-0.5px;">
                      Rent<span style="color:#FE6702;">Ease</span>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:20px;padding:40px 36px;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

              <!-- Icon -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="width:64px;height:64px;background:linear-gradient(135deg,#fff4ec,#ffe0c0);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;">
                      <img
                        src="https://img.icons8.com/fluency/64/secured-letter.png"
                        alt="email"
                        width="36"
                        height="36"
                        style="display:block;"
                      />
                    </div>
                  </td>
                </tr>

                <!-- Title -->
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <h1 style="margin:0;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;">
                      Verify your email address
                    </h1>
                  </td>
                </tr>

                <!-- Subtitle -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;max-width:380px;">
                      Hi <strong style="color:#0f172a;">${user.name}</strong>, use the verification code below to confirm your email and activate your RentEase account.
                    </p>
                  </td>
                </tr>

                <!-- OTP Box -->
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:linear-gradient(135deg,#fff4ec,#ffe8d6);border:1.5px solid rgba(254,103,2,0.25);border-radius:16px;padding:24px 48px;text-align:center;">
                          <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;color:#FE6702;letter-spacing:2px;text-transform:uppercase;">
                            Verification Code
                          </p>
                          <p style="margin:0;font-size:42px;font-weight:900;letter-spacing:14px;color:#0f172a;font-family:'Courier New',monospace;">
                            ${otp}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Expiry Notice -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;padding:10px 20px;">
                          <p style="margin:0;font-size:12px;color:#92400e;font-weight:600;">
                            ⏱ This code expires in <strong>2 minutes</strong>. Do not share it with anyone.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="border-top:1px solid #f1f5f9;padding-bottom:24px;"></td>
                </tr>

                <!-- Security note -->
                <tr>
                  <td align="center">
                    <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.7;">
                      If you didn't request this code, you can safely ignore this email.<br/>
                      Someone may have entered your email by mistake.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0 0 6px 0;font-size:12px;color:#94a3b8;">
                © ${new Date().getFullYear()} RentEase. All rights reserved.
              </p>
              <p style="margin:0;font-size:11px;color:#cbd5e1;">
                Zero brokerage rentals across India 🇮🇳
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `,
  });

  res
    .status(200)
    .json(new ApiResponseHandler(200, null, "OTP sent to your email"));
});

const verifyEmailOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const user = req.user;

  if (!otp) throw new ApiErrorHandler(400, "OTP is required");

  const record = await Otp.findOne({ userId: user._id });

  if (!record || new Date() > record.expiresAt) {
    throw new ApiErrorHandler(
      400,
      "OTP expired or not found. Request a new one.",
    );
  }

  if (record.otp !== otp.toString().trim()) {
    throw new ApiErrorHandler(400, "Incorrect OTP. Please try again.");
  }

  await User.findByIdAndUpdate(user._id, {
    "verificationStatus.emailVerified": true,
  });

  await Otp.deleteOne({ userId: user._id });

  res
    .status(200)
    .json(new ApiResponseHandler(200, null, "Email verified successfully"));
});

export { sendEmailOTP, verifyEmailOTP };
