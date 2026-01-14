"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const helpItems = [
  {
    question: "How do I post a job on GigFlow?",
    answer:
      "After logging in as a client, navigate to the Post Job page, fill in the job title, description, and budget, then submit. Your job will be visible to freelancers instantly.",
  },
  {
    question: "How can freelancers apply for jobs?",
    answer:
      "Freelancers can browse jobs on the Search Jobs page, send a message with an offer amount, and wait for the client’s confirmation.",
  },
  {
    question: "How does job confirmation work?",
    answer:
      "Once a client confirms an offer, the job status changes from pending to confirmed and becomes visible in the freelancer’s assigned jobs section.",
  },
  {
    question: "Can I be both a client and a freelancer?",
    answer:
      "Yes. GigFlow allows users to act as both clients and freelancers using the same account.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes. We use secure authentication and industry-standard practices to protect user data.",
  },
  {
    question: "Who do I contact for support?",
    answer:
      "You can reach us at support@gigflow.com for any technical or account-related issues.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-[#1de9b6] mb-4">
          Help & Support
        </h1>

        <p className="text-gray-400 mb-10">
          Find answers to common questions about using GigFlow.
        </p>

        <div className="space-y-4">
          {helpItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-[#242424] transition"
              >
                <span className="font-medium">{item.question}</span>
                <span className="text-[#1de9b6] text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 text-gray-300 border-t border-gray-700">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support Box */}
        <div className="mt-16 bg-[#1e1e1e] border border-gray-700 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2 text-[#1de9b6]">
            Still Need Help?
          </h2>
          <p className="text-gray-400 mb-4">
            Our support team is here to assist you.
          </p>
          <p className="text-gray-300">
            Email us at{" "}
            <span className="text-[#1de9b6] font-medium">
              support@gigflow.com
            </span>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
