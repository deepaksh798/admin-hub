import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
