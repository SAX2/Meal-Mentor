import React from 'react'
import MainImage from "../../../../public/landing/main.png";
import Image from 'next/image';
import CTA from '../components/container-scroll/CTA';
import { CornerDownLeft } from 'lucide-react';
import { bento, customers } from '@/utils/data/landing';
import { cn } from '@/lib/utils';

const page = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-[1200px] flex justify-center mt-40 max-md:mt-20 flex-col items-center gap-4">
          <p className="text-grey text-center">
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
      <div className="my-24 w-full flex justify-center px-4 max-md:h-fit max-md:mt-8">
        <div className="max-w-[1200px] w-full">
          <Image
            src={MainImage}
            width={1480}
            height={1480}
            alt="Main image"
            className="h-auto w-full object-fill border border-outline rounded-xl shadow-pop"
          />
        </div>
      </div>
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-[1200px]">
          <div className="flex flex-col gap-8 py-8 pt-0">
            <h2 className="text-2xl font-semibold tracking-tight max-md:text-center">
              Supercharge Your Productivity
            </h2>
            <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
              {bento.map((item, index) => {
                return (
                  <div
                    key={item.title}
                    className={cn(
                      "max-h-[475px] w-full border border-outline  rounded-lg bg-white-2 overflow-hidden",
                      item.classname
                    )}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="p-6 flex flex-col gap-1 pb-0">
                        <h3 className="text-xl font-medium">{item.title}</h3>
                        <p className="text-sm text-grey">{item.description}</p>
                      </div>
                      {item.header}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-8 py-8 mt-8">
            <h2 className="text-2xl font-semibold tracking-tight max-md:text-center">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
              {customers.map((customer, index) => {
                return (
                  <div
                    key={customer.user.fullName}
                    className="flex flex-col gap-4 p-4 rounded-md"
                  >
                    <div className="flex items-center gap-2 max-md:justify-center">
                      <Image
                        src={customer.user.avatarUrl}
                        alt={customer.user.fullName}
                        width={36}
                        height={36}
                        className="w-8 rounded-[9px]"
                      />
                      <p className="text-base font-medium">
                        {customer.user.fullName}
                      </p>
                      <div className="px-1 border border-outline bg-white-2 rounded-sm">
                        <span className="text-xs leading-[2px] text-grey font-medium">
                          {customer.user.job}
                        </span>
                      </div>
                    </div>
                    <p className="text-lg max-md:text-center">{customer.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center px-4 bg-white-2 border-y border-outline">
        <div className="w-full max-w-[1200px] flex justify-center flex-col gap-3 py-16 items-center">
          <h1 className="text-6xl max-md:text-5xl font-bold text-center tracking-tight">Get started <br className='hidden max-sm:block'/> for free</h1>
          <p className='text-grey text-center'>Seamless teamwork. Unlock potential. Start free trial now.</p>
          <div className="flex gap-3 items-center mt-3">
            <CTA type="main" className="text-xl">
              <CornerDownLeft width={24} height={24} />
              Try for free
            </CTA>
            <CTA type="plans" className="text-xl">
              Plans
            </CTA>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page