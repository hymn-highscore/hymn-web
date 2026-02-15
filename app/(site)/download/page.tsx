export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO (unchanged) */}
      <section
        className="relative py-28 px-6 text-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)),
            url('/organ.png')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gold">
          Try SoundOfHymns Free
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          The complete digital organist and hymn practice tool.
          Download once. Try free. Unlock when ready.
        </p>
      </section>

      {/* ABOUT DEMO (white section) */}
      <section className="bg-white text-black py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            About the Demo
          </h2>
          <p className="text-gray-700 leading-relaxed">
            SoundOfHymns uses a <strong>single installer</strong> for everyone.
            When you first launch the app, it runs in demo mode with selected
            limitations. You can explore the full interface, play hymns, and
            experience the core features before deciding to upgrade.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            When you’re ready, simply sign in or enter a license key inside the
            app — no reinstall required. Your demo seamlessly converts into the
            full version.
          </p>
        </div>
      </section>

      {/* DOWNLOADS (white main body) */}
      <section className="bg-white text-black px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Download
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* macOS */}
            <div className="border border-gray-200 p-8 text-center bg-white">
              <div className="text-4xl mb-4">🍎</div>
              <h3 className="text-xl font-semibold mb-2">macOS</h3>
              <p className="text-gray-600 text-sm mb-6">
                macOS 12+ · Universal (Intel & Apple Silicon)
              </p>
              <a
                href="#"
                className="
                  inline-block
                  px-6 py-3
                  border border-purple-700
                  text-purple-700
                  hover:bg-purple-700 hover:text-white
                  transition
                "
              >
                Download for macOS
              </a>
              <div className="mt-3 text-xs text-gray-500">
                DMG · ~120 MB
              </div>
            </div>

            {/* WINDOWS */}
            <div className="border border-gray-200 p-8 text-center bg-white">
              <div className="text-4xl mb-4">🪟</div>
              <h3 className="text-xl font-semibold mb-2">Windows</h3>
              <p className="text-gray-600 text-sm mb-6">
                Windows 10 / 11 · 64-bit
              </p>
              <a
                href="#"
                className="
                  inline-block
                  px-6 py-3
                  border border-purple-700
                  text-purple-700
                  hover:bg-purple-700 hover:text-white
                  transition
                "
              >
                Download for Windows
              </a>
              <div className="mt-3 text-xs text-gray-500">
                EXE · ~130 MB
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVATION INFO (unchanged) */}
      <section className="border-t border-white/10 bg-black/80 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-gold mb-4">
            Activation & Licensing
          </h3>
          <p className="text-gray-300 leading-relaxed">
            After installing, you can activate SoundOfHymns by signing in or
            entering a license key. Your license is verified online and cached
            locally, so the app continues to work even when you’re offline.
          </p>
        </div>
      </section>
    </main>
  );
}
