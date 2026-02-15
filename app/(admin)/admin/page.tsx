import AdminDashboardCards from "./components/AdminDashboardCards";
import MostPlayedHymnsChart from "./components/MostPlayedHymnsChart";

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back to your administration overview.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-[#18181b] px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      <AdminDashboardCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MostPlayedHymnsChart />
        {/* Placeholder for future widget (e.g. Recent Activity) to balance the grid */}
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 text-white flex flex-col justify-center items-start shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">New Features Available!</h3>
            <p className="text-purple-100 mb-6 max-w-md">
              Check out the new instrument packs available in the store. Enhance your worship experience today.
            </p>
            <button className="px-6 py-2.5 bg-white text-purple-900 rounded-xl font-bold hover:bg-purple-50 transition-colors shadow-lg shadow-black/20">
              Explore Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
