"use client";

import Navbar from "./components/Navbar";
import Link from "next/link";
import Footer from "./components/Footer";



export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden py-28 px-6 text-center bg-gradient-to-b from-[#0f0f0f] to-[#1e1e1e]">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Hire <span className="text-[#1de9b6]">Top Freelancers</span> <br />
          Or Get Hired Globally
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          GigFlow connects skilled freelancers with clients looking to get work
          done fast, securely, and efficiently.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/post-job"
            className="px-8 py-3 rounded-lg bg-[#1de9b6] text-black font-semibold hover:bg-[#00bfa5] transition"
          >
            Post a Job
          </Link>
          <Link
            href="/searchjobs"
            className="px-8 py-3 rounded-lg border border-gray-600 hover:border-[#1de9b6] hover:text-[#1de9b6] transition"
          >
            Find Work
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 bg-[#121212] grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          ["10K+", "Jobs Posted"],
          ["5K+", "Freelancers"],
          ["98%", "Client Satisfaction"],
          ["24/7", "Support"],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-4xl font-bold text-[#1de9b6]">{value}</p>
            <p className="text-gray-400 mt-2">{label}</p>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-[#1e1e1e]">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose <span className="text-[#1de9b6]">GigFlow</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Post Jobs Easily",
              desc: "Create jobs in minutes and receive offers from verified freelancers.",
              color: "#1de9b6",
            },
            {
              title: "Hire with Confidence",
              desc: "Review offers, compare prices, and confirm the best match.",
              color: "#ff5252",
            },
            {
              title: "Secure Workflow",
              desc: "Messages, offers, and confirmations all in one place.",
              color: "#2979ff",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#121212] p-8 rounded-2xl shadow-lg hover:shadow-[0_0_30px] transition"
              style={{ boxShadow: `0 0 0 ${item.color}` }}
            >
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-[#121212]">
        <h2 className="text-4xl font-bold text-center mb-14">
          How It <span className="text-[#1de9b6]">Works</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          {[
            ["1", "Post a Job", "Describe your project and budget"],
            ["2", "Get Offers", "Freelancers send proposals"],
            ["3", "Confirm & Work", "Select and start working"],
          ].map(([step, title, desc]) => (
            <div key={step} className="p-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1de9b6] text-black flex items-center justify-center text-2xl font-bold">
                {step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES (Carousel-style grid) */}
      <section className="py-24 px-6 bg-[#1e1e1e]">
        <h2 className="text-4xl font-bold text-center mb-14">
          Popular <span className="text-[#1de9b6]">Categories</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            "Web Development",
            "UI / UX Design",
            "Mobile Apps",
            "AI & ML",
            "Content Writing",
            "Digital Marketing",
            "Video Editing",
            "Data Analysis",
          ].map((cat) => (
            <div
              key={cat}
              className="bg-[#121212] p-6 rounded-xl text-center hover:border-[#1de9b6] border border-gray-700 transition cursor-pointer"
            >
              <p className="font-semibold">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 px-6 text-center bg-gradient-to-t from-[#0f0f0f] to-[#121212]">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-gray-300 mb-10">
          Join GigFlow today and connect with opportunities worldwide.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/signup"
            className="px-10 py-3 rounded-lg bg-[#1de9b6] text-black font-semibold hover:bg-[#00bfa5] transition"
          >
            Join Now
          </Link>
          <Link
            href="/searchjobs"
            className="px-10 py-3 rounded-lg border border-gray-600 hover:border-[#1de9b6] hover:text-[#1de9b6] transition"
          >
            Browse Jobs
          </Link>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
