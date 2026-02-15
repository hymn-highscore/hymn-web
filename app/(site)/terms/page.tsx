"use client";

import useFadeIn from "../../hooks/useFadeIn";

export default function TermsPage() {
  const fadeIn = useFadeIn();

  return (
    <div className={`max-w-4xl mx-auto px-6 py-24 ${fadeIn}`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Terms of Service
      </h1>

      <div className="prose prose-invert prose-lg max-w-none">
        <p className="lead text-xl text-gray-300 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
          <p className="text-gray-400">
            By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. 
            If you do not agree with these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">2. Intellectual Property Rights</h2>
          <p className="text-gray-400">
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, 
            audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos 
            contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">3. User Representations</h2>
          <p className="text-gray-400">
            By using the Site, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400 mt-4">
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">4. Prohibited Activities</h2>
          <p className="text-gray-400">
            You may not access or use the Site for any purpose other than that for which we make the Site available. 
            The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Modifications and Interruptions</h2>
          <p className="text-gray-400">
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. 
            However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the 
            Site without notice at any time.
          </p>
        </section>
      </div>
    </div>
  );
}
