"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

export default function Testimonial() {
  const testimonials = [
    "Placeholder testimonial 1",
    "Placeholder testimonial 2",
    "Placeholder testimonial 3",
    "Placeholder testimonial 4",
    "Placeholder testimonial 5",
    "Placeholder testimonial 6",
  ];

  return (
    <section className="px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gold mb-6 md:mb-10 text-center"
        >
          What People Say
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation]}
            navigation
            loop
            spaceBetween={20}
            slidesPerView={1}
            style={
              {
                "--swiper-navigation-color": "rgb(168, 85, 247)",
              } as React.CSSProperties
            }
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((text, index) => (
              <SwiperSlide key={index}>
                <div className="p-4 md:p-6 bg-surface border border-white/20 rounded-xl min-h-[320px] flex items-center justify-center text-gray-300 text-center">
                  {text}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Mobile arrow alignment */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            top: 55%;
          }
        }
      `}</style>
    </section>
  );
}
