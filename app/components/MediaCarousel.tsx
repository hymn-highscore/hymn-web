"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

const mediaItems = [
  { type: "image", src: "/media1.jpg" },
  { type: "image", src: "/media2.jpg" },
  { type: "image", src: "/media3.jpg" },
  { type: "image", src: "/media4.jpg" },
  { type: "image", src: "/media5.jpg" },
  { type: "image", src: "/media6.jpg" },
];

export default function MediaCarousel() {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const radius = isMobile ? 160 : 250;
  const total = mediaItems.length;
  const angleStep = 360 / total;

  const ringRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  
  // Optimization: Only animate when in view
  const isInView = useInView(sceneRef, { once: false, amount: 0.2 });

  const rotationRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);
  const ticking = useRef(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  /* ------------------------------------------------
     INITIAL TRANSFORM
  ------------------------------------------------ */
  useLayoutEffect(() => {
    if (ringRef.current) {
      ringRef.current.style.transform = "rotateY(0deg)";
      ringRef.current.style.willChange = "transform";
    }
  }, []);

  /* ------------------------------------------------
     DESKTOP AUTO ROTATION ONLY
  ------------------------------------------------ */
  useEffect(() => {
    // Don't animate if mobile, not in view, or currently interacting (activeIndex set)
    if (isMobile || !isInView) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    let lastTime = 0;
    const fps = 30; // Cap FPS for auto-rotation to save resources
    const interval = 1000 / fps;

    function animate(time: number) {
      if (activeIndex === null) {
        if (time - lastTime > interval) {
          lastTime = time;
          rotationRef.current += 0.15 * (60 / fps); // Adjust speed for FPS
          
          if (ringRef.current) {
            ringRef.current.style.transform =
              `rotateY(${rotationRef.current}deg)`;
          }
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex, isMobile, isInView]);

  /* ------------------------------------------------
     CLICK / TAP CARD
  ------------------------------------------------ */
  function handleCardClick(index: number) {
    const target = -index * angleStep;

    const current =
      ((rotationRef.current % 360) + 360) % 360;
    const normalizedCurrent =
      current > 180 ? current - 360 : current;

    let delta = target - normalizedCurrent;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const finalRotation = normalizedCurrent + delta;
    rotationRef.current = finalRotation;

    if (ringRef.current) {
      ringRef.current.style.transition =
        "transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)";
      ringRef.current.style.transform =
        `rotateY(${finalRotation}deg)`;
    }

    setActiveIndex(index);

    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      setActiveIndex(null);
      // Reset transition after interaction to allow smooth auto-rotation
      if (ringRef.current) {
        ringRef.current.style.transition = "none";
      }
    }, 4000);
  }

  /* ------------------------------------------------
     SWIPE / DRAG (MOBILE)
  ------------------------------------------------ */
  useEffect(() => {
    if (!isMobile || !sceneRef.current) return;

    let startX = 0;

    function onPointerDown(e: PointerEvent) {
      startX = e.clientX;
      sceneRef.current?.setPointerCapture(e.pointerId);
      // Pause auto-rotation/transition during drag
      if (ringRef.current) {
        ringRef.current.style.transition = "none";
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!startX) return;
      const deltaX = e.clientX - startX;
      rotationRef.current += deltaX * 0.3;
      startX = e.clientX;

      // Optimize: Use requestAnimationFrame for smooth drag updates
      if (!ticking.current) {
        requestAnimationFrame(() => {
          if (ringRef.current) {
            ringRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    }

    function onPointerUp(e: PointerEvent) {
      startX = 0;
      sceneRef.current?.releasePointerCapture(e.pointerId);
    }

    const el = sceneRef.current;
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }, [isMobile]);

  return (
    <section className="w-full px-6 py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold metallic-gold">
          Your Organist, Anytime. Always Ready. Always Playing.
        </h2>
        {isMobile && (
          <p className="text-sm opacity-70 mt-2">
            Swipe or tap to explore
          </p>
        )}
      </div>

      <div
        ref={sceneRef}
        className="ring-scene w-full max-w-[320px] xs:max-w-[360px] md:max-w-none mx-auto touch-pan-y"
      >
        <div ref={ringRef} className="ring">
          {mediaItems.map((item, index) => {
            const angle = index * angleStep;

            return (
              <CarouselItem
                key={index}
                item={item}
                index={index}
                activeIndex={activeIndex}
                angle={angle}
                radius={radius}
                onClick={() => handleCardClick(index)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CarouselItem({ 
  item, 
  index, 
  activeIndex, 
  angle, 
  radius, 
  onClick 
}: { 
  item: { src: string }; 
  index: number; 
  activeIndex: number | null; 
  angle: number; 
  radius: number; 
  onClick: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`ring-card ${
        index === activeIndex ? "ring-card-active" : ""
      }`}
      style={{
        transform: `
          rotateY(${angle}deg)
          translateZ(${radius}px)
        `,
      }}
      onClick={onClick}
    >
      <div className="ring-card-inner relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
        {/* Skeleton Loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse z-10">
            <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]" />
          </div>
        )}

        <Image
          src={item.src}
          alt={`Media item ${index + 1}`}
          fill
          sizes="(max-width: 768px) 160px, 250px"
          className={`object-cover pointer-events-none select-none transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          priority={index < 4}
          quality={60}
          loading={index < 4 ? "eager" : "lazy"}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
