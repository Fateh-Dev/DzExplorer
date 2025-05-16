import React from "react";
import { ArrowUp } from "lucide-react";

interface Props {
  onClick: () => void;
}

const GoToTopButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 p-3 bg-cyan-900 text-white rounded-full shadow-lg hover:bg-cyan-700 transition border-2 border-white"
    aria-label="Go to top"
  >
    <ArrowUp size={20} />
  </button>
);

export default GoToTopButton;
