"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Plus } from "lucide-react";
import { NO_AVATAR_IMAGE } from "@/app/constants";

interface UserMenuProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  router: AppRouterInstance;
}

export default function UserMenu({ isLoggedIn, onLogout, router }: UserMenuProps) {
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        <button className="hidden sm:ml-6 sm:flex items-center space-x-2 border-2 rounded-md text-white border-white p-1 px-4 cursor-pointer transition-transform duration-150 hover:bg-cyan-800 active:scale-95">
          <Plus className="w-5 h-5" />
          <span>Create a trip</span>
        </button>

        <Menu as="div" className="relative ml-3">
          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white">
            <Image
              alt="User avatar"
              src={NO_AVATAR_IMAGE}
              width={32}
              height={32}
              className="rounded-full object-cover cursor-pointer"
            />
          </MenuButton>
          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
            <MenuItem>
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Your Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sign out
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    );
  }

  return (
    <button
      onClick={() => router.push("/login")}
      className="rounded-md px-4 py-2 text-sm font-semibold border-2 border-white text-white shadow hover:bg-cyan-700 cursor-pointer"
    >
      Login
    </button>
  );
}
