import React from "react";
import Link from "next/link";
import { LayoutPanelTop } from "lucide-react";

const BackToTrips = () => (
  <div className="flex justify-center mt-6">
    <Link href="/" className="text-cyan-900  text-lg font-medium">
      {" "}
      <button
        className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-900 text-cyan-900 rounded-md hover:bg-cyan-100 cursor-pointer"
        aria-label="Load more trips"
      >
        {" "}
        <LayoutPanelTop />
        {/* <RefreshCcw size={18} />   */}
        Retour aux voyages
      </button>
    </Link>
  </div>
);

export default BackToTrips;
