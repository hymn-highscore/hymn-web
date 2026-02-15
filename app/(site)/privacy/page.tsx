"use client";

import useFadeIn from "../../hooks/useFadeIn";

export default function PrivacyPage() {
  const fadeIn = useFadeIn();

  return (
    <div className={`max-w-4xl mx-auto px-6 py-24 ${fadeIn}`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Privacy Policy
      </h1>

      <div className="prose prose-invert prose-lg max-w-none">
        <p className="lead text-xl text-gray-300 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
          <p className="text-gray-400">
            Welcome to SoundOfHymns. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">2. Data We Collect</h2>
          <p className="text-gray-400 mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li><strong className="text-white">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong className="text-white">Contact Data:</strong> includes email address and telephone number.</li>
            <li><strong className="text-white">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
            <li><strong className="text-white">Usage Data:</strong> includes information about how you use our website, products and services.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Data</h2>
          <p className="text-gray-400">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400 mt-4">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
          <p className="text-gray-400">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Details</h2>
          <p className="text-gray-400">
            If you have any questions about this privacy policy or our privacy practices, please contact us via our contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
