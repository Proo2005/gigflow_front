"use client";

import { useState } from "react";
import { loginUser } from "../utils/api";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import AlertToast from "../components/AlertToast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(form); 

      if (res.token && res.user) {
        // Save token and user info in localStorage
        localStorage.setItem("token", res.token);

        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res.user._id,
            name: res.user.name,
            email: res.user.email,
            userType: res.user.userType
          })
        );



        // Redirect based on userType
        if (res.user.userType === "freelancer") {
          setAlert({
            message: "Login Successfull",
            type: "success",
          });
          router.push("/freelancerjob"); // Freelancer goes to his avialable job page
        } else {
          router.push("/post-job"); // Client goes to post-job page
        }
      } else {
        setAlert(res.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setAlert({
        message: "server error",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      {alert && (
        <AlertToast
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="flex items-center justify-center py-20 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-[360px] bg-[#1e1e1e] p-8 rounded-xl shadow-lg shadow-[#1de9b6]/20"
        >
          <h2 className="text-3xl font-bold text-center text-[#1de9b6] mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-400 text-center mb-6">
            Login to your account
          </p>

          {/* Email */}
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-[#121212] border border-gray-700 rounded-md px-3 py-2 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-[#1de9b6]"
          />

          {/* Password */}
          <label className="block text-sm mb-1 text-gray-300">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-[#121212] border border-gray-700 rounded-md px-3 py-2 mb-6 text-white focus:outline-none focus:ring-2 focus:ring-[#1de9b6]"
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold transition ${loading
              ? "bg-gray-600 cursor-not-allowed text-gray-300"
              : "bg-[#1de9b6] text-[#121212] hover:bg-[#00bfa5]"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup Link */}
          <p className="text-sm text-center mt-4 text-gray-400">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-[#1de9b6] hover:text-[#00bfa5] transition"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
