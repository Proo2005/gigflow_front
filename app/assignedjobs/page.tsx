"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type Message = {
  _id: string;
  jobTitle: string;
  jobPosterEmail: string;
  senderEmail: string;
  offerAmount: number;
  status: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  userType: string;
};

export default function AssignedJobsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetchMessages(parsedUser.email);
  }, []);

  const fetchMessages = async (email: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/my-messages/${email}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirm = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/messages/confirm/${id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to confirm");
        return;
      }

      // Update local state
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, status: "confirmed" } : msg))
      );
      alert("✅ Offer confirmed!");
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
        Please login
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1de9b6] mb-6">Assigned Jobs</h2>

        {messages.length === 0 && (
          <p className="text-gray-400">No messages received for your jobs yet.</p>
        )}

        {messages.map((msg) => (
          <div key={msg._id} className="bg-[#1e1e1e] p-4 rounded-lg mb-4">
            <p className="text-white font-semibold">{msg.jobTitle}</p>
            <p className="text-gray-400">Budget: ${msg.offerAmount}</p>
            <p className="text-gray-400">Job Poster: {msg.jobPosterEmail}</p>
            <p className="text-gray-400">Sender: {msg.senderEmail}</p>
            <p className={`mb-2 ${msg.status === "pending" ? "text-yellow-400" : "text-green-400"}`}>
              Status: {msg.status}
            </p>

            {msg.status === "pending" && (
              <button
                disabled={loading}
                onClick={() => handleConfirm(msg._id)}
                className="bg-[#1de9b6] hover:bg-[#00bfa5] text-black px-4 py-2 rounded font-semibold"
              >
                {loading ? "Confirming..." : "Confirm"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
