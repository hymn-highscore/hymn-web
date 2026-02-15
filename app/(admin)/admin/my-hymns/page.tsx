"use client";

import { useMemo, useState } from "react";
import { 
  Search, 
  BookOpen, 
  Music, 
  PlayCircle, 
  ChevronDown, 
  Filter,
  MoreHorizontal,
  SlidersHorizontal,
  ListMusic
} from "lucide-react";

/* -------------------------------------------
   Hymnal registry
------------------------------------------- */
import {
  HYMNAL_DATA,
  HYMNAL_OPTIONS,
  type HymnalName,
} from "./data";

/* -------------------------------------------
   Chants / Canticles / Psalms data
------------------------------------------- */
import { chantsCanticlesPsalms } from "./data/chants";

/* -------------------------------------------
   Shared type
------------------------------------------- */
import type { Item } from "./data/types";

const ITEMS_PER_PAGE = 50;

export default function MyHymnsPage() {
  /* -------------------------------------------
     View state
  ------------------------------------------- */
  const [activeMain, setActiveMain] =
    useState<"hymnal" | "chants">("hymnal");

  const [selectedHymnal, setSelectedHymnal] =
    useState<HymnalName>("Methodist Hymnbook");

  /* -------------------------------------------
     Table state
  ------------------------------------------- */
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] =
    useState<"number" | "alpha">("number");
  const [currentPage, setCurrentPage] = useState(1);
  const [openAltFor, setOpenAltFor] =
    useState<number | null>(null);

  /* -------------------------------------------
     Active dataset
  ------------------------------------------- */
  const activeItems: Item[] = useMemo(() => {
    return activeMain === "hymnal"
      ? HYMNAL_DATA[selectedHymnal]
      : chantsCanticlesPsalms;
  }, [activeMain, selectedHymnal]);

  /* -------------------------------------------
     Search & sort
  ------------------------------------------- */
  const filtered = activeItems.filter(item =>
    `${item.number} ${item.firstLine} ${item.tune.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) =>
    sortBy === "number"
      ? a.number - b.number
      : a.firstLine.localeCompare(b.firstLine)
  );

  /* -------------------------------------------
     Pagination
  ------------------------------------------- */
  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / ITEMS_PER_PAGE)
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = sorted.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* -------------------------------------------
     Helpers
  ------------------------------------------- */
  function resetTableState() {
    setSearch("");
    setSortBy("number");
    setCurrentPage(1);
    setOpenAltFor(null);
  }

  /* -------------------------------------------
     Render
  ------------------------------------------- */
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Hymns
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Browse and manage your hymnal collection.
          </p>
        </div>
      </div>

      {/* Main Controls Card */}
      <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-white/5">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <SlidersHorizontal className="w-5 h-5 text-purple-500" />
            Filters & Controls
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Toggle & Select Row */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            
            {/* Toggles */}
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
              <button
                onClick={() => {
                  setActiveMain("hymnal");
                  resetTableState();
                }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${activeMain === "hymnal" 
                    ? "bg-white dark:bg-purple-600 text-purple-700 dark:text-white shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }
                `}
              >
                <BookOpen size={16} />
                Hymnal
              </button>
              <button
                onClick={() => {
                  setActiveMain("chants");
                  resetTableState();
                }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${activeMain === "chants" 
                    ? "bg-white dark:bg-purple-600 text-purple-700 dark:text-white shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }
                `}
              >
                <Music size={16} />
                Chants & Psalms
              </button>
            </div>

            {/* Hymnal Selector */}
            {activeMain === "hymnal" && (
              <div className="relative group w-full lg:w-auto">
                <select
                  value={selectedHymnal}
                  onChange={e => {
                    setSelectedHymnal(e.target.value as HymnalName);
                    resetTableState();
                  }}
                  className="
                    appearance-none
                    w-full lg:w-auto
                    pl-4 pr-10 py-2.5
                    bg-gray-50 dark:bg-white/5
                    border border-gray-200 dark:border-white/10
                    rounded-xl
                    text-sm font-medium text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50
                    cursor-pointer
                    min-w-[240px]
                  "
                >
                  {HYMNAL_OPTIONS.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            )}
          </div>

          <div className="h-px bg-gray-100 dark:bg-white/5" />

          {/* Search & Filter Row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                  setOpenAltFor(null);
                }}
                placeholder="Search by number, title, or tune..."
                className="
                  w-full pl-10 pr-4 py-2.5
                  bg-white dark:bg-black/20
                  border border-gray-200 dark:border-white/10
                  rounded-xl
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50
                  placeholder:text-gray-400
                  transition-all
                "
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-auto">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={sortBy}
                  onChange={e => {
                    setSortBy(e.target.value as "number" | "alpha");
                    setCurrentPage(1);
                    setOpenAltFor(null);
                  }}
                  className="
                    w-full md:w-auto
                    appearance-none
                    pl-10 pr-10 py-2.5
                    bg-white dark:bg-black/20
                    border border-gray-200 dark:border-white/10
                    rounded-xl
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50
                    cursor-pointer
                  "
                >
                  <option value="number">Sort by Number</option>
                  <option value="alpha">Sort A-Z</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <ListMusic className="w-5 h-5 text-purple-500" />
            Registry
          </h2>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300 border border-purple-100 dark:border-purple-500/20">
            {sorted.length} items
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-medium">
              <tr>
                <th className="px-6 py-4 w-24">#</th>
                <th className="px-6 py-4">Title / First Line</th>
                <th className="px-6 py-4 w-1/3">Tune & Audio</th>
                <th className="px-6 py-4 w-16"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {pageItems.map((item) => {
                const altCount = item.tune.length - 1;
                const open = openAltFor === item.number;

                return (
                  <tr
                    key={`${activeMain}-${item.number}`}
                    className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-gray-500 dark:text-gray-400">
                      {item.number}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900 dark:text-gray-200 block mb-0.5">
                        {item.firstLine}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="
                          flex items-center justify-center w-8 h-8 
                          rounded-full bg-purple-100 dark:bg-purple-900/30 
                          text-purple-600 dark:text-purple-400 
                          hover:bg-purple-600 hover:text-white 
                          transition-all group-hover:scale-110
                        ">
                          <PlayCircle size={18} className="ml-0.5" />
                        </button>
                        
                        <div className="flex flex-col">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {item.tune[0]}
                          </span>
                          
                          {altCount > 0 && (
                            <button
                              onClick={() => setOpenAltFor(open ? null : item.number)}
                              className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 mt-0.5 w-fit"
                            >
                              {open ? "Hide alternatives" : `+ ${altCount} alternative${altCount > 1 ? 's' : ''}`}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Alternatives Dropdown */}
                      {open && (
                        <div className="mt-3 ml-11 space-y-2 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 animate-in slide-in-from-top-2">
                          {item.tune.slice(1).map(t => (
                            <div key={t} className="flex items-center gap-3">
                              <button className="
                                flex items-center justify-center w-6 h-6 
                                rounded-full bg-white dark:bg-white/10 
                                text-gray-500 dark:text-gray-400
                                hover:text-purple-600 hover:bg-purple-50
                                transition-colors
                              ">
                                <PlayCircle size={14} className="ml-0.5" />
                              </button>
                              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{t}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-purple-600 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Search size={48} className="mb-4 opacity-20" />
                      <p className="text-lg font-medium text-gray-900 dark:text-white">No hymns found</p>
                      <p className="text-sm">Try adjusting your search terms</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50/50 dark:bg-white/[0.02]">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium text-gray-900 dark:text-white">{startIndex + 1}</span> to <span className="font-medium text-gray-900 dark:text-white">{Math.min(startIndex + ITEMS_PER_PAGE, sorted.length)}</span> of <span className="font-medium text-gray-900 dark:text-white">{sorted.length}</span> results
          </span>

          <div className="flex gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 disabled:opacity-50 hover:bg-white dark:hover:bg-white/10 transition-colors"
            >
              <ChevronDown className="rotate-90" size={16} />
            </button>
            
            <div className="flex items-center px-4 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 disabled:opacity-50 hover:bg-white dark:hover:bg-white/10 transition-colors"
            >
              <ChevronDown className="-rotate-90" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
