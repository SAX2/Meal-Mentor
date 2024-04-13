import React from 'react'
import Navbar from './components/navbar/Navbar'
import { Spotlight } from './components/container-scroll/Spotlight'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <div>
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 absolute"
          fill="rgba(20, 170, 120, 0.6)"
        />
        <div className="h-dvh w-full dark:bg-outline bg-white dark:bg-grid-outline/50 bg-grid-outline absolute"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
      </div>
      <div className="w-full flex justify-center px-4 sticky top-0 z-[100]">
        <div className="w-full max-w-[1200px]">
          <Navbar />
        </div>
      </div>
      <div className="relative z-[100]">{children}</div>
    </div>
  );
};

export default layout