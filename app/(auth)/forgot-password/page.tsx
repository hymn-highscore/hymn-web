 "use client";
 
 export const dynamic = "force-dynamic";
 
 import { useEffect, useState } from "react";
 import { supabase } from "@/lib/supabase/client";
 import { useRouter } from "next/navigation";
 import Link from "next/link";
 import { X } from "lucide-react";
 
 export default function ForgotPasswordPage() {
   const router = useRouter();
   const [stage, setStage] = useState<"request" | "reset">("request");
   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [password, setPassword] = useState("");
   const [confirm, setConfirm] = useState("");
 
   useEffect(() => {
     const { data: sub } = supabase.auth.onAuthStateChange((event) => {
       if (event === "PASSWORD_RECOVERY") {
         setStage("reset");
       }
     });
     return () => {
       sub.subscription.unsubscribe();
     };
   }, []);
 
   async function handleRequest(e: React.FormEvent) {
     e.preventDefault();
     setLoading(true);
     setError(null);
     try {
       const redirectTo =
         typeof window !== "undefined"
           ? `${window.location.origin}/forgot-password`
           : undefined;
       const { error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo,
       });
       if (error) throw error;
     } catch (err: any) {
       setError(err.message || "Failed to send reset email.");
       setLoading(false);
       return;
     }
     setLoading(false);
   }
 
   async function handleReset(e: React.FormEvent) {
     e.preventDefault();
     setLoading(true);
     setError(null);
     if (password !== confirm) {
       setError("Passwords do not match.");
       setLoading(false);
       return;
     }
     try {
       const { error } = await supabase.auth.updateUser({ password });
       if (error) throw error;
       router.replace("/login");
     } catch (err: any) {
       setError(err.message || "Failed to update password.");
       setLoading(false);
       return;
     }
     setLoading(false);
   }
 
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
       <div
         className="
           w-full max-w-md
           bg-black/75 backdrop-blur-md
           rounded-2xl
           border border-white/10
           shadow-2xl
           p-8
         "
       >
         <Link
           href="/login"
           className="absolute top-4 right-4 z-50 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
           aria-label="Back to Login"
         >
           <X size={20} />
         </Link>
         <h1 className="text-2xl font-semibold text-white mb-2">
           {stage === "request" ? "Reset Password" : "Set New Password"}
         </h1>
         <p className="text-gray-300 text-sm mb-6">
           {stage === "request"
             ? "Enter your email to receive a password reset link."
             : "Enter a new password for your account."}
         </p>
 
         {stage === "request" ? (
           <form onSubmit={handleRequest} className="space-y-4">
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
               {loading ? "Sending..." : "Send Reset Link"}
             </button>
           </form>
         ) : (
           <form onSubmit={handleReset} className="space-y-4">
             <div className="space-y-2">
               <label className="text-gray-300 text-sm font-medium">New Password</label>
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
             <div className="space-y-2">
               <label className="text-gray-300 text-sm font-medium">Confirm Password</label>
               <input
                 type="password"
                 required
                 value={confirm}
                 onChange={(e) => setConfirm(e.target.value)}
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
               {loading ? "Updating..." : "Update Password"}
             </button>
           </form>
         )}
 
         <div className="mt-6 text-center text-sm">
           <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
             Back to Login
           </Link>
         </div>
       </div>
     </main>
   );
 }
