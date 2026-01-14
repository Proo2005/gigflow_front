"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { User, Link } from "@heroui/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openJobs, setOpenJobs] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openSearch, setOpenSearch] = useState(false); // ✅ NEW

  const profileRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null); // ✅ NEW

  // Only Home tab now
  const tabMap: Record<string, number> = {
    "/": 0,
  };

  const [tab, setTab] = useState(tabMap[pathname] ?? 0);

  useEffect(() => {
    setTab(tabMap[pathname] ?? 0);
  }, [pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setOpenProfile(false);

      if (jobsRef.current && !jobsRef.current.contains(e.target as Node))
        setOpenJobs(false);

      if (settingsRef.current && !settingsRef.current.contains(e.target as Node))
        setOpenSettings(false);

      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setOpenSearch(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    router.push("/");
  };

  return (
    <nav className="w-full flex justify-between items-center px-10 py-3 bg-[#121212] border-b border-gray-800">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-[#1de9b6] hover:text-[#00bfa5]"
      >
        GigFlow
      </Link>

      {/* Tabs + Menus */}
      <Box className="flex items-center gap-6">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#1de9b6",
              boxShadow: "0 0 12px #1de9b6",
              height: "3px",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              color: "#9e9e9e",
              fontWeight: 500,
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#1de9b6",
            },
          }}
        >
          <Tab label="Home" href="/"/>
        </Tabs>

        {/* 🔍 Search Dropdown */}
        <div className="relative" ref={searchRef}>
          <button
            onClick={() => setOpenSearch(!openSearch)}
            className="text-gray-300 hover:text-[#1de9b6] font-medium"
          >
            Search ▾
          </button>

          {openSearch && (
            <div className="absolute mt-2 w-44 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  router.push("/searchjobs");
                  setOpenSearch(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
              >
                Jobs
              </button>

              <button
                onClick={() => {
                  router.push("/freelancerjob");
                  setOpenSearch(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
              >
                Freelancers
              </button>
            </div>
          )}
        </div>

        {/* Jobs Dropdown */}
        <div className="relative" ref={jobsRef}>
          <button
            onClick={() => setOpenJobs(!openJobs)}
            className="text-gray-300 hover:text-[#1de9b6] font-medium"
          >
            Jobs ▾
          </button>

          {openJobs && (
            <div className="absolute mt-2 w-44 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  router.push("/freelancerjob");
                  setOpenJobs(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
              >
                Freelancer Jobs
              </button>

              <button
                onClick={() => {
                  router.push("/assignedjobs");
                  setOpenJobs(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
              >
                Assigned Jobs
              </button>
            </div>
          )}
        </div>

        {/* Settings Dropdown */}
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setOpenSettings(!openSettings)}
            className="text-gray-300 hover:text-[#1de9b6] font-medium"
          >
            Settings ▾
          </button>

          {openSettings && (
            <div className="absolute mt-2 w-44 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-lg z-50">
              <button
                onClick={() => router.push("/profile")}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
              >
                Profile
              </button>
              <button
                onClick={() => router.push("/about")}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
              >
                About Us
              </button>
              <button
                onClick={() => router.push("/contact")}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
              >
                Contact Us
              </button>
              <button
                onClick={() => router.push("/help")}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
              >
                Help
              </button>
            </div>
          )}
        </div>
      </Box>

      {/* Profile Dropdown */}
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setOpenProfile(!openProfile)}
          className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-[#1e1e1e] transition"
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#1de9b6] to-[#00bfa5] flex items-center justify-center text-black font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          {/* Name */}
          <span className="text-gray-300 font-medium hidden md:block">
            {user?.name || "Account"}
          </span>

          {/* Arrow */}
          <span className="text-gray-400">▾</span>
        </button>

        {openProfile && (
          <div className="absolute right-0 mt-2 w-44 bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
            {!user ? (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/profile")}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#121212]"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-[#121212]"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>

    </nav>
  );
}
