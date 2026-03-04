import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:wght@400;500;600;700;800;900&display=swap');
    *{font-family:'Nunito',sans-serif}
    h1,h2,.serif{font-family:'DM Serif Display',serif !important}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes pulse-ring{0%{transform:scale(.9);opacity:.7}70%{transform:scale(1.2);opacity:0}100%{opacity:0}}
    @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
    .fu{animation:fadeUp .6s ease both}
    .fu1{animation:fadeUp .6s .12s ease both}
    .fu2{animation:fadeUp .6s .24s ease both}
    .fu3{animation:fadeUp .6s .36s ease both}
    .fu4{animation:fadeUp .6s .48s ease both}
    .float{animation:float 5s ease-in-out infinite}
    .marquee-track{animation:marquee 28s linear infinite}
    .pulse-ring::after{content:'';position:absolute;inset:0;border-radius:9999px;background:#FE6702;animation:pulse-ring 2s ease-out infinite}
    .card-hover{transition:transform .25s,box-shadow .25s}
    .card-hover:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.14)}
    .img-zoom img{transition:transform .5s ease}
    .img-zoom:hover img{transform:scale(1.06)}
    .nav-blur{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
    input:focus,select:focus,textarea:focus{outline:none;border-color:#FE6702;box-shadow:0 0 0 3px rgba(254,103,2,.15)}
    .shimmer{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:400px 100%;animation:shimmer 1.4s infinite}
    html{scroll-behavior:smooth}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#ccc;border-radius:3px}
    .star-fill{color:#f59e0b}
  `}</style>
);

const LISTINGS = [
  {
    id: 1,
    title: "Modern 2BHK in Koramangala",
    loc: "Koramangala, Bangalore",
    price: 28000,
    type: "2 BHK",
    area: 1050,
    furnished: "Semi-Furnished",
    available: "Immediate",
    deposit: 56000,
    rating: 4.7,
    reviews: 23,
    badge: "Hot Deal",
    badgeColor: "bg-orange-500",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80",
    amenities: ["WiFi", "AC", "Gym", "Parking"],
  },
  {
    id: 2,
    title: "Spacious 3BHK with Terrace",
    loc: "HSR Layout, Bangalore",
    price: 42000,
    type: "3 BHK",
    area: 1480,
    furnished: "Fully Furnished",
    available: "15 Apr",
    deposit: 84000,
    rating: 4.9,
    reviews: 41,
    badge: "Premium",
    badgeColor: "bg-teal-600",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80",
    amenities: ["Pool", "AC", "Parking", "Security"],
  },
  {
    id: 3,
    title: "Cozy 1BHK Studio",
    loc: "Indiranagar, Bangalore",
    price: 16500,
    type: "1 BHK",
    area: 620,
    furnished: "Fully Furnished",
    available: "Immediate",
    deposit: 33000,
    rating: 4.5,
    reviews: 17,
    badge: "Budget Pick",
    badgeColor: "bg-green-600",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80",
    amenities: ["WiFi", "AC", "Security", "Backup"],
  },
  {
    id: 4,
    title: "Luxury 4BHK Villa",
    loc: "Whitefield, Bangalore",
    price: 75000,
    type: "4 BHK",
    area: 2800,
    furnished: "Fully Furnished",
    available: "1 May",
    deposit: 225000,
    rating: 5.0,
    reviews: 8,
    badge: "Luxury",
    badgeColor: "bg-purple-600",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80",
    amenities: ["Private Pool", "Garden", "Parking", "CCTV"],
  },
  {
    id: 5,
    title: "2BHK Near Embassy Tech Park",
    loc: "Marathahalli, Bangalore",
    price: 22000,
    type: "2 BHK",
    area: 950,
    furnished: "Un-Furnished",
    available: "Immediate",
    deposit: 44000,
    rating: 4.2,
    reviews: 12,
    badge: "New",
    badgeColor: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=700&q=80",
    amenities: ["Parking", "Security", "Backup"],
  },
  {
    id: 6,
    title: "Premium 3BHK Lake View",
    loc: "Bellandur, Bangalore",
    price: 38000,
    type: "3 BHK",
    area: 1350,
    furnished: "Semi-Furnished",
    available: "20 Apr",
    deposit: 76000,
    rating: 4.6,
    reviews: 5,
    badge: "Featured",
    badgeColor: "bg-orange-500",
    img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=700&q=80",
    amenities: ["WiFi", "AC", "Gym", "Club House"],
  },
];

const GALLERY = [
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    label: "Living Spaces",
  },
  {
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    label: "Modern Kitchens",
  },
  {
    img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
    label: "Cozy Bedrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    label: "Luxury Bathrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80",
    label: "Outdoor Areas",
  },
  {
    img: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=80",
    label: "Dining Rooms",
  },
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Software Engineer, Infosys",
    city: "Koramangala",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Found my dream 2BHK within 3 days of signing up. The visit scheduling was seamless and the move-in checklist kept everything organised. Highly recommend RentEase!",
  },
  {
    name: "Priya Krishnan",
    role: "Product Manager, Flipkart",
    city: "HSR Layout",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "As a working professional relocating from Delhi, RentEase made the whole process stress-free. The comparison feature helped me make the right choice instantly.",
  },
  {
    name: "Rahul Sharma",
    role: "Data Analyst, Amazon",
    city: "Marathahalli",
    rating: 4,
    img: "https://randomuser.me/api/portraits/men/55.jpg",
    text: "Zero brokerage and verified listings — that's what sold me. The support team resolved my issues within hours. Will definitely use again!",
  },
  {
    name: "Sneha Iyer",
    role: "UX Designer, Swiggy",
    city: "Indiranagar",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/67.jpg",
    text: "The property gallery and detailed amenity listing saved me so many visits. I knew exactly what I was getting before stepping in. 10/10 experience!",
  },
];

const PARTNERS = [
  "HDFC Bank",
  "ICICI Bank",
  "NoBroker",
  "MagicBricks",
  "Sulekha",
  "Bajaj Finance",
  "Housing.com",
  "CommonFloor",
];

const CITIES = [
  {
    name: "Bangalore",
    props: 3200,
    img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80",
  },
  {
    name: "Mumbai",
    props: 5100,
    img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=80",
  },
  {
    name: "Delhi NCR",
    props: 4800,
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80",
  },
  {
    name: "Hyderabad",
    props: 2700,
    img: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=400&q=80",
  },
  {
    name: "Chennai",
    props: 1900,
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80",
  },
  {
    name: "Pune",
    props: 2200,
    img: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=400&q=80",
  },
];

const HOW_STEPS = [
  {
    icon: "🔍",
    title: "Search & Filter",
    desc: "Use smart filters — location, budget, BHK, furnishing — to narrow down your perfect home from thousands of verified listings.",
  },
  {
    icon: "🏠",
    title: "Visit & Shortlist",
    desc: "Schedule property visits online, track status in real-time, and shortlist favorites. Compare up to 3 properties side-by-side.",
  },
  {
    icon: "📋",
    title: "Move-In Ready",
    desc: "Complete your move-in checklist, upload documents, sign the agreement digitally — all from your dashboard. Zero brokerage, always.",
  },
];

const STATS = [
  { num: "50,000+", label: "Happy Tenants", icon: "😊" },
  { num: "12,000+", label: "Verified Listings", icon: "🏠" },
  { num: "₹0", label: "Brokerage Fee", icon: "💸" },
  { num: "48 hrs", label: "Avg. Move-in Time", icon: "⚡" },
];

const BLOG = [
  {
    title: "Top 10 Localities in Bangalore for Renters in 2026",
    cat: "Guides",
    date: "Feb 28, 2026",
    img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80",
    read: "5 min",
  },
  {
    title: "Rental Agreement Checklist: What to Look For Before Signing",
    cat: "Legal",
    date: "Feb 20, 2026",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    read: "7 min",
  },
  {
    title: "How to Negotiate Rent Like a Pro — Insider Tips",
    cat: "Tips",
    date: "Feb 12, 2026",
    img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80",
    read: "4 min",
  },
];

const FAQS = [
  {
    q: "Is RentEase free for tenants?",
    a: "Yes! RentEase is 100% free for tenants. No brokerage, no hidden charges. Landlords pay a small listing fee to reach verified tenants.",
  },
  {
    q: "How are listings verified?",
    a: "Every property is verified by our on-ground team with physical visits, document checks, and owner identity verification before going live.",
  },
  {
    q: "Can I schedule multiple property visits?",
    a: "Absolutely. You can request visits for any number of properties, track their status, and manage everything from your dashboard.",
  },
  {
    q: "What is the move-in checklist?",
    a: "It's a step-by-step guide — document uploads, agreement signing, deposit confirmation, inventory check — ensuring a smooth, dispute-free move-in.",
  },
  {
    q: "How do I raise a support ticket?",
    a: "From your tenant dashboard, go to Support → New Ticket. Our team responds within 2–4 hours on weekdays and within 8 hours on weekends.",
  },
];

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
  bed: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8",
  expand: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7",
  check: "M20 6L9 17l-5-5",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  building: "M6 22V2h12v20M2 22h20M12 7h.01M12 12h.01M12 17h.01",
  chevron: "M9 18l6-6-6-6",
  fb: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  tw: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  ig: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z",
  yt: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
};

const Stars = ({ n }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill={i <= n ? "#f59e0b" : "none"}
        stroke="#f59e0b"
        strokeWidth={2}
      >
        <path d={ICONS.star} />
      </svg>
    ))}
  </div>
);

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Rent");
  const [searchLoc, setSearchLoc] = useState("");
  const [bhk, setBhk] = useState("Any BHK");
  const [budget, setBudget] = useState("Any Budget");
  const [savedIds, setSavedIds] = useState([1, 2]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });
  const [formSent, setFormSent] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(null);
  const [testIdx, setTestIdx] = useState(0);
  const [cityFilter, setCityFilter] = useState("Bangalore");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleSave = (id) =>
    setSavedIds((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const sendContact = () => {
    if (!contactForm.name || !contactForm.email) return;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3500);
    setContactForm({ name: "", email: "", phone: "", msg: "" });
  };

  const filteredListings = LISTINGS.filter((l) => {
    const locMatch =
      searchLoc === "" || l.loc.toLowerCase().includes(searchLoc.toLowerCase());
    const bhkMatch = bhk === "Any BHK" || l.type === bhk;
    const budgetMatch =
      budget === "Any Budget" ||
      (budget === "Under ₹20K" && l.price < 20000) ||
      (budget === "₹20K–₹40K" && l.price >= 20000 && l.price <= 40000) ||
      (budget === "₹40K–₹70K" && l.price > 40000 && l.price <= 70000) ||
      (budget === "Above ₹70K" && l.price > 70000);
    return locMatch && bhkMatch && budgetMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <FontStyle />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${scrolled ? "bg-white/95 shadow-md" : "bg-white/80"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5">
            <img
              src="https://res.cloudinary.com/db7qmdfr2/image/upload/v1772467515/rentease-icon-bg-less_o1pcn9.png"
              alt="RentEase Logo"
              className="w-9 h-9 object-contain rounded-xl"
            />
            <span className="serif text-2xl font-bold">
              <span style={{ color: "#02857E" }}>Rent</span>
              <span style={{ color: "#FE6702" }}>Ease</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {[
              "#hero",
              "#listings",
              "#cities",
              "#how",
              "#about",
              "#gallery",
              "#blog",
              "#contact",
            ].map((href, i) => {
              const labels = [
                "Home",
                "Listings",
                "Cities",
                "How It Works",
                "About",
                "Gallery",
                "Blog",
                "Contact",
              ];
              return (
                <a
                  key={href}
                  href={href}
                  className="nav-link text-gray-600 hover:text-orange-500 px-3 py-2 rounded-lg text-sm font-600 transition-colors"
                >
                  {labels[i]}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              className=" cursor-pointer px-4 py-2 rounded-lg text-sm font-700 border-2 transition-all hover:bg-orange-50"
              style={{ borderColor: "#FE6702", color: "#FE6702" }}
            >
              List Property
            </button>
            <Link
              to={"/login"}
              className="cursor-pointer  px-4 py-2 rounded-xl text-sm font-700 text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md"
              style={{ background: "#FE6702" }}
            >
              Sign In
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Ic
              d={mobileOpen ? ICONS.x : ICONS.menu}
              size={24}
              color="#374151"
            />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1 shadow-lg">
            {[
              "Home",
              "Listings",
              "Cities",
              "How It Works",
              "About",
              "Gallery",
              "Blog",
              "Contact",
            ].map((l, i) => (
              <a
                key={l}
                href={
                  [
                    "#hero",
                    "#listings",
                    "#cities",
                    "#how",
                    "#about",
                    "#gallery",
                    "#blog",
                    "#contact",
                  ][i]
                }
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-600 text-gray-700 hover:bg-orange-50"
                style={{ color: "#374151" }}
              >
                {l}
              </a>
            ))}
            <div className="flex gap-2 mt-2">
              <button
                className="cursor-pointer  flex-1 py-2 rounded-lg text-sm font-700 border-2"
                style={{ borderColor: "#FE6702", color: "#FE6702" }}
              >
                List Property
              </button>
              <button
                className="cursor-pointer  flex-1 py-2 rounded-xl text-sm font-700 text-white"
                style={{ background: "#FE6702" }}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1600&q=80"
            className="w-full h-full object-cover"
            alt="hero"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg,rgba(26,26,46,.88) 0%,rgba(2,45,43,.75) 60%,rgba(26,26,46,.65) 100%)",
            }}
          />
        </div>

        <div
          className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "#FE6702" }}
        />
        <div
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: "#02857E" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 w-full">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 fu"
              style={{
                background: "rgba(254,103,2,.18)",
                border: "1px solid rgba(254,103,2,.35)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#FE6702" }}
              />
              <span className="text-sm font-700" style={{ color: "#fb923c" }}>
                India's #1 Zero-Brokerage Rental Platform
              </span>
            </div>

            <h1
              className="text-white leading-tight mb-5 fu1"
              style={{ fontSize: "clamp(38px,5.5vw,70px)" }}
            >
              Find Your Perfect
              <br />
              <span style={{ color: "#FE6702" }}>Home</span>
              <em style={{ color: "#5eead4", fontStyle: "italic" }}>
                {" "}
                Without
              </em>
              <br />
              the Brokerage
            </h1>

            <p
              className="text-gray-300 mb-10 leading-relaxed fu2"
              style={{ fontSize: "clamp(15px,1.8vw,18px)", maxWidth: 520 }}
            >
              Browse 12,000+ verified rentals, schedule visits, and move in —
              all from one platform. No middlemen. No hidden charges. Ever.
            </p>

            <div
              className="bg-white rounded-2xl shadow-2xl overflow-hidden fu3"
              style={{ maxWidth: 700 }}
            >
              <div className="flex border-b border-gray-100">
                {["Rent", "Buy", "PG / Hostel"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-6 py-3 text-sm font-700 transition-all border-b-2 ${activeTab === t ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="p-3 flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                  <Ic d={ICONS.map} size={16} color="#9ca3af" />
                  <input
                    value={searchLoc}
                    onChange={(e) => setSearchLoc(e.target.value)}
                    placeholder="Enter city, locality or project..."
                    className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none"
                  />
                </div>
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 bg-transparent"
                >
                  {["Any BHK", "1 BHK", "2 BHK", "3 BHK", "4 BHK"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 bg-transparent"
                >
                  {[
                    "Any Budget",
                    "Under ₹20K",
                    "₹20K–₹40K",
                    "₹40K–₹70K",
                    "Above ₹70K",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <button
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white font-700 text-sm hover:opacity-90 transition-all"
                  style={{ background: "#FE6702" }}
                >
                  <Ic d={ICONS.search} size={16} color="white" /> Search
                </button>
              </div>

              <div className="px-4 pb-3 flex flex-wrap gap-2">
                <span className="text-xs text-gray-400 font-600 pt-0.5">
                  Popular:
                </span>
                {[
                  "Koramangala",
                  "HSR Layout",
                  "Whitefield",
                  "Indiranagar",
                  "Marathahalli",
                ].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSearchLoc(loc)}
                    className="text-xs px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-all font-600"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 fu4">
              {[
                ["12K+", "Properties"],
                ["₹0", "Brokerage"],
                ["50K+", "Happy Tenants"],
              ].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div
                    className="text-2xl font-900"
                    style={{ color: "#FE6702" }}
                  >
                    {n}
                  </div>
                  <div className="text-xs text-gray-400 font-600 mt-0.5">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a
          href="#listings"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors"
        >
          <span className="text-xs font-600">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center pt-1.5">
            <div
              className="w-1 h-1.5 bg-white/60 rounded-full"
              style={{ animation: "float 1.5s ease-in-out infinite" }}
            />
          </div>
        </a>
      </section>

      <div className="bg-gray-50 border-y border-gray-100 py-4 overflow-hidden">
        <div className="flex items-center gap-3 mb-1 px-6">
          <span className="text-xs font-700 text-gray-400 uppercase tracking-widest whitespace-nowrap">
            Trusted Partners
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-12 marquee-track whitespace-nowrap">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="text-sm font-700 text-gray-400 hover:text-gray-600 transition-colors cursor-default"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section
        className="py-14 px-4"
        style={{ background: "linear-gradient(135deg,#1a1a2e,#0f2d2b)" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl mb-1">{s.icon}</div>
              <div
                className="serif text-4xl font-bold mb-1"
                style={{ color: "#FE6702" }}
              >
                {s.num}
              </div>
              <div className="text-sm text-gray-400 font-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="listings" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span
                className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                style={{ background: "#fff4ec", color: "#FE6702" }}
              >
                Featured Rentals
              </span>
              <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight">
                Handpicked Homes
                <br />
                <em style={{ color: "#02857E" }}>Just for You</em>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-600">
                {filteredListings.length} properties found
              </span>
              <a
                href="#listings"
                className="flex items-center gap-2 text-sm font-700 px-5 py-2.5 rounded-xl border-2 transition-all hover:bg-orange-50"
                style={{ borderColor: "#FE6702", color: "#FE6702" }}
              >
                View All <Ic d={ICONS.arrow} size={15} color="#FE6702" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Any BHK", "1 BHK", "2 BHK", "3 BHK", "4 BHK"].map((b) => (
              <button
                key={b}
                onClick={() => setBhk(b)}
                className={`px-4 py-1.5 rounded-full text-sm font-700 border-2 transition-all ${bhk === b ? "text-white border-transparent" : "text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500"}`}
                style={
                  bhk === b
                    ? { background: "#FE6702", borderColor: "#FE6702" }
                    : {}
                }
              >
                {b}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {(filteredListings.length ? filteredListings : LISTINGS).map(
              (l) => (
                <div
                  key={l.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,.07)" }}
                >
                  <div className="relative overflow-hidden img-zoom h-52">
                    <img
                      src={l.img}
                      className="w-full h-full object-cover"
                      alt={l.title}
                    />

                    <span
                      className={`absolute top-3 left-3 text-white text-xs font-800 px-2.5 py-1 rounded-full ${l.badgeColor}`}
                    >
                      {l.badge}
                    </span>

                    <button
                      onClick={() => toggleSave(l.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow transition-all hover:scale-110"
                    >
                      <Ic
                        d={ICONS.heart}
                        size={16}
                        color={savedIds.includes(l.id) ? "#FE6702" : "#9ca3af"}
                        stroke={savedIds.includes(l.id) ? 0 : 2}
                      />
                      {savedIds.includes(l.id) && (
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="#FE6702"
                          className="absolute"
                        >
                          <path d={ICONS.heart} />
                        </svg>
                      )}
                    </button>

                    <div
                      className={`absolute bottom-3 left-3 text-xs font-700 px-2.5 py-1 rounded-full ${l.available === "Immediate" ? "bg-green-500 text-white" : "bg-white text-gray-700"}`}
                    >
                      {l.available === "Immediate"
                        ? "✓ Available Now"
                        : `Available ${l.available}`}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-800 text-gray-900 text-base leading-snug pr-2">
                        {l.title}
                      </h3>
                      <div className="text-right shrink-0">
                        <div
                          className="font-900 text-lg"
                          style={{ color: "#FE6702" }}
                        >
                          ₹{l.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">/month</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                      <Ic d={ICONS.map} size={13} color="#9ca3af" />
                      <span>{l.loc}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {[l.type, l.area + " sqft", l.furnished].map((c) => (
                        <span
                          key={c}
                          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-600"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 flex-wrap mb-4">
                      {l.amenities.map((a) => (
                        <span
                          key={a}
                          className="text-xs font-600 px-2 py-0.5 rounded-full"
                          style={{ background: "#e5f5f4", color: "#02857E" }}
                        >
                          ✓ {a}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <Stars n={Math.round(l.rating)} />
                        <span className="text-xs text-gray-500 font-600">
                          {l.rating} ({l.reviews})
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-xs font-700 px-3 py-1.5 rounded-lg border-2 transition-all hover:bg-orange-50"
                          style={{ borderColor: "#FE6702", color: "#FE6702" }}
                        >
                          Details
                        </button>
                        <button
                          className="text-xs font-700 px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                          style={{ background: "#02857E" }}
                        >
                          Visit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="text-center mt-12">
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 font-700 text-base transition-all hover:text-white hover:bg-orange-500"
              style={{ borderColor: "#FE6702", color: "#FE6702" }}
            >
              Load More Properties{" "}
              <Ic d={ICONS.arrow} size={16} color="inherit" />
            </button>
          </div>
        </div>
      </section>

      <section
        id="cities"
        className="py-20 px-4"
        style={{ background: "#f8fafc" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "#e5f5f4", color: "#02857E" }}
            >
              Explore by City
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900">
              Top Rental Cities
              <br />
              <em style={{ color: "#FE6702" }}>Across India</em>
            </h2>
            <p className="text-gray-500 mt-3 text-base max-w-lg mx-auto">
              Thousands of verified, no-brokerage rentals in India's
              fastest-growing cities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CITIES.map((c) => (
              <div
                key={c.name}
                onClick={() => {
                  setCityFilter(c.name);
                  setSearchLoc(c.name);
                }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer card-hover img-zoom group ${cityFilter === c.name ? "ring-3 ring-orange-500 ring-offset-2" : ""}`}
                style={{ height: 160 }}
              >
                <img
                  src={c.img}
                  className="w-full h-full object-cover"
                  alt={c.name}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top,rgba(0,0,0,.7),transparent)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white font-800 text-sm">{c.name}</div>
                  <div
                    className="text-xs font-600"
                    style={{ color: "#fb923c" }}
                  >
                    {c.props.toLocaleString()}+ homes
                  </div>
                </div>
                {cityFilter === c.name && (
                  <div
                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ background: "#FE6702" }}
                  >
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "#fff4ec", color: "#FE6702" }}
            >
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900">
              Move In 3 Easy Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div
              className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5"
              style={{ background: "linear-gradient(90deg,#FE6702,#02857E)" }}
            />

            {HOW_STEPS.map((s, i) => (
              <div
                key={s.title}
                className="relative text-center p-8 rounded-2xl border-2 border-gray-100 hover:border-orange-200 transition-all card-hover"
                style={{ background: "#fafafa" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 shadow-md"
                  style={{
                    background: "linear-gradient(135deg,#fff4ec,#ffe8d0)",
                  }}
                >
                  {s.icon}
                </div>
                <div
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-800 shadow"
                  style={{ background: "#FE6702" }}
                >
                  {i + 1}
                </div>
                <h3 className="serif text-xl font-bold text-gray-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-14 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg,#1a1a2e,#0f2d2b)" }}
          >
            <div>
              <h3 className="serif text-2xl md:text-3xl text-white mb-2">
                Ready to find your home?
              </h3>
              <p className="text-gray-400 text-sm">
                Join 50,000+ tenants who found their perfect home on RentEase.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                className="px-6 py-3 rounded-xl text-sm font-700 text-white hover:opacity-90 transition-all shadow-lg"
                style={{ background: "#FE6702" }}
              >
                Start Searching
              </button>
              <button className="px-6 py-3 rounded-xl text-sm font-700 border-2 border-white/30 text-white hover:bg-white/10 transition-all">
                List Your Property
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-20 px-4"
        style={{ background: "#f8fafc" }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="relative h-96 md:h-125">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80"
              className="absolute top-0 left-0 w-3/4 h-3/4 object-cover rounded-2xl shadow-xl"
              alt="about1"
            />
            <img
              src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&q=80"
              className="absolute bottom-0 right-0 w-2/3 h-2/3 object-cover rounded-2xl shadow-xl border-4 border-white"
              alt="about2"
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-4 shadow-2xl text-center float z-10 w-32">
              <div className="text-3xl font-900" style={{ color: "#FE6702" }}>
                98%
              </div>
              <div className="text-xs text-gray-500 font-700 mt-1">
                Tenant Satisfaction
              </div>
            </div>
          </div>

          <div>
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ background: "#e5f5f4", color: "#02857E" }}
            >
              About RentEase
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-5 leading-tight">
              Renting Made
              <br />
              <em style={{ color: "#FE6702" }}>Simple & Honest</em>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 text-base">
              RentEase was founded in 2022 with one mission: eliminate brokerage
              from Indian rentals forever. We connect tenants directly with
              verified landlords, cutting out costly middlemen while delivering
              a world-class digital experience.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8 text-base">
              From discovery to move-in, every step is supported — visit
              scheduling, document management, digital agreements, and ongoing
              support — all in one seamless platform.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                [
                  "Verified Listings",
                  "Every property is physically inspected by our team.",
                ],
                ["Zero Brokerage", "No fees, no commissions. Ever."],
                ["Fast Move-In", "Complete your move-in in under 48 hours."],
                ["24/7 Support", "Dedicated support team at every step."],
              ].map(([icon, title, desc]) => (
                <div
                  key={title}
                  className="flex gap-3 p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-all bg-white"
                >
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-700 text-sm text-gray-900 mb-0.5">
                      {title}
                    </div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-700 text-sm hover:opacity-90 transition-all shadow-lg"
              style={{ background: "#FE6702" }}
            >
              Learn More About Us <Ic d={ICONS.arrow} size={16} color="white" />
            </button>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "#fff4ec", color: "#FE6702" }}
            >
              Property Gallery
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900">
              Homes That <em style={{ color: "#02857E" }}>Inspire</em>
            </h2>
            <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
              A glimpse into the beautiful spaces waiting for you — tap any to
              enlarge.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((g, i) => (
              <div
                key={i}
                onClick={() => setGalleryOpen(i)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer img-zoom group ${i === 0 ? "row-span-2 md:row-span-1" : ""}`}
                style={{ height: i === 0 ? 320 : 200 }}
              >
                <img
                  src={g.img}
                  className="w-full h-full object-cover"
                  alt={g.label}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
                  style={{
                    background:
                      "linear-gradient(to top,rgba(0,0,0,.65),transparent)",
                  }}
                >
                  <div>
                    <span className="text-white font-700 text-sm">
                      {g.label}
                    </span>
                    <div className="text-xs text-white/70 mt-0.5">
                      Click to enlarge
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <Ic d={ICONS.expand} size={14} color="#374151" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {galleryOpen !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setGalleryOpen(null)}
        >
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all">
            <Ic d={ICONS.x} size={20} color="white" />
          </button>
          <img
            src={GALLERY[galleryOpen].img}
            className="max-w-4xl w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
            alt="gallery"
          />
          <div className="absolute bottom-6 text-white font-700 text-base">
            {GALLERY[galleryOpen].label}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setGalleryOpen(
                (galleryOpen - 1 + GALLERY.length) % GALLERY.length,
              );
            }}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-all"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setGalleryOpen((galleryOpen + 1) % GALLERY.length);
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-all"
          >
            ›
          </button>
        </div>
      )}

      <section
        id="testimonials"
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg,#1a1a2e,#0f2d2b)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "rgba(254,103,2,.15)", color: "#fb923c" }}
            >
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl text-white">
              What Our <em style={{ color: "#FE6702" }}>Tenants</em> Say
            </h2>
            <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
              Real stories from real people who found their homes on RentEase.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`relative bg-white/5 border rounded-2xl p-6 transition-all card-hover ${i === testIdx ? "border-orange-500 bg-white/10" : "border-white/10"}`}
                onClick={() => setTestIdx(i)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="text-5xl leading-none font-900 mb-3"
                  style={{ color: "#FE6702", opacity: 0.4 }}
                >
                  "
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={t.img}
                    className="w-10 h-10 rounded-full object-cover border-2"
                    style={{ borderColor: "#FE6702" }}
                    alt={t.name}
                  />
                  <div>
                    <div className="text-white font-700 text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                    <div className="mt-1">
                      <Stars n={t.rating} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestIdx(i)}
                className={`rounded-full transition-all ${i === testIdx ? "w-8 h-2.5" : "w-2.5 h-2.5"}`}
                style={{
                  background:
                    i === testIdx ? "#FE6702" : "rgba(255,255,255,.3)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span
                className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                style={{ background: "#fff4ec", color: "#FE6702" }}
              >
                Renter's Guide
              </span>
              <h2 className="text-4xl md:text-5xl text-gray-900">
                Expert <em style={{ color: "#02857E" }}>Insights</em>
              </h2>
            </div>
            <button
              className="flex items-center gap-2 text-sm font-700 px-5 py-2.5 rounded-xl border-2 self-start md:self-end hover:bg-orange-50 transition-all"
              style={{ borderColor: "#FE6702", color: "#FE6702" }}
            >
              All Articles <Ic d={ICONS.arrow} size={15} color="#FE6702" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {BLOG.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl overflow-hidden border border-gray-100 card-hover cursor-pointer"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,.07)" }}
              >
                <div className="overflow-hidden img-zoom h-48">
                  <img
                    src={b.img}
                    className="w-full h-full object-cover"
                    alt={b.title}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-700 px-2.5 py-0.5 rounded-full"
                      style={{ background: "#fff4ec", color: "#FE6702" }}
                    >
                      {b.cat}
                    </span>
                    <span className="text-xs text-gray-400">{b.date}</span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {b.read} read
                    </span>
                  </div>
                  <h3 className="font-800 text-gray-900 text-base leading-snug mb-4 hover:text-orange-500 transition-colors">
                    {b.title}
                  </h3>
                  <button
                    className="flex items-center gap-1.5 text-sm font-700 transition-all hover:gap-3"
                    style={{ color: "#02857E" }}
                  >
                    Read More <Ic d={ICONS.arrow} size={14} color="#02857E" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4" style={{ background: "#f8fafc" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "#e5f5f4", color: "#02857E" }}
            >
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900">
              Got <em style={{ color: "#FE6702" }}>Questions?</em>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">
              Everything you need to know about renting with RentEase.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${activeFaq === i ? "border-orange-400 shadow-md" : "border-gray-100"}`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-700 text-gray-900 text-sm pr-4">
                    {f.q}
                  </span>
                  <span
                    className="text-lg shrink-0 transition-transform"
                    style={{
                      transform: activeFaq === i ? "rotate(45deg)" : "none",
                      color: "#FE6702",
                    }}
                  >
                    +
                  </span>
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4 overflow-hidden relative"
        style={{ background: "linear-gradient(135deg,#FE6702,#e55500)" }}
      >
        <div className="absolute right-0 top-0 w-72 h-72 rounded-full opacity-10 blur-3xl bg-white" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-block bg-white/20 text-white text-xs font-700 px-3 py-1 rounded-full mb-4">
              Mobile App
            </div>
            <h2 className="serif text-3xl md:text-4xl text-white mb-3">
              Rent on the Go with
              <br />
              RentEase App
            </h2>
            <p className="text-white/80 text-sm mb-6 max-w-sm">
              Browse listings, schedule visits, track your move-in checklist —
              all from your phone. Available on iOS & Android.
            </p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white text-gray-900 px-5 py-3 rounded-xl font-700 text-sm hover:bg-gray-100 transition-all">
                App Store
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-900 px-5 py-3 rounded-xl font-700 text-sm hover:bg-gray-100 transition-all">
                Google Play
              </button>
            </div>
          </div>
          <div className="text-center">
            <div className="text-8xl float">📱</div>
            <div className="mt-3 flex justify-center gap-4 text-white/80 text-sm">
              <span>⭐ 4.8 App Store</span>
              <span>⭐ 4.9 Play Store</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "#fff4ec", color: "#FE6702" }}
            >
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900">
              We're Here to <em style={{ color: "#02857E" }}>Help</em>
            </h2>
            <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
              Have a question, need help finding a property, or want to list
              yours? Drop us a message.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Info cards */}
            <div className="md:col-span-2 flex flex-col gap-5">
              {[
                {
                  icon: "📞",
                  title: "Call Us",
                  info: "+91 800 123 4567",
                  sub: "Mon–Sat, 9am–8pm",
                },
                {
                  icon: "📧",
                  title: "Email Us",
                  info: "hello@rentease.in",
                  sub: "Reply within 2 hours",
                },
                {
                  icon: "📍",
                  title: "Head Office",
                  info: "RentEase Towers, Koramangala",
                  sub: "Bangalore – 560034",
                },
                {
                  icon: "💬",
                  title: "Live Chat",
                  info: "Available on App & Website",
                  sub: "Avg. response: < 5 min",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="font-700 text-gray-900 text-sm">
                      {c.title}
                    </div>
                    <div
                      className="font-800 text-base mt-0.5"
                      style={{ color: "#FE6702" }}
                    >
                      {c.info}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                {formSent ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="serif text-2xl text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 text-sm">
                      We'll get back to you within 2 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="serif text-2xl text-gray-900 mb-6">
                      Send a Message
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-xs font-700 text-gray-600 mb-1.5 block">
                          Full Name *
                        </label>
                        <input
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm((f) => ({
                              ...f,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Arjun Mehta"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-700 text-gray-600 mb-1.5 block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm((f) => ({
                              ...f,
                              email: e.target.value,
                            }))
                          }
                          placeholder="arjun@email.com"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="text-xs font-700 text-gray-600 mb-1.5 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) =>
                          setContactForm((f) => ({
                            ...f,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="+91 98765 43210"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="text-xs font-700 text-gray-600 mb-1.5 block">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={contactForm.msg}
                        onChange={(e) =>
                          setContactForm((f) => ({ ...f, msg: e.target.value }))
                        }
                        placeholder="Tell us how we can help you..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 resize-none bg-white"
                      />
                    </div>
                    <button
                      onClick={sendContact}
                      className="w-full py-4 rounded-xl text-white font-700 text-base hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                      style={{ background: "#FE6702" }}
                    >
                      Send Message 🚀
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4" style={{ background: "#e5f5f4" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-3xl mb-3">📬</div>
          <h2 className="serif text-3xl text-gray-900 mb-2">
            Stay Ahead of the Market
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Get curated listings, rent trends, and relocation tips delivered to
            your inbox every week.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 border-2 border-white rounded-xl px-4 py-3 text-sm bg-white text-gray-700 shadow"
            />
            <button
              className="px-6 py-3 rounded-xl text-white font-700 text-sm hover:opacity-90 transition-all shadow"
              style={{ background: "#02857E" }}
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            No spam. Unsubscribe anytime. 10,000+ subscribers.
          </p>
        </div>
      </section>

      <footer style={{ background: "#0f1923" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-10 grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#FE6702,#02857E)",
                }}
              >
                <Ic d={ICONS.home} size={18} color="white" />
              </div>
              <span className="serif text-2xl font-bold">
                <span style={{ color: "#5eead4" }}>Rent</span>
                <span style={{ color: "#fb923c" }}>Ease</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India's leading zero-brokerage rental platform. Find your perfect
              home without the hassle of middlemen.
            </p>

            <div className="flex gap-3">
              {[
                ["fb", ICONS.fb],
                ["tw", ICONS.tw],
                ["ig", ICONS.ig],
                ["yt", ICONS.yt],
              ].map(([k, d]) => (
                <a
                  key={k}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,.1)" }}
                >
                  <Ic d={d} size={16} color="#9ca3af" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "For Tenants",
              links: [
                "Browse Listings",
                "Schedule Visit",
                "Shortlist Properties",
                "Compare Properties",
                "Move-in Checklist",
                "Support Tickets",
              ],
            },
            {
              title: "For Landlords",
              links: [
                "List Property",
                "Manage Listings",
                "Tenant Screening",
                "Pricing Plans",
                "Legal Support",
                "Blog",
              ],
            },
            {
              title: "Company",
              links: [
                "About Us",
                "Careers",
                "Press",
                "Partners",
                "Privacy Policy",
                "Terms of Service",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-800 text-sm mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-gray-500 text-xs hover:text-orange-400 transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 border-t border-white/10">
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
            <span className="text-xs text-gray-600 font-700">
              Properties in:
            </span>
            {[
              "Bangalore",
              "Mumbai",
              "Delhi",
              "Hyderabad",
              "Chennai",
              "Pune",
              "Kolkata",
              "Ahmedabad",
              "Noida",
              "Gurgaon",
            ].map((city) => (
              <a
                key={city}
                href="#"
                className="text-xs text-gray-500 hover:text-orange-400 transition-colors"
              >
                {city}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © 2026 RentEase Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-xs">
              Made with Love in Bangalore
            </span>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div
        className="fixed bottom-0 left-0 right-0 md:hidden z-40 px-4 pb-4 pt-2"
        style={{ background: "linear-gradient(to top,white,transparent)" }}
      >
        <button
          className="w-full py-4 rounded-2xl text-white font-800 text-base shadow-2xl"
          style={{ background: "linear-gradient(90deg,#FE6702,#e55500)" }}
        >
          Search Rentals
        </button>
      </div>

      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 md:bottom-8 right-5 w-11 h-11 rounded-full text-white flex items-center justify-center shadow-xl z-40 hover:opacity-90 transition-all"
          style={{ background: "#FE6702" }}
        >
          ↑
        </button>
      )}
    </div>
  );
}
