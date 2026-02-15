"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Subscription() {
  return (
    <section className="px-6 py-16 md:py-24 relative overflow-hidden">
      {/* Background blobs for atmosphere */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#BFA14A] via-[#E6C770] to-[#D4AF37] bg-clip-text text-transparent mb-4"
          >
            Choose Your Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Unlock the full power of your digital organist with our flexible subscription options.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              relative
              bg-surface/50 backdrop-blur-sm
              p-8
              rounded-2xl
              border border-white/10
              flex flex-col
              hover:border-purple-500/30
              transition-colors duration-300
            "
          >
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-300 mb-2">Standard</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">Free</span>
              </div>
              <p className="text-gray-400 mt-2 text-sm">Perfect for getting started</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Basic organ playback",
                "Practice mode access",
                "Curated hymn selection",
                "Standard audio quality"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/download" className="w-full">
              <button className="w-full py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all text-white cursor-pointer">
                Download Free
              </button>
            </Link>
          </motion.div>

          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              relative
              bg-gradient-to-b from-purple-900/40 to-surface/50 backdrop-blur-sm
              p-8
              rounded-2xl
              border border-purple-500/50
              flex flex-col
              shadow-[0_0_40px_rgba(168,85,247,0.15)]
            "
          >
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
              MOST POPULAR
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium text-purple-200 mb-2">Premium</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">Pro</span>
                <span className="text-gray-400 font-normal text-sm">/ access</span>
              </div>
              <p className="text-purple-200/70 mt-2 text-sm">For the complete experience</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Unlimited hymn library",
                "Isolated voice parts (SATB)",
                "Advanced tempo & pitch control",
                "Custom playlist scheduling",
                "Offline mode support",
                "High-fidelity audio"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white">
                  <div className="bg-purple-500/20 p-0.5 rounded-full">
                    <Check className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/download" className="w-full">
              <button className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/20 transition-all transform hover:-translate-y-0.5 cursor-pointer">
                Get Premium
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
