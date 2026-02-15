"use client";

import { useState } from "react";

const INSTRUMENTS = [
  "Pipe Organ",
  "Brite Organ",
  "Grand Piano",
  "Trumpet",
  "String",
  "Choir Pad",
  "Harpsichord",
  "Harmonium",
  "Saxophone",
  "Flute",
];

export default function AddInstrumentsPage() {
  const [installed, setInstalled] = useState<string[]>(["Pipe Organ"]);

  function playSamplePlaceholder(name: string) {
    console.log(`Preview sample for: ${name}`);
  }

  function purchase(name: string) {
    setInstalled(prev => [...prev, name]);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold">Add More Instruments</h1>
      <p className="text-sm opacity-70">
        Preview instruments and expand your hymn player.
      </p>

      <div className="rounded-xl bg-[var(--surface)] ring-1 ring-black/20 overflow-hidden">

        {/* Header */}
        <div className="flex px-6 py-3 text-sm opacity-70 border-b border-gray-300 dark:border-gray-600">
          <div className="flex-1">Instrument</div>
          <div className="w-24 text-left">Preview</div>
          <div className="w-32 text-right">Action</div>
        </div>

        {INSTRUMENTS.map((name, idx) => {
          const isInstalled = installed.includes(name);
          const isLast = idx === INSTRUMENTS.length - 1;

          return (
            <div
              key={name}
              className={`
                flex items-center
                px-6 py-4
                ${!isLast ? "border-b border-gray-300 dark:border-gray-600" : ""}
              `}
            >
              {/* Instrument */}
              <div className="flex-1 font-medium">
                {name}
              </div>

              {/* Play – fixed column */}
              <div className="w-24 text-left">
                <button
                  onClick={() => playSamplePlaceholder(name)}
                  className="
                    text-sm underline opacity-80
                    hover:opacity-100 cursor-pointer
                  "
                >
                  ▶ Play
                </button>
              </div>

              {/* Purchase / Installed */}
              <div className="w-32 text-right">
                {isInstalled ? (
                  <span className="text-green-500 font-medium text-sm">
                    Installed
                  </span>
                ) : (
                  <button
                    onClick={() => purchase(name)}
                    className="
                      px-4 py-1.5 rounded-md
                      text-sm bg-purple-600 text-black
                      hover:opacity-90
                    "
                  >
                    Purchase
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

