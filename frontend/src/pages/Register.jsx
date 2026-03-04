import { useState } from "react";
import { Link } from "react-router-dom";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:wght@400;500;600;700;800;900&display=swap');
    * { font-family: 'Nunito', sans-serif; }
    .serif { font-family: 'DM Serif Display', serif !important; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideIn { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
    @keyframes spin { to { transform:rotate(360deg); } }
    @keyframes checkPop { 0% { transform:scale(0); opacity:0; } 70% { transform:scale(1.2); } 100% { transform:scale(1); opacity:1; } }
    @keyframes progress { from { width:0; } }
    .fu  { animation:fadeUp .5s ease both; }
    .fu1 { animation:fadeUp .5s .1s ease both; }
    .fu2 { animation:fadeUp .5s .18s ease both; }
    .fu3 { animation:fadeUp .5s .26s ease both; }
    .fu4 { animation:fadeUp .5s .34s ease both; }
    .sl  { animation:slideIn .4s ease both; }
    .float { animation:float 5s ease-in-out infinite; }
    .spin-anim { animation:spin .75s linear infinite; }
    .check-pop { animation:checkPop .35s cubic-bezier(.175,.885,.32,1.275) both; }
    input:focus { outline:none; }
    input:-webkit-autofill { -webkit-box-shadow:0 0 0 30px white inset !important; }
  `}</style>
);

const REGISTERED = [
  "arjun@gmail.com",
  "priya@rentease.in",
  "rahul@yahoo.com",
  "demo@rentease.in",
];

const getStrength = (p) => {
  if (!p) return { score: 0, label: "", color: "" };
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  const map = [
    { label: "Too short", color: "#ef4444" },
    { label: "Weak", color: "#ef4444" },
    { label: "Fair", color: "#f59e0b" },
    { label: "Good", color: "#3b82f6" },
    { label: "Strong", color: "#10b981" },
  ];
  return { score, ...map[score] };
};

const Ic = ({
  d,
  size = 18,
  color = "currentColor",
  sw = 2,
  fill = "none",
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
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.81a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.73 5.73l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  eyeOff:
    "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
  check: "M20 6L9 17l-5-5",
  arrow: "M5 12h14M12 5l7 7-7 7",
  back: "M19 12H5M12 19l-7-7 7-7",
  x: "M18 6L6 18M6 6l12 12",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  tenant: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  owner:
    "M3 21h18M9 8h1m4 0h1M9 12h1m4 0h1M9 16h1m4 0h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  spark: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

const GoogleLogo = () => (
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
);

export default function RegisterPage() {
  const [step, setStep] = useState("role");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [emailTaken, setEmailTaken] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [showP, setShowP] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const [agree, setAgree] = useState(false);
  const [formErr, setFormErr] = useState("");

  const strength = getStrength(pass);
  const fake = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleRoleSelect = (r) => {
    setRole(r);
    setStep("email");
  };

  const handleCheckEmail = async () => {
    if (!email.trim()) {
      setEmailErr("Please enter your email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErr("Enter a valid email address.");
      return;
    }
    setEmailErr("");
    setLoading(true);
    await fake(1000);
    setLoading(false);
    const taken = REGISTERED.includes(email.toLowerCase());
    if (taken) {
      setEmailTaken(true);
      return;
    }
    setEmailTaken(false);
    setStep("details");
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      setFormErr("Please enter your full name.");
      return;
    }
    if (!pass) {
      setFormErr("Please create a password.");
      return;
    }
    if (strength.score < 2) {
      setFormErr("Password is too weak.");
      return;
    }
    if (pass !== pass2) {
      setFormErr("Passwords do not match.");
      return;
    }
    if (!agree) {
      setFormErr("Please accept the Terms of Service.");
      return;
    }
    setFormErr("");
    setLoading(true);
    await fake(1400);
    setLoading(false);
    setStep("success");
  };

  const handleGoogle = async () => {
    setLoading(true);
    await fake(1200);
    setLoading(false);
    setName("Google User");
    setStep("success");
  };

  const inp = (err) =>
    `w-full pl-10 pr-4 py-3.5 rounded-xl border-2 text-sm text-gray-800 font-600
     placeholder-gray-400 bg-white transition-all duration-200
     ${
       err
         ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
         : "border-gray-200 focus:border-[#FE6702] focus:ring-2 focus:ring-[#FE6702]/10"
     }`;

  /* ── Step indicator ── */
  const steps = ["Role", "Email", "Details", "Done"];
  const stepIdx = { role: 0, email: 1, details: 2, success: 3 };
  const current = stepIdx[step] ?? 2;

  return (
    <div className="min-h-screen flex flex-row-reverse">
      <FontStyle />

      <div
        className="hidden lg:flex flex-col justify-between w-[46%] relative overflow-hidden p-12"
        style={{
          background:
            "linear-gradient(145deg,#0f2d2b 0%,#1a1a2e 55%,#0f1923 100%)",
        }}
      >
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: "#FE6702" }}
        />
        <div
          className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ background: "#02857E" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full blur-2xl opacity-5"
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

        <div className="relative z-10 -mt-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(254,103,2,.15)",
              border: "1px solid rgba(254,103,2,.3)",
            }}
          >
            <Ic d={ICONS.spark} size={12} color="#fb923c" fill="#fb923c" />
            <span className="text-xs font-700" style={{ color: "#fb923c" }}>
              Free Forever for Tenants
            </span>
          </div>

          <h2
            className="serif text-white leading-tight mb-5"
            style={{ fontSize: "clamp(28px,2.8vw,42px)" }}
          >
            Start Your Journey
            <br />
            to a <em style={{ color: "#FE6702" }}>Better Home</em>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-xs">
            Create your free RentEase account and access thousands of verified,
            zero-brokerage rentals across India.
          </p>

          <div className="flex flex-col gap-4">
            {[
              [
                "🏠",
                "12,000+ Verified Listings",
                "Physically inspected by our team",
              ],
              ["💸", "₹0 Brokerage, Always", "No hidden fees, no middlemen"],
              ["⚡", "Move-in Under 48 Hours", "From search to keys in hand"],
              ["🔒", "Secure & Private", "Your data is always protected"],
            ].map(([icon, title, sub]) => (
              <div key={title} className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                  style={{ background: "rgba(255,255,255,.07)" }}
                >
                  {icon}
                </div>
                <div>
                  <div className="text-white text-sm font-700">{title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 float">
          <div
            className="rounded-2xl p-5 border"
            style={{
              background: "rgba(255,255,255,.05)",
              borderColor: "rgba(255,255,255,.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  width={13}
                  height={13}
                  viewBox="0 0 24 24"
                  fill="#f59e0b"
                >
                  <path d={ICONS.star} />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 text-xs leading-relaxed mb-3">
              "Found my perfect 2BHK in Koramangala within 3 days. Zero
              brokerage saved me ₹56,000!"
            </p>
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-800 text-white"
                style={{ background: "#FE6702" }}
              >
                AM
              </div>
              <div>
                <div className="text-white text-xs font-700">Arjun Mehta</div>
                <div className="text-gray-500 text-xs">
                  Software Engineer, Bangalore
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 bg-[#f8fafc] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 15%, rgba(254,103,2,.06) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(2,133,126,.05) 0%, transparent 50%)",
          }}
        />

        <div className="lg:hidden flex items-center gap-2.5 mb-6 relative z-10">
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

        <div className="w-full max-w-110 relative z-10">
          {step !== "role" && step !== "success" && (
            <div className="flex items-center justify-center gap-0 mb-7 fu">
              {steps.slice(1, 3).map((s, i) => {
                const idx = i + 1;
                const done = current > idx;
                const active = current === idx;
                return (
                  <div key={s} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-800 transition-all
                      ${done ? "text-white" : active ? "text-white" : "text-gray-400 bg-gray-200"}`}
                      style={{
                        background: done
                          ? "#02857E"
                          : active
                            ? "#FE6702"
                            : undefined,
                      }}
                    >
                      {done ? (
                        <Ic d={ICONS.check} size={14} color="white" sw={2.5} />
                      ) : (
                        idx
                      )}
                    </div>
                    <span
                      className={`text-xs font-700 ml-1.5 mr-3 ${active ? "text-gray-800" : done ? "text-teal-600" : "text-gray-400"}`}
                    >
                      {s}
                    </span>
                    {i < 1 && (
                      <div
                        className="w-10 h-0.5 mr-3 rounded-full transition-all"
                        style={{
                          background: current > idx ? "#02857E" : "#e5e7eb",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {step === "role" && (
            <div>
              <div className="text-center mb-7 fu">
                <h1 className="serif text-3xl text-gray-900 mb-2">
                  Create Your Account
                </h1>
                <p className="text-gray-500 text-sm">
                  Join RentEase free — tell us who you are
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 fu1">
                {[
                  {
                    id: "tenant",
                    icon: ICONS.tenant,
                    emoji: "🏠",
                    title: "I'm a Tenant",
                    sub: "Looking for a home to rent",
                  },
                  {
                    id: "owner",
                    icon: ICONS.owner,
                    emoji: "🏢",
                    title: "I'm an Owner",
                    sub: "Want to list my property",
                  },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id)}
                    className={`cursor-pointer relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-lg text-center
                      ${role === r.id ? "border-[#FE6702] bg-[#fff4ec]" : "border-gray-200 bg-white hover:border-orange-300"}`}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                      style={{
                        background:
                          r.id === "tenant"
                            ? "linear-gradient(135deg,#fff4ec,#ffe8d0)"
                            : "linear-gradient(135deg,#e5f5f4,#ccedeb)",
                      }}
                    >
                      {r.emoji}
                    </div>
                    <div>
                      <div className="font-800 text-gray-900 text-sm">
                        {r.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {r.sub}
                      </div>
                    </div>
                    {role === r.id && (
                      <div
                        className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center check-pop"
                        style={{ background: "#FE6702" }}
                      >
                        <Ic d={ICONS.check} size={11} color="white" sw={2.5} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "email" && (
            <div className="sl">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <button
                  onClick={() => {
                    setStep("role");
                    setEmailErr("");
                    setEmailTaken(false);
                  }}
                  className="flex items-center gap-1.5 text-xs font-700 text-gray-400 hover:text-gray-700 transition-colors mb-6"
                >
                  <Ic d={ICONS.back} size={14} /> Back to role
                </button>

                <div className="flex items-center gap-2.5 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background:
                        role === "tenant"
                          ? "linear-gradient(135deg,#fff4ec,#ffe8d0)"
                          : "linear-gradient(135deg,#e5f5f4,#ccedeb)",
                    }}
                  >
                    {role === "tenant" ? "🏠" : "🏢"}
                  </div>
                  <div>
                    <div className="font-800 text-sm text-gray-900">
                      {role === "tenant" ? "Tenant Account" : "Owner Account"}
                    </div>
                    <div className="text-xs text-gray-400">
                      Step 1 of 2 — Enter your email
                    </div>
                  </div>
                </div>

                <h2 className="serif text-2xl text-gray-900 mb-1">
                  What's your email?
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  We'll check if you already have an account.
                </p>

                <button
                  onClick={handleGoogle}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-700 text-gray-700 mb-5 shadow-sm"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full spin-anim" />
                  ) : (
                    <GoogleLogo />
                  )}
                  Sign up with Google
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-600">
                    or use email
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {emailTaken && (
                  <div
                    className="flex items-start gap-3 p-3.5 rounded-xl mb-4 border"
                    style={{
                      background: "#fef2f2",
                      borderColor: "rgba(239,68,68,.25)",
                    }}
                  >
                    <span className="text-base">⚠️</span>
                    <div>
                      <p className="text-xs font-800 text-red-600">
                        Email already registered
                      </p>
                      <p className="text-xs text-red-500 mt-0.5">
                        <span className="font-700">{email}</span> is already
                        linked to an account.{" "}
                        <span className="font-800 underline cursor-pointer">
                          Sign in instead →
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Ic d={ICONS.mail} size={16} color="#9ca3af" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailErr("");
                        setEmailTaken(false);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleCheckEmail()}
                      placeholder="you@example.com"
                      className={inp(!!emailErr || emailTaken) + " pl-10"}
                    />
                    {email &&
                      !emailErr &&
                      !emailTaken &&
                      /\S+@\S+\.\S+/.test(email) && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 check-pop">
                          <Ic d={ICONS.check} size={16} color="#10b981" />
                        </div>
                      )}
                  </div>
                  {emailErr && (
                    <p className="text-red-500 text-xs font-600 mt-1.5 flex items-center gap-1">
                      <Ic d={ICONS.x} size={12} color="#ef4444" /> {emailErr}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleCheckEmail}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-800 text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                  style={{
                    background: loading
                      ? "#d1d5db"
                      : "linear-gradient(135deg,#FE6702,#e55500)",
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full spin-anim" />
                      Checking email...
                    </>
                  ) : (
                    <>
                      Continue <Ic d={ICONS.arrow} size={16} color="white" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="sl">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <button
                  onClick={() => {
                    setStep("email");
                    setFormErr("");
                  }}
                  className="flex items-center gap-1.5 text-xs font-700 text-gray-400 hover:text-gray-700 transition-colors mb-5"
                >
                  <Ic d={ICONS.back} size={14} /> Back
                </button>

                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl mb-5 w-fit"
                  style={{
                    background: "#e5f5f4",
                    border: "1px solid rgba(2,133,126,.2)",
                  }}
                >
                  <Ic d={ICONS.check} size={13} color="#02857E" sw={2.5} />
                  <span
                    className="text-xs font-700"
                    style={{ color: "#02857E" }}
                  >
                    {email}
                  </span>
                  <span className="text-xs text-gray-400 font-600">
                    · Available ✓
                  </span>
                </div>

                <h2 className="serif text-2xl text-gray-900 mb-1">
                  Complete Your Profile
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Just a few more details to get you started.
                </p>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Ic d={ICONS.user} size={16} color="#9ca3af" />
                      </div>
                      <input
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setFormErr("");
                        }}
                        placeholder="e.g. Arjun Mehta"
                        className={inp(false) + " pl-10"}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                      Phone Number{" "}
                      <span className="text-gray-400 normal-case font-600">
                        (optional)
                      </span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Ic d={ICONS.phone} size={16} color="#9ca3af" />
                      </div>
                      <div className="absolute left-10 top-1/2 -translate-y-1/2 text-xs font-700 text-gray-500 pointer-events-none">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className={inp(false) + " pl-18"}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                      Create Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Ic d={ICONS.lock} size={16} color="#9ca3af" />
                      </div>
                      <input
                        type={showP ? "text" : "password"}
                        value={pass}
                        onChange={(e) => {
                          setPass(e.target.value);
                          setFormErr("");
                        }}
                        placeholder="Min 8 chars, include A-Z, 0-9"
                        className={inp(false) + " pl-10 pr-11"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowP((s) => !s)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Ic
                          d={showP ? ICONS.eyeOff : ICONS.eye}
                          size={16}
                          color="currentColor"
                        />
                      </button>
                    </div>

                    {pass && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="flex-1 h-1.5 rounded-full transition-all duration-300"
                              style={{
                                background:
                                  i <= strength.score
                                    ? strength.color
                                    : "#e5e7eb",
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3">
                            {[
                              ["8+ chars", pass.length >= 8],
                              ["A-Z", /[A-Z]/.test(pass)],
                              ["0-9", /[0-9]/.test(pass)],
                              ["Symbol", /[^A-Za-z0-9]/.test(pass)],
                            ].map(([label, ok]) => (
                              <span
                                key={label}
                                className={`text-xs font-600 flex items-center gap-0.5 ${ok ? "text-green-600" : "text-gray-400"}`}
                              >
                                {ok ? "✓" : "·"} {label}
                              </span>
                            ))}
                          </div>
                          <span
                            className="text-xs font-700"
                            style={{ color: strength.color }}
                          >
                            {strength.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-800 text-gray-600 mb-1.5 uppercase tracking-wide">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Ic d={ICONS.shield} size={16} color="#9ca3af" />
                      </div>
                      <input
                        type={showP2 ? "text" : "password"}
                        value={pass2}
                        onChange={(e) => {
                          setPass2(e.target.value);
                          setFormErr("");
                        }}
                        placeholder="Re-enter your password"
                        className={
                          inp(!!(pass2 && pass !== pass2)) + " pl-10 pr-11"
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowP2((s) => !s)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Ic
                          d={showP2 ? ICONS.eyeOff : ICONS.eye}
                          size={16}
                          color="currentColor"
                        />
                      </button>
                      {pass2 && pass === pass2 && (
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 check-pop">
                          <Ic d={ICONS.check} size={15} color="#10b981" />
                        </div>
                      )}
                    </div>
                    {pass2 && pass !== pass2 && (
                      <p className="text-red-500 text-xs font-600 mt-1.5 flex items-center gap-1">
                        <Ic d={ICONS.x} size={12} color="#ef4444" /> Passwords
                        do not match
                      </p>
                    )}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <div
                      onClick={() => setAgree((a) => !a)}
                      className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all
                        ${agree ? "border-[#02857E]" : "border-gray-300 hover:border-gray-400"}`}
                      style={{ background: agree ? "#02857E" : "white" }}
                    >
                      {agree && (
                        <Ic d={ICONS.check} size={11} color="white" sw={2.5} />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 leading-relaxed">
                      I agree to RentEase's{" "}
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
                    </span>
                  </label>

                  {formErr && (
                    <div
                      className="flex items-center gap-2 px-3.5 py-3 rounded-xl border text-xs font-600 text-red-600"
                      style={{
                        background: "#fef2f2",
                        borderColor: "rgba(239,68,68,.25)",
                      }}
                    >
                      <Ic d={ICONS.x} size={14} color="#ef4444" /> {formErr}
                    </div>
                  )}

                  <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-white font-800 text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
                    style={{
                      background: loading
                        ? "#d1d5db"
                        : "linear-gradient(135deg,#02857E,#016b65)",
                    }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full spin-anim" />
                        Creating account...
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
                    <span className="text-xs text-gray-400 font-600">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-700 text-gray-700 shadow-sm"
                  >
                    <GoogleLogo />
                    Sign up with Google instead
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="fu text-center">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
                {/* Animated check — outer ring behind, icon on top */}
                <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  {/* Pulse ring — behind the main circle */}
                  <div
                    className="absolute w-24 h-24 rounded-full opacity-20 check-pop"
                    style={{
                      background: "linear-gradient(135deg,#FE6702,#02857E)",
                      animationDelay: ".15s",
                      transform: "scale(1.22)",
                    }}
                  />

                  <div
                    className="absolute w-24 h-24 rounded-full opacity-10 check-pop"
                    style={{
                      background: "#FE6702",
                      animationDelay: ".25s",
                      transform: "scale(1.5)",
                    }}
                  />

                  <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl check-pop z-10"
                    style={{
                      background: "linear-gradient(135deg,#FE6702,#02857E)",
                    }}
                  >
                    <svg
                      width={36}
                      height={36}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth={2.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 text-xs font-700"
                  style={{ background: "#e5f5f4", color: "#02857E" }}
                >
                  <Ic d={ICONS.check} size={12} color="#02857E" sw={2.5} />{" "}
                  Account Created Successfully
                </div>

                <h2 className="serif text-3xl text-gray-900 mb-2">
                  Welcome to RentEase!
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  Your account is ready,{" "}
                  <span className="font-800 text-gray-800">
                    {name || "there"}
                  </span>
                  !
                </p>
                <p className="text-gray-400 text-xs mb-7">
                  We sent a confirmation link to{" "}
                  <span className="font-700 text-gray-600">
                    {email || "your email"}
                  </span>
                </p>

                <div className="text-left border border-gray-100 rounded-2xl p-4 mb-6 bg-gray-50">
                  <p className="text-xs font-800 text-gray-500 uppercase tracking-wide mb-3">
                    What's next?
                  </p>
                  {[
                    ["🔍", "Browse verified listings in your city"],
                    ["❤️", "Shortlist your favourite properties"],
                    ["📅", "Schedule visits from your dashboard"],
                  ].map(([icon, text]) => (
                    <div
                      key={text}
                      className="flex items-center gap-2.5 py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-base">{icon}</span>
                      <span className="text-xs text-gray-600 font-600">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full py-3.5 rounded-xl text-white font-800 text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg mb-3"
                  style={{
                    background: "linear-gradient(135deg,#FE6702,#e55500)",
                  }}
                >
                  Go to My Dashboard{" "}
                  <Ic d={ICONS.arrow} size={16} color="white" />
                </button>

                <button
                  onClick={() => {
                    setStep("role");
                    setEmail("");
                    setName("");
                    setPass("");
                    setPass2("");
                    setAgree(false);
                    setRole("");
                  }}
                  className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-700 text-sm hover:bg-gray-50 transition-all"
                >
                  Register another account
                </button>
              </div>
            </div>
          )}

          {(step === "role" || step === "email") && (
            <p className="text-center text-sm text-gray-500 mt-5 font-600">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-800 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ color: "#FE6702" }}
              >
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
