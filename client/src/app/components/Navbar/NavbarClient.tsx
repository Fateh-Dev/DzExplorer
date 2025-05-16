"use client";

import { usePathname, useRouter } from "next/navigation";
import { DisclosurePanel } from "@headlessui/react";
import { useAuth } from "@/app/context/authContext";
import LogoSection from "./LogoSection";
import DesktopNavigation from "./DesktopNavigation";
import UserMenu from "./UserMenu";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenuPanel from "./MobileMenuPanel";

export default function NavbarClient() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isLoggedIn, hasMounted } = useAuth();

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-0">
        <div className="relative flex h-14 items-center justify-between">
          <MobileMenuButton />
          <LogoSection />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <DesktopNavigation pathname={pathname} isLoggedIn={isLoggedIn} />
          </div>
          {/* Only delay the UserMenu which depends on auth */}
          {hasMounted && <UserMenu isLoggedIn={isLoggedIn} onLogout={logout} router={router} />}
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <MobileMenuPanel pathname={pathname} />
      </DisclosurePanel>
    </>
  );
}
