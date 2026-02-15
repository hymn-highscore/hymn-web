"use client";

import { useState } from "react";
import { 
  Book, 
  Download, 
  CheckCircle2, 
  Library, 
  Search, 
  FileText, 
  X,
  Loader2,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";

export const dynamic = "force-dynamic";

type Hymnal = {
  name: string;
  description: string;
  count: number;
  index: string[];
};

const HYMNALS: Hymnal[] = [
  {
    name: "Methodist Hymnbook",
    description: "The classic collection of hymns for Methodist worship.",
    count: 984,
    index: [
      "O for a Thousand Tongues to Sing",
      "Come, Thou Fount of Every Blessing",
      "Holy, Holy, Holy! Lord God Almighty",
      "Amazing Grace! How Sweet the Sound",
      "All Hail the Power of Jesus' Name",
    ],
  },
  {
    name: "Ancient & Modern",
    description: "Standard edition for the Church of England.",
    count: 636,
    index: [
      "Praise, My Soul, the King of Heaven",
      "The Day Thou Gavest, Lord, Is Ended",
      "Dear Lord and Father of Mankind",
    ],
  },
  {
    name: "Presbyterian Hymnbook",
    description: "Hymns and Psalms for the Presbyterian Church.",
    count: 750,
    index: [
      "Guide Me, O Thou Great Jehovah",
      "O God, Our Help in Ages Past",
      "Be Thou My Vision",
    ],
  },
  {
    name: "Catholic Hymnal",
    description: "Traditional and contemporary Catholic hymns.",
    count: 800,
    index: [
      "Holy God, We Praise Thy Name",
      "Immaculate Mary",
      "Faith of Our Fathers",
    ],
  },
  {
    name: "Seventh Day Adventist Hymnal",
    description: "Official hymnal of the Seventh-day Adventist Church.",
    count: 695,
    index: [
      "We Gather Together",
      "All Creatures of Our God and King",
      "Lift Up the Trumpet",
    ],
  },
  {
    name: "United Methodist Church Hymnal",
    description: "A wide selection of hymns for UMC congregations.",
    count: 900,
    index: [
      "For the Beauty of the Earth",
      "How Firm a Foundation",
      "Blessed Assurance",
    ],
  },
];

export default function DownloadHymnalPage() {
  const [installed, setInstalled] = useState<string[]>([
    "Methodist Hymnbook",
  ]);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Filter hymnals
  const filteredHymnals = HYMNALS.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleDownloadClick(name: string) {
    setConfirming(name);
  }

  function confirmDownload() {
    if (!confirming) return;
    setIsDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      setInstalled(prev => [...prev, confirming]);
      setConfirming(null);
      setIsDownloading(false);
    }, 1500);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <Library className="w-8 h-8 text-purple-600" />
            Hymnal Library
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
            Browse and download hymnal collections to your local library. 
            Installed hymnals are available for offline access.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search hymnals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2.5 
              bg-white dark:bg-[#18181b] 
              border border-gray-200 dark:border-white/10 
              rounded-xl
              text-sm text-gray-900 dark:text-white
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-500/50
              transition-all shadow-sm
            "
          />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredHymnals.map(hymnal => (
          <HymnalCard 
            key={hymnal.name}
            hymnal={hymnal}
            isInstalled={installed.includes(hymnal.name)}
            onDownload={() => handleDownloadClick(hymnal.name)}
          />
        ))}
        
        {filteredHymnals.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-[#18181b] rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
            <Book className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No hymnals found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-[#18181b] rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-white/10 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <button 
                onClick={() => !isDownloading && setConfirming(null)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Download Hymnal?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You are about to download <strong>{confirming}</strong>. This will add approximately 2MB to your local storage.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirming(null)}
                disabled={isDownloading}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDownload}
                disabled={isDownloading}
                className="
                  flex items-center gap-2 px-5 py-2 
                  bg-purple-600 hover:bg-purple-700 
                  text-white text-sm font-medium rounded-lg 
                  transition-all shadow-md shadow-purple-500/20
                  disabled:opacity-70 disabled:cursor-not-allowed
                "
              >
                {isDownloading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Confirm Download
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Sub Components                              */
/* -------------------------------------------------------------------------- */

function HymnalCard({ 
  hymnal, 
  isInstalled, 
  onDownload 
}: { 
  hymnal: Hymnal; 
  isInstalled: boolean; 
  onDownload: () => void;
}) {
  const [showIndex, setShowIndex] = useState(false);

  return (
    <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* Card Header / Banner */}
      <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500" />
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl group-hover:bg-purple-50 dark:group-hover:bg-purple-900/10 transition-colors">
            <Book className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
          </div>
          {isInstalled ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/30">
              <CheckCircle2 size={12} />
              Installed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400">
              Available
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1" title={hymnal.name}>
          {hymnal.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 min-h-[40px]">
          {hymnal.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
            <FileText size={14} className="mr-1.5" />
            {hymnal.count} Hymns included
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowIndex(!showIndex)}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {showIndex ? "Hide Index" : "Preview"}
            </button>
            
            {isInstalled ? (
              <button disabled className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 bg-gray-100 dark:bg-white/5 cursor-default opacity-50">
                Installed
              </button>
            ) : (
              <button
                onClick={onDownload}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm shadow-purple-500/20"
              >
                <Download size={14} />
                Download
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Index Section */}
      <div 
        className={`
          bg-gray-50/50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5
          transition-all duration-300 ease-in-out overflow-hidden
          ${showIndex ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="p-4">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Sample Index
          </h4>
          <ul className="space-y-2">
            {hymnal.index.map((song, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="text-purple-400 mt-1">•</span>
                <span className="line-clamp-1">{song}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-2 border-t border-gray-100 dark:border-white/5 text-center">
             <span className="text-xs text-gray-400 italic">
               + {hymnal.count - hymnal.index.length} more hymns
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}
