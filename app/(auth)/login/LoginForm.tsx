 "use client";
 
 import { useState } from "react";
 import { useRouter } from "next/navigation";
 import { supabase } from "@/lib/supabase/client";
 import Link from "next/link";
 
 export default function LoginForm({
   redirectTo,
 }: {
   redirectTo?: string;
 }) {
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
 
   async function handleLogin(e: React.FormEvent) {
     e.preventDefault();
     setLoading(true);
     setError(null);
 
     const { data, error } = await supabase.auth.signInWithPassword({
       email,
       password,
     });
 
     if (error || !data.session) {
       setError(error?.message || "Login failed. Please try again.");
       setLoading(false);
       return;
     }
 
     setLoading(false);
     router.push(redirectTo || "/admin");
   }
 
   return (
     <form onSubmit={handleLogin} className="space-y-5">
       <div className="space-y-2">
         <label className="text-gray-300 text-sm font-medium">Email</label>
         <input
           type="email"
           required
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           placeholder="name@example.com"
           className="
             w-full px-4 py-3 bg-white/5 text-white
             rounded-lg border border-white/10
             focus:border-purple-500 focus:bg-white/10 focus:outline-none
             transition-colors placeholder:text-gray-600
           "
         />
       </div>
 
       <div className="space-y-2">
         <div className="flex justify-between items-center">
           <label className="text-gray-300 text-sm font-medium">Password</label>
           <Link
             href="/forgot-password"
             className="text-purple-400 text-xs hover:text-purple-300 transition-colors"
           >
             Forgot password?
           </Link>
         </div>
         <input
           type="password"
           required
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder="••••••••"
           className="
             w-full px-4 py-3 bg-white/5 text-white
             rounded-lg border border-white/10
             focus:border-purple-500 focus:bg-white/10 focus:outline-none
             transition-colors placeholder:text-gray-600
           "
         />
       </div>
 
       {error && (
         <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
           {error}
         </div>
       )}
 
       <button
         type="submit"
         disabled={loading}
         className="
           w-full py-3 rounded-lg font-semibold text-white
           bg-purple-700 hover:bg-purple-600
           transition-all transform active:scale-[0.98]
           disabled:opacity-50 disabled:cursor-not-allowed
           shadow-lg shadow-purple-900/20
         "
       >
         {loading ? "Signing in..." : "Login"}
       </button>
     </form>
   );
 }
