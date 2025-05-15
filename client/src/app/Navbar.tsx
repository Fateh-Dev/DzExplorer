"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Home, Heart, Phone, Info } from "lucide-react";
import { COMPANY_NAME, LOGO_MAIN } from "./constants";
import { useAuth } from "./context/authContext";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "About us", href: "/about", icon: Info }
];

function classNames(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isLoggedIn, hasMounted } = useAuth();

  if (!hasMounted) return null; // don't render until client mount

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-cyan-900 shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo and desktop menu */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center space-x-2">
              <Image width={45} height={45} alt={COMPANY_NAME} src={LOGO_MAIN} className="w-auto" />
              <Link href="/" className="cursor-pointer">
                <span className="text-xl font-bold text-white">{COMPANY_NAME}</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navigation
                .filter(item => item.name !== "Wishlist" || isLoggedIn) // hide Wishlist if not logged in
                .map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={classNames(
                        pathname === item.href
                          ? "text-white border-2 border-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      <Icon size={16} />
                      {item.name}
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Right side (Login / Avatar) */}
          <div className="absolute inset-y-0 right-0 flex items-center gap-x-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      alt="User avatar"
                      src="/blank-avatar.png"
                      width={32}
                      height={32}
                      className="rounded-full object-cover cursor-pointer"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem>
                    <Link href="/profile" className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={logout}
                      className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 focus:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-cyan-900 shadow hover:bg-gray-100  cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map(item => (
            <Disclosure.Button
              key={item.name}
              className={classNames(
                pathname === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              <Link href={item.href} className="block w-full">
                {item.name}
              </Link>
            </Disclosure.Button>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
