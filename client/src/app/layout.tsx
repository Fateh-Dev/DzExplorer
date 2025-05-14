import type { Metadata } from "next"; 

import "./globals.css";
import Navbar from "./Navbar";
import AppFooter from "./Footer";
import { COMPANY_NAME, LOGO_MAIN } from "./constants";
 
 

export const metadata: Metadata = {
  title: COMPANY_NAME,
  description: "Discover and book unforgettable travel experiences with our curated trips, adventures, and tours. Start your journey today!",
  icons: {
    icon: LOGO_MAIN,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body
        className={`antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow bg-gray-100">
          <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <AppFooter />
      </body>
    </html>
  );
}
