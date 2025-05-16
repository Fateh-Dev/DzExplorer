"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

interface ReserveButtonProps {
  onReserve: () => void;
  title: string;
  display: string;
}

export default function ReserveButton({ title, display, onReserve }: ReserveButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReserve();
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
  };

  return (
    <button
      onClick={handleClick}
      title={`Réserver ${title}`}
      className={`text-md cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 text-white font-medium rounded-md transition-colors duration-400 
        ${clicked ? "bg-cyan-700" : "bg-cyan-900"} 
        hover:bg-cyan-800`}
    >
      <Phone className="w-4 h-4" />
      {display}
    </button>
  );
}
