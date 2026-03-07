import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito:wght@400;500;600;700;800;900&display=swap');
    *{font-family:'Nunito',sans-serif}
    h1,h2,.serif{font-family:'DM Serif Display',serif !important}
    @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
    .fadeIn{animation:fadeIn .3s ease both}
    .slideIn{animation:slideIn .3s ease both}
    input:focus,button:focus{outline:none;}
    input:-webkit-autofill{-webkit-box-shadow:0 0 0 30px white inset !important;}
    .image-slider::-webkit-scrollbar{display:none;}
    ::-webkit-scrollbar{width:6px;height:6px}
    ::-webkit-scrollbar-thumb{background:#ccc;border-radius:3px}
    ::-webkit-scrollbar-thumb:hover{background:#999}
    ::-webkit-scrollbar-track{background:transparent}
    *{scrollbar-width:thin;scrollbar-color:#ccc transparent}
    .horizontal-scroll::-webkit-scrollbar{height:4px}
    .horizontal-scroll::-webkit-scrollbar-thumb{background:#ccc;border-radius:2px}
    .horizontal-scroll{scrollbar-width:thin;scrollbar-color:#ccc transparent}
    .no-scrollbar::-webkit-scrollbar{display:none}
    .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}
    .promo-scroll::-webkit-scrollbar{display:none}
    .promo-scroll{-ms-overflow-style:none;scrollbar-width:none}
     .image-slider::-webkit-scrollbar {
      display: none;
    }
    
    .image-slider {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

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
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  map: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  heart:
    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  check: "M20 6L9 17l-5-5",
  filter:
    "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z",
  x: "M18 6L6 18M6 6l12 12",
  chevronLeft: "M15 18l-6-6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  arrow: "M5 12h14M12 5l7 7-7 7",
  sparkle:
    "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z",
  building: "M6 22V2h12v20M2 22h20M12 7h.01M12 12h.01M12 17h.01",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.81a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.73 5.73l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
};

const PROMO_PROJECTS = [
  {
    id: "p1",
    label: "NEW ARRIVAL",
    labelColor: "#FE6702",
    title: "Prestige Elm Park",
    location: "Sarjapur Road, Bangalore",
    price: "₹68L – ₹1.2Cr",
    bhk: "2, 3, 4 BHK Apartments",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    tags: ["RERA", "Zero Brokerage"],
    badge: "Top Rated",
    highlight: "8.3% price rise in last 6 months",
  },
  {
    id: "p2",
    label: "NEW LAUNCH",
    labelColor: "#02857E",
    title: "Sobha Neopolis",
    location: "Panathur, Bangalore",
    price: "₹1.1Cr – ₹2.4Cr",
    bhk: "2, 3 BHK Luxury Apts",
    img: "https://images.unsplash.com/photo-1512917774080-9aa51e3eac1f?w=400&q=80",
    tags: ["RERA", "Gated Community"],
    badge: "Selling Fast",
    highlight: "12.5% price rise in last 3 months",
  },
  {
    id: "p3",
    label: "HOT DEAL",
    labelColor: "#dc2626",
    title: "Brigade Nanda Heights",
    location: "Banashankari, Bangalore",
    price: "₹55L – ₹95L",
    bhk: "1, 2, 3 BHK Apartments",
    img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=80",
    tags: ["RERA", "Smart Homes"],
    badge: " Best Value",
    highlight: "5.8% price rise in last 1 year",
  },
  {
    id: "p4",
    label: "PRE-LAUNCH",
    labelColor: "#7c3aed",
    title: "Embassy Springs",
    location: "Devanahalli, Bangalore",
    price: "₹45L – ₹1.8Cr",
    bhk: "2, 3, 4 BHK + Villas",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80",
    tags: ["RERA", "Township"],
    badge: " Premium",
    highlight: "Pre-launch pricing available",
  },
  {
    id: "p5",
    label: "NEW ARRIVAL",
    labelColor: "#FE6702",
    title: "Godrej Reserve",
    location: "Whitefield, Bangalore",
    price: "₹1.5Cr – ₹3.2Cr",
    bhk: "3, 4 BHK Ultra Luxury",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    tags: ["RERA", "Forest View"],
    badge: "Luxury",
    highlight: "10.2% price rise this quarter",
  },
  {
    id: "p6",
    label: "NEW LAUNCH",
    labelColor: "#02857E",
    title: "Puravankara Zenium",
    location: "Hosur Road, Bangalore",
    price: "₹72L – ₹1.6Cr",
    bhk: "2, 3 BHK Apartments",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
    tags: ["RERA", "Metro Nearby"],
    badge: " Metro Adjacent",
    highlight: "Special pre-booking offers",
  },
];

const PromoSlider = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateArrows, { passive: true });
      updateArrows();
      return () => el.removeEventListener("scroll", updateArrows);
    }
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div
      className="my-5 rounded-2xl overflow-hidden border border-orange-100 shadow-sm"
      style={{ background: "linear-gradient(135deg,#fff8f3 0%,#f0faf9 100%)" }}
    >
      <div className="flex items-center justify-between px-4 sm:px-5 pt-4 pb-3 border-b border-orange-100/60">
        <div className="flex items-center gap-2.5">
          <div>
            <h3 className="font-800 text-gray-900 text-sm sm:text-base leading-tight">
              Newly Launched Projects
            </h3>
            <p className="text-xs text-gray-500">
              Bigger homes in the same budget
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-all disabled:opacity-30"
            style={{
              borderColor: canScrollLeft ? "#FE6702" : "#e5e7eb",
              background: canScrollLeft ? "#FE6702" : "white",
            }}
          >
            <Ic
              d={ICONS.chevronLeft}
              size={14}
              color={canScrollLeft ? "white" : "#9ca3af"}
            />
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-all disabled:opacity-30"
            style={{
              borderColor: canScrollRight ? "#FE6702" : "#e5e7eb",
              background: canScrollRight ? "#FE6702" : "white",
            }}
          >
            <Ic
              d={ICONS.chevronRight}
              size={14}
              color={canScrollRight ? "white" : "#9ca3af"}
            />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 px-4 sm:px-5 overflow-x-auto promo-scroll"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {PROMO_PROJECTS.map((p) => (
            <div
              key={p.id}
              className="shrink-0 bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
              style={{ width: 290, scrollSnapAlign: "start" }}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={p.img}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={p.title}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top,rgba(0,0,0,.55),transparent)",
                  }}
                />

                <div
                  className="absolute top-2.5 left-2.5 text-white text-xs font-800 px-2 py-0.5 rounded-full"
                  style={{ background: p.labelColor }}
                >
                  {p.label}
                </div>

                <div className="absolute bottom-2.5 left-2.5 flex gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-white text-xs font-700 px-1.5 py-0.5 rounded-md"
                      style={{
                        background: "rgba(0,0,0,.55)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute top-2.5 right-2.5 text-xs font-700 px-2 py-0.5 rounded-full bg-white/95 text-gray-700 shadow">
                  {p.badge}
                </div>
              </div>

              <div className="p-3">
                <h4 className="font-800 text-gray-900 text-sm leading-tight mb-0.5">
                  {p.title}
                </h4>
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                  <Ic d={ICONS.map} size={11} color="#9ca3af" />
                  {p.location}
                </div>
                <div className="text-xs text-gray-600 mb-2">{p.bhk}</div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="font-900 text-base"
                    style={{ color: "#FE6702" }}
                  >
                    {p.price}
                  </div>
                </div>

                <div
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg mb-3 text-xs font-600"
                  style={{ background: "#e5f5f4", color: "#02857E" }}
                >
                  <span>📈</span>
                  {p.highlight}
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-1 py-1.5 rounded-lg text-xs font-700 border-2 transition-all hover:bg-orange-50"
                    style={{ borderColor: "#FE6702", color: "#FE6702" }}
                  >
                    Brochure
                  </button>
                  <button
                    className="flex-1 py-1.5 rounded-lg text-xs font-700 text-white transition-all hover:opacity-90 flex items-center justify-center gap-1"
                    style={{ background: "#FE6702" }}
                  >
                    <Ic d={ICONS.phone} size={10} color="white" /> View No.
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div
            className="shrink-0 rounded-xl border-2 border-dashed border-orange-200 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all"
            style={{ width: 160, scrollSnapAlign: "start", minHeight: 270 }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
              style={{ background: "#fff4ec" }}
            >
              <Ic d={ICONS.arrow} size={18} color="#FE6702" />
            </div>
            <div
              className="text-sm font-800 text-center px-3"
              style={{ color: "#FE6702" }}
            >
              See All Projects
            </div>
            <div className="text-xs text-gray-400 text-center mt-1 px-3">
              200+ new launches
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LISTINGS_DATA = [
  {
    id: 1,
    title: "Ultra-Luxury 4BHK Penthouse",
    location: "Whitefield, Bangalore",
    price: 150000,
    area: 3000,
    bhk: "4 BHK",
    baths: 3,
    type: "Penthouse",
    status: "Ready To Move",
    furnished: "Fully Furnished",
    amenities: ["Private Elevator", "Rooftop", "Gym", "Concierge"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9aa51e3eac1f?w=700&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80",
    ],
    badge: "Luxury",
    badgeColor: "bg-purple-600",
    rating: 5.0,
    reviews: 12,
    verified: true,
    featured: true,
    highlights: ["Sky Terrace", "Smart Home", "Concierge Service"],
  },
  {
    id: 2,
    title: "Luxury 3BHK with Modern Amenities",
    location: "Koramangala, Bangalore",
    price: 85000,
    area: 2400,
    bhk: "3 BHK",
    baths: 2,
    type: "Apartment",
    status: "Ready To Move",
    furnished: "Fully Furnished",
    amenities: ["WiFi", "AC", "Gym", "Pool", "Parking", "Security"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80",
    ],
    badge: "Featured",
    badgeColor: "bg-orange-500",
    rating: 4.8,
    reviews: 45,
    verified: true,
    featured: true,
    highlights: ["Near Metro", "Green Space", "High Speed WiFi"],
  },
  {
    id: 3,
    title: "Stunning 2BHK with Garden View",
    location: "Jayanagar, Bangalore",
    price: 48000,
    area: 1920,
    bhk: "2 BHK",
    baths: 2,
    type: "Apartment",
    status: "Ready To Move",
    furnished: "Semi-Furnished",
    amenities: ["WiFi", "AC", "Parking", "Security"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=700&q=80",
    ],
    badge: "Hot Deal",
    badgeColor: "bg-red-500",
    rating: 4.5,
    reviews: 20,
    verified: true,
    featured: false,
    highlights: ["Garden View", "Close to Schools", "Peaceful"],
  },
  {
    id: 4,
    title: "Elegant 2BHK with Pool Access",
    location: "Bellandur, Bangalore",
    price: 62000,
    area: 2100,
    bhk: "2 BHK",
    baths: 2,
    type: "Apartment",
    status: "Ready To Move",
    furnished: "Fully Furnished",
    amenities: ["WiFi", "AC", "Pool", "Gym", "Club House"],
    images: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=700&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=700&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80",
    ],
    badge: "Featured",
    badgeColor: "bg-orange-500",
    rating: 4.5,
    reviews: 15,
    verified: true,
    featured: false,
    highlights: ["Club House", "Swimming Pool", "Landscape"],
  },
  {
    id: 5,
    title: "Modern 2BHK Semi-Furnished",
    location: "HSR Layout, Bangalore",
    price: 55000,
    area: 1950,
    bhk: "2 BHK",
    baths: 2,
    type: "Apartment",
    status: "Ready To Move",
    furnished: "Semi-Furnished",
    amenities: ["WiFi", "AC", "Gym", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=700&q=80",
    ],
    badge: "Hot Deal",
    badgeColor: "bg-red-500",
    rating: 4.6,
    reviews: 32,
    verified: true,
    featured: false,
    highlights: ["Garden", "Bright Rooms", "Good Ventilation"],
  },
  {
    id: 6,
    title: "Spacious 4BHK Villa",
    location: "Whitefield, Bangalore",
    price: 120000,
    area: 3200,
    bhk: "4 BHK",
    baths: 3,
    type: "Villa",
    status: "Ready To Move",
    furnished: "Fully Furnished",
    amenities: ["Private Pool", "Garden", "Parking", "CCTV", "Gym"],
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80",
      "https://images.unsplash.com/photo-1512917774080-9aa51e3eac1f?w=700&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80",
    ],
    badge: "Luxury",
    badgeColor: "bg-purple-600",
    rating: 4.9,
    reviews: 28,
    verified: true,
    featured: true,
    highlights: ["Private Garden", "Spacious Balcony", "Expert Builders"],
  },
  {
    id: 7,
    title: "Premium 3BHK with Terrace",
    location: "Marathahalli, Bangalore",
    price: 72000,
    area: 2300,
    bhk: "3 BHK",
    baths: 2,
    type: "Apartment",
    status: "Ready To Move",
    furnished: "Semi-Furnished",
    amenities: ["WiFi", "AC", "Gym", "Terrace", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=700&q=80",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=700&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80",
    ],
    badge: "New",
    badgeColor: "bg-blue-500",
    rating: 4.7,
    reviews: 22,
    verified: true,
    featured: true,
    highlights: ["Open Terrace", "Good Lighting", "Quiet Area"],
  },
  {
    id: 8,
    title: "Cozy 1BHK Studio Apartment",
    location: "Indiranagar, Bangalore",
    price: 35000,
    area: 1850,
    bhk: "1 BHK",
    baths: 1,
    type: "Apartment",
    status: "Immediate",
    furnished: "Fully Furnished",
    amenities: ["WiFi", "AC", "Security"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80",
    ],
    badge: "Budget Pick",
    badgeColor: "bg-green-600",
    rating: 4.4,
    reviews: 18,
    verified: true,
    featured: false,
    highlights: ["Near Metro", "Affordable", "Modern Amenities"],
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

const ImageSlider = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const scrollToImage = (index) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const newIndex = Math.round(
        sliderRef.current.scrollLeft / sliderRef.current.offsetWidth,
      );
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => slider.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="relative h-48 md:h-56 w-full group">
      <div
        ref={sliderRef}
        className="flex overflow-x-auto h-full image-slider rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="shrink-0 w-full h-full"
            style={{ scrollSnapAlign: "start" }}
          >
            <img
              src={img}
              alt={`${title} - ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      {images.length > 1 && (
        <>
          <button
            onClick={() => scrollToImage(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 hover:bg-white shadow-lg"
          >
            <Ic d={ICONS.chevronLeft} size={16} color="#374151" />
          </button>
          <button
            onClick={() => scrollToImage(currentIndex + 1)}
            disabled={currentIndex === images.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 hover:bg-white shadow-lg"
          >
            <Ic d={ICONS.chevronRight} size={16} color="#374151" />
          </button>
        </>
      )}
      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-700 px-2 py-1 rounded-lg">
        {currentIndex + 1}/{images.length}
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToImage(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ListingCard = ({ listing, saved, onToggleSave, idx }) => (
  <div
    className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all fadeIn"
    style={{ animationDelay: `${idx * 50}ms` }}
  >
    <div className="flex flex-col md:flex-row">
      <div className="md:w-80 lg:w-96 relative overflow-hidden group">
        <ImageSlider images={listing.images} title={listing.title} />
        <span
          className={`absolute top-3 left-3 text-white text-xs font-800 px-2.5 py-1 rounded-full ${listing.badgeColor}`}
        >
          {listing.badge}
        </span>
        <button
          onClick={() => onToggleSave(listing.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow transition-all hover:scale-110 z-10"
        >
          <Ic
            d={ICONS.heart}
            size={16}
            color={saved ? "#FE6702" : "#9ca3af"}
            stroke={saved ? 0 : 2}
          />
          {saved && (
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
      </div>

      <div className="flex-1 p-5">
        <div className="flex gap-2 mb-2 flex-wrap">
          {listing.verified && (
            <span
              className="text-xs font-700 px-2.5 py-1 rounded-full text-white flex items-center gap-1"
              style={{ background: "#02857E" }}
            >
              <Ic d={ICONS.check} size={10} color="white" />
              Verified
            </span>
          )}
          {listing.featured && (
            <span
              className="text-xs font-700 px-2.5 py-1 rounded-full text-white"
              style={{ background: "#FE6702" }}
            >
              Featured
            </span>
          )}
        </div>

        <h2 className="text-base sm:text-lg font-800 text-gray-900 mb-1">
          {listing.title}
        </h2>
        <div className="flex items-center gap-1.5 text-gray-600 text-sm mb-4">
          <Ic d={ICONS.map} size={14} color="#9ca3af" />
          {listing.location}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 font-600 mb-1">Price</div>
            <div className="font-900 text-lg" style={{ color: "#FE6702" }}>
              ₹{(listing.price / 1000).toFixed(0)}K
              <span className="text-xs text-gray-400 ml-1">/mo</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 font-600 mb-1">BHK</div>
            <div className="font-700 text-base text-gray-900">
              {listing.bhk}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 font-600 mb-1">Area</div>
            <div className="font-700 text-base text-gray-900">
              {listing.area} sqft
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 font-600 mb-1">Status</div>
            <span
              className="text-xs font-700 px-2 py-1 rounded text-white inline-block"
              style={{ background: "#02857E" }}
            >
              {listing.status === "Ready To Move" ? "Ready" : listing.status}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
          {listing.amenities.map((a) => (
            <span
              key={a}
              className="text-xs font-600 px-2.5 py-1 rounded-full flex items-center gap-1"
              style={{ background: "#e5f5f4", color: "#02857E" }}
            >
              <Ic d={ICONS.check} size={10} color="#02857E" />
              {a}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stars n={Math.round(listing.rating)} />
            <span className="text-sm text-gray-500 font-600">
              {listing.rating} ({listing.reviews})
            </span>
          </div>
          <span className="text-xs text-gray-400 font-600 hidden sm:inline">
            {listing.highlights.slice(0, 2).join(" • ")}
          </span>
        </div>

        <div className="flex gap-3 mt-4 sm:mt-5 pt-4 border-t border-gray-100">
          <button
            className="cursor-pointer flex-1 py-2.5 rounded-lg border-2 text-sm font-700 transition-all hover:bg-orange-50 active:scale-95"
            style={{ borderColor: "#FE6702", color: "#FE6702" }}
          >
            Details
          </button>
          <button
            className="cursor-pointer flex-1 py-2.5 rounded-lg text-white font-700 text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#02857E" }}
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function Listings() {
  const [filters, setFilters] = useState({
    location: "",
    bhk: "Any BHK",
    budget: "Any Budget",
    type: "Any Type",
    furnished: "Any",
    status: "Any Status",
  });
  const [savedIds, setSavedIds] = useState([1, 5]);
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleSave = (id) =>
    setSavedIds((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const filteredListings = LISTINGS_DATA.filter((l) => {
    const locMatch =
      filters.location === "" ||
      l.location.toLowerCase().includes(filters.location.toLowerCase());
    const bhkMatch = filters.bhk === "Any BHK" || l.bhk === filters.bhk;
    const typeMatch = filters.type === "Any Type" || l.type === filters.type;
    const furnMatch =
      filters.furnished === "Any" || l.furnished === filters.furnished;
    const statMatch =
      filters.status === "Any Status" || l.status === filters.status;
    const budgMatch =
      filters.budget === "Any Budget" ||
      (filters.budget === "Under ₹50K" && l.price < 50000) ||
      (filters.budget === "₹50K–₹75K" &&
        l.price >= 50000 &&
        l.price <= 75000) ||
      (filters.budget === "₹75K–₹100K" &&
        l.price > 75000 &&
        l.price <= 100000) ||
      (filters.budget === "Above ₹100K" && l.price > 100000);
    return (
      locMatch && bhkMatch && budgMatch && typeMatch && furnMatch && statMatch
    );
  });

  const sorted = [...filteredListings].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.id - a.id;
  });

  const renderListingsWithPromo = () => {
    const items = [];
    sorted.forEach((listing, idx) => {
      items.push(
        <ListingCard
          key={listing.id}
          listing={listing}
          saved={savedIds.includes(listing.id)}
          onToggleSave={toggleSave}
          idx={idx}
        />,
      );

      if ((idx + 1) % 4 === 0 && idx + 1 < sorted.length) {
        items.push(<PromoSlider key={`promo-${idx}`} />);
      }
    });
    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FontStyle />
      <Navbar />

      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex gap-6">
            <div
              className={`${mobileFiltersOpen ? "fixed inset-0 z-40 overflow-y-auto bg-black/50 pt-20" : "hidden"} md:block md:relative md:pt-0 md:bg-transparent w-full md:w-72 lg:w-80 shrink-0`}
            >
              <div className="bg-white rounded-xl border border-gray-100 p-5 md:p-6 sticky top-20">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-800 text-gray-900">Filters</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="md:hidden"
                  >
                    <Ic d={ICONS.x} size={18} color="#6b7280" />
                  </button>
                </div>

                <div className="mb-5 pb-5 border-b border-gray-100">
                  <label className="block text-sm font-700 text-gray-900 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Ic d={ICONS.map} size={14} color="#9ca3af" />
                    </div>
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, location: e.target.value }))
                      }
                      placeholder="Enter location..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pl-9 text-sm text-gray-700 placeholder-gray-400 focus:border-orange-400 transition-all"
                    />
                  </div>
                </div>

                <div className="mb-5 pb-5 border-b border-gray-100">
                  <label className="block text-sm font-700 text-gray-900 mb-2">
                    BHK
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Any BHK", "1 BHK", "2 BHK", "3 BHK", "4 BHK"].map(
                      (b) => (
                        <button
                          key={b}
                          onClick={() => setFilters((f) => ({ ...f, bhk: b }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-700 border transition-all ${filters.bhk === b ? "text-white border-transparent" : "text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500"}`}
                          style={
                            filters.bhk === b
                              ? {
                                  background: "#FE6702",
                                  borderColor: "#FE6702",
                                }
                              : {}
                          }
                        >
                          {b}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="mb-5 pb-5 border-b border-gray-100">
                  <label className="block text-sm font-700 text-gray-900 mb-2">
                    Budget (Monthly)
                  </label>
                  <div className="space-y-1">
                    {[
                      "Any Budget",
                      "Under ₹50K",
                      "₹50K–₹75K",
                      "₹75K–₹100K",
                      "Above ₹100K",
                    ].map((b) => (
                      <button
                        key={b}
                        onClick={() => setFilters((f) => ({ ...f, budget: b }))}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${filters.budget === b ? "text-white" : "text-gray-700 hover:bg-orange-50"}`}
                        style={
                          filters.budget === b ? { background: "#FE6702" } : {}
                        }
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5 pb-5 border-b border-gray-100">
                  <label className="block text-sm font-700 text-gray-900 mb-2">
                    Property Type
                  </label>
                  <div className="space-y-1">
                    {["Any Type", "Apartment", "Villa", "Penthouse"].map(
                      (t) => (
                        <button
                          key={t}
                          onClick={() => setFilters((f) => ({ ...f, type: t }))}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${filters.type === t ? "text-white" : "text-gray-700 hover:bg-orange-50"}`}
                          style={
                            filters.type === t ? { background: "#FE6702" } : {}
                          }
                        >
                          {t}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="mb-5 pb-5 border-b border-gray-100">
                  <label className="block text-sm font-700 text-gray-900 mb-2">
                    Furnished
                  </label>
                  <div className="space-y-1">
                    {["Any", "Fully Furnished", "Semi-Furnished"].map((f) => (
                      <button
                        key={f}
                        onClick={() =>
                          setFilters((s) => ({ ...s, furnished: f }))
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${filters.furnished === f ? "text-white" : "text-gray-700 hover:bg-orange-50"}`}
                        style={
                          filters.furnished === f
                            ? { background: "#FE6702" }
                            : {}
                        }
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-700 text-gray-900 mb-2">
                    Availability
                  </label>
                  <div className="space-y-1">
                    {["Any Status", "Ready To Move", "Immediate"].map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          setFilters((st) => ({ ...st, status: s }))
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${filters.status === s ? "text-white" : "text-gray-700 hover:bg-orange-50"}`}
                        style={
                          filters.status === s ? { background: "#FE6702" } : {}
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    setFilters({
                      location: "",
                      bhk: "Any BHK",
                      budget: "Any Budget",
                      type: "Any Type",
                      furnished: "Any",
                      status: "Any Status",
                    })
                  }
                  className="w-full py-2.5 rounded-lg text-sm font-700 border transition-all hover:bg-orange-50"
                  style={{ borderColor: "#FE6702", color: "#FE6702" }}
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h1 className="serif text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {sorted.length}{" "}
                      <span style={{ color: "#FE6702" }}>Properties Found</span>
                    </h1>
                    <p className="text-sm text-gray-500">
                      Handpicked verified rentals for you
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMobileFiltersOpen(true)}
                      className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-700 transition-all hover:bg-orange-50"
                      style={{ borderColor: "#FE6702", color: "#FE6702" }}
                    >
                      <Ic d={ICONS.filter} size={14} color="#FE6702" />
                      Filters
                    </button>
                    <span className="text-sm text-gray-600 font-700 whitespace-nowrap hidden sm:inline">
                      Sort by:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 font-600 focus:border-orange-400 transition-all"
                    >
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {sorted.length > 0 ? (
                <div className="space-y-4">{renderListingsWithPromo()}</div>
              ) : (
                <div className="text-center py-16">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "#f0fdf4" }}
                  >
                    <Ic d={ICONS.search} size={36} color="#02857E" />
                  </div>
                  <h3 className="text-xl font-800 text-gray-900 mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    Try adjusting your filters to find more results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
