"use client";

import { 
  User, 
  Building, 
  Mail, 
  CreditCard, 
  Shield, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Download,
  Loader2,
  X
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [changeOpen, setChangeOpen] = useState(false);
  const [changing, setChanging] = useState(false);
  const [changeError, setChangeError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  async function handleDeleteAccount() {
    setDeleting(true);
    setDeleteError(null);
    try {
      const resp = await fetch("/api/account/delete", { method: "POST" });
      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        setDeleteError(body?.error || "Failed to delete account.");
        setDeleting(false);
        return;
      }
      await supabase.auth.signOut();
      router.replace("/");
    } catch (e: any) {
      setDeleteError(e?.message || "Failed to delete account.");
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Account Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal information, billing, and security preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Organization */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Profile Card */}
          <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-purple-500" />
                Profile Information
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-6 mb-8">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-purple-50 dark:ring-white/5">
                  AD
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Admin User</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Building size={14} className="opacity-70" /> Organization Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. St. Mark Methodist Church"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Mail size={14} className="opacity-70" /> Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="admin@church.org"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 active:scale-95 transition-all shadow-md shadow-purple-500/20">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Payment History
              </h2>
              <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                <Download size={14} /> Download All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-medium">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {[
                    { date: "Jan 12, 2025", desc: "Premium Subscription", amount: "$29.00", status: "Paid" },
                    { date: "Dec 12, 2024", desc: "Standard Subscription", amount: "$19.00", status: "Paid" },
                    { date: "Nov 12, 2024", desc: "Standard Subscription", amount: "$19.00", status: "Paid" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-gray-900 dark:text-gray-200">{row.date}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-gray-200">{row.desc}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.amount}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                          <CheckCircle2 size={12} />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-purple-600 transition-colors">
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Billing & Security */}
        <div className="space-y-8">
          
          {/* Subscription Plan */}
          <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-500" />
                Current Plan
              </h2>
            </div>
            <div className="p-6">
              <div className="bg-purple-50 dark:bg-purple-500/10 rounded-xl p-4 mb-6 border border-purple-100 dark:border-purple-500/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-purple-900 dark:text-purple-100">Premium Plan</h3>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Billed monthly</p>
                  </div>
                  <span className="bg-white dark:bg-purple-500/20 text-purple-700 dark:text-purple-200 text-xs font-bold px-2 py-1 rounded-md border border-purple-100 dark:border-transparent">
                    Active
                  </span>
                </div>
              </div>
              
              <button className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm">
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                Security
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Secure your account with a strong password.
              </p>
              <button
                onClick={() => setChangeOpen(true)}
                className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-2xl border border-red-200 dark:border-red-900/30 overflow-hidden">
            <div className="p-4 bg-red-50 dark:bg-red-900/10">
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 flex items-center gap-2">
                <AlertTriangle size={16} /> Danger Zone
              </h3>
            </div>
            <div className="p-4 bg-white dark:bg-[#18181b]">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Permanently delete your account and all of your content.
              </p>
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
              >
                Delete Account
              </button>
            </div>
          </div>

        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#18181b] rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <button
                onClick={() => !deleting && setConfirmDelete(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Delete Account?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This action is permanent. Your account and profile will be deleted.
            </p>
            {deleteError && (
              <div className="mb-4 text-sm text-red-600 dark:text-red-400">
                {deleteError}
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(false)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all shadow-md shadow-red-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {deleting ? <Loader2 size={16} className="animate-spin" /> : null}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {changeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#18181b] rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-white/10">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Change Password</h2>
              <button
                onClick={() => !changing && setChangeOpen(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
              {changeError && (
                <div className="text-sm text-red-600 dark:text-red-400">
                  {changeError}
                </div>
              )}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setChangeOpen(false)}
                  disabled={changing}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setChanging(true);
                    setChangeError(null);
                    if (newPassword !== confirmPassword) {
                      setChangeError("Passwords do not match.");
                      setChanging(false);
                      return;
                    }
                    const { error } = await supabase.auth.updateUser({ password: newPassword });
                    if (error) {
                      setChangeError(error.message || "Failed to update password.");
                      setChanging(false);
                      return;
                    }
                    setChanging(false);
                    setChangeOpen(false);
                  }}
                  disabled={changing}
                  className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all shadow-md shadow-purple-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {changing ? <Loader2 size={16} className="animate-spin" /> : null}
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
