"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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
  _id: string;
  name: string;
  email: string;
  userType: string;
};

export default function FreelancerJobsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("Please login first");
      setLoading(false);
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetchConfirmedJobs(parsedUser.email);
  }, []);

  const fetchConfirmedJobs = async (email: string) => {
    try {
      const res = await fetch(`https://gigflow-back.onrender.com/api/messages/freelancer/${email}`);
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-[#121212]">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400 bg-[#121212]">{error}</div>;
  if (!jobs.length) return <div className="min-h-screen flex items-center justify-center text-white bg-[#121212]">No confirmed jobs yet.</div>;

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      <div className="p-8 grid gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{job.jobTitle}</h3>
            <p><strong>Job Poster:</strong> {job.jobPosterEmail}</p>
            <p><strong>Your Name:</strong> {job.senderName}</p>
            <p><strong>Your Email:</strong> {job.senderEmail}</p>
            <p><strong>Message:</strong> {job.message}</p>
            <p><strong>Amount:</strong> ${job.offerAmount}</p>
            <p className="text-green-400 font-semibold">Status: {job.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
