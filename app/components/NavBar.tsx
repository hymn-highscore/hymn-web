"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Music2, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-300
          ${scrolled 
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3" 
            : "bg-transparent py-5"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
              <Music2 size={18} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              SoundOfHymns
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
            
            <div className="h-6 w-px bg-white/10" />
            
            <Link href="/login">
              <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium transition-all hover:scale-105 active:scale-95 group">
                <User size={16} className="text-purple-400 group-hover:text-purple-300" />
                <span>Login</span>
              </button>
            </Link>

            <Link href="/register">
              <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all">
                Get Started
              </button>
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-24 px-6"
          >
            <nav className="flex flex-col gap-4">
              <MobileLink href="/about">About7 Us</MobileLink>
              <MobileLink href="/contact">Contact</MobileLink>



              <div className="h-px bg-white/10 my-2" />
              <MobileLink href="/login">Log In</MobileLink>
              <MobileLink href="/register" highlight>Get Started</MobileLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------
   HELPER COMPONENTS
------------------------------------------- */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`
        text-sm font-medium transition-colors duration-200
        ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
      `}
    >
      {children}
    </Link>
  );
}

function MobileLink({ 
  href, 
  children, 
  highlight 
}: { 
  href: string; 
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Link href={href}>
      <div className={`
        flex items-center justify-between p-4 rounded-xl transition-all
        ${highlight 
          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold" 
          : "bg-white/5 text-gray-200 hover:bg-white/10"}
      `}>
        <span className="text-lg">{children}</span>
        {!highlight && <ChevronRight size={20} className="text-gray-500" />}
      </div>
    </Link>
  );
}
