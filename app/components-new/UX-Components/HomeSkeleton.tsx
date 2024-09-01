import React from 'react';
import WeatherCardSkeleton from './WeatherCardSkeleton';
import SearchSkeleton from './SearchSkeleton';


const HomeSkeleton = () => {
  return (
    <div className="flex flex-col place-items-center items-center mt-10 lg:flex-row lg:gap-y-0 gap-y-8 lg:justify-center lg:px-6 lg:gap-x-28 w-full animate-pulse">
      <div className="flex">
        <SearchSkeleton />
      </div>
      <div className="flex w-full h-full justify-center lg:flex-auto lg:w-auto">
        <WeatherCardSkeleton />
      </div>
    </div>
  );
};

export default HomeSkeleton;
