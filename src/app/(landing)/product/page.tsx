import React from 'react'
import MainImage from "../../../../public/Landing.png";
import Image from 'next/image';
import CTA from '../components/container-scroll/CTA';
import { CornerDownLeft } from 'lucide-react';

const page = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-[1200px] flex justify-center mt-40 max-md:mt-20 flex-col items-center gap-4">
          <p className="text-grey">
            +3000 users powering their daily homework{" "}
          </p>
          <h1 className="text-6xl max-md:text-5xl font-bold text-center tracking-tight">
            Seamless Collaboration, <br /> Amplified Productivity
          </h1>
          <div className="flex gap-3 items-center mt-3">
            <CTA type="main" className="text-xl">
              <CornerDownLeft width={24} height={24} />
              Start typing
            </CTA>
            <CTA type="plans" className="text-xl">
              Plans
            </CTA>
          </div>
        </div>
      </div>
      <div className="h-[50rem] mt-24 w-full flex justify-center px-4 max-md:h-fit max-md:mt-8">
        <div className='max-w-[1200px] w-full'>
          <Image
            src={MainImage}
            width={1480}
            height={1480}
            alt="Main image"
            className="h-auto w-full object-fill border border-outline rounded-xl shadow-pop"
          />
        </div>
      </div>
    </div>
  );
}

export default page