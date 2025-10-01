import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp, FaFacebook } from "react-icons/fa"; // ✅ Added

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand Logo */}
        <div>
          <h4 className="text-3xl font-extrabold tracking-wide">
            <span className="text-[#d28c47]">Export</span>
            <span className="text-white">Hills</span>
          </h4>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0">
            Connecting producers with global markets — quality you can trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-semibold mb-4 text-white">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#d28c47]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-[#d28c47]">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#d28c47]">
                About Us & Certifications
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#d28c47]">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-[#d28c47]">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h5 className="text-lg font-semibold mb-4 text-white">Contact</h5>
          <address className="not-italic text-sm mb-5 text-gray-400 leading-relaxed">
            📧 sales.exporthills@gmail.com <br />
            📞 +91 99760 33033 <br />
            📍 03, Sampurna Platina, Kuha, Sundarpada, Bhubaneswar, Odisha
            751002
          </address>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/+919976033033"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-500 transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-6 h-6" />
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/exporthills.sales/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/export-hills-290bb2376/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61579319750285"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-600 transition"
              aria-label="Facebook"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Bottom Bar */}
      <div className="mt-10 border-t border-[#d28c47] bg-[#f8f4ef] py-4 flex justify-center items-center space-x-4 text-sm px-6">
        {/* Copyright */}
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Experts of Deals. All rights reserved.
        </p>

        {/* Divider */}
        <span className="text-gray-400">|</span>

        {/* Logo */}
        <a
          href="https://expertsofdeals.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-90 transition"
        >
          <img
            src="/logos/ExpertsofDealslogo.webp"
            alt="Experts of Deals Logo"
            className="h-8"
          />
        </a>
      </div>
    </footer>
  );
}
