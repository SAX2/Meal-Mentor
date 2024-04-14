import React from 'react'
import { Logo } from '../../../../../public/logo/mealmentor';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { footerMedia, footerSections } from '@/utils/data/landing';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full flex justify-center px-8 mt-8">
      <div className="w-full max-w-[1200px] py-8 flex flex-col gap-10">
        <div className="grid gap-8 grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 items-center">
              <Logo className="w-7" />
              <h1 className="text-xl font-semibold">Meal Mentor</h1>
            </div>
            <div className="flex items-center gap-2">
              {footerMedia.map((media, index) => {
                return (
                  <a
                    href={media.path}
                    key={media.path === "#" ? index : media.path}
                  >
                    {media.icon}
                  </a>
                );
              })}
            </div>
          </div>
          {footerSections.map((sections, index) => {
            return (
              <div
                className="flex flex-col gap-8"
                key={`${index}_#${Math.random() * footerSections.length}`}
              >
                {sections._.map((section) => {
                  return (
                    <div className="flex flex-col gap-2" key={section.title}>
                      <p className="font-medium">{section.title}</p>
                      {section.items.map((item) => {
                        return (
                          <Link
                            href={item.path}
                            key={item.title}
                            className="text-grey hover:underline"
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-4 max-lg:grid-cols-1">
          <div className="col-start-2 max-lg:col-start-1 ">
            <p className='font-semibold'>Do Not Sell or Share My Info</p>
            <p className='text-grey text-sm'>© 2024 MealMentor, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Group = () => {
  return (
    <div>

    </div>
  );
}

export default Footer