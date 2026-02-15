"use client";

import { 
  Menu, 
  User, 
  Search, 
  LogOut, 
  ChevronDown
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AdminHeader({
  sidebarOpen,
  toggleSidebar,
}: {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  function getPageTitle(path: string) {
    if (path === "/admin") return "Dashboard";
    if (path.startsWith("/admin/my-hymns")) return "My Hymns";
    if (path.startsWith("/admin/download-hymnal")) return "Download Hymnal";
    if (path.startsWith("/admin/instruments")) return "Instruments";
    if (path.startsWith("/admin/request-hymn")) return "Request Hymn";
    if (path.startsWith("/admin/subscription")) return "Subscription";
    if (path.startsWith("/admin/profile")) return "Profile";
    return "Admin";
  }

  const currentTitle = getPageTitle(pathname || "/admin");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40
        h-16 px-4 md:px-6
        flex items-center justify-between
        transition-all duration-300
         "bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shadow-lg shadow-black/10 dark:shadow-black/40" 
       
      `}
    >
      {/* LEFT: Toggle & Brand (Mobile mainly) */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="hidden md:flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
          <span className="text-gray-900 dark:text-white">{currentTitle}</span>
        </div>
      </div>

      {/* CENTER: Search Bar (Desktop) */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400 group-focus-within:text-purple-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search hymns, artists..."
            className="
              block w-full pl-10 pr-3 py-2
              bg-gray-100 dark:bg-white/5
              border border-transparent focus:border-purple-500/50
              rounded-full text-sm
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-500/20
              transition-all duration-300
            "
          />
        </div>
      </div>

      {/* RIGHT: Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Search Toggle (Optional - for now just placeholder) */}
        <button className="md:hidden p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <Search size={20} />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-white/10"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              {email ? email[0].toUpperCase() : <User size={14} />}
            </div>
            <div className="hidden md:block text-left mr-1">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 leading-none">
                Admin
              </p>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="
              absolute right-0 top-full mt-2 w-56
              bg-white dark:bg-[#18181b]
              border border-gray-200 dark:border-white/10
              rounded-xl shadow-xl
              py-2
              origin-top-right
              animate-in fade-in zoom-in-95 duration-200
            ">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-white/5 mb-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {email || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Administrator
                </p>
              </div>

              <div className="px-1">
                <button
                  onClick={() => router.push("/admin/profile")}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <User size={16} />
                  Profile Settings
                </button>
              </div>

              <div className="my-1 border-t border-gray-100 dark:border-white/5" />

              <div className="px-1">
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.replace("/");
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
