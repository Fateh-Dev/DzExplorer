"use client";
import Link from "next/link";
import { Home, Heart, Phone, Info } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Contact us", href: "/contact", icon: Phone },
  { name: "About us", href: "/about", icon: Info }
];

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DesktopNavigation({ pathname, isLoggedIn }: { pathname: string; isLoggedIn: boolean }) {
  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
      {navigation
        .filter(item => item.name !== "Wishlist" || isLoggedIn)
        .map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                pathname === item.href
                  ? "text-white rounded-b-none bg-cyan-800 h-14 border-b-4 border-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "flex items-center  h-14 gap-1  px-3 py-0 text-md font-medium"
              )}
            >
              <Icon size={16} />
              {item.name}
            </Link>
          );
        })}
    </div>
  );
}
