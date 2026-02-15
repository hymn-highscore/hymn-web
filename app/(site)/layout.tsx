"use client";

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
  if (window.innerWidth < 768) return;

  const handleScroll = () => {
    const maxOffset = 200; // 👈 hard stop (px)
    const nextOffset = window.scrollY * 0.25;

    setOffsetY(Math.min(nextOffset, maxOffset));
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    // Force dark mode for unauthenticated pages
    <div className="dark relative min-h-screen text-white overflow-x-hidden">

     {/* ORGAN BACKGROUND (PARALLAX SAFE & CLAMPED) */}
<div
  className="fixed -top-[25vh] left-0 w-full h-[150vh] -z-20 will-change-transform"
  style={{
    transform: `translateY(${offsetY}px)`,
    backgroundImage: "url('/organ.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
  }}
/>


      {/* PAGE-WIDE GRADIENT OVERLAY */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.62) 0%,
              rgba(0,0,0,0.75) 30%,
              rgba(0,0,0,0.90) 65%,
              #000 100%
            )
          `,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <NavBar />

        <main className="flex-1">
          {children}
        </main>

        {/* Footer separator */}
        <div className="h-px w-full bg-white/10" />

        {/* Footer fully black */}
        <div className="bg-black">
          <Footer />
        </div>
      </div>
    </div>
  );
}
