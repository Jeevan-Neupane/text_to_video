"use client";
import React from "react";

function MaxWidthWrapper({children}) {
  return (
    <div className="w-full max-w-[1260px] mx-auto px-5 md:px-3 xl:px-0">
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
