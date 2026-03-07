import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useLocation } from "react-router-dom";
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:wght@400;500;600;700;800;900&display=swap');
    * { font-family: 'Nunito', sans-serif; }
    .serif { font-family: 'DM Serif Display', serif !important; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideIn { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
    @keyframes spin { to { transform:rotate(360deg); } }
    @keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:.4; } }
    .fu  { animation:fadeUp .5s ease both; }
    .fu1 { animation:fadeUp .5s .1s ease both; }
    .fu2 { animation:fadeUp .5s .2s ease both; }
    .fu3 { animation:fadeUp .5s .3s ease both; }
    .sl  { animation:slideIn .4s ease both; }
    .float { animation:float 5s ease-in-out infinite; }
    .spin-anim { animation:spin .75s linear infinite; }
    input:focus, button:focus { outline:none; }
    input:-webkit-autofill { -webkit-box-shadow:0 0 0 30px white inset !important; }
  `}</style>
);

const REGISTERED = [];

const Ic = ({
  d,
  size = 20,
  color = "currentColor",
  fill = "none",
  sw = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  home: "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5zM9 21V12h6v9",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  eyeOff:
    "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
  arrow: "M5 12h14M12 5l7 7-7 7",
  back: "M19 12H5M12 19l-7-7 7-7",
  check: "M20 6L9 17l-5-5",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  x: "M18 6L6 18M6 6l12 12",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
};

const backend = import.meta.env.VITE_CORS_ORIGIN;
export default function LoginPage() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPass2, setRegPass2] = useState("");
  const [showReg, setShowReg] = useState(false);
  const [showReg2, setShowReg2] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const fake = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleCheckEmail = async () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backend}/api/v1/auth/user/check-email`,
        { email },
        {
          withCredentials: true,
        },
      );
      if (data.exists) {
        setFoundUser(data.user);
        setStep("password");
      } else {
        setFoundUser(null);
        setStep("register");
        setRegEmail(email);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backend}/api/v1/auth/user/login`,
        { email, password },
        { withCredentials: true },
      );
      login(data.data.user, data.data.accessToken);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    await fake(1400);
    setLoading(false);
    setFoundUser({ name: "Google User", avatar: "GU", role: "Tenant" });
    setStep("success");
  };

  const handleRegister = async () => {
    if (!regName || !regEmail || !regPass || !regPass2) {
      setError("Please fill all fields.");
      return;
    }
    if (regPass !== regPass2) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backend}/api/v1/auth/user/register`,
        {
          name: regName,
          email: regEmail,
          password: regPass,
        },
      );

      login(data.data.user, data.data.accessToken);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const authCheck = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const { data } = await axios.get(
        `${backend}/api/v1/auth/user/auth-check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.data.user) {
        // setUser(data.data.user);
        navigate("/");
      }
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const reset = () => {
    setStep("email");
    setEmail("");
    setPassword("");
    setFoundUser(null);
    setError("");
    setLoading(false);
    setShowPass(false);
    setRegName("");
    setRegEmail("");
    setRegPass("");
    setRegPass2("");
  };

  const inputCls = (hasErr) =>
    `w-full px-4 py-3.5 rounded-xl border-2 text-sm text-gray-800 bg-white transition-all
     placeholder-gray-400 font-600
     ${hasErr ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[#FE6702]"}
     focus:ring-2 focus:ring-[#FE6702]/15`;

  return (
    <div className="min-h-screen flex">
      <FontStyle />

      <div
        className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden p-12"
        style={{
          background:
            "linear-gradient(145deg,#0f2d2b 0%,#1a1a2e 55%,#0f1923 100%)",
        }}
      >
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "#FE6702" }}
        />
        <div
          className="absolute -bottom-15 -right-15 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "#02857E" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-5 blur-2xl"
          style={{ background: "#FE6702" }}
        />

        <div className="flex items-center gap-3 relative z-10">
          <img
            src="https://res.cloudinary.com/db7qmdfr2/image/upload/v1772467515/rentease-icon-bg-less_o1pcn9.png"
            alt="RentEase Logo"
            className="w-9 h-9 object-contain rounded-xl"
          />
          <span className="serif text-3xl font-bold">
            <span style={{ color: "#5eead4" }}>Rent</span>
            <span style={{ color: "#fb923c" }}>Ease</span>
          </span>
        </div>

        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(254,103,2,.15)",
              border: "1px solid rgba(254,103,2,.3)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#FE6702" }}
            />
            <span className="text-xs font-700" style={{ color: "#fb923c" }}>
              Zero Brokerage. Always.
            </span>
          </div>

          <h2
            className="serif text-white leading-tight mb-5"
            style={{ fontSize: "clamp(30px,3.2vw,46px)" }}
          >
            Your Perfect Home
            <br />
            <em style={{ color: "#FE6702" }}>Awaits You</em>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-sm">
            Join 50,000+ tenants who found their dream rental without paying a
            single rupee in brokerage.
          </p>

          <div className="flex flex-col gap-4">
            {[
              ["🏠", "12,000+ Verified Properties"],
              ["📅", "Instant Visit Scheduling"],
              ["📋", "Digital Move-in Checklist"],
              ["🎯", "Smart Property Comparison"],
            ].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                  style={{ background: "rgba(255,255,255,.07)" }}
                >
                  {icon}
                </div>
                <span className="text-gray-300 text-sm font-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div
            className="rounded-2xl p-5 flex items-center gap-4 float"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex -space-x-3">
              {["AM", "PK", "RS", "DU"].map((av, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#1a1a2e] flex items-center justify-center text-xs font-800 text-white"
                  style={{ background: i % 2 === 0 ? "#FE6702" : "#02857E" }}
                >
                  {av}
                </div>
              ))}
            </div>
            <div>
              <div className="text-white text-sm font-700">
                50,000+ Happy Tenants
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="#f59e0b"
                  >
                    <path d={ICONS.check} />
                  </svg>
                ))}
                <span className="text-gray-400 text-xs ml-1">4.9 rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[#f8fafc] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(254,103,2,.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(2,133,126,.05) 0%, transparent 50%)",
          }}
        />

        <div className="lg:hidden flex items-center gap-2.5 mb-8 relative z-10">
          <img
            src="https://res.cloudinary.com/db7qmdfr2/image/upload/v1772467515/rentease-icon-bg-less_o1pcn9.png"
            alt="RentEase Logo"
            className="w-9 h-9 object-contain rounded-xl"
          />
          <span className="serif text-2xl font-bold">
            <span style={{ color: "#02857E" }}>Rent</span>
            <span style={{ color: "#FE6702" }}>Ease</span>
          </span>
        </div>

        <div className="w-full max-w-105 relative z-10">
          {step === "email" && (
            <div className="fu">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="mb-7">
                  <h1 className="serif text-3xl text-gray-900 mb-1.5">
                    Welcome back
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Enter your email to continue to RentEase
                  </p>
                </div>

                <button
                  onClick={handleGoogle}
                  disabled={loading}
                  className="cursor-pointer w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all text-sm font-700 text-gray-700 mb-5 shadow-sm"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full spin-anim" />
                  ) : (
                    <svg width={20} height={20} viewBox="0 0 48 48">
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                    </svg>
                  )}
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-600">
                    or continue with email
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Ic d={ICONS.mail} size={16} color="#9ca3af" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleCheckEmail()}
                      placeholder="you@example.com"
                      className={`${inputCls(!!error)} pl-10`}
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs font-600 mt-1.5 flex items-center gap-1">
                      <Ic d={ICONS.x} size={12} color="#ef4444" /> {error}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleCheckEmail}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-800 text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                  style={{
                    background: loading
                      ? "#ccc"
                      : "linear-gradient(135deg,#FE6702,#e55500)",
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full spin-anim" />
                      Checking...
                    </>
                  ) : (
                    <>
                      Continue <Ic d={ICONS.arrow} size={16} color="white" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
                By continuing, you agree to RentEase's{" "}
                <span
                  className="font-700 cursor-pointer"
                  style={{ color: "#FE6702" }}
                >
                  Terms of Service
                </span>{" "}
                and{" "}
                <span
                  className="font-700 cursor-pointer"
                  style={{ color: "#FE6702" }}
                >
                  Privacy Policy
                </span>
              </p>
            </div>
          )}

          {step === "password" && foundUser && (
            <div className="sl">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <button
                  onClick={() => {
                    setStep("email");
                    setPassword("");
                    setError("");
                  }}
                  className="flex items-center gap-1.5 text-xs font-700 text-gray-400 hover:text-gray-700 transition-colors mb-6"
                >
                  <Ic d={ICONS.back} size={14} color="currentColor" /> Change
                  email
                </button>

                <div className="flex flex-col items-center mb-7">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-900 text-white shadow-lg mb-3"
                    style={{
                      background: "linear-gradient(135deg,#FE6702,#02857E)",
                    }}
                  >
                    {foundUser.avatar}
                  </div>
                  <h2 className="serif text-2xl text-gray-900">
                    {foundUser.name}
                  </h2>
                  <div
                    className="flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full text-xs font-700"
                    style={{ background: "#e5f5f4", color: "#02857E" }}
                  >
                    <Ic d={ICONS.check} size={11} color="#02857E" />
                    {email}
                  </div>
                  <span
                    className="mt-2 text-xs font-700 px-2.5 py-0.5 rounded-full"
                    style={{
                      background:
                        foundUser.role === "Admin" ? "#fff4ec" : "#e5f5f4",
                      color: foundUser.role === "Admin" ? "#FE6702" : "#02857E",
                    }}
                  >
                    {foundUser.role}
                  </span>
                </div>

                <div className="mb-2">
                  <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Ic d={ICONS.lock} size={16} color="#9ca3af" />
                    </div>
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="Enter your password"
                      autoFocus
                      className={`${inputCls(!!error)} pl-10 pr-11`}
                    />
                    <button
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Ic
                        d={showPass ? ICONS.eyeOff : ICONS.eye}
                        size={16}
                        color="currentColor"
                      />
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs font-600 mt-1.5 flex items-center gap-1">
                      <Ic d={ICONS.x} size={12} color="#ef4444" /> {error}
                    </p>
                  )}
                </div>

                <div className="flex justify-end mb-5">
                  <button
                    className="text-xs font-700 transition-colors hover:opacity-80"
                    style={{ color: "#FE6702" }}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="cursor-pointer w-full py-3.5 rounded-xl text-white font-800 text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                  style={{
                    background: loading
                      ? "#ccc"
                      : "linear-gradient(135deg,#FE6702,#e55500)",
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full spin-anim" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In <Ic d={ICONS.arrow} size={16} color="white" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-600">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <button
                  onClick={handleGoogle}
                  disabled={loading}
                  className="cursor-pointer w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-700 text-gray-700 shadow-sm"
                >
                  <svg width={18} height={18} viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  Sign in with Google instead
                </button>
              </div>
            </div>
          )}

          {step === "register" && (
            <div className="sl">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <button
                  onClick={() => {
                    setStep("email");
                    setError("");
                    setRegName("");
                    setRegEmail("");
                    setRegPass("");
                    setRegPass2("");
                  }}
                  className="flex items-center gap-1.5 text-xs font-700 text-gray-400 hover:text-gray-700 transition-colors mb-5"
                >
                  <Ic d={ICONS.back} size={14} color="currentColor" /> Back
                </button>

                <div
                  className="flex items-start gap-3 p-4 rounded-2xl mb-6 border"
                  style={{
                    background: "#fff4ec",
                    borderColor: "rgba(254,103,2,.25)",
                  }}
                >
                  <span className="text-xl">👋</span>
                  <div>
                    <p
                      className="text-sm font-800"
                      style={{ color: "#FE6702" }}
                    >
                      No account found
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      <span className="font-700 text-gray-700">{email}</span> is
                      not registered. Create your free account below.
                    </p>
                  </div>
                </div>

                <h2 className="serif text-2xl text-gray-900 mb-5">
                  Create Account
                </h2>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                        <Ic d={ICONS.user} size={16} color="#9ca3af" />
                      </div>
                      <input
                        value={regName}
                        onChange={(e) => {
                          setRegName(e.target.value);
                          setError("");
                        }}
                        placeholder="Arjun Mehta"
                        className={`${inputCls(false)} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                        <Ic d={ICONS.mail} size={16} color="#9ca3af" />
                      </div>
                      <input
                        value={regEmail || email}
                        onChange={(e) => {
                          setRegEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="you@example.com"
                        className={`${inputCls(false)} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                        <Ic d={ICONS.lock} size={16} color="#9ca3af" />
                      </div>
                      <input
                        type={showReg ? "text" : "password"}
                        value={regPass}
                        onChange={(e) => {
                          setRegPass(e.target.value);
                          setError("");
                        }}
                        placeholder="Create a strong password"
                        className={`${inputCls(false)} pl-10 pr-11`}
                      />
                      <button
                        onClick={() => setShowReg((s) => !s)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Ic
                          d={showReg ? ICONS.eyeOff : ICONS.eye}
                          size={16}
                          color="currentColor"
                        />
                      </button>
                    </div>

                    {regPass && (
                      <div className="mt-2 flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 h-1 rounded-full transition-all"
                            style={{
                              background:
                                regPass.length > i * 3
                                  ? regPass.length < 6
                                    ? "#ef4444"
                                    : regPass.length < 10
                                      ? "#f59e0b"
                                      : "#10b981"
                                  : "#e5e7eb",
                            }}
                          />
                        ))}
                        <span
                          className="text-xs font-600 ml-1"
                          style={{
                            color:
                              regPass.length < 6
                                ? "#ef4444"
                                : regPass.length < 10
                                  ? "#f59e0b"
                                  : "#10b981",
                          }}
                        >
                          {regPass.length < 6
                            ? "Weak"
                            : regPass.length < 10
                              ? "Fair"
                              : "Strong"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                        <Ic d={ICONS.shield} size={16} color="#9ca3af" />
                      </div>
                      <input
                        type={showReg2 ? "text" : "password"}
                        value={regPass2}
                        onChange={(e) => {
                          setRegPass2(e.target.value);
                          setError("");
                        }}
                        placeholder="Repeat your password"
                        className={`${inputCls(!!(regPass2 && regPass !== regPass2))} pl-10 pr-11`}
                      />
                      <button
                        onClick={() => setShowReg2((s) => !s)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Ic
                          d={showReg2 ? ICONS.eyeOff : ICONS.eye}
                          size={16}
                          color="currentColor"
                        />
                      </button>
                      {regPass2 && regPass === regPass2 && (
                        <div className="absolute right-10 top-1/2 -translate-y-1/2">
                          <Ic d={ICONS.check} size={16} color="#10b981" />
                        </div>
                      )}
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs font-600 flex items-center gap-1">
                      <Ic d={ICONS.x} size={12} color="#ef4444" /> {error}
                    </p>
                  )}

                  <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="cursor-pointer w-full py-3.5 rounded-xl text-white font-800 text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md mt-1"
                    style={{
                      background: loading
                        ? "#ccc"
                        : "linear-gradient(135deg,#02857E,#016b65)",
                    }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full spin-anim" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create My Account{" "}
                        <Ic d={ICONS.arrow} size={16} color="white" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 font-600">
                      or sign up with
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="cursor-pointer w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-700 text-gray-700 shadow-sm"
                  >
                    <svg width={18} height={18} viewBox="0 0 48 48">
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "success" && foundUser && (
            <div className="fu text-center">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
                    style={{
                      background: "linear-gradient(135deg,#FE6702,#02857E)",
                    }}
                  >
                    <Ic d={ICONS.check} size={36} color="white" sw={2.5} />
                  </div>
                  <div
                    className="absolute inset-0 rounded-full opacity-20 scale-125"
                    style={{
                      background: "#FE6702",
                      animation: "pulse 2s ease-out infinite",
                    }}
                  />
                </div>

                <h2 className="serif text-3xl text-gray-900 mb-2">
                  Welcome back!
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Signed in as{" "}
                  <span className="font-800 text-gray-800">
                    {foundUser.name}
                  </span>
                </p>

                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
                  style={{
                    background: "#e5f5f4",
                    border: "1px solid rgba(2,133,126,.2)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-800 text-white"
                    style={{ background: "#02857E" }}
                  >
                    {foundUser.avatar}
                  </div>
                  <span
                    className="text-sm font-700"
                    style={{ color: "#02857E" }}
                  >
                    {foundUser.name}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-700"
                    style={{
                      background:
                        foundUser.role === "Admin" ? "#fff4ec" : "#e5f5f4",
                      color: foundUser.role === "Admin" ? "#FE6702" : "#02857E",
                    }}
                  >
                    {foundUser.role}
                  </span>
                </div>

                <button
                  onClick={authCheck}
                  className="cursor-pointer w-full py-3.5 rounded-xl text-white font-800 text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md mb-3"
                  style={{
                    background: "linear-gradient(135deg,#FE6702,#e55500)",
                  }}
                >
                  Go to Dashboard <Ic d={ICONS.arrow} size={16} color="white" />
                </button>

                <button
                  onClick={reset}
                  className="cursor-pointer w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-700 text-sm hover:bg-gray-50 transition-all"
                >
                  Sign in as different user
                </button>
              </div>
            </div>
          )}

          {step === "email" && (
            <p className="text-center text-sm text-gray-500 mt-4 font-600">
              New to RentEase?{" "}
              <Link
                to={"/register"}
                className="font-800 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ color: "#FE6702" }}
              >
                Create a free account
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
