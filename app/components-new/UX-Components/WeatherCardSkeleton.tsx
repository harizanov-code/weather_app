import React from 'react';
import '../../globals.css'; // Ensure global styles are imported for animations

const WeatherCardSkeleton = () => {
  return (
    <div className="relative bg-slate-50 sm:w-[550px] w-full sm:h-[500px] h-full mx-4 sm:mx-0 rounded-xl shadow-md animate-pulse">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-slate-700 rounded-xl"></div>

      {/* Image placeholder */}
      <div className="w-full h-full bg-slate-700 rounded-xl"></div>

      {/* Text content placeholders
      <div className="flex flex-col rounded-t-sm pt-6 h-10 justify-center">
        <div className="h-12 bg-slate-600 rounded w-3/4 mx-auto"></div>
      </div> */}

      {/* Additional text placeholders
      <div className="flex flex-row justify-between pt-28 mx-4">
        <div className="h-8 bg-slate-600 rounded w-1/4"></div>
        <div className="h-8 bg-slate-600 rounded w-1/4"></div>
      </div> */}
    </div>
  );
};

export default WeatherCardSkeleton;
