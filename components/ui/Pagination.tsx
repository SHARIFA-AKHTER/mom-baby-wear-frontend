"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 px-2">
      <p className="text-sm text-gray-600 order-2 sm:order-1">
        Showing page <span className="font-semibold">{currentPage}</span> of {totalPages || 1}
      </p>
      
      <div className="inline-flex space-x-2 order-1 sm:order-2">
        <button 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 border rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 transition shadow-sm"
        >
          Previous
        </button>
        <button 
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 border rounded-xl bg-[#6C5DD3] text-white hover:bg-[#5a4cb3] disabled:opacity-50 transition shadow-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination; 