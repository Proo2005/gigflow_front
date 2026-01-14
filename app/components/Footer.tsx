"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-gray-800 text-gray-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#1de9b6] mb-4">
            GigFlow
          </h2>
          <p className="text-sm leading-relaxed">
            GigFlow is a modern freelance marketplace connecting clients
            with skilled professionals across the globe. Post jobs, get hired,
            and work securely.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-[#1de9b6] transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#1de9b6] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#1de9b6] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* For Clients */}
        <div>
          <h3 className="text-white font-semibold mb-4">For Clients</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/post-job" className="hover:text-[#1de9b6] transition">
                Post a Job
              </Link>
            </li>
            <li>
              <Link href="/searchjobs" className="hover:text-[#1de9b6] transition">
                Find Freelancers
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/help" className="hover:text-[#1de9b6] transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#1de9b6] transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#1de9b6] transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#1de9b6] transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Social + Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} GigFlow. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 text-gray-400">
            <a
              href="https://x.com/"
              className="hover:text-[#1de9b6] transition"
              aria-label="Twitter"
            >
              X
            </a>
            <a
              href="https://www.linkedin.com/in/prodipta-chakraborty-5484b722a/"
              className="hover:text-[#1de9b6] transition"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="https://github.com/Proo2005"
              className="hover:text-[#1de9b6] transition"
              aria-label="GitHub"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
