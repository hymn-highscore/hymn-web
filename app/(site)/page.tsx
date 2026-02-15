"use client";

import Hero from "../components/Hero";
import MediaCarousel from "../components/MediaCarousel";
import Subscription from "../components/Subscription";
import DemoSection from "../components/DemoSection";
import MostPlayedHymns from "../components/MostPlayedHymns";
import Testimonial from "../components/Testimonial";

/* ----------------------------------
   Section Divider with subtle purple glow
---------------------------------- */
function SectionDivider() {
  return (
    <div
      aria-hidden
      className="
        relative
        h-20
        w-full
        pointer-events-none
        flex items-center
      "
    >
      {/* Main divider line */}
      <div
        className="
          w-full
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/15
          to-transparent
          shadow-[0_0_18px_rgba(168,85,247,0.25)]
        "
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">

      <Hero />

      <SectionDivider />

      <MediaCarousel />

      <SectionDivider />

      <Subscription />

      <SectionDivider />

      <DemoSection />

      <SectionDivider />

      <MostPlayedHymns />

      <SectionDivider />

      <Testimonial />

    </main>
  );
}
