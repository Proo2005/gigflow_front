"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type Job = {
  _id: string;
  title: string;
  description: string;
  budget: number;
  userName: string;
  userEmail: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  userType: string;
};

export default function SearchJobPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageInputs, setMessageInputs] = useState<{ [key: string]: { message: string; offerAmount: string } }>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (jobId: string, field: "message" | "offerAmount", value: string) => {
    setMessageInputs({
      ...messageInputs,
      [jobId]: { ...messageInputs[jobId], [field]: value },
    });
  };

  const handleSubmit = async (job: Job) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const input = messageInputs[job._id];
    if (!input?.message || !input?.offerAmount) {
      alert("Fill message and offer amount");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/messages/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job._id,
          jobTitle: job.title,
          jobPosterEmail: job.userEmail,
          senderName: user.name,
          senderEmail: user.email,
          message: input.message,
          offerAmount: Number(input.offerAmount),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to send message");
        return;
      }

      alert("✅ Message sent successfully!");
      setMessageInputs({ ...messageInputs, [job._id]: { message: "", offerAmount: "" } });
    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1de9b6] mb-6">Search Jobs</h2>

        {jobs.map((job) => (
          <div key={job._id} className="bg-[#1e1e1e] p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold text-white">{job.title}</h3>
            <p className="text-gray-300 mb-2">{job.description}</p>
            <p className="text-gray-400 mb-2">Budget: ${job.budget}</p>
            <p className="text-gray-400 mb-2">Posted by: {job.userName} ({job.userEmail})</p>

            <textarea
              placeholder="Your message"
              value={messageInputs[job._id]?.message || ""}
              onChange={(e) => handleInputChange(job._id, "message", e.target.value)}
              className="w-full mb-2 p-2 bg-[#121212] text-white border border-gray-700 rounded resize-none"
            />
            <input
              type="number"
              placeholder="Offer Amount"
              value={messageInputs[job._id]?.offerAmount || ""}
              onChange={(e) => handleInputChange(job._id, "offerAmount", e.target.value)}
              className="w-full mb-2 p-2 bg-[#121212] text-white border border-gray-700 rounded"
            />
            <button
              disabled={loading}
              onClick={() => handleSubmit(job)}
              className="bg-[#1de9b6] hover:bg-[#00bfa5] text-black px-4 py-2 rounded font-semibold"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
