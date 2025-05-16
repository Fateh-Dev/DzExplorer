"use client";

import Link from "next/link";
import { DisclosureButton } from "@headlessui/react";

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Contact", href: "/contact" },
  { name: "About us", href: "/about" }
];

export default function MobileMenuPanel({ pathname }: { pathname: string }) {
  return (
    <div className="space-y-1 px-2 pt-2 pb-3">
      {navigation.map(item => (
        <DisclosureButton
          key={item.name}
          className={classNames(
            pathname === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
        >
          <Link href={item.href} className="block w-full">
            {item.name}
          </Link>
        </DisclosureButton>
      ))}
      <DisclosureButton
        key="Create a Trip"
        className={classNames(
          pathname === "/create-trip" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "block rounded-md px-3 py-2 text-base font-medium"
        )}
      >
        <Link href="/create-trip" className="block w-full">
          Create a Trip
        </Link>
      </DisclosureButton>
    </div>
  );
}
