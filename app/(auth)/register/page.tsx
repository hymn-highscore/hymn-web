"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    password: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.terms) {
      setError("You must accept the Terms of Use and Membership Agreement.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            organization: formData.organization,
          },
        },
      });

      if (signUpError) throw signUpError;

      router.push("/admin");
      
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

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
              Join Us
            </h2>
            <p className="text-gray-400">
              Create an account to get started.
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

        {/* RIGHT — REGISTER FORM */}
        <div
          className="
            w-full md:w-1/2
            p-8 sm:p-12
            flex flex-col justify-center
            relative
            overflow-y-auto
          "
        >
          {/* MOBILE HEADER */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-2xl font-semibold text-white">
              Create Account
            </h1>
            <p className="text-gray-300 mt-1 text-sm">
              Join SoundOfHymns
            </p>
          </div>

          <div className="w-full max-w-sm mx-auto">
            <h2 className="hidden md:block text-2xl font-semibold text-white mb-6">
              Create Account
            </h2>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-gray-300 text-sm font-medium">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="
                    w-full px-4 py-3 bg-white/5 text-white
                    rounded-lg border border-white/10
                    focus:border-purple-500 focus:bg-white/10 focus:outline-none
                    transition-colors placeholder:text-gray-600
                  "
                />
              </div>

              {/* Organization */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="text-gray-300 text-sm font-medium">
                    Organization
                  </label>
                  <span className="text-xs text-gray-500">Optional</span>
                </div>
                <input
                  name="organization"
                  type="text"
                  placeholder="e.g. St. Mark’s Church"
                  value={formData.organization}
                  onChange={handleChange}
                  className="
                    w-full px-4 py-3 bg-white/5 text-white
                    rounded-lg border border-white/10
                    focus:border-purple-500 focus:bg-white/10 focus:outline-none
                    transition-colors placeholder:text-gray-600
                  "
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-gray-300 text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full px-4 py-3 bg-white/5 text-white
                    rounded-lg border border-white/10
                    focus:border-purple-500 focus:bg-white/10 focus:outline-none
                    transition-colors placeholder:text-gray-600
                  "
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-gray-300 text-sm font-medium">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    w-full px-4 py-3 bg-white/5 text-white
                    rounded-lg border border-white/10
                    focus:border-purple-500 focus:bg-white/10 focus:outline-none
                    transition-colors placeholder:text-gray-600
                  "
                />
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-3 pt-2">
                <input 
                  name="terms"
                  type="checkbox" 
                  required 
                  checked={formData.terms}
                  onChange={handleChange}
                  className="
                    mt-1 w-4 h-4 rounded border-gray-600 bg-white/5 
                    text-purple-600 focus:ring-purple-500 focus:ring-offset-0
                  " 
                />
                <p className="text-gray-400 text-xs leading-relaxed">
                  I accept the{" "}
                  <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/membership-agreement"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Membership Agreement
                  </Link>.
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full py-3 rounded-lg font-semibold text-white
                  bg-purple-700 hover:bg-purple-600
                  transition-all transform active:scale-[0.98]
                  shadow-lg shadow-purple-900/20
                  mt-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-gray-400 text-sm text-center mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
