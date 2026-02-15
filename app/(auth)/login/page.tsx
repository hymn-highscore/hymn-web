"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import LoginForm from "./LoginForm";

function LoginPageContent() {
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo") ?? undefined;

  return (
    <main
      className="
        dark
        fixed inset-0
        w-full h-full
        flex items-center justify-center
        px-4 sm:px-6
        overflow-hidden
      "
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)),
          url('/organ.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* CARD CONTAINER */}
      <div
        className="
          w-full max-w-5xl
          min-h-[600px]
          bg-black/75 backdrop-blur-md
          rounded-2xl
          border border-white/10
          shadow-2xl
          flex
          overflow-hidden
          relative
        "
      >
        {/* CLOSE BUTTON (Top Right of Card) */}
        <Link
          href="/"
          className="
            absolute top-4 right-4 z-50
            p-2 rounded-full
            text-white/50 hover:text-white hover:bg-white/10
            transition-all
          "
          aria-label="Close"
        >
          <X size={24} />
        </Link>

        {/* LEFT — MARKETING (DESKTOP ONLY) */}
        <div
          className="
            hidden md:flex
            w-1/2
            bg-white/5
            p-10
            flex-col justify-between
            relative
          "
        >
          {/* Decorative gradient orb */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-purple-900/20 via-transparent to-transparent opacity-50 blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white italic mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400">
              Sign in to continue your journey.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6 relative z-10">
            <div className="w-full h-56 bg-black/20 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 transition-opacity group-hover:opacity-75" />
              <span className="text-gray-400 text-sm relative z-10">
                Image Preview Area
              </span>
            </div>

            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold text-gray-200">
                SoundOfHymns
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                Your digital organist and music-part tutor.
              </p>
            </div>
          </div>
          
          <div className="text-xs text-gray-600 text-center relative z-10">
            © {new Date().getFullYear()} SoundOfHymns
          </div>
        </div>

        {/* RIGHT — LOGIN FORM */}
        <div
          className="
            w-full md:w-1/2
            p-8 sm:p-12
            flex flex-col justify-center
            relative
          "
        >
          {/* MOBILE HEADER */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-2xl font-semibold text-white">
              Login
            </h1>
            <p className="text-gray-300 mt-1 text-sm">
              Welcome back to SoundOfHymns
            </p>
          </div>

          <div className="w-full max-w-sm mx-auto">
            <h2 className="hidden md:block text-2xl font-semibold text-white mb-8">
              Sign In
            </h2>
            <LoginForm redirectTo={redirectTo} />

            {/* Register link */}
            <p className="text-gray-400 text-sm text-center mt-8">
              Don't have an account?{" "}
              <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
