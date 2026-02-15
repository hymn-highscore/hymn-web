"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative px-6 py-20 md:py-32 overflow-hidden">
       {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-4">
                Experience the Future
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#BFA14A] via-[#E6C770] to-[#D4AF37] bg-clip-text text-transparent leading-tight">
                See How It Works
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                <span className="text-white font-semibold">SoundOfHymns</span> is your ever-ready digital organist — 
                perfect for when you need professional accompaniment instantly.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1 h-full min-h-[3rem] bg-gradient-to-b from-purple-500 to-transparent rounded-full" />
                  <p>
                    <span className="text-white font-medium block mb-1">Master Your Parts</span>
                    Learn your music part with clarity and confidence using isolated voice tracks.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-1 h-full min-h-[3rem] bg-gradient-to-b from-yellow-500 to-transparent rounded-full" />
                  <p>
                    <span className="text-white font-medium block mb-1">Train & Grow</span>
                    Strengthen your voice and grow with every rehearsal, supported by perfect pitch.
                  </p>
                </div>
              </div>

              <p className="text-gray-400 italic border-l-2 border-white/10 pl-4 py-2">
                "Are you an organist looking for a reliable companion to help you learn and play sheet music with ease?"
              </p>
            </div>
          </motion.div>

          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative ring/glow behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-yellow-500 opacity-20 blur-2xl -z-10 transform rotate-6 scale-105 rounded-3xl" />
            
            <div className="relative aspect-video bg-surface/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden group cursor-pointer">
              {/* Fake UI Header */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-black/20 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              {/* Thumbnail Area */}
              <div className="absolute inset-0 top-10 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20 shadow-lg">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                  <p className="text-gray-400 font-medium tracking-wide text-sm group-hover:text-white transition-colors">WATCH DEMO</p>
                </div>
              </div>
            </div>

            {/* Bottom Callout */}
            <div className="mt-8 text-center md:text-right">
               <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-1">
                Don't just take our word for it
               </p>
               <p className="text-yellow-500 font-serif italic text-lg">
                 See it in action
               </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
