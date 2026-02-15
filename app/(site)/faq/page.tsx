"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItemProps = {
  q: string;
  a: string;
};

export default function FAQPage() {
  const faqs = [
    {
      question: "What is SoundOfHymns?",
      answer:
        "SoundOfHymns is your digital organist and choral assistant, designed to help churches, families, and individuals sing hymns with rich organ accompaniment and learn voice parts with isolated playback.",
    },
    {
      question: "Does SoundOfHymns work without an organist?",
      answer:
        "Yes. Churches without an organist can use SoundOfHymns to lead worship by selecting hymns, setting the key, adjusting tempo, and playing organ accompaniment with realistic sound.",
    },
    {
      question: "Can SoundOfHymns be used for choir rehearsal?",
      answer:
        "Absolutely. Singers can isolate their voice part (Soprano, Alto, Tenor, Bass) and rehearse with or without accompaniment.",
    },
    {
      question: "Which devices are supported?",
      answer:
        "SoundOfHymns is available for desktop (macOS). A mobile version is under development, and a Windows version will follow.",
    },
    {
      question: "Do I need internet to use the app?",
      answer:
        "No. Once downloaded, the hymns and playback features can be used offline.",
    },
    {
      question: "How much does the subscription cost?",
      answer:
        "We will offer Standard and Premium plans. Pricing will be announced at launch.",
    },
    {
      question: "Can I use SoundOfHymns in live church services?",
      answer:
        "Yes! The app is designed for real services with stable playback and adjustable keys.",
    },
  ];

  return (
    <main className="relative">

      {/* 🌑 PAGE BACKGROUND DARKENING OVERLAY */}
      <div
        className="
          absolute inset-0 -z-10
          bg-gradient-to-b
          from-black/30
          via-black/45
          to-black/60
        "
      />

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16 text-white space-y-4">

        {/* HEADER */}
        <div className="bg-black/50 p-6 rounded-xl border border-white/10 text-center space-y-2">
          <h1 className="text-4xl font-bold text-gold">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300">
            Find answers to common questions about SoundOfHymns.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <FAQItem key={index} q={item.question} a={item.answer} />
          ))}
        </div>

        {/* CTA */}
        <div className="bg-black/50 p-6 rounded-xl border border-white/10 text-center space-y-2">
          <p className="text-gray-300">Still need help?</p>
          <a
            href="mailto:info.soundofhymns@gmail.com"
            className="text-gold font-semibold hover:underline"
          >
            Contact us anytime
          </a>
        </div>

      </div>
    </main>
  );
}

/* ============================================================
   FAQ ITEM
   ============================================================ */
function FAQItem({ q, a }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black/50 border border-white/10 rounded-xl">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex justify-between items-center text-left"
      >
        <span className="text-lg font-semibold text-gold">{q}</span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-gold text-xl"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="px-6 pb-4 text-gray-200 overflow-hidden"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
