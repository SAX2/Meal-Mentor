"use client";

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

const OnScroll = ({ children }: { children: React.ReactNode }) => {
  const navbarRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <nav
      ref={navbarRef}
      className={cn(
        "w-full flex justify-center px-4 sticky top-0 z-[200] transition-colors",
        scrolled ? "border-b border-outline bg-white" : "border-b border-transparent"
      )}
    >
      <div className="w-full max-w-[1200px]">{children}</div>
    </nav>
  );
};

export default OnScroll