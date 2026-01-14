"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  name: string;
  email: string;
  userType: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ✅ MOVE HERE (outside useEffect)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-red-400">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-[#1de9b6] to-[#00bfa5] flex items-center justify-center text-4xl font-bold text-black">
            {user.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>
            <span className="inline-block mt-3 px-4 py-1 rounded-full bg-[#1de9b6]/10 text-[#1de9b6] text-sm font-medium">
              {user.userType.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-[#1de9b6]">
              Account Information
            </h3>
            <div className="space-y-3 text-gray-300">
              <p><span className="text-gray-400">User ID:</span> {user._id}</p>
              <p><span className="text-gray-400">Full Name:</span> {user.name}</p>
              <p><span className="text-gray-400">Email:</span> {user.email}</p>
              <p><span className="text-gray-400">Role:</span> {user.userType}</p>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-[#1de9b6]">
              Activity Overview
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>✔ Can post and manage jobs</li>
              <li>✔ Can send offers & messages</li>
              <li>✔ Track job status</li>
              <li>✔ Secure authentication</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-12 flex flex-wrap gap-4">
          <button
            type="button"
            className="px-6 py-2 rounded-lg bg-[#1de9b6] text-black font-semibold hover:bg-[#00bfa5] transition"
          >
            Edit Profile
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-6 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-black transition"
          >
            Logout
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
