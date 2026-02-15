export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-28 pb-16 text-white space-y-4">

      {/* Title Block */}
      <div className="bg-black/50 p-6 rounded-xl border border-white/10 space-y-3">
        <h1 className="text-4xl font-bold text-gold">About SoundOfHymns</h1>
        <p className="text-gray-200 text-lg leading-relaxed">
          Bring the beauty of hymn singing to every moment with
          <span className="text-gold font-semibold"> SoundOfHymns</span>, your digital organist and choral companion.
          Whether in church, at home, or on the go, enjoy rich organ accompaniment,
          choose your key and style, and learn your part with ease. A few ways SoundOfHymns can help you;
        </p>
      </div>

      {/* Sections */}
      <div className="bg-black/50 p-6 rounded-xl border border-white/10 space-y-2">
        <h2 className="text-2xl font-bold text-gold">For Churches Without an Organist</h2>
        <p className="text-gray-200 text-lg leading-relaxed">
          SoundOfHymns becomes your organist.<br />
          Access all your favorite hymns and, just like working with a traditional organist, tell it what to play.
          Choose your preferred instrument, key, tempo, and other settings—and sing confidently with your congregation.
        </p>
      </div>

      <div className="bg-black/50 p-6 rounded-xl border border-white/10 space-y-2">
        <h2 className="text-2xl font-bold text-gold">For Churches or Institutions With an Organist</h2>
        <p className="text-gray-200 text-lg leading-relaxed">
          SoundOfHymns is your reliable 24/7 assistant organist.<br />
          Many services use multiple keyboards or organ setups—SoundOfHymns can serve as your main or secondary organist while your traditional organist leads or plays along.
          When your organist is traveling or unavailable, SoundOfHymns is there to support your service.
        </p>
      </div>

      <div className="bg-black/50 p-6 rounded-xl border border-white/10 space-y-2">
        <h2 className="text-2xl font-bold text-gold">For Individuals and Families</h2>
        <p className="text-gray-200 text-lg leading-relaxed">
          Are you a hymn lover?<br />
          Would you like an organist available whenever you feel like singing your favorite hymns?<br />
          SoundOfHymns is perfect for family devotions, personal worship, or background hymn accompaniment while you work or reflect.
        </p>
      </div>

      <div className="bg-black/50 p-6 rounded-xl border border-white/10 space-y-2">
        <h2 className="text-2xl font-bold text-gold">For Choristers and Choir Leaders</h2>
        <p className="text-gray-200 text-lg leading-relaxed">
          SoundOfHymns helps you learn your part faster, anywhere and anytime.<br />
          Use the isolated voice-part feature to select your part—such as Tenor or Bass—and let it play while you practice or sing along.
          Combine multiple parts to hear and learn harmony with ease.
        </p>
      </div>

      <div className="bg-black/50 p-6 rounded-xl border border-white/10 space-y-2">
        <h2 className="text-2xl font-bold text-gold">For Funeral Homes and Funeral Directors</h2>
        <p className="text-gray-200 text-lg leading-relaxed">
          SoundOfHymns provides dignified, dependable hymn accompaniment for funeral and memorial services.<br />
          Easily select appropriate hymns, adjust tempo and key, and ensure consistent musical support without relying on live musicians.
          This allows funeral homes to focus fully on honoring loved ones while maintaining a reverent and comforting atmosphere.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-6">

        <a
          href="/download"
          className="cta-outline min-w-[160px] text-center"
        >
          Download Now
        </a>

        <a
          href="/faq"
          className="cta-outline min-w-[160px] text-center"
        >
          View FAQ
        </a>

        <a
          href="mailto:info.soundofhymns@gmail.com"
          className="cta-outline min-w-[160px] text-center"
        >
          Contact Us
        </a>

      </div>

    </main>
  );
}
