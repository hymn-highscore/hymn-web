"use client";
import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";

type Plan = "standard" | "premium";

export default function SubscriptionPage() {
  const [currentPlan] = useState<Plan>("standard");

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Subscription</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Choose a plan that fits your needs and unlock premium features.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PlanCard
          title="Standard"
          price="$XX / month"
          isCurrent={currentPlan === "standard"}
          features={[
            "Hymns in your catalogue",
            "Change key (transpose)",
            "SATB learning",
          ]}
          actionLabel="Current Plan"
          disabled
        />

        <PlanCard
          title="Premium"
          price="$XX / month"
          highlight
          isCurrent={currentPlan === "premium"}
          features={[
            "All Standard features",
            "Hymns in every catalogue",
            "Submit requests for songs",
            "Play MIDI files",
            "Accompaniments included",
          ]}
          actionLabel="Upgrade to Premium"
        />
      </div>
    </div>
  );
}

function PlanCard({
  title,
  price,
  features,
  isCurrent,
  actionLabel,
  disabled,
  highlight,
}: {
  title: string;
  price: string;
  features: string[];
  isCurrent?: boolean;
  disabled?: boolean;
  highlight?: boolean;
  actionLabel: string;
}) {
  return (
    <div
      className={[
        "bg-white dark:bg-[#18181b]",
        "rounded-2xl border border-gray-200 dark:border-white/10",
        "shadow-sm overflow-hidden transition",
        "hover:shadow-md hover:-translate-y-0.5",
        highlight ? "ring-2 ring-purple-500/20 bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-500/5" : "",
      ].join(" ")}
    >
      <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {highlight ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-200 border border-purple-100 dark:border-transparent">
              <Star size={12} />
              Recommended
            </span>
          ) : null}
        </div>
        {isCurrent ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
            Current Plan
          </span>
        ) : null}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          {highlight ? (
            <span className="text-[11px] font-semibold px-2 py-1 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200 border border-purple-200 dark:border-transparent">
              Best Value
            </span>
          ) : null}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{price}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Cancel anytime</span>
        </div>

        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          disabled={disabled}
          className={[
            "w-full py-2.5 rounded-xl font-semibold transition",
            disabled
              ? "bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700 shadow-sm shadow-purple-500/20",
          ].join(" ")}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
