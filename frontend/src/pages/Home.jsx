import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:wght@400;500;600;700;800;900&display=swap');
    *{font-family:'Nunito',sans-serif}
    h1,h2,.serif{font-family:'DM Serif Display',serif !important}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes pulse-ring{0%{transform:scale(.9);opacity:.7}70%{transform:scale(1.2);opacity:0}100%{opacity:0}}
    @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
    .fu{animation:fadeUp .6s ease both}
    .fu1{animation:fadeUp .6s .12s ease both}
    .fu2{animation:fadeUp .6s .24s ease both}
    .fu3{animation:fadeUp .6s .36s ease both}
    .fu4{animation:fadeUp .6s .48s ease both}
    .float{animation:float 5s ease-in-out infinite}
    .marquee-track{animation:marquee 28s linear infinite}
    .card-hover{transition:transform .25s,box-shadow .25s}
    .card-hover:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.14)}
    .img-zoom img{transition:transform .5s ease}
    .img-zoom:hover img{transform:scale(1.06)}
    .nav-blur{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
    .shimmer{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:400px 100%;animation:shimmer 1.4s infinite}
    html{scroll-behavior:smooth}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#ccc;border-radius:3px}
    input:focus,button:focus{outline:none;}
    input{outline:none !important;box-shadow:none !important;}
    input:-webkit-autofill{-webkit-box-shadow:0 0 0 30px white inset !important;}
    #explore-slider::-webkit-scrollbar{display:none;}
  `}</style>
);

const DropdownPortal = ({ anchorRef, open, children }) => {
  const [coords, setCoords] = useState({});
  useEffect(() => {
    if (open && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);
  if (!open) return null;
  return createPortal(
    <div
      className="bg-white rounded-xl border border-gray-100 py-1.5 overflow-hidden"
      style={{
        position: "absolute",
        top: coords.top,
        left: coords.left,
        width: coords.width,
        zIndex: 99999,
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

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

const HOW_STEP_ICONS = [
  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z M9 21V12h6v9",
  "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
];

const CONTACT_ICONS = [
  "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.81a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.73 5.73l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
];

const ABOUT_FEATURE_ICONS = [
  "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z",
  "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  "M18 20V10M12 20V4M6 20v-6",
];

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
    title: "Search & Filter",
    desc: "Use smart filters — location, budget, BHK, furnishing — to narrow down your perfect home from thousands of verified listings.",
  },
  {
    title: "Visit & Shortlist",
    desc: "Schedule property visits online, track status in real-time, and shortlist favorites. Compare up to 3 properties side-by-side.",
  },
  {
    title: "Move-In Ready",
    desc: "Complete your move-in checklist, upload documents, sign the agreement digitally — all from your dashboard. Zero brokerage, always.",
  },
];

const STATS = [
  {
    num: "50,000+",
    label: "Happy Tenants",
    icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
  {
    num: "12,000+",
    label: "Verified Listings",
    icon: "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5zM9 21V12h6v9",
  },
  {
    num: "₹0",
    label: "Brokerage Fee",
    icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    num: "48 hrs",
    label: "Avg. Move-in Time",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
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

  const { user, isAuthenticated, logout } = useAuth();

  const [bhkOpen, setBhkOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const bhkRef = useRef(null);
  const budgetRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (bhkRef.current && !bhkRef.current.contains(e.target))
        setBhkOpen(false);
      if (budgetRef.current && !budgetRef.current.contains(e.target))
        setBudgetOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

      <Navbar />
      <section
        id="hero"
        className="relative"
        style={{ height: "auto", minHeight: "480px" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1600&q=80"
            className="w-full h-full object-cover"
            alt="hero"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(15,25,35,.55) 0%, rgba(15,25,35,.35) 50%, rgba(15,25,35,.7) 100%)",
            }}
          />
          <div
            className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl"
            style={{ background: "#FE6702" }}
          />
          <div
            className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: "#02857E" }}
          />
        </div>

        <div className="relative flex flex-col justify-between pt-24 pb-0">
          <div className="text-center px-4 fu mb-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(254,103,2,.18)",
                border: "1px solid rgba(254,103,2,.35)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#FE6702" }}
              />
              <span className="text-xs font-700" style={{ color: "#fb923c" }}>
                India's #1 Zero-Brokerage Rental Platform
              </span>
            </div>
            <h1
              className="text-white font-900 leading-tight mb-3 fu1"
              style={{ fontSize: "clamp(24px,5vw,54px)" }}
            >
              Find Your Perfect <span style={{ color: "#FE6702" }}>Home</span>{" "}
              <em style={{ color: "#5eead4" }}>Without</em> Brokerage
            </h1>
            <p className="text-gray-300 text-sm md:text-base fu2">
              Browse 12,000+ verified rentals · No middlemen · No hidden charges
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto px-3 md:px-4 fu3">
            <div
              className="bg-white"
              style={{
                borderRadius: "16px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
              }}
            >
              <div
                className="flex border-b border-gray-100 px-2 pt-1 overflow-x-auto"
                style={{
                  scrollbarWidth: "none",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                {["Rent", "Buy", "PG / Hostel"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-4 md:px-5 py-3 text-sm font-700 whitespace-nowrap transition-all border-b-2 ${activeTab === t ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="p-3 flex flex-col md:flex-row md:items-center gap-2">
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-orange-400 transition-all w-full md:flex-1">
                  <Ic d={ICONS.map} size={16} color="#9ca3af" />
                  <input
                    value={searchLoc}
                    onChange={(e) => setSearchLoc(e.target.value)}
                    placeholder="City, locality or project..."
                    className="w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none"
                  />
                </div>

                <div className="hidden md:block w-px h-8 bg-gray-200 shrink-0" />

                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-36" ref={bhkRef}>
                    <button
                      onClick={() => {
                        setBhkOpen((o) => !o);
                        setBudgetOpen(false);
                      }}
                      className="w-full flex items-center justify-between gap-2 border rounded-xl px-3 py-2.5 hover:border-orange-400 transition-all"
                      style={{ borderColor: bhkOpen ? "#fb923c" : "#e5e7eb" }}
                    >
                      <div className="flex items-center gap-2">
                        <Ic d={ICONS.home} size={15} color="#9ca3af" />
                        <span className="text-sm text-gray-600">{bhk}</span>
                      </div>
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: bhkOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform .2s",
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <DropdownPortal anchorRef={bhkRef} open={bhkOpen}>
                      {["Any BHK", "1 BHK", "2 BHK", "3 BHK", "4 BHK"].map(
                        (o) => (
                          <button
                            key={o}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={() => {
                              setBhk(o);
                              setBhkOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-500"
                            style={{
                              color: bhk === o ? "#FE6702" : "#374151",
                              fontWeight: bhk === o ? "700" : "500",
                            }}
                          >
                            {o}
                          </button>
                        ),
                      )}
                    </DropdownPortal>
                  </div>

                  <div className="hidden md:block w-px h-8 bg-gray-200 shrink-0 self-center" />

                  <div className="relative flex-1 md:w-44" ref={budgetRef}>
                    <button
                      onClick={() => {
                        setBudgetOpen((o) => !o);
                        setBhkOpen(false);
                      }}
                      className="w-full flex items-center justify-between gap-2 border rounded-xl px-3 py-2.5 hover:border-orange-400 transition-all"
                      style={{
                        borderColor: budgetOpen ? "#fb923c" : "#e5e7eb",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          width={15}
                          height={15}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#9ca3af"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span className="text-sm text-gray-600">{budget}</span>
                      </div>
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: budgetOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform .2s",
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <DropdownPortal anchorRef={budgetRef} open={budgetOpen}>
                      {[
                        "Any Budget",
                        "Under ₹20K",
                        "₹20K–₹40K",
                        "₹40K–₹70K",
                        "Above ₹70K",
                      ].map((o) => (
                        <button
                          key={o}
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={() => {
                            setBudget(o);
                            setBudgetOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm transition-colors hover:bg-orange-50 hover:text-orange-500"
                          style={{
                            color: budget === o ? "#FE6702" : "#374151",
                            fontWeight: budget === o ? "700" : "500",
                          }}
                        >
                          {o}
                        </button>
                      ))}
                    </DropdownPortal>
                  </div>
                </div>

                <button
                  className="cursor-pointer w-full md:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white font-800 text-sm hover:opacity-90 transition-all"
                  style={{ background: "#FE6702" }}
                >
                  <Ic d={ICONS.search} size={16} color="white" /> Search
                </button>
              </div>

              <div className="px-3 pb-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-400 font-600">Popular:</span>
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
          </div>
        </div>
      </section>

      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            ["12K+", "Properties"],
            ["₹0", "Brokerage"],
            ["50K+", "Happy Tenants"],
            ["4.9★", "Avg Rating"],
          ].map(([n, l]) => (
            <div key={l} className="flex items-center gap-2">
              <span className="text-lg font-900" style={{ color: "#FE6702" }}>
                {n}
              </span>
              <span className="text-sm text-gray-500 font-600">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXPLORE INFINITE SLIDER ── */}
      <div className="bg-white py-8 sm:py-10 border-b border-gray-100 overflow-hidden">
        <style>{`
          @keyframes explore-scroll {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .explore-track {
            display: flex;
            gap: 16px;
            width: max-content;
            animation: explore-scroll 36s linear infinite;
            will-change: transform;
          }
          .explore-track:hover {
            animation-play-state: paused;
          }
          .explore-card-img {
            transition: transform 0.4s ease;
          }
          .explore-card:hover .explore-card-img {
            transform: scale(1.07);
          }
          .explore-card:hover .explore-card-label {
            color: #FE6702;
          }
        `}</style>

        <p className="text-center text-xs font-800 uppercase tracking-widest text-gray-400 mb-6 px-4">
          Get Started With Exploring Rental Options
        </p>

        <div className="overflow-hidden px-4">
          <div className="explore-track">
            {[
              {
                label: "Renting a Home",
                img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80",
                badge: null,
              },
              {
                label: "List Your Property",
                img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
                badge: "FREE",
              },
              {
                label: "PG & Co-living",
                img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
                badge: "NEW",
              },
              {
                label: "Furnished Homes",
                img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
                badge: null,
              },
              {
                label: "Short-term Stays",
                img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80",
                badge: "NEW",
              },
              {
                label: "Commercial Space",
                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
                badge: null,
              },
              {
                label: "Explore Insights",
                img: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=400&q=80",
                badge: null,
              },
              /* duplicate set for seamless loop */
              {
                label: "Renting a Home",
                img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80",
                badge: null,
              },
              {
                label: "List Your Property",
                img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
                badge: "FREE",
              },
              {
                label: "PG & Co-living",
                img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
                badge: "NEW",
              },
              {
                label: "Furnished Homes",
                img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
                badge: null,
              },
              {
                label: "Short-term Stays",
                img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80",
                badge: "NEW",
              },
              {
                label: "Commercial Space",
                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
                badge: null,
              },
              {
                label: "Explore Insights",
                img: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=400&q=80",
                badge: null,
              },
            ].map(({ label, img, badge }, i) => (
              <div
                key={i}
                className="explore-card flex flex-col items-center gap-3 cursor-pointer shrink-0"
                style={{ width: 185 }}
              >
                <div
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{ height: 130 }}
                >
                  <img
                    src={img}
                    alt={label}
                    className="explore-card-img w-full h-full object-cover"
                  />
                  {badge && (
                    <span
                      className="absolute top-2 left-2 text-xs font-800 px-2 py-0.5 rounded"
                      style={{
                        background: badge === "FREE" ? "#FE6702" : "#02857E",
                        color: "white",
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </div>
                <p className="explore-card-label text-sm font-700 text-gray-700 text-center transition-colors whitespace-nowrap">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-y border-gray-100 py-4 overflow-hidden">
        <div className="flex items-center gap-3 mb-1 px-4 md:px-6">
          <span className="text-xs font-700 text-gray-400 uppercase tracking-widest whitespace-nowrap">
            Trusted Partners
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-8 md:gap-12 marquee-track whitespace-nowrap">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="text-xs md:text-sm font-700 text-gray-400 hover:text-gray-600 transition-colors cursor-default"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section
        className="py-12 md:py-14 px-4"
        style={{ background: "linear-gradient(135deg,#1a1a2e,#0f2d2b)" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "rgba(254,103,2,0.15)" }}
              >
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FE6702"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={s.icon} />
                </svg>
              </div>
              <div
                className="serif text-2xl md:text-4xl font-bold mb-1"
                style={{ color: "#FE6702" }}
              >
                {s.num}
              </div>
              <div className="text-xs md:text-sm text-gray-400 font-600">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="listings" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <span
                className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                style={{ background: "#fff4ec", color: "#FE6702" }}
              >
                Featured Rentals
              </span>
              <h2 className="text-3xl md:text-5xl text-gray-900 leading-tight">
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

          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
            {["Any BHK", "1 BHK", "2 BHK", "3 BHK", "4 BHK"].map((b) => (
              <button
                key={b}
                onClick={() => setBhk(b)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-700 border-2 whitespace-nowrap transition-all ${bhk === b ? "text-white border-transparent" : "text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500"}`}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {(filteredListings.length ? filteredListings : LISTINGS).map(
              (l) => (
                <div
                  key={l.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,.07)" }}
                >
                  <div className="relative overflow-hidden img-zoom h-48 md:h-52">
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
                      {l.available === "Immediate" ? (
                        <span className="flex items-center gap-1">
                          <svg
                            width={11}
                            height={11}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          Available Now
                        </span>
                      ) : (
                        `Available ${l.available}`
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-800 text-gray-900 text-sm md:text-base leading-snug pr-2">
                        {l.title}
                      </h3>
                      <div className="text-right shrink-0">
                        <div
                          className="font-900 text-base md:text-lg"
                          style={{ color: "#FE6702" }}
                        >
                          ₹{l.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">/month</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                      <Ic d={ICONS.map} size={13} color="#9ca3af" />
                      <span className="truncate">{l.loc}</span>
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
                          className="text-xs font-600 px-2 py-0.5 rounded-full flex items-center gap-1"
                          style={{ background: "#e5f5f4", color: "#02857E" }}
                        >
                          <svg
                            width={10}
                            height={10}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#02857E"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {a}
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
                          className="cursor-pointer text-xs font-700 px-3 py-1.5 rounded-lg border-2 transition-all hover:bg-orange-50"
                          style={{ borderColor: "#FE6702", color: "#FE6702" }}
                        >
                          Details
                        </button>
                        <button
                          className="cursor-pointer text-xs font-700 px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
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

          <div className="text-center mt-10 md:mt-12">
            <button
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-xl border-2 font-700 text-sm md:text-base transition-all hover:text-white hover:bg-orange-500"
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
        className="py-16 md:py-20 px-4"
        style={{ background: "#f8fafc" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "#e5f5f4", color: "#02857E" }}
            >
              Explore by City
            </span>
            <h2 className="text-3xl md:text-5xl text-gray-900">
              Top Rental Cities
              <br />
              <em style={{ color: "#FE6702" }}>Across India</em>
            </h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base max-w-lg mx-auto">
              Thousands of verified, no-brokerage rentals in India's
              fastest-growing cities.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {CITIES.map((c) => (
              <div
                key={c.name}
                onClick={() => {
                  setCityFilter(c.name);
                  setSearchLoc(c.name);
                }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer card-hover img-zoom group ${cityFilter === c.name ? "ring-3 ring-orange-500 ring-offset-2" : ""}`}
                style={{ height: 140 }}
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
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                  <div className="text-white font-800 text-xs md:text-sm">
                    {c.name}
                  </div>
                  <div
                    className="text-xs font-600"
                    style={{ color: "#fb923c" }}
                  >
                    {c.props.toLocaleString()}+ homes
                  </div>
                </div>
                {cityFilter === c.name && (
                  <div
                    className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white"
                    style={{ background: "#FE6702" }}
                  >
                    <svg
                      width={11}
                      height={11}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "#fff4ec", color: "#FE6702" }}
            >
              Simple Process
            </span>
            <h2 className="text-3xl md:text-5xl text-gray-900">
              Move In 3 Easy Steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
            <div
              className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5"
              style={{ background: "linear-gradient(90deg,#FE6702,#02857E)" }}
            />
            {HOW_STEPS.map((s, i) => (
              <div
                key={s.title}
                className="relative text-center p-6 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-orange-200 transition-all card-hover"
                style={{ background: "#fafafa" }}
              >
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md"
                  style={{
                    background: "linear-gradient(135deg,#fff4ec,#ffe8d0)",
                  }}
                >
                  <svg
                    width={28}
                    height={28}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FE6702"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={HOW_STEP_ICONS[i]} />
                  </svg>
                </div>
                <div
                  className="absolute -top-3 -right-3 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-800 shadow"
                  style={{ background: "#FE6702" }}
                >
                  {i + 1}
                </div>
                <h3 className="serif text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <div
            className="mt-10 md:mt-14 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg,#1a1a2e,#0f2d2b)" }}
          >
            <div className="text-center md:text-left">
              <h3 className="serif text-xl md:text-3xl text-white mb-2">
                Ready to find your home?
              </h3>
              <p className="text-gray-400 text-xs md:text-sm">
                Join 50,000+ tenants who found their perfect home on RentEase.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <button
                className=" cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-700 text-white hover:opacity-90 transition-all shadow-lg"
                style={{ background: "#FE6702" }}
              >
                Start Searching
              </button>
              <button className=" cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-700 border-2 border-white/30 text-white hover:bg-white/10 transition-all">
                List Your Property
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-16 md:py-20 px-4"
        style={{ background: "#f8fafc" }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="relative h-80 md:h-125">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-3 md:p-4 shadow-2xl text-center float z-10 w-28 md:w-32">
              <div
                className="text-2xl md:text-3xl font-900"
                style={{ color: "#FE6702" }}
              >
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
            <h2 className="text-3xl md:text-5xl text-gray-900 mb-5 leading-tight">
              Renting Made
              <br />
              <em style={{ color: "#FE6702" }}>Simple & Honest</em>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
              RentEase was founded in 2022 with one mission: eliminate brokerage
              from Indian rentals forever. We connect tenants directly with
              verified landlords, cutting out costly middlemen while delivering
              a world-class digital experience.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
              From discovery to move-in, every step is supported — visit
              scheduling, document management, digital agreements, and ongoing
              support — all in one seamless platform.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              {[
                [
                  "Verified Listings",
                  "Every property is physically inspected by our team.",
                ],
                ["Zero Brokerage", "No fees, no commissions. Ever."],
                ["Fast Move-In", "Complete your move-in in under 48 hours."],
                ["24/7 Support", "Dedicated support team at every step."],
              ].map(([title, desc], i) => (
                <div
                  key={title}
                  className="flex gap-3 p-3 md:p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-all bg-white"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#fff4ec" }}
                  >
                    <svg
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FE6702"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={ABOUT_FEATURE_ICONS[i]} />
                    </svg>
                  </div>
                  <div>
                    <div className="font-700 text-xs md:text-sm text-gray-900 mb-0.5">
                      {title}
                    </div>
                    <div className="text-xs text-gray-500 hidden md:block">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="cursor-pointer flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 rounded-xl text-white font-700 text-sm hover:opacity-90 transition-all shadow-lg"
              style={{ background: "#FE6702" }}
            >
              Learn More About Us <Ic d={ICONS.arrow} size={16} color="white" />
            </button>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "#fff4ec", color: "#FE6702" }}
            >
              Property Gallery
            </span>
            <h2 className="text-3xl md:text-5xl text-gray-900">
              Homes That <em style={{ color: "#02857E" }}>Inspire</em>
            </h2>
            <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
              A glimpse into the beautiful spaces waiting for you — tap any to
              enlarge.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY.map((g, i) => (
              <div
                key={i}
                onClick={() => setGalleryOpen(i)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer img-zoom group ${i === 0 ? "row-span-2 md:row-span-1" : ""}`}
                style={{ height: i === 0 ? 280 : 160 }}
              >
                <img
                  src={g.img}
                  className="w-full h-full object-cover"
                  alt={g.label}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 md:p-4"
                  style={{
                    background:
                      "linear-gradient(to top,rgba(0,0,0,.65),transparent)",
                  }}
                >
                  <div>
                    <span className="text-white font-700 text-xs md:text-sm">
                      {g.label}
                    </span>
                    <div className="text-xs text-white/70 mt-0.5 hidden md:block">
                      Click to enlarge
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <Ic d={ICONS.expand} size={12} color="#374151" />
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
          <button className="absolute top-3 right-3 md:top-5 md:right-5 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all">
            <Ic d={ICONS.x} size={16} color="white" />
          </button>
          <img
            src={GALLERY[galleryOpen].img}
            className="max-w-4xl w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
            alt="gallery"
          />
          <div className="absolute bottom-4 md:bottom-6 text-white font-700 text-sm md:text-base">
            {GALLERY[galleryOpen].label}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setGalleryOpen(
                (galleryOpen - 1 + GALLERY.length) % GALLERY.length,
              );
            }}
            className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-all text-lg"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setGalleryOpen((galleryOpen + 1) % GALLERY.length);
            }}
            className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-all text-lg"
          >
            ›
          </button>
        </div>
      )}

      <section
        id="testimonials"
        className="py-16 md:py-20 px-4"
        style={{ background: "linear-gradient(135deg,#1a1a2e,#0f2d2b)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "rgba(254,103,2,.15)", color: "#fb923c" }}
            >
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl text-white">
              What Our <em style={{ color: "#FE6702" }}>Tenants</em> Say
            </h2>
            <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
              Real stories from real people who found their homes on RentEase.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`relative bg-white/5 border rounded-2xl p-5 md:p-6 transition-all card-hover ${i === testIdx ? "border-orange-500 bg-white/10" : "border-white/10"}`}
                onClick={() => setTestIdx(i)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="text-4xl md:text-5xl leading-none font-900 mb-3"
                  style={{ color: "#FE6702", opacity: 0.4 }}
                >
                  "
                </div>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={t.img}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2"
                    style={{ borderColor: "#FE6702" }}
                    alt={t.name}
                  />
                  <div>
                    <div className="text-white font-700 text-xs md:text-sm">
                      {t.name}
                    </div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                    <div className="mt-1">
                      <Stars n={t.rating} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestIdx(i)}
                className={`rounded-full transition-all ${i === testIdx ? "w-6 md:w-8 h-2" : "w-2 h-2"}`}
                style={{
                  background:
                    i === testIdx ? "#FE6702" : "rgba(255,255,255,.3)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <span
                className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                style={{ background: "#fff4ec", color: "#FE6702" }}
              >
                Renter's Guide
              </span>
              <h2 className="text-3xl md:text-5xl text-gray-900">
                Expert <em style={{ color: "#02857E" }}>Insights</em>
              </h2>
            </div>
            <button
              className="cursor-pointer flex items-center gap-2 text-sm font-700 px-5 py-2.5 rounded-xl border-2 self-start md:self-end hover:bg-orange-50 transition-all"
              style={{ borderColor: "#FE6702", color: "#FE6702" }}
            >
              All Articles <Ic d={ICONS.arrow} size={15} color="#FE6702" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-7">
            {BLOG.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl overflow-hidden border border-gray-100 card-hover cursor-pointer"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,.07)" }}
              >
                <div className="overflow-hidden img-zoom h-40 md:h-48">
                  <img
                    src={b.img}
                    className="w-full h-full object-cover"
                    alt={b.title}
                  />
                </div>
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
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
                  <h3 className="font-800 text-gray-900 text-sm md:text-base leading-snug mb-4 hover:text-orange-500 transition-colors">
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

      <section
        className="py-16 md:py-20 px-4"
        style={{ background: "#f8fafc" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "#e5f5f4", color: "#02857E" }}
            >
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl text-gray-900">
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
                  className="cursor-pointer w-full flex items-center justify-between px-4 md:px-6 py-4 md:py-5 text-left"
                >
                  <span className="font-700 text-gray-900 text-xs md:text-sm pr-4">
                    {f.q}
                  </span>
                  <span
                    className="text-base md:text-lg shrink-0 transition-transform"
                    style={{
                      transform: activeFaq === i ? "rotate(45deg)" : "none",
                      color: "#FE6702",
                    }}
                  >
                    +
                  </span>
                </button>
                {activeFaq === i && (
                  <div className="px-4 md:px-6 pb-4 md:pb-5 text-gray-500 text-xs md:text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-12 md:py-16 px-4 overflow-hidden relative"
        style={{ background: "linear-gradient(135deg,#FE6702,#e55500)" }}
      >
        <div className="absolute right-0 top-0 w-72 h-72 rounded-full opacity-10 blur-3xl bg-white" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <div className="inline-block bg-white/20 text-white text-xs font-700 px-3 py-1 rounded-full mb-4">
              Mobile App
            </div>
            <h2 className="serif text-2xl md:text-4xl text-white mb-3">
              Rent on the Go with
              <br />
              RentEase App
            </h2>
            <p className="text-white/80 text-xs md:text-sm mb-6 max-w-sm">
              Browse listings, schedule visits, track your move-in checklist —
              all from your phone. Available on iOS & Android.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <button className="cursor-pointer flex items-center gap-2 bg-white text-gray-900 px-4 md:px-5 py-2 md:py-3 rounded-xl font-700 text-xs md:text-sm hover:bg-gray-100 transition-all">
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
                  <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM8 12l2-2 2 2 4-4" />
                </svg>
                App Store
              </button>
              <button className="cursor-pointer flex items-center gap-2 bg-white text-gray-900 px-4 md:px-5 py-2 md:py-3 rounded-xl font-700 text-xs md:text-sm hover:bg-gray-100 transition-all">
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
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
                Google Play
              </button>
            </div>
          </div>
          <div className="text-center">
            <div
              className="w-24 h-24 md:w-32 md:h-32 mx-auto flex items-center justify-center float"
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "32px",
              }}
            >
              <svg
                width={56}
                height={56}
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM12 18h.01" />
              </svg>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-white/80 text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <svg
                  width={13}
                  height={13}
                  viewBox="0 0 24 24"
                  fill="#f59e0b"
                  stroke="#f59e0b"
                  strokeWidth={1}
                >
                  <path d={ICONS.star} />
                </svg>
                4.8 App Store
              </div>
              <div className="flex items-center gap-1">
                <svg
                  width={13}
                  height={13}
                  viewBox="0 0 24 24"
                  fill="#f59e0b"
                  stroke="#f59e0b"
                  strokeWidth={1}
                >
                  <path d={ICONS.star} />
                </svg>
                4.9 Play Store
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span
              className="inline-block text-xs font-800 uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{ background: "#fff4ec", color: "#FE6702" }}
            >
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-5xl text-gray-900">
              We're Here to <em style={{ color: "#02857E" }}>Help</em>
            </h2>
            <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
              Have a question, need help finding a property, or want to list
              yours? Drop us a message.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6 md:gap-10">
            <div className="md:col-span-2 flex flex-col gap-4 md:gap-5">
              {[
                {
                  title: "Call Us",
                  info: "+91 800 123 4567",
                  sub: "Mon–Sat, 9am–8pm",
                },
                {
                  title: "Email Us",
                  info: "hello@rentease.in",
                  sub: "Reply within 2 hours",
                },
                {
                  title: "Head Office",
                  info: "RentEase Towers, Koramangala",
                  sub: "Bangalore – 560034",
                },
                {
                  title: "Live Chat",
                  info: "Available on App & Website",
                  sub: "Avg. response: < 5 min",
                },
              ].map((c, i) => (
                <div
                  key={c.title}
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#fff4ec" }}
                  >
                    <svg
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FE6702"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={CONTACT_ICONS[i]} />
                    </svg>
                  </div>
                  <div>
                    <div className="font-700 text-gray-900 text-xs md:text-sm">
                      {c.title}
                    </div>
                    <div
                      className="font-800 text-sm md:text-base mt-0.5"
                      style={{ color: "#FE6702" }}
                    >
                      {c.info}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:col-span-3">
              <div className="bg-gray-50 rounded-2xl p-5 md:p-8 border border-gray-100">
                {formSent ? (
                  <div className="text-center py-8 md:py-12">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "#e5f5f4" }}
                    >
                      <svg
                        width={32}
                        height={32}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#02857E"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" />
                      </svg>
                    </div>
                    <h3 className="serif text-xl md:text-2xl text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm">
                      We'll get back to you within 2 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="serif text-xl md:text-2xl text-gray-900 mb-4 md:mb-6">
                      Send a Message
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 md:py-3 text-xs md:text-sm text-gray-700 bg-white"
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
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 md:py-3 text-xs md:text-sm text-gray-700 bg-white"
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
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 md:py-3 text-xs md:text-sm text-gray-700 bg-white"
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
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 md:py-3 text-xs md:text-sm text-gray-700 resize-none bg-white"
                      />
                    </div>
                    <button
                      onClick={sendContact}
                      className="cursor-pointer w-full py-3 md:py-4 rounded-xl text-white font-700 text-sm md:text-base hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                      style={{ background: "#FE6702" }}
                    >
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                      </svg>
                      Send Message
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-10 md:py-14 px-4"
        style={{ background: "#e5f5f4" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "#02857E" }}
          >
            <svg
              width={26}
              height={26}
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" />
            </svg>
          </div>
          <h2 className="serif text-2xl md:text-3xl text-gray-900 mb-2">
            Stay Ahead of the Market
          </h2>
          <p className="text-gray-500 text-xs md:text-sm mb-6">
            Get curated listings, rent trends, and relocation tips delivered to
            your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4 sm:px-0">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 border-2 border-white rounded-xl px-4 py-2.5 md:py-3 text-xs md:text-sm bg-white text-gray-700 shadow"
            />
            <button
              className="w-full sm:w-auto px-6 py-2.5 md:py-3 rounded-xl text-white font-700 text-xs md:text-sm hover:opacity-90 transition-all shadow"
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-16 pb-8 md:pb-10 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#FE6702,#02857E)",
                }}
              >
                <Ic d={ICONS.home} size={16} color="white" />
              </div>
              <span className="serif text-xl md:text-2xl font-bold">
                <span style={{ color: "#5eead4" }}>Rent</span>
                <span style={{ color: "#fb923c" }}>Ease</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
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
                  className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,.1)" }}
                >
                  <Ic d={d} size={14} color="#9ca3af" />
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
              <h4 className="text-white font-800 text-xs md:text-sm mb-3 md:mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 border-t border-white/10">
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © 2026 RentEase Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FE6702"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Made with love in Bangalore
            </div>
            <div className="flex gap-3">
              {["Privacy", "Terms", "Sitemap"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <div
        className="fixed bottom-0 left-0 right-0 md:hidden z-40 px-4 pb-4 pt-2"
        style={{ background: "linear-gradient(to top,white,transparent)" }}
      >
        <button
          className="w-full py-3 md:py-4 rounded-2xl text-white font-800 text-sm md:text-base shadow-2xl flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(90deg,#FE6702,#e55500)" }}
        >
          <Ic d={ICONS.search} size={16} color="white" />
          Search Rentals
        </button>
      </div>
    </div>
  );
}
