"use client";

import { useState } from "react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <AdminHeader
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <div className="flex pt-16">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main
          className={`
            flex-1 px-4 md:px-6 py-6
            transition-all duration-300
            ${sidebarOpen ? "md:ml-60" : "md:ml-16"}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
