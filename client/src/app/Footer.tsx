"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon as TwitterIcon, LinkIcon } from "@heroicons/react/24/outline";
import { COMPANY_COPYRIGHT, LOGO_FOOTER } from "./constants";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Contact", href: "/contact" },
  { name: "About Us", href: "/about" },
  { name: "Admin", href: "/admin" }
];

export default function AppFooter() {
  const [logoSrc, setLogoSrc] = useState(LOGO_FOOTER);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyan-900 text-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/">
              {hydrated && (
                <Image
                  width={80}
                  height={80}
                  alt={COMPANY_COPYRIGHT}
                  src={logoSrc}
                  className="w-auto cursor-pointer border border-transparent"
                  onError={() =>
                    setLogoSrc(
                      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                    )
                  }
                />
              )}
            </Link>
            <p className="mt-2 text-sm text-gray-300">Your Travel Adventures Start Here</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:border-white hover:border-2 border border-transparent px-2 py-1 rounded-md text-sm cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white cursor-pointer border border-transparent hover:border-white hover:border-2 p-1 rounded-full"
              >
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white cursor-pointer border border-transparent hover:border-white hover:border-2 p-1 rounded-full"
              >
                <LinkIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-300">
            &copy; {currentYear} {COMPANY_COPYRIGHT}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
