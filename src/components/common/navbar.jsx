"use client";
import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";

function Navbar() {
  return (
    <div className="h-[62px] bg-white border-b border-b-gray-200 shadow-md flex items-center">
      <MaxWidthWrapper>
        <div>Navbar</div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Navbar;
