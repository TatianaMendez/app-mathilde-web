import React from 'react';

const ProgressBar = ({ start, end, current } : { start:number, end:number, current:number }) => {
  const percentage = ((current - start) / (end - start)) * 100;

  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`absolute top-0 left-0 h-full rounded-full ${
          percentage < 50 ? 'bg-red-500' : 'bg-green-500'
        }`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      ></div>
      <div className="absolute inset-0 flex items-center px-2">
        <span className="text-sm font-medium text-gray-900 z-10">
          {current.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;

