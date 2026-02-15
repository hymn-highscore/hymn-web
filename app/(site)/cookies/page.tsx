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
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work more efficiently and to provide information to the owners of the site.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-400 mb-4">
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li><strong className="text-white">Essential Cookies:</strong> These are necessary for the website to function properly.</li>
            <li><strong className="text-white">Analytics Cookies:</strong> These help us understand how visitors interact with our website.</li>
            <li><strong className="text-white">Functionality Cookies:</strong> These allow the website to remember choices you make.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">3. Managing Cookies</h2>
          <p className="text-gray-400">
            Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, 
            including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. Contact Us</h2>
          <p className="text-gray-400">
            If you have any questions about our use of cookies, please contact us via our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
