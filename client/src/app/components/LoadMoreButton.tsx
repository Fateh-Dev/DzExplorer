import React from "react";
import { RefreshCcw } from "lucide-react";

interface Props {
  isLoading: boolean;
  onLoadMore: () => void;
}

const LoadMoreButton: React.FC<Props> = ({ isLoading, onLoadMore }) => (
  <div className="flex justify-center mt-6">
    <button
      onClick={onLoadMore}
      className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-900 text-cyan-900 rounded-md hover:bg-cyan-100 cursor-pointer"
      disabled={isLoading}
      aria-label="Load more trips"
    >
      <RefreshCcw size={18} />
      Load More
    </button>
  </div>
);

export default LoadMoreButton;
