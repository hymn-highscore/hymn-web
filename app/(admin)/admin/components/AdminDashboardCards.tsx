import Link from "next/link";
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Music, 
  Download, 
  MessageSquarePlus, 
  User, 
  Settings,
  ArrowUpRight,
  Piano
} from "lucide-react";

/* =========================
   STAT CARD COMPONENT
   ========================= */
interface StatCardProps {
  label: string;
  value: string | React.ReactNode;
  icon: React.ReactNode;
  trend?: string;
  link?: string;
  colorClass?: string;
}

function StatCard({ label, value, icon, trend, link, colorClass = "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" }: StatCardProps) {
  const content = (
    <div className="bg-white dark:bg-[#18181b] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all group h-full">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          {icon}
        </div>
        {link && (
          <div className="text-gray-400 group-hover:text-purple-600 transition-colors">
            <ArrowUpRight size={20} />
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          {value}
        </div>
        {trend && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium flex items-center gap-1">
            {trend}
          </p>
        )}
      </div>
    </div>
  );

  return link ? (
    <Link href={link} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
}

/* =========================
   ACTION TILE COMPONENT
   ========================= */
interface ActionTileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient?: string;
}

function ActionTile({ title, description, icon, href, gradient = "from-purple-500 to-indigo-600" }: ActionTileProps) {
  return (
    <Link href={href} className="block group h-full">
      <div className="relative h-full bg-white dark:bg-[#18181b] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden hover:shadow-md transition-all hover:-translate-y-1">
        <div className={`absolute top-0 right-0 p-24 opacity-5 bg-gradient-to-br ${gradient} rounded-full blur-3xl -mr-10 -mt-10 group-hover:opacity-10 transition-opacity`} />
        
        <div className="relative z-10">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* =========================
   DASHBOARD CARDS
   ========================= */
export default function AdminDashboardCards() {
  return (
    <div className="space-y-8">
      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Hymns"
          value="300"
          icon={<BookOpen size={24} />}
          link="/admin/my-hymns"
          trend="+12 added this month"
        />

        <StatCard
          label="Schedules Created"
          value="42"
          icon={<Calendar size={24} />}
          colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          trend="+5 this week"
        />

        <StatCard
          label="Subscription"
          value={
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400">
              Active Premium
            </span>
          }
          icon={<CreditCard size={24} />}
          link="/admin/subscription"
          colorClass="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        />
      </div>

      {/* QUICK ACTIONS GRID */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionTile
            title="Request a Hymn"
            description="Can't find a specific hymn? Submit a request to our music team."
            icon={<MessageSquarePlus size={24} />}
            href="/admin/request-hymn"
            gradient="from-pink-500 to-rose-500"
          />

          <ActionTile
            title="Download Hymnal"
            description="Export your collection for offline use or projection software."
            icon={<Download size={24} />}
            href="/admin/download-hymnal"
            gradient="from-amber-500 to-orange-600"
          />

          <ActionTile
            title="Instrument Store"
            description="Browse and purchase high-quality instrument samples."
            icon={<Piano size={24} />}
            href="/admin/instruments"
            gradient="from-cyan-500 to-blue-600"
          />

          <ActionTile
            title="Manage Profile"
            description="Update your organization details and security settings."
            icon={<User size={24} />}
            href="/admin/profile"
            gradient="from-violet-500 to-purple-600"
          />
        </div>
      </div>
    </div>
  );
}
