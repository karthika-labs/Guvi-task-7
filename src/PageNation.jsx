import { useContext } from "react";
import { useState } from "react";

function pageNation({totalResults,currentPage, onPageChange}) {




  const moviePerPage = 10;
 
  
  

  const totalPages=Math.ceil(totalResults/moviePerPage)

   const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };


  

  return <>
 <div className="flex justify-center items-center space-x-2 mt-4">
    {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-700 text-white"
        }`}  >
        &lt;
      </button>


      {/* Page Numbers */}
 <span className="text-white/50 font-semibold">
        Page <span className="text-white">{currentPage}</span> of <span className="text-rose-600">{totalPages}</span>
      </span>
  
      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
         className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-700 text-white"
        }`}  >
        &gt;
      </button>
   </div>
  
  </>;
}
export default pageNation;
