import Image from "next/image"
import realTime from '../../../public/landing/real-time.png'
import realTime2 from '../../../public/landing/real-time-2.png'
import messaging from '../../../public/landing/messaging.png'
import dir from '../../../public/landing/dir.png'
import dirOptions from '../../../public/landing/dir-options.png'
import shareOptions from '../../../public/landing/share-optitons.png'
import user1 from '../../../public/landing/testimonials/user_1.jpeg'
import user2 from '../../../public/landing/testimonials/user_2.jpg'
import user3 from '../../../public/landing/testimonials/user_3.jpg'
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon,  } from "@radix-ui/react-icons"
import { FacebookIcon, Youtube } from "lucide-react"

export const navbar = [
  {
    path: "#",
    title: "Community"
  },
  {
    path: "#",
    title: "Updates"
  },
  {
    path: "#",
    title: "Blog"
  },
  {
    path: "#",
    title: "Plans"
  },
]

export const bento = [
  {
    title: "Integrated Messaging",
    description: "Stay connected with team members through built-in messaging.",
    classname: "h-[425px] max-md:col-span-1 max-md:h-fit",
    header: <div className="p-4 select-none flex justify-center">
      <Image src={messaging} alt="real-time" className="h-fit border border-outline rounded-md" />
    </div>,
  },
  {
    title: "Customizable Workspaces",
    description: "Tailor your workspace to fit your unique workflow",
    classname: "col-span-2 h-[425px] max-md:col-span-1",
    header: (
      <div className="relative h-full select-none">
        <Image src={dir} alt="real-time" className="border border-outline rounded-sm absolute h-auto top-9 -left-5 shadow-pop" width={250} height={350} />
        <Image src={shareOptions} alt="real-time" className="border border-outline rounded-sm absolute h-auto -right-[2%] top-14 shadow-pop max-lg:-right-[45%] max-md:-right-[2%] max-sm:-right-[50%] " width={400} height={375} />
        <Image src={dirOptions} alt="real-time" className="border border-outline rounded-sm absolute h-auto top-[140px] left-[25%] shadow-pop max-lg:left-[25%] max-md:" width={210} height={245} />
      </div>
    ),
  },
    {
      title: "Real-Time Collaboration",
      description: "Collaborate on documents seamlessly with your team",
      classname: "col-span-3 h-[475px] max-md:col-span-1 max-lg:h-[375px] max-md:h-fit",
      header: <div className="p-4 pb-0 bg-clip-content select-none max-md:p-0 relative max-sm:p-4  max-sm:flex  max-sm:justify-center">
        <Image src={realTime} alt="real-time" className="h-full border border-outline rounded-md max-sm:hidden" />
        <Image src={realTime2} alt="real-time" className="h-full border border-outline rounded-md hidden max-sm:block" />
      </div>,
    },
];

export const customers = [
  {
    user: {
      avatarUrl: user1,
      fullName: "John Doe",
      job: "Marketing Manager",
    },
    content: "MealMentor has revolutionized how our team collaborates. It's a game-changer!"
  },
  {
    user: {
      avatarUrl: user3,
      fullName: "Emily Smith",
      job: "Project Lead",
    },
    content: "The integrated messaging feature has streamlined our communication like never before."
  },
  {
    user: {
      avatarUrl: user2,
      fullName: "Michael T. Garcia",
      job: "Product Designer",
    },
    content: "Customizing our workspace has been a breeze, making it truly our own."
  },
]

export const footerMedia = [
  {
    path: "#",
    icon: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.75009C19 7.44045 18.4404 8.00009 17.75 8.00009C17.0597 8.00009 16.5 7.44045 16.5 6.75009C16.5 6.05974 17.0597 5.50009 17.75 5.50009C18.4404 5.50009 19 6.05974 19 6.75009Z" fill="#8B8B8B"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50002 12.0001C7.50002 9.23867 9.7386 7.00009 12.5 7.00009C15.2614 7.00009 17.5 9.23867 17.5 12.0001C17.5 14.7615 15.2614 17.0001 12.5 17.0001C9.7386 17.0001 7.50002 14.7615 7.50002 12.0001ZM12.5 9.00009C10.8432 9.00009 9.50002 10.3432 9.50002 12.0001C9.50002 13.6569 10.8432 15.0001 12.5 15.0001C14.1569 15.0001 15.5 13.6569 15.5 12.0001C15.5 10.3432 14.1569 9.00009 12.5 9.00009Z" fill="#8B8B8B"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4007 2.00009L14.5 2.00074C15.5134 2.00778 15.9024 2.024 16.623 2.05709C17.4525 2.07334 18.2731 2.23024 19.05 2.52109C19.7146 2.77886 20.318 3.17252 20.8217 3.67688C21.3253 4.18124 21.7182 4.7852 21.975 5.45009C22.2658 6.22708 22.423 7.04766 22.44 7.87709C22.488 8.94409 22.5 9.28409 22.5 12.0001C22.5 14.7161 22.488 15.0571 22.44 16.1231C22.4231 16.9529 22.2659 17.7738 21.975 18.5511C21.7179 19.2153 21.3249 19.8184 20.8212 20.3219C20.3175 20.8254 19.7143 21.2182 19.05 21.4751C18.2734 21.7669 17.4526 21.9241 16.623 21.9401C15.556 21.9891 15.216 22.0001 12.5 22.0001C9.784 22.0001 9.44301 21.9891 8.37701 21.9401C7.54713 21.9243 6.72605 21.767 5.94904 21.4751C5.28482 21.2184 4.68158 20.8256 4.17804 20.3221C3.6745 19.8185 3.28177 19.2153 3.02502 18.5511C2.73312 17.7741 2.57583 16.953 2.56 16.1231C2.511 15.0571 2.5 14.7151 2.5 12.0001C2.5 9.28509 2.511 8.94409 2.56 7.87709C2.57595 7.04755 2.73323 6.22679 3.02502 5.45009C3.28192 4.78585 3.67471 4.18257 4.17822 3.67888C4.68173 3.1752 5.28488 2.78222 5.94904 2.52509C6.72628 2.23415 7.54726 2.07725 8.37701 2.06109C9.44301 2.01209 9.784 2.00009 12.5 2.00009V1.99609C13.3229 1.99609 13.9277 1.9972 14.4007 2.00009ZM12.5 4.00009H14.3945C15.458 4.00666 15.8216 4.0224 16.5313 4.05499L16.5576 4.0562L16.5839 4.05671C17.1829 4.06845 17.7757 4.18108 18.3373 4.38983C18.7381 4.54698 19.1022 4.78539 19.4065 5.09013C19.7112 5.39532 19.9494 5.76032 20.106 6.16208C20.3151 6.72447 20.4281 7.31808 20.4404 7.91811L20.4409 7.94255L20.442 7.96698C20.488 8.98951 20.5 9.29474 20.5 12.0001C20.5 14.7055 20.488 15.0117 20.442 16.0331L20.4409 16.0577L20.4404 16.0823C20.4282 16.6826 20.3151 17.2765 20.106 17.8392C19.9493 18.2396 19.7115 18.6034 19.4073 18.9075C19.1026 19.212 18.7383 19.4499 18.3372 19.6064C17.7761 19.816 17.1835 19.9289 16.5846 19.9405L16.5579 19.941L16.5313 19.9422C15.5107 19.9891 15.2071 20.0001 12.5 20.0001C9.79289 20.0001 9.48833 19.9891 8.46885 19.9422L8.44202 19.941L8.41517 19.9405C7.81597 19.929 7.22309 19.816 6.6617 19.6063C6.26075 19.45 5.89658 19.2122 5.59225 18.9079C5.28793 18.6035 5.0501 18.2394 4.89379 17.8385C4.68407 17.277 4.57107 16.6841 4.55963 16.0849L4.55912 16.0581L4.55789 16.0313C4.51103 15.0118 4.5 14.7062 4.5 12.0001C4.5 9.29402 4.51102 8.98939 4.55789 7.96884L4.55912 7.9422L4.55963 7.91554C4.57114 7.31667 4.68412 6.72406 4.89372 6.16291C5.05021 5.7618 5.2882 5.39744 5.59268 5.09285C5.8968 4.78863 6.26059 4.55073 6.66112 4.39408C7.22315 4.1851 7.8164 4.07239 8.41595 4.06071L8.44241 4.0602L8.46885 4.05898C9.48917 4.01208 9.79444 4.00009 12.5 4.00009Z" fill="#8B8B8B"/>
    </svg>
  },
  {
    path: "#",
    icon: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.1648 4.51094C19.3651 3.59069 18.3002 3.00455 17 3.00005C15 2.99313 14.259 3.7328 13.5 4.50005C12.3281 5.81256 12.335 7.37744 12.6364 8.60031C8.683 8.47206 5.1916 6.50106 2.9542 3.48832C2.7155 4.21956 2.5802 4.99919 2.5802 5.81256C2.5802 8.85344 4.3985 11.4601 6.9835 12.5626C5.592 12.5626 3.6264 12.1593 2.5 11.5C2.7409 14.0965 5.086 16.2796 7.3817 17.1762C5.6404 18.1718 3.6373 18.7456 1.5 18.7489C3.5339 20.1675 5.988 21 8.6368 21C15.6213 21 21.2827 15.2229 21.2978 8.09118C22.6148 7.27042 23.5 5.50005 23.5 5.50005C23.5 5.50005 22.479 6.01053 21.1666 6.30204C22.2889 5.63329 23 3.50005 23 3.50005C23 3.50005 21.6551 4.30701 20.3462 4.73717C20.2888 4.66154 20.2284 4.58621 20.1648 4.51094Z" fill="#8B8B8B"/>
    </svg>
  },
  {
    path: "#",
    icon: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.77273 6.54545C6.02823 6.54545 7.04545 5.52818 7.04545 4.27273C7.04545 3.01818 6.02823 2 4.77273 2C3.51723 2 2.5 3.01818 2.5 4.27273C2.5 5.52818 3.51723 6.54545 4.77273 6.54545Z" fill="#8B8B8B"/>
      <path d="M13.4464 8.91C13.4464 8.40792 13.0394 8.00091 12.5373 8.00091H9.89347C9.39139 8.00091 8.98438 8.40792 8.98438 8.91V21.09C8.98438 21.5921 9.25503 21.9991 9.7571 21.9991L12.5909 22C13.093 22 13.5 21.593 13.5 21.0909V14.6965C13.5 10.625 18 10.75 18 14.6965V21.0909C18 21.593 18.4525 22 18.9545 22L21.5909 22C22.093 22 22.5 21.593 22.5 21.0909V13.1904C22.5 6.33827 15.2725 6.58784 13.4464 9.96088V8.91Z" fill="#8B8B8B"/>
      <path d="M7.01562 8.91C7.01562 8.40792 6.60861 8 6.10653 8H3.40909C2.90701 8 2.5 8.40792 2.5 8.91V21.0909C2.5 21.593 2.90701 22 3.40909 22H6.10653C6.60861 22 7.01562 21.593 7.01562 21.0909V8.91Z" fill="#8B8B8B"/>
    </svg>  
  },
  {
    path: "#",
    icon: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 14V21C10.5 21.5523 10.9477 22 11.5 22H13.5C14.0523 22 14.5 21.5523 14.5 21V14H16.4701C16.8847 14 17.2562 13.7443 17.4042 13.3571L18.48 10.5428C18.5801 10.2809 18.3867 10 18.1064 10H14.5V7.8125C14.5 6.74279 14.948 5.66668 16.5663 5.66668L17.5 5.66667C18.0523 5.66667 18.5 5.21895 18.5 4.66667V3.00001C18.5 2.44772 18.0527 2 17.5004 2L15.382 2.00001C12.4064 2.00001 10.5 4.1099 10.5 7.50001V10H7.5C6.94772 10 6.5 10.4477 6.5 11V13C6.5 13.5523 6.94772 14 7.5 14H10.5Z" fill="#8B8B8B"/>
    </svg>
  },
  {
    path: "#",
    icon: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9931 5C12.9931 5 6.11722 5.00001 4.39146 5.44844C3.46743 5.70662 2.70656 6.4675 2.44838 7.40512C1.99995 9.13088 1.99994 12.7048 1.99994 12.7048C1.99994 12.7048 2.01066 15.8924 2.45908 17.591C2.71727 18.5286 3.46455 19.2759 4.40217 19.534C6.14152 19.9961 13.0038 19.9961 13.0038 19.9961C13.0038 19.9961 19.8933 19.9961 21.619 19.5476C22.5567 19.2895 23.3039 18.5558 23.5485 17.6046C24.0105 15.8924 23.9999 12.7184 23.9999 12.7184C23.9999 12.7184 24.0134 9.13088 23.5378 7.40512C23.2932 6.4675 22.546 5.72023 21.6083 5.47563C19.8826 5.00002 12.9931 5 12.9931 5ZM11.1766 9.06115L16.2743 12.1006C16.5755 12.2802 16.5751 12.7294 16.2736 12.9084L11.1759 15.9354C10.8752 16.114 10.4999 15.8897 10.4999 15.5313V9.46482C10.4999 9.10606 10.8759 8.88181 11.1766 9.06115Z" fill="#8B8B8B"/>
    </svg>    
  },
]

export const footerSections = [
  {
    _: [
      {
        title: "Product",
        items: [
          {
            title: "Projects",
            path: "#"
          },
          {
            title: "AI",
            path: "#"
          },
          {
            title: "Docs",
            path: "#"
          },
          {
            title: "Collaboration",
            path: "#"
          },
          {
            title: "What's new",
            path: "#"
          },
        ]
      },
      {
        title: "Build",
        items: [
          {
            title: "Integrations",
            path: "#"
          },
          {
            title: "Templates",
            path: "#"
          },
          {
            title: "Guides & tutorials",
            path: "#"
          },
          {
            title: "Become a partner",
            path: "#"
          },
          {
            title: "Become an affiliate",
            path: "#"
          },
        ]
      },
    ]
  },
  {
    _: [
      {
        title: "Download",
        items: [
          {
            title: "IOS & Android",
            path: "#"
          },
          {
            title: "Mac & Windows",
            path: "#"
          },
        ]
      },
      {
        title: "Learn",
        items: [
          {
            title: "Customer stories",
            path: "#"
          },
          {
            title: "Help center",
            path: "#"
          },
          {
            title: "Blog",
            path: "#"
          },
          {
            title: "Community",
            path: "#"
          },
        ]
      },
    ]
  },
  {
    _: [
      {
        title: "Get started",
        items: [
          {
            title: "Your first template",
            path: "#"
          },
          {
            title: "Why MealMentor",
            path: "#"
          },
        ]
      },
      {
        title: "Resources",
        items: [
          {
            title: "Pricing",
            path: "#"
          },
          {
            title: "About us",
            path: "#"
          },
          {
            title: "Email us",
            path: "#"
          },
          {
            title: "Security",
            path: "#"
          },
          {
            title: "Terms & privacy",
            path: "#"
          },
          {
            title: "Cookie settings",
            path: "#"
          },
          {
            title: "Status",
            path: "#"
          },
        ]
      },
    ]
  },
]
