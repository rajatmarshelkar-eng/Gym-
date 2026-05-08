import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import GymStore from "../GymStore";

// ─── SVG ICONS (Neon theme) ──────────────────────────────────────────────────
const IconLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 5V11C4 16.19 7.41 21.05 12 22C16.59 21.05 20 16.19 20 11V5L12 2Z" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 8H15M9 12H13M9 8V16" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="bevel"/>
  </svg>
);
const IconDumbbell = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6.5 7h11"/><path d="M6.5 17h11"/><path d="m6.5 7-4 5 4 5"/><path d="m17.5 7 4 5-4 5"/></svg>);
const IconFire = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>);
const IconLightning = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"/></svg>);
const IconYoga = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 10 3.5 3.5L12 17l-3.5-3.5L12 10Z"/><path d="m12 10 2-2h4l-2 2-2 2Z"/><path d="m12 10-2-2H6l2 2 2 2Z"/><path d="M12 17l2 2h4l-2-2-2-2Z"/><path d="M12 17l-2 2H6l2-2 2-2Z"/><circle cx="12" cy="7" r="2"/></svg>);
const IconBoxing = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M18 8a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4h12Z"/></svg>);
const IconTarget = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
const IconUser = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const IconTrophy = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 17v5"/><path d="M14 17v5"/><path d="M12 13c-3.5 0-6-2-6-5V4h12v4c0 3-2.5 5-6 5z"/></svg>);
const IconCalendar = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const IconClock = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const IconLocation = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
const IconPhone = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const IconMail = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>);
const IconCheck = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>);
const IconStar = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27"/></svg>);
const IconArrowRight = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);
const IconScroll = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>);
const IconQuote = () => (<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4Z"/><path d="M17 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4Z"/><path d="M8 5v12"/><path d="M15 5v12"/></svg>);
const IconHeart = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>);
const IconWhatsApp = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>);
const IconPlay = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>);
const IconCrown = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 18h20"/><path d="M5 18V8l3 4 4-6 4 6 3-4v10"/><path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M19 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>);
const IconBot = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>);
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 1 9 22 2"/>
  </svg>
);

const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

// ─── LUXURY THEME CONSTANTS ──────────────────────────────────────────────────
const PRIMARY = "#D4AF37";     // Metallic Gold Accent
const SECONDARY = "#FF4500";   // Red-Orange CTA color
const PRIMARY_DARK = "#A6861F"; 
const DARK_BG = "#0B0B0B";     // Matte Black Background
const CARD_BG = "#141417";     // Luxury Charcoal
const TEXT_LIGHT = "#F5F5F5";  // Soft Warm White
const TEXT_GRAY = "#8C8C8C";   // Muted Slate
const TEXT_MUTED = "#3E3E42";  // Darker Borders

const BrandIconYouTube = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/>
    <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/>
  </svg>
);
const BrandIconInstagram = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#insta-grad)"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm-3 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" fill="white"/>
    <circle cx="17.25" cy="6.75" r="1.125" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3Zm3 13.5a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9Z" fill="white"/>
    <defs>
      <linearGradient id="insta-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#f09433"/><stop offset="0.25" stopColor="#e6683c"/><stop offset="0.5" stopColor="#dc2743"/><stop offset="0.75" stopColor="#cc2366"/><stop offset="1" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
  </svg>
);
const BrandIconLinkedIn = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#0077B5"/>
    <path d="M7.12 20.452H3.558V8.995H7.12v11.457zM5.339 7.433c-1.146 0-2.071-.926-2.071-2.065 0-1.146.925-2.071 2.071-2.071 1.146 0 2.065.925 2.065 2.071 0 1.139-.92 2.065-2.065 2.065zm15.112 13.019h-3.557v-5.569c0-1.328-.024-3.037-1.852-3.037-1.855 0-2.139 1.445-2.139 2.939v5.667H9.351V8.995h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.291z" fill="white"/>
  </svg>
);
const BrandIconFacebook = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078v-3.47h3.047V9.35c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" fill="#1877F2"/>
    <path d="M15.83 15.47l.532-3.47h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.536V4.923s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.643H7.078v3.47h3.047v8.385a12.09 12.09 0 003.75 0V15.47h2.956z" fill="white"/>
  </svg>
);
const BrandIconX = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="black"/>
    <path d="M14.191 10.563l5.514-6.41h-1.307l-4.787 5.565-3.824-5.565H5.34l5.783 8.414-5.783 6.723h1.307l5.056-5.88 4.047 5.88h4.437l-6.002-8.73zm-1.79 2.08l-.586-.838-4.666-6.674h2.007l3.705 5.3.586.838 4.9 7.007h-2.007l-3.939-5.633z" fill="white"/>
  </svg>
);

const NAV_LINKS = ["Home", "Transformations", "Store", "Programs", "Trainers", "Membership", "Schedule", "Contact"];

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROGRAMS = [
  { title: "Strength Training", desc: "Build raw power & sculpt muscle with progressive overload.", color: PRIMARY, icon: IconDumbbell, tag: "POWER", duration: "60 min", level: "Advanced", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2ec617?auto=format&fit=crop&q=80&w=600" },
  { title: "Cardio Blast", desc: "Torch calories & boost endurance with high-intensity cardio.", color: PRIMARY, icon: IconFire, tag: "BURN", duration: "45 min", level: "Intermediate", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=600" },
  { title: "HIIT Sessions", desc: "Maximum results in minimum time. Total body destruction.", color: PRIMARY, icon: IconLightning, tag: "EXTREME", duration: "30 min", level: "Advanced", image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=600" },
  { title: "Yoga Flow", desc: "Restore, flex, and center your mind-body connection deeply.", color: PRIMARY, icon: IconYoga, tag: "RESTORE", duration: "75 min", level: "All Levels", image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=600" },
  { title: "Boxing Training", desc: "Unleash aggression. Master footwork & defensive moves.", color: PRIMARY, icon: IconBoxing, tag: "FIGHT", duration: "60 min", level: "Intermediate", image: "https://images.unsplash.com/photo-1550259979-ed79b48d2a30?auto=format&fit=crop&q=80&w=600" },
  { title: "Hyrox Prep", desc: "The trending global fitness race. Combine running & functional movement.", color: PRIMARY, icon: IconTrophy, tag: "TRENDING", duration: "90 min", level: "Advanced", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600" },
  { title: "CrossFit", desc: "Functional fitness at its peak — constantly varied, high intensity.", color: PRIMARY, icon: IconTarget, tag: "ELITE", duration: "50 min", level: "Advanced", image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600" },
  { title: "Personal Coaching", desc: "1-on-1 sessions tailored to your unique goals and body type.", color: PRIMARY, icon: IconUser, tag: "VIP", duration: "60 min", level: "All Levels", image: "https://images.unsplash.com/photo-1591117207239-7ad59a042d62?auto=format&fit=crop&q=80&w=600" },
  { title: "Mobility & Recovery", desc: "Latest recovery techniques to improve movement and reduce injury risk.", color: PRIMARY, icon: IconHeart, tag: "LATEST", duration: "45 min", level: "All Levels", image: "https://images.unsplash.com/photo-1522845015757-50bce044e5da?auto=format&fit=crop&q=80&w=600" },
];

const TRAINERS = [
  { name: "Alex Carter", role: "Strength Coach", exp: "12 Years", rating: 5, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=500&fit=crop", specialty: "Powerlifting", cert: "NSCA-CPT", social: { insta: "#", twitter: "#", linkedin: "#" } },
  { name: "Sophia Reed", role: "Yoga Expert", exp: "8 Years", rating: 5, image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop", specialty: "Vinyasa Flow", cert: "RYT-500", social: { insta: "#", twitter: "#", linkedin: "#" } },
  { name: "Ryan Cole", role: "HIIT Trainer", exp: "10 Years", rating: 5, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop", specialty: "Metabolic Conditioning", cert: "NASM", social: { insta: "#", twitter: "#", linkedin: "#" } },
  { name: "Emma Stone", role: "Nutrition Coach", exp: "6 Years", rating: 5, image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=500&fit=crop", specialty: "Sports Nutrition", cert: "ISSN", social: { insta: "#", twitter: "#", linkedin: "#" } },
  { name: "Mike Johnson", role: "Boxing Coach", exp: "15 Years", rating: 5, image: "https://images.unsplash.com/photo-1552074284-5e88ef1c4a14?w=400&h=500&fit=crop", specialty: "Technical Boxing", cert: "USA Boxing", social: { insta: "#", twitter: "#", linkedin: "#" } },
  { name: "Jessica Lee", role: "CrossFit Trainer", exp: "7 Years", rating: 5, image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=500&fit=crop", specialty: "Olympic Lifting", cert: "CF-L3", social: { insta: "#", twitter: "#", linkedin: "#" } },
];

const CATEGORY_COLORS = {
  strength: "#8B0000", // Deep Maroon
  cardio: "#1E3A8A",   // Navy Blue
  yoga: "#8A2BE2",     // Soft Violet
  hiit: "#FFBF00",     // Warm Amber
  boxing: "#708090",   // Slate Gray
  crossfit: "#5A6268", // Muted tone
  recovery: "#6B7280", // Using text gray for consistency
  spin: "#1E3A8A",     // Using cardio color
  pilates: "#8A2BE2",  // Using yoga color
};

const PLANS = [
  { label: "PRO", title: "PRO Membership", tagline: "Unlimited gym workouts", price: "899", offer: "Get FREE 3 months + ₹4000 off", location: "All Centers", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600" },
  { label: "ELITE", title: "ELITE Membership", tagline: "Gym + group classes access", price: "1,199", offer: "2 months free + ₹3000 off", location: "Premium Centers", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600" },
  { label: "TRANSFORM", title: "TRANSFORM Membership", tagline: "Personal trainer included", price: "1,999", offer: "Free diet plan + 1 month free", location: "Elite Centers", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2ec617?auto=format&fit=crop&q=80&w=600" },
  { label: "YOGA", title: "YOGA Membership", tagline: "Mind & body balance", price: "699", offer: "1 month free", location: "Studio Centers", image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=600" },
  { label: "HIIT", title: "HIIT Membership", tagline: "High intensity fat burn", price: "999", offer: "Free trial + ₹2000 off", location: "Power Centers", image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=600" },
  { label: "STRENGTH", title: "STRENGTH Membership", tagline: "Build muscle & power", price: "1,099", offer: "2 months extension", location: "Iron Centers", image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600" },
  { label: "CARDIO", title: "CARDIO Membership", tagline: "Endurance & stamina", price: "799", offer: "Free cardio kit", location: "Standard Centers", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=600" },
  { label: "SPORTS", title: "SPORTS Membership", tagline: "Play & train like athlete", price: "1,299", offer: "Free sports access", location: "Field Centers", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600" },
  { label: "PREMIUM PLUS", title: "PREMIUM PLUS Membership", tagline: "All access + trainer + diet", price: "2,499", offer: "₹5000 off + free consultation", location: "Luxury Hubs", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600" },
  { label: "BEGINNER", title: "BEGINNER Membership", tagline: "Start your fitness journey", price: "499", offer: "Free onboarding", location: "Basic Centers", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600" }
];

const SCHEDULE = {
  Monday: [{ time: "6AM", name: "Strength", cat: "strength" }, { time: "9AM", name: "Yoga Flow", cat: "yoga" }, { time: "6PM", name: "HIIT", cat: "hiit" }, { time: "7PM", name: "Spin", cat: "cardio" }],
  Tuesday: [{ time: "7AM", name: "Cardio", cat: "cardio" }, { time: "12PM", name: "Boxing", cat: "boxing" }, { time: "7PM", name: "Strength", cat: "strength" }, { time: "8PM", name: "Pilates", cat: "yoga" }],
  Wednesday: [{ time: "6AM", name: "HIIT", cat: "hiit" }, { time: "10AM", name: "Yoga", cat: "yoga" }, { time: "5PM", name: "Cardio", cat: "cardio" }, { time: "6PM", name: "CrossFit", cat: "crossfit" }],
  Thursday: [{ time: "7AM", name: "Boxing", cat: "boxing" }, { time: "1PM", name: "Strength", cat: "strength" }, { time: "6PM", name: "HIIT", cat: "hiit" }, { time: "7PM", name: "Recovery", cat: "yoga" }],
  Friday: [{ time: "6AM", name: "Cardio", cat: "cardio" }, { time: "9AM", name: "HIIT", cat: "hiit" }, { time: "7PM", name: "Yoga", cat: "yoga" }, { time: "8PM", name: "Boxing", cat: "boxing" }],
  Saturday: [{ time: "8AM", name: "CrossFit", cat: "strength" }, { time: "11AM", name: "Yoga", cat: "yoga" }, { time: "4PM", name: "Boxing", cat: "boxing" }, { time: "5PM", name: "Spin", cat: "cardio" }],
  Sunday: [{ time: "9AM", name: "Recovery", cat: "yoga" }, { time: "11AM", name: "Strength", cat: "strength" }, { time: "5PM", name: "HIIT", cat: "hiit" }, { time: "6PM", name: "Yoga Flow", cat: "yoga" }],
};

const TRANSFORMATIONS = [
  { name: "Marcus J.", before: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800", after: "https://images.unsplash.com/photo-1583454110551-21f2fa2ec617?auto=format&fit=crop&q=80&w=800", loss: "28kg", time: "5 months" },
  { name: "Priya K.", before: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800", after: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800", loss: "20kg", time: "4 months" },
  { name: "Derek R.", before: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800", after: "https://images.unsplash.com/photo-1581009146145-b5ef0503a740?auto=format&fit=crop&q=80&w=800", loss: "21kg", time: "6 months" },
  { name: "Sarah L.", before: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800", after: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800", loss: "15kg", time: "3 months" },
  { name: "James T.", before: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=800", after: "https://images.unsplash.com/photo-1599058917232-d750c18590c4?auto=format&fit=crop&q=80&w=800", loss: "12kg", time: "3 months" },
  { name: "Elena V.", before: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800", after: "https://images.unsplash.com/photo-1550259979-ed79b48d2a30?auto=format&fit=crop&q=80&w=800", loss: "18kg", time: "5 months" },
  { name: "Raj M.", before: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800", after: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800", loss: "25kg", time: "6 months" },
  { name: "Chloe W.", before: "https://images.unsplash.com/photo-1522845015757-50bce044e5da?auto=format&fit=crop&q=80&w=800", after: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800", loss: "10kg", time: "2 months" },
  { name: "David H.", before: "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?auto=format&fit=crop&q=80&w=800", after: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800", loss: "30kg", time: "8 months" },
  { name: "Anita S.", before: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800", after: "https://images.unsplash.com/photo-1552074284-5e88ef1c4a14?auto=format&fit=crop&q=80&w=800", loss: "14kg", time: "4 months" },
];

const TESTIMONIALS = [
  { name: "Marcus J.", text: "Lost 28kg in 5 months. The trainers here are absolutely elite. Nothing like it.", stars: 5, role: "Member since 2024" },
  { name: "Priya K.", text: "HIIT classes changed my life. Energy, community, results. I'm addicted.", stars: 5, role: "Fitness Enthusiast" },
  { name: "Derek R.", text: "Best investment I've ever made. Pro plan gave me PT sessions that made the difference.", stars: 5, role: "Pro Member" },
];

const FEATURES = [
  { icon: IconDumbbell, title: "World-Class Equipment", desc: "Over 300 machines, free weights & functional zones." },
  { icon: IconTarget, title: "Science-Based Programs", desc: "Evidence-driven training by certified experts." },
  { icon: IconClock, title: "Flexible Schedule", desc: "Classes from 5AM to 11PM, 7 days a week." },
  { icon: IconUser, title: "Supportive Community", desc: "Connect with like-minded fitness enthusiasts." },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };
const scaleOnHover = { whileHover: { scale: 1.05, transition: { duration: 0.2 } }, whileTap: { scale: 0.98 } };

// Audio utility for subtle hover effect on Join buttons
const hoverSFX = typeof Audio !== "undefined" ? new Audio("https://www.soundjay.com/buttons/sounds/button-20.mp3") : null;
const clickSFX = typeof Audio !== "undefined" ? new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3") : null;
const beepSFX = typeof Audio !== "undefined" ? new Audio("https://www.soundjay.com/misc/sounds/beep-01a.mp3") : null;
const botMsgSFX = typeof Audio !== "undefined" ? new Audio("https://www.soundjay.com/buttons/sounds/button-30.mp3") : null;

const playHoverSound = () => {
  if (!hoverSFX) return;
  hoverSFX.currentTime = 0;
  hoverSFX.volume = 0.1;
  hoverSFX.play().catch(() => {});
};

const playClickSound = () => {
  if (!clickSFX) return;
  clickSFX.currentTime = 0;
  clickSFX.volume = 0.25;
  clickSFX.play().catch(() => {});
};

const playBeepSound = () => {
  if (!beepSFX) return;
  beepSFX.currentTime = 0;
  beepSFX.volume = 0.3; // Slightly louder than hover for a clear activation sound
  beepSFX.play().catch(() => {});
};

const playBotMsgSound = () => {
  if (!botMsgSFX) return;
  botMsgSFX.currentTime = 0;
  botMsgSFX.volume = 0.15;
  botMsgSFX.play().catch(() => {});
};

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0; const step = target / 60;
    const t = setInterval(() => { start += step; if (start >= target) { setCount(Math.floor(target)); clearInterval(t); } else setCount(Math.floor(start)); }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function Stars({ n }) {
  return <div className="flex gap-0.5" style={{ color: PRIMARY }}>{Array.from({ length: n }).map((_, i) => <IconStar key={i} />)}</div>;
}

// ─── BEFORE/AFTER SLIDER ─────────────────────────────────────────────────────
function BeforeAfterSlider({ before, after, name, loss, time }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (e) => {
    if (!isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    if (clientX === undefined) return;
    let x = clientX - rect.left;
    x = Math.min(Math.max(x, 0), rect.width);
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  // Added requestAnimationFrame wrapper for smoother movement
  const onMouseMove = (e) => requestAnimationFrame(() => handleMove(e));

  useEffect(() => {
    const handleMouseUp = () => (isDragging.current = false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden cursor-ew-resize group border border-white/10 hover:border-[#C9A03D]/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
      style={{ height: "320px", background: "#111" }}
      onMouseDown={() => (isDragging.current = true)}
      onMouseMove={onMouseMove}
      onTouchStart={() => (isDragging.current = true)}
      onTouchMove={onMouseMove}
    >
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden z-10" style={{ width: `${sliderPosition}%` }}>
        <img src={before} alt="Before" className="w-full h-full object-cover" style={{ width: `${100 / (sliderPosition / 100)}%` }} />
      </div>
      {/* Slider Bar */}
      <div className="absolute top-0 bottom-0 w-1 group-hover:w-1.5 transition-all duration-300 shadow-[0_0_20px_rgba(201,160,61,0.6)]" style={{ left: `${sliderPosition}%`, backgroundColor: PRIMARY }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-2 border-[#1E1E1E]" style={{ backgroundColor: PRIMARY }}>
          <svg className="w-6 h-6 text-[#1E1E1E]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18m-4 4l4-4m0 0l-4-4" /></svg>
        </div>
      </div>
      {/* Labels */}
      <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white border border-white/20">Before</div>
      <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white border border-white/20">After</div>
      
      {/* Header Info */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center">
        <span className="text-sm font-black uppercase tracking-wider text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>{name}</span>
        <span className="text-[11px] font-black px-3 py-1 rounded bg-[#C9A03D] text-[#1E1E1E] uppercase tracking-tighter">-{loss} • {time}</span>
      </div>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ active, setActive, cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { 
    const handleScroll = () => setScrolled(window.scrollY > 50); 
    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex items-center h-20
        ${scrolled ? 'bg-[#0B0B0B]/85 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}
    >
      {/* Glass Reflection Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] -translate-x-full" />
      
      <div className="max-w-[1600px] w-full mx-auto px-10 md:px-20 flex items-center justify-between relative">

        {/* LOGO (LEFT) */}
        <div className="flex items-center gap-3 cursor-pointer group relative" onClick={() => setActive("Home")}>
          <div className="absolute -inset-2 bg-[#D4AF37] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
          <div style={{ color: PRIMARY }}><IconLogo /></div>
          <span className="text-2xl font-bold tracking-[0.05em] text-[#F5F5F5] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
            FORGE<span className="text-[#D4AF37]">GYM</span>
          </span>
        </div>

        {/* NAVIGATION LINKS (CENTER) */}
        <div className="hidden lg:flex items-center gap-x-12">
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 py-1 group
                ${active === link ? 'text-[#D4AF37]' : 'text-[#A1A1AA] hover:text-[#F5F5F5]'}`}
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {link}
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-500 group-hover:w-full
                ${active === link ? 'w-full shadow-[0_0_10px_rgba(212,175,55,0.5)]' : ''}`}
              />
            </button>
          ))}
        </div>

        {/* CTA (RIGHT) */}
        <div className="flex items-center gap-10">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActive("Membership")}
            className="hidden md:flex h-11 px-10 items-center justify-center text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-500 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0B]"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Join Now
          </motion.button>

          {/* Global Cart Indicator */}
          <div className="relative cursor-pointer text-[#F5F5F5] p-2 transition-all hover:text-[#D4AF37] hover:scale-110" onClick={() => setActive("Store")}>
            <IconCart />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D4AF37] text-[#0B0B0B] text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile Menu Toggle - Professional clean style */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 w-10 h-10 items-center justify-center py-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`h-[1.5px] w-6 bg-[#F5F5F5] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <div className={`h-[1.5px] w-6 bg-[#F5F5F5] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0A0A0C] border-t border-white/5 py-10 flex flex-col items-center gap-6 z-40 lg:hidden"
          >
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => { setActive(link); setMobileMenuOpen(false); }}
                className="text-lg font-bold uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37]"
              >
                {link}
              </button>
            ))}
            <div className="flex flex-col gap-3 w-full px-10 mt-4">
              <button className="h-12 w-full border border-[#D4AF37] text-[#D4AF37] uppercase text-xs font-bold tracking-widest">Free Trial</button>
              <button className="h-12 w-full bg-[#D4AF37] text-[#0B0B0B] uppercase text-xs font-bold tracking-widest">Join Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────────────────────
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left" style={{ scaleX, background: `linear-gradient(90deg,${PRIMARY},${SECONDARY})` }} />;
}

// ─── FLOATING WHATSAPP BUTTON ────────────────────────────────────────────────
function FloatingWhatsApp() {
  const phoneNumber = "919876543210";
  const message = "Hi! I'm interested in joining ForgeGym. Can you share more information about our premium memberships and a free trial?";
  return (
    <motion.a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.5, type: "spring" }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50 rounded-full px-5 py-3 flex items-center gap-2 shadow-2xl"
      style={{ background: "#25D366", color: "#FFFFFF", fontWeight: "bold", fontFamily: "'Barlow Condensed',sans-serif", boxShadow: `0 10px 30px #25D36680` }}>
      <IconWhatsApp /> Chat on WhatsApp
    </motion.a>
  );
}

// ─── FLOATING JOIN BUTTON ────────────────────────────────────────────────────
function FloatingJoinBtn({ setActive }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.button 
      initial={{ scale: 0, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      transition={{ delay: 2, type: "spring" }}
      onHoverStart={() => {
        setIsHovered(true);
        playHoverSound();
      }}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.9 }} 
      onClick={() => {
        setActive("Membership");
        playClickSound();
      }}
      className="fixed bottom-6 right-6 z-50 rounded-full px-6 py-3.5 text-xs font-black uppercase tracking-widest shadow-2xl flex items-center gap-2"
      style={{ 
        background: 'linear-gradient(110deg, #C9A03D 25%, #FFF5A5 48%, #FFFFFF 50%, #FFF5A5 52%, #B8860B 75%)',
        backgroundSize: '200% auto',
        color: "#1E1E1E", 
        fontFamily: "'Barlow Condensed',sans-serif", 
        boxShadow: `0 10px 30px rgba(201, 160, 61, 0.5)` 
      }}
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ 
        backgroundPosition: { duration: isHovered ? 1.2 : 4, repeat: Infinity, ease: "linear", repeatDelay: isHovered ? 0.3 : 2 }
      }}
    >
      JOIN NOW <IconLightning style={{ width: 14, height: 14 }} />
    </motion.button>
  );
}

// ─── HOME PAGE with VIDEO BACKGROUND ─────────────────────────────────────────
function HomePage({ setActive }) {
  const [tIdx, setTIdx] = useState(0);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  useEffect(() => { const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5000); return () => clearInterval(t); }, []);

  const stats = [
    { val: 12000, suf: "+", label: "Active Members" }, 
    { val: 45000, suf: "kg+", label: "Weight Lost" }, 
    { val: 99, suf: "%", label: "Success Rate" }, 
    { val: 85, suf: "+", label: "Expert Trainers" }
  ];

  return (
    <div>
      {/* HERO with IMAGE BACKGROUND */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920" alt="Forge Gym Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 20% 50%, ${PRIMARY}30 0%, transparent 60%)` }} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto pt-24 md:pt-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-8 py-3 mb-10 text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase rounded-none relative overflow-hidden" 
            style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: `1px solid ${PRIMARY}40`, 
              color: TEXT_LIGHT,
              backdropFilter: "blur(10px)",
              fontFamily: "'Barlow Condensed', sans-serif" 
            }}
          >
            <motion.div 
              className="absolute inset-0" 
              style={{ 
                background: 'linear-gradient(110deg, transparent 20%, rgba(201, 160, 61, 0.15) 45%, rgba(255, 255, 255, 0.3) 50%, rgba(201, 160, 61, 0.15) 55%, transparent 80%)',
                backgroundSize: '200% auto'
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
            <span className="flex items-center gap-2 relative z-10">
              <span style={{ color: PRIMARY }}><IconLightning style={{ width: 14, height: 14 }} /></span>
              <span className="drop-shadow-sm">Elite Performance Training Since 2010</span>
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black uppercase leading-[1.0] mb-8 cursor-default transition-all duration-300" 
            style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(3.5rem,14vw,8.5rem)", letterSpacing: "-0.04em" }}>
            <motion.span 
              className="inline-block" 
              style={{ 
                background: 'linear-gradient(110deg, #F5F5F5 25%, #9E9E9E 48%, #FFFFFF 50%, #9E9E9E 52%, #F5F5F5 75%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent'
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 } }}
            >Transform</motion.span><br />
            <motion.span 
              className="inline-block" 
              style={{ 
                background: 'linear-gradient(110deg, #C9A03D 25%, #FFF5A5 48%, #FFFFFF 50%, #FFF5A5 52%, #B8860B 75%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent'
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2.2 } }}
            >Your Body,</motion.span><br />
            <motion.span 
              className="inline-block" 
              style={{ 
                background: 'linear-gradient(110deg, #F5F5F5 25%, #9E9E9E 48%, #FFFFFF 50%, #9E9E9E 52%, #F5F5F5 75%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent'
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2.4 } }}
            >Transform Your</motion.span>{" "}
            <motion.span 
              className="inline-block" 
              style={{ 
                background: 'linear-gradient(110deg, #C9A03D 25%, #FFF5A5 48%, #FFFFFF 50%, #FFF5A5 52%, #B8860B 75%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent'
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2.6 } }}
            >Life.</motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} 
            className="text-sm md:text-base mb-14 max-w-xl mx-auto font-medium uppercase tracking-[0.25em]" 
            style={{ color: TEXT_GRAY, fontFamily: "'Barlow',sans-serif" }}>Where champions are forged. Science-backed training. Elite coaching. Unbreakable community.</motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-5 justify-center flex-wrap">
            <motion.button 
              {...scaleOnHover} 
              onHoverStart={() => {
                setIsBtnHovered(true);
                playHoverSound();
              }}
              onHoverEnd={() => setIsBtnHovered(false)}
              onClick={() => {
                setActive("Membership");
                playClickSound();
              }} 
              className="h-14 px-12 text-[11px] font-black uppercase tracking-[0.4em] rounded-none flex items-center gap-3 relative overflow-hidden group border border-[#C5A028]" 
              style={{ 
                background: 'linear-gradient(110deg, #C9A03D 25%, #FFF5A5 48%, #FFFFFF 50%, #FFF5A5 52%, #B8860B 75%)',
                backgroundSize: '200% auto',
                color: "#1E1E1E", 
                fontFamily: "'Barlow Condensed',sans-serif", 
                boxShadow: `0 15px 40px rgba(197, 160, 40, 0.2)` 
              }}
              animate={{ 
                backgroundPosition: ["200% 0", "-200% 0"],
              }}
              transition={{ 
                backgroundPosition: { duration: isBtnHovered ? 1.2 : 4, repeat: Infinity, ease: "linear", repeatDelay: isBtnHovered ? 0.3 : 2 },
              }}
            >
              <span className="relative z-10">Join Now</span> <IconArrowRight />
            </motion.button>
            <motion.button 
              {...scaleOnHover} 
              onClick={() => setActive("Contact")} 
              className="h-14 px-12 text-[11px] font-black uppercase tracking-[0.4em] rounded-none flex items-center gap-3 border border-white/20 hover:border-[#C5A028]" 
              style={{ color: TEXT_LIGHT, background: "rgba(255,255,255,0.03)", fontFamily: "'Barlow Condensed',sans-serif", backdropFilter: "blur(10px)" }}>
              Free Trial <IconPlay />
            </motion.button>
          </motion.div>
          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}>
            <span className="text-xs tracking-widest uppercase" style={{ color: TEXT_MUTED }}>Scroll</span>
            <IconScroll style={{ color: TEXT_LIGHT }} />
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ background: "#111", borderTop: "1px solid rgba(207, 209, 211, 0.1)", borderBottom: "1px solid rgba(207, 209, 211, 0.1)" }}>
        <motion.div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #cfd1d3, transparent)" }} animate={{ x: ["-100%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <motion.div key={s.label} variants={fadeUp} className="text-center group" whileHover={{ y: -5 }}>
              <div className="text-5xl md:text-7xl font-black mb-2" 
                style={{ 
                  fontFamily: "'Oswald',sans-serif", 
                  background: `linear-gradient(
                    to bottom,
                    #cfd1d3 0%,
                    #e7e9eb 20%,
                    #afb2b5 40%,
                    #717377 50%,
                    #cfd1d3 70%,
                    #ffffff 80%,
                    #9a9da0 100%
                  )`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>
                <AnimatedCounter target={s.val} suffix={s.suf} />
              </div>
              <div className="text-xs tracking-[0.3em] font-black uppercase" 
                style={{ color: TEXT_GRAY, fontFamily: "'Barlow Condensed',sans-serif" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TRANSFORMATIONS PREVIEW */}
      <section className="py-24 px-4" style={{ background: "#111", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>Success Stories</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase" style={{ fontFamily: "'Oswald',sans-serif", color: TEXT_LIGHT }}>
            Elite <span style={{ color: PRIMARY }}>Results</span>
          </h2>
        </motion.div>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRANSFORMATIONS.slice(0, 3).map((t, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <BeforeAfterSlider {...t} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setActive("Transformations"); window.scrollTo(0,0); }}
            className="px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
            style={{ border: `1px solid ${PRIMARY}`, color: PRIMARY }}
          >
            View All Transformations
          </motion.button>
        </div>
      </section>

      {/* STORE PREVIEW / CTA */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ background: "#0B0B0B" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1200')", backgroundSize: 'cover', filter: 'grayscale(100%)' }} />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex-1">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>Performance Fuel</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6" style={{ fontFamily: "'Oswald',sans-serif" }}>
              <span style={{
                background: `linear-gradient(
                  to bottom,
                  #cfd1d3 0%,
                  #e7e9eb 20%,
                  #afb2b5 40%,
                  #717377 50%,
                  #cfd1d3 70%,
                  #ffffff 80%,
                  #9a9da0 100%
                )`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
              }}>Elite</span>{' '}
              <span style={{
                background: `linear-gradient(to bottom, #FFD700 0%, #FFEC8B 20%, #DAA520 40%, #B8860B 50%, #FFD700 70%, #FFFACD 80%, #B8860B 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
              }}>Supplements</span>
            </h2>
            <p className="text-base mb-10 max-w-lg" style={{ color: TEXT_GRAY }}>
              Fuel your transformation with high-quality protein, creatine, and recovery essentials. Curated for serious athletes.
            </p>
            <motion.button 
              {...scaleOnHover}
              onClick={() => { setActive("Store"); window.scrollTo(0,0); }}
              className="h-14 px-12 text-[11px] font-black uppercase tracking-[0.4em] relative overflow-hidden"
              style={{ background: PRIMARY, color: DARK_BG, fontFamily: "'Barlow Condensed',sans-serif" }}
            >
              Shop The Store
            </motion.button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="flex-1 w-full max-w-md aspect-square rounded-2xl border border-white/10 overflow-hidden"
          >
            <img src="https://images.unsplash.com/photo-1579722820308-d74e5719d23e?auto=format&fit=crop&q=80&w=800" alt="Supplements" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-4" style={{ background: "#121212" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>Why Choose Us</p>
        <motion.h2
          className="text-4xl md:text-5xl font-black uppercase cursor-default transition-all duration-300"
          style={{
            fontFamily: "'Oswald',sans-serif",
            /* Metallic gradient colors for silver without glow */
            background: `linear-gradient(
              to bottom,
              #cfd1d3 0%,
              #e7e9eb 20%,
              #afb2b5 40%,
              #717377 50%,
              #cfd1d3 70%,
              #ffffff 80%,
              #9a9da0 100%
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent', /* Fallback for non-webkit browsers */
            textShadow: 'none', /* Ensure no glow */
            filter: 'none', /* Ensure no glow */
            letterSpacing: '-0.02em', /* Tighten up for a premium feel */
          }}
        >
          World-Class Amenities
        </motion.h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-full mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(f => (
            <motion.div 
              key={f.title} 
              variants={fadeUp} 
              whileHover={{ y: -10, borderColor: '#cfd1d3' }} 
              className="p-6 rounded-xl transition-all duration-300 group cursor-pointer" 
              style={{ 
                background: CARD_BG, 
                border: `1px solid rgba(207, 209, 211, 0.2)` 
              }}
            >
              <motion.div 
                className="text-4xl mb-4" 
                style={{ color: '#cfd1d3' }}
                whileHover={{ 
                  filter: 'drop-shadow(0 0 8px rgba(231, 233, 235, 0.8))', // Subtle silver glow
                  scale: 1.1 // Slight scale for emphasis
                }}
                transition={{ duration: 0.2 }}
              >
                <f.icon />
              </motion.div>
              <h3 className="text-lg font-black mb-2 uppercase" style={{ fontFamily: "'Barlow Condensed',sans-serif", color: TEXT_LIGHT }}>
                {f.title}
              </h3>
              <p className="text-sm" style={{ color: TEXT_GRAY }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-4" style={{ background: DARK_BG }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-black uppercase cursor-default transition-all duration-300"
            style={{
              fontFamily: "'Oswald',sans-serif",
              // Metallic gradient for the entire heading
              background: `linear-gradient(
                to bottom,
                #cfd1d3 0%,
                #e7e9eb 20%,
                #afb2b5 40%,
                #717377 50%,
                #cfd1d3 70%,
                #ffffff 80%,
                #9a9da0 100%
              )`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent', // Fallback for non-webkit browsers
              textShadow: 'none', // Ensure no glow
              filter: 'none', // Ensure no glow
              letterSpacing: '-0.02em', // Tighten up for a premium feel
            }}
          >
            Real{" "}
            <span style={{ display: 'inline-block' }}>Stories.</span>{" "}
            Real{" "}
            <motion.span
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} // Animate back and forth
              transition={{
                duration: 2.5, // Slightly longer duration for a smoother fire effect
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                // Fire gradient for "Results."
                background: `linear-gradient(
                  to right,
                  #FF4500 0%,    /* OrangeRed */
                  #FFA500 25%,   /* Orange */
                  #FFD700 50%,   /* Gold */
                  #FFA500 75%,
                  #FF4500 100%
                )`,
                backgroundSize: '200% auto', // Make it wider than the text to animate
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent', // Fallback for non-webkit browsers
                textShadow: 'none', // Ensure no glow
                filter: 'none', // Ensure no glow
                display: 'inline-block', // Important for background-clip to work
              }}
            >
              Results.
            </motion.span>
          </motion.h2>
          <p className="text-sm mt-3" style={{ color: TEXT_GRAY }}>Join 12,000+ members who transformed their lives</p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={tIdx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, type: "spring" }} className="p-10 rounded-2xl text-center" style={{ background: `${PRIMARY}0a`, border: `1px solid ${PRIMARY}30`, backdropFilter: "blur(20px)" }}>
              <IconQuote style={{ color: PRIMARY, width: 48, height: 48, margin: "0 auto" }} />
              <p className="text-xl md:text-2xl mt-6 mb-6 italic" style={{ color: TEXT_GRAY, fontFamily: "'Barlow',sans-serif" }}>"{TESTIMONIALS[tIdx].text}"</p>
              <Stars n={TESTIMONIALS[tIdx].stars} />
              <div className="mt-4"><span className="text-base font-black uppercase tracking-widest block" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>— {TESTIMONIALS[tIdx].name}</span><span className="text-xs" style={{ color: TEXT_MUTED }}>{TESTIMONIALS[tIdx].role}</span></div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-3 mt-8">{TESTIMONIALS.map((_, i) => (<button key={i} onClick={() => setTIdx(i)} className="transition-all duration-300" style={{ background: i === tIdx ? PRIMARY : "#333", width: i === tIdx ? "28px" : "10px", height: "10px", borderRadius: i === tIdx ? "5px" : "50%" }} />))}</div>
        </div>
      </section>
    </div>
  );
}

// ─── PROGRAMS PAGE ───────────────────────────────────────────────────────────
function ProgramsPage({ setActive }) {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4" style={{ background: DARK_BG }}>
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-16">
        <p className="text-[9px] font-black tracking-[0.4em] uppercase mb-4" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>What We Offer</p>
        <motion.h1
          className="text-5xl md:text-7xl font-black uppercase cursor-default transition-all duration-300"
          style={{
            fontFamily: "'Oswald',sans-serif",
            color: 'transparent',
            textShadow: 'none',
            filter: 'none',
          }}
        >
          <motion.span
            style={{
              background: `linear-gradient(
                to bottom,
                #cfd1d3 0%,
                #e7e9eb 20%,
                #afb2b5 40%,
                #717377 50%,
                #cfd1d3 70%,
                #ffffff 80%,
                #9a9da0 100%
              )`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}
          >
            Our
          </motion.span>{" "}
          <motion.span
            style={{
              background: `linear-gradient(
                to bottom, #FFD700 0%, #FFEC8B 20%, #DAA520 40%, #B8860B 50%, #FFD700 70%, #FFFACD 80%, #B8860B 100%
              )`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}
          >
            Programs
          </motion.span>
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto" style={{ color: TEXT_GRAY }}>Discover our comprehensive range of fitness programs designed for all levels</p>
      </motion.div>
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-full mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {PROGRAMS.map(p => (
          <motion.div 
            key={p.title} 
            variants={fadeUp} 
            whileHover={{ y: -10, borderColor: `${PRIMARY}40` }} 
            className="relative overflow-hidden rounded-none cursor-pointer group border border-white/5 transition-all duration-500" 
            style={{ background: CARD_BG, minHeight: 440 }}
          >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 100%, ${PRIMARY}44 0%, transparent 70%)` }} />
          <div className="absolute top-0 left-0 right-0 h-px transition-all duration-500 group-hover:h-1" style={{ background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`, boxShadow: `0 0 20px ${PRIMARY}` }} />
          <div className="h-48 overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
          <div className="p-7 flex flex-col h-full">
            <div className="flex items-start justify-between mb-3">
              <motion.div 
                className="text-3xl" 
                style={{ color: '#cfd1d3' }} 
                whileHover={{ 
                  rotate: 10, 
                  scale: 1.1,
                  filter: 'drop-shadow(0 0 8px rgba(231, 233, 235, 0.8))'
                }}
              >
                <p.icon />
              </motion.div>
              <span 
                className="text-[9px] font-black px-2.5 py-1 rounded-none tracking-[0.3em] border" 
                style={{ 
                  borderColor: `${PRIMARY}40`,
                  fontFamily: "'Barlow Condensed',sans-serif",
                  background: `linear-gradient(
                    to bottom, 
                    #FFD700 0%, 
                    #FFEC8B 20%, 
                    #DAA520 40%, 
                    #B8860B 50%, 
                    #FFD700 70%, 
                    #FFFACD 80%, 
                    #B8860B 100%
                  )`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {p.tag}
              </span>
            </div>
            <h3 className="text-xl font-black uppercase mb-2" style={{ fontFamily: "'Oswald',sans-serif", color: TEXT_LIGHT }}>{p.title}</h3>
            <div className="flex gap-4 mb-4 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: TEXT_GRAY }}>
              <span className="flex items-center gap-1.5"><IconCalendar style={{ width: 14 }} /> {p.duration}</span>
              <span className="flex items-center gap-1.5"><IconClock style={{ width: 14 }} /> {p.level}</span>
            </div>
            <p className="text-sm flex-1 mb-4" style={{ color: TEXT_GRAY }}>{p.desc}</p>
            <motion.button 
              {...scaleOnHover} 
              onClick={() => { setActive("Contact"); playClickSound(); }} 
              className="w-full h-12 text-[10px] font-black uppercase tracking-[0.3em] rounded-none transition-all duration-300 flex items-center justify-center gap-2" 
              style={{ background: SECONDARY, color: TEXT_LIGHT, fontFamily: "'Barlow Condensed',sans-serif" }}>
              Join Program <IconArrowRight />
            </motion.button>
          </div>
        </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── SCHEDULE PAGE ───────────────────────────────────────────────────────────
function SchedulePage() {
  const [filter, setFilter] = useState("all");
  const [selectedClass, setSelectedClass] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const scheduleRef = useRef(null);
  const cats = ["all", "strength", "cardio", "hiit", "yoga", "boxing"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
    const hour = 6 + i;
    if (hour === 12) return "12PM";
    if (hour > 12) return `${hour - 12}PM`;
    return `${hour}AM`;
  });

  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentHourNum = now.getHours();
  const currentSlot = `${currentHourNum % 12 || 12}${currentHourNum >= 12 ? 'PM' : 'AM'}`;

  const openClassDetails = (classData) => {
    setSelectedClass(classData);
  };

  const downloadSchedule = async () => {
    if (!scheduleRef.current) return;
    try {
      // Dynamically import to keep the initial bundle small
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(scheduleRef.current, {
        backgroundColor: '#1E1E1E',
        scale: 2, // Double resolution for crisp text
        useCORS: true,
        logging: false
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL("image/png");
      link.download = `ForgeGym-Schedule-${filter.toUpperCase()}.png`;
      link.click();
    } catch (err) {
      window.print(); // Fallback to PDF print if library is missing
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4" style={{ background: DARK_BG }}>
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-12">
        <motion.h1 
          whileHover={{ textShadow: "0 0 25px rgba(201, 160, 61, 0.6)" }} 
          className="text-5xl md:text-7xl font-black uppercase cursor-default transition-all duration-300" 
          style={{ fontFamily: "'Oswald',sans-serif" }}
        >
          <span style={{
            background: `linear-gradient(
              to bottom,
              #cfd1d3 0%,
              #e7e9eb 20%,
              #afb2b5 40%,
              #717377 50%,
              #cfd1d3 70%,
              #ffffff 80%,
              #9a9da0 100%
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}>Class</span>{' '}
          <span style={{
            background: `linear-gradient(to bottom, #FFD700 0%, #FFEC8B 20%, #DAA520 40%, #B8860B 50%, #FFD700 70%, #FFFACD 80%, #B8860B 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}>Schedule</span>
        </motion.h1>
        <p className="mt-3" style={{ color: TEXT_GRAY }}>Find the perfect class that fits your lifestyle</p>
      </motion.div>

      <div className="flex gap-3 justify-center flex-wrap mb-10">
        {cats.map(c => (
          <motion.button
            key={c}
            onClick={() => setFilter(c)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 text-xs font-black uppercase tracking-widest rounded-sm transition-all"
            style={{ // Refined styling for filter buttons
              fontFamily: "'Barlow Condensed',sans-serif",
              background: filter === c ? PRIMARY : CARD_BG,
              color: filter === c ? DARK_BG : TEXT_GRAY,
              border: `1px solid ${filter === c ? PRIMARY : "#1F2937"}`
            }}
          >
            {c.toUpperCase()}
          </motion.button>
        ))}
        <motion.button
          {...scaleOnHover}
          onClick={downloadSchedule}
          className="px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm transition-all flex items-center gap-2"
          style={{
            background: 'linear-gradient(110deg, #C9A03D 25%, #FFF5A5 48%, #FFFFFF 50%, #FFF5A5 52%, #B8860B 75%)',
            backgroundSize: '200% auto',
            color: "#1E1E1E",
            border: `1px solid ${PRIMARY}`
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2.5 } }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download PNG
        </motion.button>
      </div>

      <div className="max-w-full mx-auto" ref={scheduleRef}>
        <div className="rounded-2xl border border-white/5 overflow-hidden shadow-2xl" style={{ background: "#1a1a1a" }}>
          <div className="overflow-x-auto custom-scrollbar">
            <div className="grid grid-cols-[100px_repeat(7,1fr)] min-w-[1000px]">
              {/* Header Row */}
              <div className="sticky top-0 left-0 z-30 p-4 bg-[#1a1a1a] border-b border-r border-white/10" />
              {days.map(day => (
                <div key={day} className="sticky top-0 z-20 p-4 text-center bg-[#1a1a1a] border-b border-white/10 border-r border-white/5 last:border-r-0">
                  <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>{day}</span>
                </div>
              ))}

              {/* Schedule Body */}
              {TIME_SLOTS.map(time => (
                <React.Fragment key={time}>
                  {/* Time Label */}
                  <div className="sticky left-0 z-20 p-4 flex items-center justify-center bg-[#1a1a1a] border-r border-white/10 border-b border-white/5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{time}</span>
                  </div>
                  
                  {/* Day Columns for this time slot */}
                  {days.map((day, dayIdx) => {
                    const classes = (SCHEDULE[day] || []).filter(c => c.time === time && (filter === "all" || c.cat === filter));
                    return (
                      <div key={day} className={`p-2 min-h-[100px] flex flex-col gap-2 border-b border-white/5 ${dayIdx !== 6 ? 'border-r border-white/5' : ''}`}>
                        {classes.map((c, i) => (
                          <motion.div
                            key={i}
                            onClick={() => openClassDetails(c)}
                            whileHover={{ scale: 1.03, y: -2, zIndex: 5 }}
                            className="p-3 rounded-lg cursor-pointer relative overflow-hidden group border transition-all duration-300"
                            style={{ 
                              background: "rgba(255,255,255,0.02)", 
                              borderColor: "rgba(255,255,255,0.05)",
                              borderLeft: `4px solid ${CATEGORY_COLORS[c.cat] || PRIMARY}`
                            }}
                          >
                            {day === currentDay && c.time === currentSlot && (
                              <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-red-500/30">
                                <motion.div 
                                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }} 
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" 
                                />
                                <span className="text-[7px] font-black text-red-500 tracking-[0.1em]">LIVE</span>
                              </div>
                            )}
                            <div className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: TEXT_LIGHT, fontFamily: "'Barlow Condensed',sans-serif" }}>{c.name}</div>
                            <div className="text-[9px] font-bold uppercase tracking-tighter opacity-80" style={{ color: CATEGORY_COLORS[c.cat] || PRIMARY }}>{c.cat}</div>
                          </motion.div>
                        ))}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedClass(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative max-w-md w-full p-10 rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: CARD_BG, border: `1px solid ${PRIMARY}40` }}
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: CATEGORY_COLORS[selectedClass.cat] || PRIMARY }} />
              <button className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors" onClick={() => setSelectedClass(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div className="mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] px-2 py-1 rounded-sm mb-3 inline-block" style={{ background: (CATEGORY_COLORS[selectedClass.cat] || PRIMARY) + "22", color: CATEGORY_COLORS[selectedClass.cat] || PRIMARY }}>{selectedClass.cat}</span>
                <h2 className="text-4xl font-black uppercase tracking-tight leading-tight" style={{ fontFamily: "'Oswald', sans-serif", color: TEXT_LIGHT }}>{selectedClass.name}</h2>
                <div className="flex items-center gap-2 text-sm font-bold mt-2" style={{ color: PRIMARY }}>
                  <IconClock style={{ width: 16 }} /> {selectedClass.time} (60 MINS)
                </div>
              </div>

              <div className="space-y-4 mb-10 text-sm leading-relaxed" style={{ color: TEXT_GRAY }}>
                <div className="flex items-center gap-3">
                  <IconUser style={{ color: PRIMARY, width: 18 }} /> <span>Lead Instructor: Elite Forge Coach</span>
                </div>
                <p>Push your limits in this high-intensity {selectedClass.name} session. Tailored for those committed to peak performance and functional excellence.</p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 text-xs font-black uppercase tracking-widest rounded-lg shadow-lg"
                style={{ background: PRIMARY, color: DARK_BG, fontFamily: "'Barlow Condensed',sans-serif" }}
              >
                Book This Session
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── TRAINERS PAGE ───────────────────────────────────────────────────────────
function TrainersPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4" style={{ background: DARK_BG }}>
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-16">
        <motion.h1 
          whileHover={{ textShadow: "0 0 25px rgba(201, 160, 61, 0.6)" }} 
          className="text-5xl md:text-7xl font-black uppercase cursor-default transition-all duration-300" 
          style={{ fontFamily: "'Oswald',sans-serif" }}
        >
          <span style={{
            background: `linear-gradient(
              to bottom,
              #cfd1d3 0%,
              #e7e9eb 20%,
              #afb2b5 40%,
              #717377 50%,
              #cfd1d3 70%,
              #ffffff 80%,
              #9a9da0 100%
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}>Meet The</span>{' '}
          <span style={{
            background: `linear-gradient(to bottom, #FFD700 0%, #FFEC8B 20%, #DAA520 40%, #B8860B 50%, #FFD700 70%, #FFFACD 80%, #B8860B 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}>Coaches</span>
        </motion.h1>
        <p className="mt-3" style={{ color: TEXT_GRAY }}>World-class experts dedicated to your success</p>
      </motion.div>
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-full mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TRAINERS.map(t => (
          <motion.div key={t.name} variants={fadeUp} whileHover={{ y: -12 }} className="rounded-xl overflow-hidden group cursor-pointer" style={{ background: CARD_BG, border: `1px solid ${PRIMARY}1a` }}>
            <div className="relative h-64 overflow-hidden">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(to top, #000000aa, transparent)" }} />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-black uppercase" style={{ fontFamily: "'Oswald',sans-serif", color: TEXT_LIGHT }}>{t.name}</h3>
              <p className="text-sm font-black mb-1" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>{t.role}</p>
              <p className="text-xs mb-2" style={{ color: TEXT_GRAY }}>{t.exp} Experience | {t.specialty}</p>
              <p className="text-xs mb-3" style={{ color: TEXT_MUTED }}>{t.cert}</p>
              <Stars n={t.rating} />
              <div className="flex gap-3 mt-4">
                {Object.entries(t.social).map(([platform, link]) => {
                  const Icon = platform === "insta" ? BrandIconInstagram : platform === "twitter" ? BrandIconX : BrandIconLinkedIn;
                  return (
                    <motion.a key={platform} href={link} whileHover={{ scale: 1.15, y: -2 }} className="transition-all">
                      <Icon />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── MEMBERSHIP PAGE ─────────────────────────────────────────────────────────
function MembershipPage({ setActive }) {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0B1E 0%, #000000 50%, #1A0B2E 100%)' }}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255, 214, 0, 0.03) 0%, transparent 70%)' }} />
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-16 relative z-10">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase mb-4" style={{ color: "#FFD600" }}>Membership Tiers</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.03em' }}>
          <span style={{
            background: `linear-gradient(
              to bottom,
              #cfd1d3 0%,
              #e7e9eb 20%,
              #afb2b5 40%,
              #717377 50%,
              #cfd1d3 70%,
              #ffffff 80%,
              #9a9da0 100%
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}>Premium Fitness</span>{' '}
          <span style={{
            background: `linear-gradient(to bottom, #FFD700 0%, #FFEC8B 20%, #DAA520 40%, #B8860B 50%, #FFD700 70%, #FFFACD 80%, #B8860B 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
          }}>PRO</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-slate-400 font-medium text-lg">Choose the level of excellence that matches your ambition.</p>
      </motion.div>
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {PLANS.map((p, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeUp} 
            whileHover={{ scale: 1.03, y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 214, 0, 0.1)", borderColor: "rgba(255, 214, 0, 0.4)" }} 
            className="flex flex-col h-full rounded-[24px] p-6 transition-all duration-300 border border-white/5"
            style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(25px)' }}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black tracking-widest text-white/50 uppercase">{p.label}</span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FFD600" }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-1 leading-tight">{p.title}</h3>
            <p className="text-[12px] text-slate-500 font-medium mb-5 line-clamp-1">{p.tagline}</p>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5">
              <img src={p.image} alt={p.label} className="w-full h-full object-cover" />
            </div>
            <div className="mb-6">
              <p className="text-[11px] font-black uppercase tracking-wider mb-3" style={{ color: "#FFD600" }}>{p.offer}</p>
              <div className="flex items-center gap-1.5 text-white/40 mb-3">
                <IconLocation style={{ width: 14, color: "#FFD600" }} />
                <span className="text-[10px] font-semibold">{p.location}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">₹{p.price}</span>
                <span className="text-[10px] text-white/40 font-bold">/mo</span>
              </div>
              <p className="text-[9px] text-white/30 font-bold uppercase tracking-tighter mt-1">+ Taxes & Fees</p>
            </div>
            <div className="mt-auto">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: `0 0 25px rgba(255, 214, 0, 0.6)` }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setActive("Contact"); playClickSound(); }}
                className="w-full py-3.5 rounded-xl text-black font-black text-[10px] tracking-[0.2em] uppercase transition-all"
                style={{ background: "#FFD600" }}
              >
                TRY FOR FREE
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── TRANSFORMATIONS PAGE with BEFORE/AFTER SLIDER ───────────────────────────
function TransformationsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 relative overflow-hidden" style={{ background: DARK_BG }}>
      {/* Blurred Background Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920')", backgroundSize: "cover", backgroundPosition: "center", filter: "blur(40px)" }} />
      
      <div className="relative z-10">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-16">
          <p className="text-xs font-black tracking-[0.4em] uppercase mb-4" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>Transformation Gallery</p>
          <motion.h1 
            whileHover={{ textShadow: "0 0 25px rgba(201, 160, 61, 0.6)" }} 
            className="text-5xl md:text-7xl font-black uppercase cursor-default transition-all duration-300" 
            style={{ fontFamily: "'Oswald',sans-serif" }}
          >
            <span style={{
              background: `linear-gradient(
                to bottom,
                #cfd1d3 0%,
                #e7e9eb 20%,
                #afb2b5 40%,
                #717377 50%,
                #cfd1d3 70%,
                #ffffff 80%,
                #9a9da0 100%
              )`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>Real</span>{' '}
            <span style={{
              background: `linear-gradient(to bottom, #FFD700 0%, #FFEC8B 20%, #DAA520 40%, #B8860B 50%, #FFD700 70%, #FFFACD 80%, #B8860B 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>Transformations</span>
          </motion.h1>
          <p className="mt-4" style={{ color: TEXT_GRAY }}>Real people. Real commitment. Extraordinary results.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1400px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {TRANSFORMATIONS.map(t => (<motion.div key={t.name} variants={fadeUp} whileHover={{ y: -10 }} className="p-1"><BeforeAfterSlider before={t.before} after={t.after} name={t.name} loss={t.loss} time={t.time} /></motion.div>))}
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-20">
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>See the journey in motion</p>
          <div className="flex justify-center flex-wrap gap-6">
            <motion.button {...scaleOnHover} onClick={() => window.open("https://youtube.com/@forgegym", "_blank")} className="px-6 py-3 text-xs font-black uppercase tracking-widest rounded-sm flex items-center gap-2" style={{ background: "#FF0000", color: "#FFFFFF", fontFamily: "'Barlow Condensed',sans-serif" }}>
              <BrandIconYouTube /> Watch Stories
            </motion.button>
            <motion.button {...scaleOnHover} onClick={() => window.open("https://instagram.com/forgegym_official", "_blank")} className="px-6 py-3 text-xs font-black uppercase tracking-widest rounded-sm flex items-center gap-2" style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", color: "#FFFFFF", fontFamily: "'Barlow Condensed',sans-serif" }}>
              <BrandIconInstagram /> View Reels
            </motion.button>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-4xl mx-auto text-center p-12 rounded-3xl relative overflow-hidden shadow-2xl" style={{ background: `linear-gradient(145deg, ${CARD_BG}, #1a1a1a)`, border: `1px solid ${PRIMARY}33` }}>
          <motion.div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)` }}
            animate={{ x: ["-100%", "100%"] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
          <IconQuote style={{ color: PRIMARY, width: 56, height: 56, margin: "0 auto" }} /><p className="text-2xl md:text-4xl font-black uppercase mb-5 mt-4" style={{ fontFamily: "'Oswald',sans-serif", color: TEXT_LIGHT }}>The body achieves what the mind believes.</p><p className="text-base" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>— ForgeGym Philosophy</p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE with GOOGLE MAP and WHATSAPP FORM ──────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.phone) {
      const whatsappMsg = `Hi! I'm ${form.name}. Email: ${form.email}, Phone: ${form.phone}. Message: ${form.message}`;
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  const inputStyle = { background: "rgba(255,255,255,0.07)", border: `1px solid ${PRIMARY}40`, color: TEXT_LIGHT, borderRadius: 8, padding: "14px 18px", width: "100%", fontFamily: "'Barlow',sans-serif", fontSize: 14, outline: "none", transition: "all 0.2s" };

  return (
    <div className="min-h-screen pt-28 relative overflow-hidden" id="contact">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1920" alt="Gym Interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${DARK_BG}e6, ${DARK_BG}c0, ${DARK_BG}e6)` }} />
      </div>

      <div className="relative z-10 px-4 pb-20">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-16">
          <motion.h1 
            whileHover={{ textShadow: "0 0 25px rgba(201, 160, 61, 0.6)" }} 
            className="text-5xl md:text-7xl font-black uppercase cursor-default transition-all duration-300" 
            style={{ fontFamily: "'Oswald',sans-serif" }}>
            <span style={{
              background: `linear-gradient(
                to bottom,
                #cfd1d3 0%,
                #e7e9eb 20%,
                #afb2b5 40%,
                #717377 50%,
                #cfd1d3 70%,
                #ffffff 80%,
                #9a9da0 100%
              )`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>Contact</span>{' '}
            <span style={{
              background: `linear-gradient(to bottom, #FFD700 0%, #FFEC8B 20%, #DAA520 40%, #B8860B 50%, #FFD700 70%, #FFFACD 80%, #B8860B 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>Us</span>
          </motion.h1>
          <p className="mt-4" style={{ color: TEXT_GRAY }}>Your journey to peak performance starts with a single message.</p>
        </motion.div>

        <div className="max-w-full mx-auto grid lg:grid-cols-2 gap-12">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden" style={{ background: "rgba(30,30,30,0.6)", border: `1px solid ${PRIMARY}33`, boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
          <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 relative z-10" style={{ fontFamily: "'Oswald',sans-serif", color: TEXT_LIGHT }}><IconUser style={{ width: 28, height: 28, color: PRIMARY }} /> Free Trial Registration</h2>
          <div className="space-y-5 relative z-10">
            {[["Name", "name", "Your full name"], ["Email", "email", "your@email.com"], ["Phone", "phone", "+91 98765 43210"]].map(([label, key, ph]) => (<div key={key}><label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: TEXT_GRAY, fontFamily: "'Barlow Condensed',sans-serif" }}>{label}</label><input style={inputStyle} placeholder={ph} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} onFocus={e => e.target.style.borderColor = PRIMARY} onBlur={e => e.target.style.borderColor = `${PRIMARY}30`} /></div>))}
            <div><label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: TEXT_GRAY, fontFamily: "'Barlow Condensed',sans-serif" }}>Message / Goal</label><textarea rows={3} style={inputStyle} placeholder="Tell us about your fitness goals..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} onFocus={e => e.target.style.borderColor = PRIMARY} onBlur={e => e.target.style.borderColor = `${PRIMARY}30`} /></div>
            <motion.button {...scaleOnHover} onClick={handleSubmit} className="w-full py-4 text-sm font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 mt-4" style={{ background: SECONDARY, color: TEXT_LIGHT, boxShadow: `0 10px 20px ${SECONDARY}40`, fontFamily: "'Barlow Condensed',sans-serif" }}>{sent ? "✓ Redirecting to WhatsApp..." : "Send via WhatsApp →"}</motion.button>
            <p className="text-xs text-center mt-2" style={{ color: TEXT_MUTED }}>We'll contact you within 15 minutes on WhatsApp</p>
          </div>
        </motion.div>
        <div className="flex flex-col gap-6">
          <motion.a href="https://maps.google.com/?q=42+Iron+Street+Mumbai" target="_blank" rel="noopener noreferrer" whileHover={{ x: 10 }} className="flex items-start gap-5 p-6 rounded-3xl group transition-colors backdrop-blur-md" style={{ background: "rgba(30,30,30,0.55)", border: `1px solid ${PRIMARY}22` }}><IconLocation style={{ color: PRIMARY }} /><div><p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>Location</p><p className="text-base group-hover:text-white transition-colors" style={{ color: TEXT_GRAY }}>42 Iron Street, Mumbai, MH - 400001</p></div></motion.a>
          <motion.a href="tel:+919876543210" whileHover={{ x: 10 }} className="flex items-start gap-5 p-6 rounded-3xl group transition-colors backdrop-blur-md" style={{ background: "rgba(30,30,30,0.55)", border: `1px solid ${PRIMARY}22` }}><IconPhone style={{ color: PRIMARY }} /><div><p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>Phone</p><p className="text-base group-hover:text-white transition-colors" style={{ color: TEXT_GRAY }}>+91 98765 43210</p></div></motion.a>
          <motion.a href="mailto:hello@forgegym.in" whileHover={{ x: 10 }} className="flex items-start gap-5 p-6 rounded-3xl group transition-colors backdrop-blur-md" style={{ background: "rgba(30,30,30,0.55)", border: `1px solid ${PRIMARY}22` }}><IconMail style={{ color: PRIMARY }} /><div><p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>Email</p><p className="text-base group-hover:text-white transition-colors" style={{ color: TEXT_GRAY }}>hello@forgegym.in</p></div></motion.a>
          <div className="flex items-start gap-5 p-6 rounded-3xl transition-colors backdrop-blur-md" style={{ background: "rgba(30,30,30,0.55)", border: `1px solid ${PRIMARY}22` }}>
            <IconClock style={{ color: PRIMARY }} />
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>Opening Hours</p>
              <p className="text-base" style={{ color: TEXT_GRAY }}>Mon–Sun: 5AM – 11PM</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-6 rounded-3xl backdrop-blur-md" style={{ background: "rgba(30,30,30,0.55)", border: `1px solid ${PRIMARY}22` }}>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>Join Our Social Community</p>
              <div className="flex gap-6">
                <motion.a href="https://youtube.com/@forgegym" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15 }} className="transition-transform">
                  <BrandIconYouTube />
                </motion.a>
                <motion.a href="https://instagram.com/forgegym_official" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15 }} className="transition-transform">
                  <BrandIconInstagram />
                </motion.a>
                <motion.a href="https://x.com/forgegym" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15 }} className="transition-transform">
                  <BrandIconX />
                </motion.a>
                <motion.a href="https://linkedin.com/company/forgegym" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15 }} className="transition-transform">
                  <BrandIconLinkedIn />
                </motion.a>
                <motion.a href="https://facebook.com/forgegym.mumbai" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15 }} className="transition-transform">
                  <BrandIconFacebook />
                </motion.a>
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden h-64 shadow-2xl" style={{ border: `1px solid ${PRIMARY}30` }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.536118010207!2d72.825276!3d19.076882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9a5d4e5b2c5%3A0x5c6e8b5a5c6e8b5a!2sBandra%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Map"></iframe>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

// ─── FORGE AI PAGE ───────────────────────────────────────────────────────────
function ForgeAIPage() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Greetings, Champion. I am ForgeAI. How can I assist your transformation today? You can ask me about workouts, gym hours, or our premium plans." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    playClickSound();
    const userMsg = input.toLowerCase();
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let response = "I'm still learning the art of the forge. Could you rephrase that? You can ask about 'hours', 'workout', or 'membership'.";
      
      if (userMsg.includes("hour") || userMsg.includes("time") || userMsg.includes("open")) {
        response = "ForgeGym is forged for consistency. We are open Monday through Sunday, 5:00 AM to 11:00 PM.";
      } else if (userMsg.includes("workout") || userMsg.includes("exercise") || userMsg.includes("plan")) {
        response = "Based on our elite methodology, I recommend a Push/Pull/Legs split. Today is a great day for 'Push'—focus on Bench Press, Overhead Press, and Tricep Dips. Would you like a specific 60-minute routine?";
      } else if (userMsg.includes("membership") || userMsg.includes("price") || userMsg.includes("join")) {
        response = "We offer five tiers of excellence: Starter (₹1,499/mo), Standard (₹3,999/qtr), Premium (₹7,499/6mo), Elite (₹12,999/yr), and Ultimate (₹24,999/yr). The Standard plan is currently our most popular for dedicated athletes.";
      } else if (userMsg.includes("trainer") || userMsg.includes("coach")) {
        response = "Our coaches, like Alex Carter and Sophia Reed, are world-class experts. You can meet them in the 'Trainers' section!";
      }

      setMessages(prev => [...prev, { role: "bot", text: response }]);
      setIsTyping(false);
      playBotMsgSound();
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 relative overflow-hidden" style={{ background: DARK_BG }}>
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #C9A03D 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 mb-8 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase rounded-full relative overflow-hidden" 
            style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: `1px solid ${PRIMARY}40`, 
              color: TEXT_LIGHT,
              backdropFilter: "blur(10px)",
              fontFamily: "'Barlow Condensed', sans-serif" 
            }}
          >
            <motion.div 
              className="absolute inset-0" 
              style={{ 
                background: 'linear-gradient(110deg, transparent 20%, rgba(201, 160, 61, 0.15) 45%, rgba(255, 255, 255, 0.3) 50%, rgba(201, 160, 61, 0.15) 55%, transparent 80%)',
                backgroundSize: '200% auto'
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
            <span className="flex items-center gap-2 relative z-10">
              <span style={{ color: PRIMARY }}><IconBot style={{ width: 16, height: 16 }} /></span>
              <span className="drop-shadow-sm">ForgeAI Assistant v1.0</span>
            </span>
          </div>
          <motion.h1 
            whileHover={{ textShadow: "0 0 25px rgba(201, 160, 61, 0.6)" }} 
            className="text-4xl md:text-6xl font-black uppercase cursor-default transition-all duration-300" 
            style={{ fontFamily: "'Oswald',sans-serif", color: TEXT_LIGHT }}>
            <motion.span 
              className="inline-block" 
              style={{ 
                background: 'linear-gradient(110deg, #F5F5F5 25%, #9E9E9E 48%, #FFFFFF 50%, #9E9E9E 52%, #F5F5F5 75%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent'
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 } }}
            >Intelligent</motion.span>{" "}
            <motion.span 
              className="inline-block" 
              style={{ 
                background: 'linear-gradient(110deg, #C9A03D 25%, #FFF5A5 48%, #FFFFFF 50%, #FFF5A5 52%, #B8860B 75%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent'
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2.2 } }}
            >Training</motion.span>
          </motion.h1>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col" style={{ background: CARD_BG, height: "550px" }}>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: m.role === "bot" ? -20 : 20 }} animate={{ opacity: 1, x: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed border relative overflow-hidden ${m.role === "user" ? "rounded-tr-none" : "rounded-tl-none"}`}
                  style={{ 
                    background: m.role === "user" ? 'linear-gradient(110deg, #C9A03D 20%, #B8860B 45%, #FFF5A5 50%, #B8860B 55%, #C9A03D 80%)' : "rgba(255,255,255,0.05)", 
                    backgroundSize: m.role === "user" ? '200% auto' : 'auto',
                    color: m.role === "user" ? "#1E1E1E" : TEXT_LIGHT,
                    borderColor: m.role === "bot" ? "rgba(255,255,255,0.1)" : "transparent",
                    fontWeight: m.role === "user" ? "700" : "400",
                    backdropFilter: m.role === "bot" ? "blur(10px)" : "none"
                  }}>
                  {m.role === "user" ? (
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                      style={{ 
                        background: 'linear-gradient(110deg, transparent 48%, rgba(255, 255, 255, 0.4) 50%, transparent 52%)',
                        backgroundSize: '200% auto'
                      }}
                    />
                  ) : null}
                  <span className="relative z-10">{m.text}</span>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(dot => <motion.div key={dot} className="w-1.5 h-1.5 rounded-full bg-gold" style={{ backgroundColor: PRIMARY }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: dot * 0.2 }} />)}
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask ForgeAI about your workout..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                style={{ borderColor: input ? PRIMARY : "rgba(255,255,255,0.1)" }}
              />
              <motion.button
                {...scaleOnHover}
                onHoverStart={playHoverSound}
                onClick={() => {
                  // Placeholder for actual voice mode logic
                  playBeepSound();
                  alert("Voice Mode Activated! (Placeholder)");
                }}
                className="p-4 rounded-xl transition-all"
                style={{ background: PRIMARY, color: DARK_BG, fontFamily: "'Barlow Condensed',sans-serif" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
              </motion.button>
              <motion.button 
                {...scaleOnHover}
                onHoverStart={playHoverSound}
                onClick={handleSend} 
                className="p-4 rounded-xl transition-all" 
                style={{ background: SECONDARY, color: TEXT_LIGHT }}
              >
                <IconSend />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ setActive }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-16 px-4 relative overflow-hidden" style={{ background: "#121212", borderTop: `1px solid ${PRIMARY}30` }}>
      <div className="absolute inset-0 opacity-5" style={{ background: `linear-gradient(90deg, ${PRIMARY}, transparent, ${PRIMARY_DARK})` }} />
      <div className="max-w-full mx-auto grid md:grid-cols-4 gap-10 mb-12 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ color: PRIMARY }}><IconLogo /></div>
            <span className="text-2xl font-bold tracking-[0.05em] text-[#F5F5F5] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>FORGE<span className="text-[#D4AF37]">GYM</span></span>
          </div><p className="text-sm" style={{ color: TEXT_GRAY }}>Where champions are built. Every rep, every set, every day.</p>
          <div className="flex gap-4 mt-6">
            {[
              { Icon: BrandIconYouTube, link: "https://youtube.com/@forgegym" },
              { Icon: BrandIconInstagram, link: "https://instagram.com/forgegym_official" },
              { Icon: BrandIconX, link: "https://x.com/forgegym" },
              { Icon: BrandIconFacebook, link: "https://facebook.com/forgegym.mumbai" },
              { Icon: BrandIconLinkedIn, link: "https://linkedin.com/company/forgegym" }
            ].map((soc, idx) => (
              <motion.a key={idx} href={soc.link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15, y: -3 }} className="transition-all">
                <soc.Icon />
              </motion.a>
            ))}
          </div>
        </div>
        {[{ head: "Navigate", links: NAV_LINKS }, { head: "Programs", links: PROGRAMS.slice(0, 6).map(p => p.title) }, { head: "Contact", links: ["42 Iron Street, Mumbai", "hello@forgegym.in", "+91 98765 43210", "Mon–Sun: 5AM–11PM", "Free Parking Available"] }].map(col => (<div key={col.head}><h4 className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: PRIMARY, fontFamily: "'Barlow Condensed',sans-serif" }}>{col.head}</h4><ul className="space-y-3">{col.links.map(l => (<li key={l}><button onClick={() => setActive(l)} className="text-sm transition-colors text-left hover:translate-x-1 duration-200" style={{ color: TEXT_GRAY, fontFamily: "'Barlow',sans-serif" }} onMouseEnter={e => e.currentTarget.style.color = PRIMARY} onMouseLeave={e => e.currentTarget.style.color = TEXT_GRAY}>{l}</button></li>))}</ul></div>))}
      </div>
      <div className="max-w-full mx-auto pt-8 flex flex-wrap gap-4 justify-between items-center relative z-10" style={{ borderTop: `1px solid ${PRIMARY}1a` }}><p className="text-xs" style={{ color: TEXT_MUTED, fontFamily: "'Barlow',sans-serif" }}>© {currentYear} ForgeGym. All rights reserved.</p><p className="text-xs flex items-center gap-1" style={{ color: TEXT_MUTED }}>Built for excellence <IconHeart style={{ width: 12, height: 12, color: PRIMARY }} /></p></div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("Home");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    document.body.style.background = DARK_BG;
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";
  }, []);

  const pages = { Home: HomePage, Programs: ProgramsPage, Schedule: SchedulePage, Trainers: TrainersPage, Membership: MembershipPage, Transformations: TransformationsPage, Store: GymStore, ForgeAI: ForgeAIPage, Contact: ContactPage };
  const PageComponent = pages[active] || HomePage;

  return (
    <div style={{ minHeight: "100vh", background: DARK_BG, fontFamily: "'Barlow',sans-serif", overflowX: "hidden" }}>
      <style>{`::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #1a1a1a; } ::-webkit-scrollbar-thumb { background: ${PRIMARY}; border-radius: 4px; } ::-webkit-scrollbar-thumb:hover { background: ${PRIMARY_DARK}; } * { scroll-behavior: smooth; }`}</style>
      <ProgressBar />
      <Navbar active={active} setActive={setActive} cartCount={cart.length} />
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
          <PageComponent setActive={setActive} cart={cart} setCart={setCart} />
        </motion.div>
      </AnimatePresence>
      <Footer setActive={setActive} />
      <FloatingWhatsApp />
      <FloatingJoinBtn setActive={setActive} />
    </div>
  );
}