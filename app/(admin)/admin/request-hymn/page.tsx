"use client";

import { useState } from "react";
import { 
  Send, 
  Music, 
  User, 
  Calendar, 
  FileAudio, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  ChevronDown, 
  ChevronUp,
  History,
  MessageSquarePlus
} from "lucide-react";

type RequestStatus = "received" | "pending" | "complete";

const STATUS_FLOW: RequestStatus[] = ["received", "pending", "complete"];

type RequestItem = {
  id: string;
  hymnTitle: string; // Added for better display
  status: RequestStatus;
  date: string;
};

export default function RequestHymnPage() {
  const [requests, setRequests] = useState<RequestItem[]>([
    { id: "Req001", hymnTitle: "O for a Thousand Tongues", status: "received", date: "Jan 12, 2025" },
    { id: "Req002", hymnTitle: "And Can It Be", status: "pending", date: "Jan 10, 2025" },
    { id: "Req003", hymnTitle: "Great is Thy Faithfulness", status: "complete", date: "Dec 28, 2024" },
  ]);

  const [showSubmitted, setShowSubmitted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [tune, setTune] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newId = `Req${String(requests.length + 1).padStart(3, "0")}`;
      setRequests([
        { 
          id: newId, 
          hymnTitle: title || "New Request", 
          status: "received",
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        },
        ...requests
      ]);
      setTitle("");
      setTune("");
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Request a Hymn
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Submit a request to add missing hymns to the global catalogue.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Request Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-purple-500" />
                New Request
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field
                  label="First Line of Hymn"
                  icon={<Music size={14} />}
                  required
                  placeholder="e.g. O for a Thousand Tongues to Sing"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Field
                  label="Name of Tune"
                  icon={<Music size={14} />}
                  required
                  placeholder="e.g. AZMON"
                  value={tune}
                  onChange={(e) => setTune(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field
                  label="Author"
                  icon={<User size={14} />}
                  optional
                  placeholder="e.g. Charles Wesley"
                />

                <Field
                  label="Year of Composition"
                  icon={<Calendar size={14} />}
                  optional
                  type="number"
                  placeholder="e.g. 1739"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FileAudio size={14} className="text-purple-500" />
                  Attach MIDI File <span className="text-gray-400 font-normal ml-auto text-xs">(Optional)</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 dark:border-white/10 border-dashed rounded-xl hover:border-purple-400 dark:hover:border-purple-500/50 transition-colors bg-gray-50/50 dark:bg-white/[0.02]">
                  <div className="space-y-1 text-center">
                    <FileAudio className="mx-auto h-10 w-10 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".mid,.midi" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      MIDI files only up to 2MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    flex items-center gap-2 px-6 py-2.5 
                    bg-purple-600 hover:bg-purple-700 
                    text-white font-medium rounded-xl 
                    transition-all shadow-md shadow-purple-500/20
                    disabled:opacity-70 disabled:cursor-not-allowed
                  "
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Request History */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden sticky top-6">
            <div 
              className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between cursor-pointer lg:cursor-default"
              onClick={() => setShowSubmitted(!showSubmitted)}
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <History className="w-5 h-5 text-purple-500" />
                Request History
              </h2>
              <div className="lg:hidden text-gray-400">
                {showSubmitted ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            
            {(showSubmitted || window.innerWidth >= 1024) && (
              <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                {requests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No requests submitted yet.</p>
                  </div>
                ) : (
                  requests.map(req => (
                    <RequestStatusCard key={req.id} request={req} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------------------------------------
   Sub-components
--------------------------------------- */

function RequestStatusCard({ request }: { request: RequestItem }) {
  const currentIndex = STATUS_FLOW.indexOf(request.status);
  const isComplete = request.status === "complete";

  return (
    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 space-y-3 hover:border-purple-200 dark:hover:border-purple-500/30 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
            {request.hymnTitle}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            ID: {request.id} • {request.date}
          </p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      {/* Progress Steps */}
      <div className="relative pt-2">
        <div className="overflow-hidden h-1.5 mb-2 text-xs flex rounded bg-gray-200 dark:bg-white/10">
          <div 
            style={{ width: `${((currentIndex + 1) / STATUS_FLOW.length) * 100}%` }}
            className={`
              shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500
              ${isComplete ? "bg-green-500" : "bg-purple-500"}
            `}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          <span>Sent</span>
          <span>Review</span>
          <span>Done</span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: RequestStatus }) {
  const styles = {
    received: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    complete: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  const icons = {
    received: <CheckCircle2 size={12} />,
    pending: <Clock size={12} />,
    complete: <CheckCircle2 size={12} />,
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function Field({
  label,
  icon,
  required,
  optional,
  placeholder,
  type = "text",
  value,
  onChange
}: {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
        {icon && <span className="text-purple-500">{icon}</span>}
        {label}
      </label>

      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full px-4 py-2.5 rounded-xl
          bg-gray-50 dark:bg-white/5
          border border-gray-200 dark:border-white/10
          text-gray-900 dark:text-white
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-purple-500/50
          transition-all
        "
      />
    </div>
  );
}
