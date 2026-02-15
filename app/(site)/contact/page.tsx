"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import useFadeIn from "../../hooks/useFadeIn";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setSubmitted(true);
  };

  const fadeIn = useFadeIn();

  return (
    <div className={`max-w-4xl mx-auto px-6 py-24 ${fadeIn}`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Have questions about SoundOfHymns? Want to request a specific hymn or feature? 
            We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
          </p>
          
          <div className="space-y-6 text-gray-400">
            <div>
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <p>support@soundofhymns.com</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Social Media</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-purple-400 transition-colors">Twitter</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Facebook</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4 text-2xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-400">Thank you for contacting us. We will respond to your inquiry shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-purple-400 hover:text-purple-300 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all appearance-none"
                >
                  <option value="" className="bg-gray-900">Select a subject</option>
                  <option value="general" className="bg-gray-900">General Inquiry</option>
                  <option value="support" className="bg-gray-900">Technical Support</option>
                  <option value="hymn_request" className="bg-gray-900">Hymn Request</option>
                  <option value="partnership" className="bg-gray-900">Partnership</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message", { required: "Message is required" })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                  placeholder="How can we help you?"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
