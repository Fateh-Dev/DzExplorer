"use client";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_NAME, LOGO_MAIN } from "@/app/constants";

export default function LogoSection() {
  return (
    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
      <div className="flex shrink-0 items-center space-x-2">
        <Image width={45} height={45} alt={COMPANY_NAME} src={LOGO_MAIN} className="w-auto" />
        <Link href="/" className="cursor-pointer">
          <span className="text-xl font-bold text-white">{COMPANY_NAME}</span>
        </Link>
      </div>
    </div>
  );
}
