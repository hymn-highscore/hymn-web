"use client";

import useFadeIn from "../../hooks/useFadeIn";

export default function CookiesPage() {
  const fadeIn = useFadeIn();

  return (
    <div className={`max-w-4xl mx-auto px-6 py-24 ${fadeIn}`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Cookie Policy
      </h1>

      <div className="prose prose-invert prose-lg max-w-none">
        <p className="lead text-xl text-gray-300 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
          <p className="text-gray-400">
            Cookies are small pieces of text sent by your web browser by a website you visit. 
            A cookie file is stored in your web browser and allows the Service or a third-party to recognize you 
            and make your next visit easier and the Service more useful to you.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-400 mb-4">
            When you use and access the Service, we may place a number of cookies files in your web browser. 
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li><strong className="text-white">Essential Cookies:</strong> To enable certain functions of the Service.</li>
            <li><strong className="text-white">Analytics Cookies:</strong> To provide analytics and understand how our Service is used.</li>
            <li><strong className="text-white">Preferences Cookies:</strong> To store your preferences.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">3. Third-Party Cookies</h2>
          <p className="text-gray-400">
            In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, 
            deliver advertisements on and through the Service, and so on.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">4. Your Choices</h2>
          <p className="text-gray-400">
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. 
            Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, 
            you may not be able to store your preferences, and some of our pages might not display properly.
          </p>
        </section>
      </div>
    </div>
  );
}
