import AuthModal, { InputModal } from '@/components/auth-modal/AuthModal';
import { dialogs } from '@/utils/data/data';
import React from 'react'

const page = () => {
  return (
    <AuthModal
      providersEnabled
      description={dialogs.register.description}
      title={dialogs.register.title}
      providers={["google", "facebook"]}
    >
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[10px]">
          <InputModal
            label="First Name"
            placeholder="Your email"
            type="email"
          />
          <InputModal label="Last Name" placeholder="Your email" type="email" />
        </div>
        <InputModal label="Email *" placeholder="Your email" type="email" />
        <InputModal
          label="Password *"
          placeholder="Your secret password"
          type="password"
        />
        <InputModal
          label="Confirm Password *"
          placeholder="Your secret password"
          type="password"
        />
        <button className="w-full border border-outline shadow-button rounded-md px-3 py-1 font-medium flex justify-center items-center mt-1">
          Continue
        </button>
      </div>
    </AuthModal>
  );
}

export default page