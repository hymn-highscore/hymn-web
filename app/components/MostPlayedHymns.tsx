"use client";

import { motion } from "framer-motion";

export default function MostPlayedHymns() {
  const hymns = [
    { rank: 1, title: "All Glory, Laud, and Honor", plays: 1284 },
    { rank: 2, title: "A Mighty Fortress Is Our God", plays: 1106 },
    { rank: 3, title: "Holy, Holy, Holy! Lord God Almighty", plays: 987 },
    { rank: 4, title: "Praise to the Lord, the Almighty", plays: 842 },
    { rank: 5, title: "Come, Thou Fount of Every Blessing", plays: 768 },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <section className="px-6 py-10 md:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gold">
            Most Played Hymns This Week
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            The hymns most listened to by our SoundOfHymns community this week.
          </p>
        </motion.div>

        {/* List */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="divide-y divide-white/10"
        >
          {hymns.map((hymn) => {
            const isTop = hymn.rank === 1;

            return (
              <motion.div
                key={hymn.rank}
                variants={itemVariant}
                className="
                  group relative
                  flex items-center justify-between
                  py-3 px-2
                  transition
                  hover:bg-white/5
                  cursor-pointer
                "
              >
                {/* Accent bar (desktop hover only) */}
                <span
                  className="
                    hidden md:block
                    absolute left-0 top-0 h-full w-[2px]
                    bg-gold
                    opacity-0
                    group-hover:opacity-100
                    transition
                  "
                />

                {/* Left */}
                <div className="flex items-center gap-3 md:gap-4">
                  <span
                    className={`
                      font-semibold w-6 text-right
                      ${isTop ? "text-gold" : "text-gray-400"}
                    `}
                  >
                    {isTop ? "★" : hymn.rank}
                  </span>

                  <span
                    className={`
                      text-sm md:text-base
                      ${isTop ? "text-gold" : ""}
                    `}
                  >
                    {hymn.title}
                  </span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {hymn.plays.toLocaleString()} plays
                  </span>

                  {/* Play control */}
                  <button
                    aria-label="Play hymn"
                    className="
                      text-gold text-sm
                      opacity-100
                      md:opacity-0 md:translate-x-1
                      md:group-hover:opacity-100 md:group-hover:translate-x-0
                      transition-all
                    "
                  >
                    ▶<span className="hidden md:inline ml-1">Listen</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
