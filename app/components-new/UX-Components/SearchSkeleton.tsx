import React from 'react'
import '../../globals.css'

const SearchSkeleton = () => {
  return (
    <div className="flex justify-center bg-slate-100 h-[40px] w-[224px] animate-pulse">
      <div className=" bg-slate-600 rounded mx-4 my-2"></div>
    </div>
  )
}

export default SearchSkeleton
