"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { signupUser } from "../utils/api";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    userType: "client", // default
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signupUser(form);

      if (res.message === "Signup successful") {
        alert("✅ Account created successfully!");
        router.push("/login");
      } else {
        alert(res.message || "Signup failed");
      }
    } catch (error) {
      alert("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[380px] bg-[#1e1e1e] p-8 rounded-xl shadow-lg shadow-[#1de9b6]/20"
        >
          <h2 className="text-3xl font-bold text-center text-[#1de9b6] mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-400 text-center mb-6">
            Join GigFlow today
          </p>

          {/* Name */}
          <label className="block text-sm mb-1 text-gray-300">Name</label>
          <input
            required
            placeholder="Your full name"
            className="w-full bg-[#121212] border border-gray-700 rounded-md px-3 py-2 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-[#1de9b6]"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Email */}
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full bg-[#121212] border border-gray-700 rounded-md px-3 py-2 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-[#1de9b6]"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* User Type */}
          <label className="block text-sm mb-1 text-gray-300">Account Type</label>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <Select
              value={form.userType}
              onChange={(e) =>
                setForm({ ...form, userType: e.target.value })
              }
              sx={{
                backgroundColor: "#121212",
                color: "white",
                borderRadius: "6px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#374151",
                },
              }}
            >
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="freelancer">Freelancer</MenuItem>
            </Select>
          </FormControl>

          {/* Password */}
          <label className="block text-sm mb-1 text-gray-300">Password</label>
          <input
            type="password"
            required
            placeholder="Create a strong password"
            className="w-full bg-[#121212] border border-gray-700 rounded-md px-3 py-2 mb-6 text-white focus:outline-none focus:ring-2 focus:ring-[#1de9b6]"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-[#1de9b6] text-[#121212] hover:bg-[#00bfa5]"
            }`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-sm text-center mt-4 text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-[#1de9b6] hover:text-[#00bfa5]"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
