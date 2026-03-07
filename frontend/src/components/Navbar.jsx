import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const ICONS = {
  home: "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z M9 21V12h6v9",
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  map: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  heart:
    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  arrow: "M5 12h14M12 5l7 7-7 7",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.81a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.73 5.73l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6L6 18M6 6l12 12",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  expand: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7",
  check: "M20 6L9 17l-5-5",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  chevron: "M9 18l6-6-6-6",
  fb: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  tw: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  ig: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z",
  yt: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  send: "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z",
  smartphone:
    "M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM12 18h.01",
  newsletter:
    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  appstore: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM8 12l2-2 2 2 4-4",
  playstore: "M5 3l14 9-14 9V3z",
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3",
};

export default function Navbar() {
  const Ic = ({ d, size = 20, color = "currentColor", stroke = 2 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d={d} />
    </svg>
  );

  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Listings", path: "/listings" },
    { label: "Cities", path: "/cities" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "About", path: "/about" },
    { label: "Gallery", path: "/gallery" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/listings?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleListProperty = () => {
    window.location.href = "/list-property";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur bg-white/95 shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="https://res.cloudinary.com/db7qmdfr2/image/upload/v1772467515/rentease-icon-bg-less_o1pcn9.png"
            alt="RentEase Logo"
            className="w-8 h-8 md:w-9 md:h-9 object-contain rounded-xl"
          />
          <span className="serif text-xl md:text-2xl font-bold">
            <span style={{ color: "#02857E" }}>Rent</span>
            <span style={{ color: "#FE6702" }}>Ease</span>
          </span>
        </Link>

        {isHomePage ? (
          <>
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link text-gray-600 hover:text-orange-500 px-3 py-2 rounded-lg text-sm font-600 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </>
        ) : (
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center gap-2 border-2 border-gray-200 rounded-xl px-4 py-2 focus-within:border-orange-400 transition-all bg-white">
                <Ic d={ICONS.search} size={18} color="#9ca3af" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for properties, localities, or projects..."
                  className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none"
                />
                <button
                  type="submit"
                  className="text-sm font-700 px-4 py-1.5 rounded-lg text-white hover:opacity-90 transition-all"
                  style={{ background: "#FE6702" }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={handleListProperty}
            className="cursor-pointer px-4 py-2 rounded-lg text-sm font-700 border-2 transition-all hover:bg-orange-50 whitespace-nowrap"
            style={{ borderColor: "#FE6702", color: "#FE6702" }}
          >
            List Property
          </button>

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="cursor-pointer px-4 py-2 rounded-lg text-sm font-700 border-2 border-gray-200 transition-all hover:border-orange-400 hover:bg-orange-50 flex items-center gap-2"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                </svg>
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="text-gray-400"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-800 text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {user?.email}
                    </p>
                    <span
                      className="inline-block mt-1.5 text-xs font-700 px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          user?.role === "OWNER" ? "#fff4ec" : "#e5f5f4",
                        color: user?.role === "OWNER" ? "#FE6702" : "#02857E",
                      }}
                    >
                      {user?.role}
                    </span>
                  </div>
                  <div className="py-1">
                    {[
                      {
                        icon: "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5zM9 21V12h6v9",
                        label: "Dashboard",
                        href: "/dashboard",
                      },
                      {
                        icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                        label: "Saved Listings",
                        href: "/saved",
                      },
                      {
                        icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                        label: "My Visits",
                        href: "/visits",
                      },
                      {
                        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                        label: "My Rentals",
                        href: "/rentals",
                      },
                      {
                        icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
                        label: "Support",
                        href: "/support",
                      },
                      {
                        icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                        label: "Profile Settings",
                        href: "/profile",
                      },
                    ].map(({ icon, label, href }) => (
                      <Link
                        key={label}
                        to={href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={icon} />
                        </svg>
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer px-4 py-2 rounded-xl text-sm font-700 text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md whitespace-nowrap"
              style={{ background: "#FE6702" }}
            >
              Sign In
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <Ic d={mobileOpen ? ICONS.x : ICONS.menu} size={24} color="#374151" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3 shadow-lg max-h-[80vh] overflow-y-auto">
          {isHomePage ? (
            <>
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-sm font-600 text-gray-700 hover:bg-orange-50"
                >
                  {link.label}
                </Link>
              ))}
            </>
          ) : (
            <div className="py-2">
              <form onSubmit={handleSearch} className="w-full mb-3">
                <div className="flex items-center gap-2 border-2 border-gray-200 rounded-xl px-3 py-2 focus-within:border-orange-400 transition-all bg-white">
                  <Ic d={ICONS.search} size={16} color="#9ca3af" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties..."
                    className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 text-sm font-700 px-4 py-2 rounded-lg text-white hover:opacity-90 transition-all"
                  style={{ background: "#FE6702" }}
                >
                  Search
                </button>
              </form>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-2 border-t border-gray-100 pt-4">
            <button
              onClick={handleListProperty}
              className="cursor-pointer w-full py-2 rounded-lg text-sm font-700 border-2"
              style={{ borderColor: "#FE6702", color: "#FE6702" }}
            >
              List Property
            </button>
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <div className="px-3 py-2 rounded-lg bg-orange-50 flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-800 text-white"
                    style={{
                      background: "linear-gradient(135deg,#FE6702,#02857E)",
                    }}
                  >
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-800 text-gray-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-400">{user?.role}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 px-3 rounded-lg text-sm font-700 text-center"
                  style={{ background: "#FE6702", color: "white" }}
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="cursor-pointer py-2 px-3 rounded-lg text-sm font-700 text-red-500 border-2 border-red-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2 rounded-xl text-sm font-700 text-white text-center"
                style={{ background: "#FE6702" }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
