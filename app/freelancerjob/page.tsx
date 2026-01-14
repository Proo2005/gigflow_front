"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Job = {
  _id: string;
  jobTitle: string;
  jobPosterEmail: string;
  senderName: string;
  senderEmail: string;
  message: string;
  offerAmount: number;
  status: string;
};

type User = {
  _id?: string;
  name: string;
  email: string;
  userType: string;
};

export default function FreelancerJobsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      setError("Please login first");
      setLoading(false);
      return;
    }

    const parsedUser: User = JSON.parse(storedUser);
    setUser(parsedUser);

    fetchConfirmedJobs(parsedUser.email);
  }, []);

  const fetchConfirmedJobs = async (email: string) => {
    try {
      const res = await fetch(
        `https://gigflow-back.onrender.com/api/messages/freelancer/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch jobs");
      } else {
        setJobs(data);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-red-400">
        {error}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
        No confirmed jobs yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <div className="p-8 grid gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg border border-gray-700"
          >
            <h3 className="text-xl font-bold mb-2">{job.jobTitle}</h3>

            <p className="text-sm text-gray-300">
              <strong>Job Poster:</strong> {job.jobPosterEmail}
            </p>

            <p className="text-sm text-gray-300">
              <strong>Your Name:</strong> {job.senderName}
            </p>

            <p className="text-sm text-gray-300">
              <strong>Your Email:</strong> {job.senderEmail}
            </p>

            <p className="mt-2 text-gray-200">
              <strong>Message:</strong> {job.message}
            </p>

            <p className="mt-2">
              <strong>Agreed Amount:</strong>{" "}
              <span className="text-[#1de9b6] font-semibold">
                ₹{job.offerAmount}
              </span>
            </p>

            <p className="mt-2 text-green-400 font-semibold">
              Status: {job.status.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
