"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
type User = {
  _id: string;
  name: string;
  email: string;
  userType: string;
};

export default function PostJobPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ title: "", description: "", budget: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch {
      localStorage.clear();
      router.push("/login");
    } finally {
      setHydrated(true);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!hydrated || !user) return;

    if (!form.title || !form.description || !form.budget) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://gigflow-back.onrender.com/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          budget: Number(form.budget),
          userName: user.name,
          userEmail: user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create job");
        return;
      }

      alert("✅ Job posted successfully!");
      setForm({ title: "", description: "", budget: "" });
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!hydrated) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[450px] bg-[#1e1e1e] p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center text-[#1de9b6] mb-4">
            Post a Job
          </h2>
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}

          <label className="block text-gray-300 mb-1">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Build a React website"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full mb-4 px-3 py-2 bg-[#121212] border border-gray-700 rounded text-white outline-none focus:ring-2 focus:ring-[#1de9b6]"
          />

          <label className="block text-gray-300 mb-1">Description</label>
          <textarea
            placeholder="Job description..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full mb-4 px-3 py-2 bg-[#121212] border border-gray-700 rounded text-white h-28 resize-none outline-none focus:ring-2 focus:ring-[#1de9b6]"
          />

          <label className="block text-gray-300 mb-1">Budget</label>
          <input
            type="number"
            min="1"
            placeholder="Enter budget"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="w-full mb-6 px-3 py-2 bg-[#121212] border border-gray-700 rounded text-white outline-none focus:ring-2 focus:ring-[#1de9b6]"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded font-semibold ${
              loading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-[#1de9b6] text-black hover:bg-[#00bfa5]"
            }`}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
