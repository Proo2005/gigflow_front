"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {Snippet} from "@heroui/snippet";

type Freelancer = {
  _id: string;
  name: string;
  email: string;
  userType?: string;
};

export default function FindFreelancersPage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Freelancer | null>(null);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const res = await fetch(
        "https://gigflow-back.onrender.com/api/users/freelancers"
      );
      const data = await res.json();
      setFreelancers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = freelancers.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1de9b6] mb-6 text-center">
          Find Freelancers
        </h1>

        <input
          type="text"
          placeholder="Search freelancer by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 px-4 py-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:ring-2 focus:ring-[#1de9b6]"
        />

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400">No freelancers found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map((f) => (
              <div
                key={f._id}
                className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg hover:shadow-[#1de9b6]/40 transition"
              >
                <h3 className="text-xl font-semibold mb-2">{f.name}</h3>
                <p className="text-gray-400 mb-4">{f.email}</p>

                <button
                  onClick={() => setSelected(f)}
                  className="w-full py-2 rounded-md bg-[#1de9b6] text-black font-semibold hover:bg-[#00bfa5] transition"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] w-full max-w-md rounded-xl p-6 relative border border-gray-700">
            
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#1de9b6] to-[#00bfa5] flex items-center justify-center text-3xl font-bold text-black">
                {selected.name.charAt(0)}
              </div>
            </div>

            {/* Details */}
            <h2 className="text-2xl font-bold text-center mb-2">
              {selected.name}
            </h2>
            <p className="text-gray-400 text-center mb-4">
              {selected.email}
            </p>

            <div className="space-y-3 text-gray-300">
              <p>
                <span className="text-gray-400">User ID:</span>{" "}
                {selected._id}
              </p>
              <p>
                <span className="text-gray-400">Role:</span>{" "}
                {selected.userType || "Freelancer"}
              </p>
              <p>
                <span className="text-gray-400">User contact:</span>{" "}
                <Snippet>{selected.email}</Snippet>
              </p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full py-2 rounded-lg bg-[#1de9b6] text-black font-semibold hover:bg-[#00bfa5]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
