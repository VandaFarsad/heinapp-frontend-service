"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpIcon } from "./icons";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed right-5 bottom-5 z-50">
      <button
        onClick={scrollToTop}
        className={`transform rounded-full bg-green-600 p-2 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none dark:bg-green-600 dark:hover:bg-green-500 ${
          isVisible ? "scale-100" : "pointer-events-none scale-0"
        }`}
        aria-label="scroll back to top"
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
