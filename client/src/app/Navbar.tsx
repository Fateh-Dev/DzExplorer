import { Disclosure } from "@headlessui/react";
import NavbarClient from "./components/Navbar/NavbarClient";
export default function Navbar() {
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-cyan-900 shadow-lg">
      <NavbarClient />
    </Disclosure>
  );
}
