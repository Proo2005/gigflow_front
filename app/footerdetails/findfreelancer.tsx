"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type Freelancer = {
  _id: string;
  name: string;
  email: string;
};

export default function FindFreelancersPage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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

                <button className="w-full py-2 rounded-md bg-[#1de9b6] text-black font-semibold hover:bg-[#00bfa5] transition">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
