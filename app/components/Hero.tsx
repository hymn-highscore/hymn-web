"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Play, Download, ChevronRight, Music2, SkipBack, SkipForward, Pause } from "lucide-react";

export default function Hero() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="w-full relative overflow-hidden py-20 md:py-32 px-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* TEXT CONTENT */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:w-1/2 text-center lg:text-left z-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gold text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            The #1 Church Music Companion
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            <span className="text-white">Your digital</span> <br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#BFA14A] bg-clip-text text-transparent drop-shadow-lg">
              organist & tutor
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Never have a church service without an organist. 
            Master voice parts, control playback, and sing your favorite hymns with your personal chorister assistant.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-stretch"
          >
            <Link href="/download" className="w-full sm:w-auto">
              <button className="w-full group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  <Play size={20} fill="currentColor" />
                  Try Demo
                </span>
              </button>
            </Link>

             {/* <Link href="/download" className="w-full sm:w-auto">
              <button className="w-full group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  <Download size={20} />
                Download App
                </span>
              </button>
            </Link> */}

            <Link href="/download" className="w-full sm:w-auto">
              <button className="w-full group px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                <Download size={20} />
                Download App
              </button>
            </Link>
          </motion.div>

        </motion.div>

        {/* PHONE MOCKUP */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="lg:w-1/2 flex justify-center lg:justify-end relative z-10"
        >
          {/* Phone Frame */}
          <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl shadow-purple-900/30 overflow-hidden ring-1 ring-white/20">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20 flex justify-center items-center">
               <div className="w-16 h-4 bg-gray-900 rounded-full mt-1" />
            </div>

            {/* Screen Content */}
            <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black pt-12 px-6 pb-8 flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between items-center text-gray-400 mb-8">
                <ChevronRight className="rotate-180" size={20} />
                <span className="text-xs font-medium tracking-widest uppercase">Now Playing</span>
                <Music2 size={20} />
              </div>

              {/* Album Art */}
              <div className="aspect-square rounded-2xl bg-gray-800 mb-8 relative overflow-hidden shadow-lg shadow-black/50 group">
                <Image 
                  src="/media1.jpg" 
                  alt="Hymn Cover" 
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Song Info */}
              <div className="mb-8">
                <h3 className="text-white text-2xl font-bold mb-1">Abide With Me</h3>
                <p className="text-gold text-sm">Henry F. Lyte</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8 space-y-2">
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-gold rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 font-mono">
                  <span>1:24</span>
                  <span>4:15</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-auto">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <SkipBack size={28} />
                </button>
                <button className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gold/20">
                  <Pause size={28} fill="currentColor" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <SkipForward size={28} />
                </button>
              </div>

            </div>
            
            {/* Reflection Glare */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          </div>

          {/* Floating Elements */}
          {/* <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-8 top-1/3 p-4 rounded-xl bg-gray-900/90 backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              <Music2 size={20} />
            </div>
            <div>
              <p className="text-white text-sm font-bold">Soprano</p>
              <p className="text-xs text-gray-400">Voice Part Active</p>
            </div>
          </motion.div> */}

        </motion.div>
      </div>
    </section>
  );
}
