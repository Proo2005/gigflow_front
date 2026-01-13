"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Map routes to tab index
  const tabMap: Record<string, number> = {
    "/": 0,
    "/search": 1,
    "/assignedjobs": 2,
    "/contact": 3,
  };

  const [tab, setTab] = useState(tabMap[pathname] ?? 0);

  // Update tab when route changes
  useEffect(() => {
    setTab(tabMap[pathname] ?? 0);
  }, [pathname]);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);

    const routes = ["/", "/searchjobs", "/assignedjobs", "/contact"];
    router.push(routes[newValue]);
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

      {/* Tabs */}
      <Box sx={{ minWidth: 420 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
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
              transition: "0.3s",
            },
            "& .Mui-selected": {
              color: "#1de9b6",
              textShadow: "0 0 10px #1de9b6",
            },
          }}
        >
          <Tab label="Home" />
          <Tab label="Search Jobs" />
          <Tab label="Assigned Jobs" />
          <Tab label="Contact" />
        </Tabs>
      </Box>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-gray-300 hover:text-[#1de9b6] font-medium"
        >
          {user?.name || "Profile"}
          <span className="text-sm">▾</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-lg z-50">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-300 hover:bg-[#121212]"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 text-gray-300 hover:bg-[#121212]"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#121212]"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
