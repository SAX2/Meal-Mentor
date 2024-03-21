"use client";

import React, { useState, useEffect } from 'react';

interface UseMediaQueryProps {
  children: React.ReactNode;
  greater?: number;
  less?: number;
}

const UseMediaQuery = ({ children, greater, less }: UseMediaQueryProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (greater && less) {
        setIsSmallScreen(window.innerWidth >= greater && window.innerWidth <= less);
      } else if (greater) {
        setIsSmallScreen(window.innerWidth >= greater);
      } else if (less) {
        setIsSmallScreen(window.innerWidth <= less);
      }
    };

    handleResize(); // Llamar a la función de manejo de redimensionamiento al principio para inicializar el estado
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [greater, less]);

  return <>{isSmallScreen && children}</>;
}

export default UseMediaQuery;