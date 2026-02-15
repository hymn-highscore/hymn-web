"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  User,
  Music,
  ChevronDown,
  X,
} from "lucide-react";

const APP_VERSION = "v0.9.0";

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [accountOpen, setAccountOpen] = useState(true);

  useEffect(() => {
    onClose();
  }, [pathname]);

  const collapsed = !open;

  const dashboardActive = pathname === "/admin";
  const profileActive = pathname.startsWith("/admin/profile");
  const subscriptionActive = pathname.startsWith("/admin/subscription");
  const myHymnsActive = pathname.startsWith("/admin/my-hymns");
  const accountActive = profileActive || subscriptionActive;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:fixed z-50
          top-16 left-0
          h-[calc(100vh-4rem)]
          flex flex-col
          bg-[var(--background)] text-[var(--foreground)]
          border-r border-[var(--panel-border)]
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-16" : "w-60"}
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile close button */}
        <div className="md:hidden h-14 flex items-center justify-end px-3 border-b border-[var(--panel-border)]">
          <button
            onClick={onClose}
            className="opacity-70 hover:text-purple-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav 
          className={`
            flex-1 px-2 py-5 space-y-4
            ${collapsed ? "overflow-visible" : "overflow-y-auto"}
          `}
        >
          <NavItem
            href="/admin"
            icon={<LayoutGrid size={18} />}
            label="Dashboard"
            active={dashboardActive}
            collapsed={collapsed}
          />

          <NavItem
            href="/admin/my-hymns"
            icon={<Music size={18} />}
            label="My Hymns"
            active={myHymnsActive}
            collapsed={collapsed}
          />

          {/* Account */}
          <div>
            {collapsed ? (
              <Link href="/admin/profile">
                <SidebarItem
                  icon={<User size={18} />}
                  label="Account"
                  active={accountActive}
                  collapsed={collapsed}
                />
              </Link>
            ) : (
              <SidebarItem
                icon={<User size={18} />}
                label="Account"
                active={accountActive}
                collapsed={collapsed}
                onClick={() => setAccountOpen((v) => !v)}
                rightIcon={
                  <ChevronDown
                    size={14}
                    className={`transition ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  />
                }
              />
            )}

            {!collapsed && accountOpen && (
              <div className="ml-8 mt-2 space-y-2">
                <SubItem href="/admin/profile" active={profileActive}>
                  Profile
                </SubItem>
                <SubItem
                  href="/admin/subscription"
                  active={subscriptionActive}
                >
                  Subscription
                </SubItem>
              </div>
            )}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="px-2 py-4 border-t border-[var(--panel-border)] space-y-3">
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md opacity-80 hover:text-purple-500 hover:bg-black/10 dark:hover:bg-white/10"
          >
            <span>{theme === "dark" ? "🌙" : "☀️"}</span>
            {!collapsed && (
              <span className="text-sm">
                {theme === "dark" ? "Dark" : "Light"} Mode
              </span>
            )}
          </button>

          {!collapsed && (
            <div className="text-xs text-center opacity-50">
              SoundOfHymns {APP_VERSION}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

/* ---------- helpers ---------- */

function NavItem({
  href,
  icon,
  label,
  active,
  collapsed,
}: any) {
  return (
    <Link href={href}>
      <SidebarItem
        icon={icon}
        label={label}
        active={active}
        collapsed={collapsed}
      />
    </Link>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  collapsed,
  onClick,
  rightIcon,
}: any) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer
        transition
        ${
          active
            ? "bg-black/10 dark:bg-white/10 text-purple-500"
            : "opacity-80 hover:text-purple-500 hover:bg-black/10 dark:hover:bg-white/10"
        }
      `}
    >
      {icon}
      {!collapsed && (
        <>
          <span className="text-sm flex-1">{label}</span>
          {rightIcon}
        </>
      )}
      
      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="
          absolute left-full top-1/2 -translate-y-1/2 ml-3
          px-2 py-1 
          bg-gray-900 dark:bg-white 
          text-white dark:text-gray-900 
          text-xs font-medium rounded shadow-md
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-75
          pointer-events-none whitespace-nowrap
          z-50
        ">
          {label}
        </div>
      )}
    </div>
  );
}

function SubItem({ href, active, children }: any) {
  return (
    <Link href={href}>
      <div
        className={`
          px-3 py-2 rounded-md text-sm
          ${
            active
              ? "bg-purple-500/10 text-purple-400"
              : "hover:bg-purple-500/10"
          }
        `}
      >
        {children}
      </div>
    </Link>
  );
}
