"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPreloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep the suspense for 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
        >

          {/* Equalizer Bars Animation */}
          <div className="flex items-end space-x-2 h-16">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 bg-purple-500 rounded-t-sm"
                animate={{
                  height: ["20%", "100%", "20%"],
                  backgroundColor: ["#a855f7", "#db2777", "#a855f7"],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
