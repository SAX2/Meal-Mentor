import React from 'react'
import Link from 'next/link';
import CTA from '../container-scroll/CTA';
import { Logo } from '../../../../../public/logo/mealmentor'
import { navbar } from '@/utils/data/landing';
import { CornerDownLeft } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="py-4 flex justify-between gap-4">
      <div className="flex gap-2 items-center">
        <Logo className="w-8" />
        <h1 className="text-xl font-semibold">Meal Mentor</h1>
      </div>
      <div className="flex items-center gap-4 max-md:hidden">
        <ul className="flex items-center gap-1">
          {navbar.map((item) => {
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="px-2 py-[2px] hover:bg-white-2 rounded-md transition-colors font-medium"
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <CTA type="main" className="px-2 py-[2px] rounded-md">
            <CornerDownLeft width={16} height={16} />
            Start typing
          </CTA>
          <CTA type="login" className="px-2 py-[2px] rounded-md">
            Login
          </CTA>
        </div>
      </div>
    </div>
  );
}

export default Navbar