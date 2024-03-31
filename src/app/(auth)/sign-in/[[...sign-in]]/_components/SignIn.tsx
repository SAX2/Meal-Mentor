"use client"

import { InputModal } from '@/components/auth-modal/AuthModal';
import React, { useState } from 'react'

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  return (
    <div className="flex flex-col gap-[10px]">
      {/* <InputModal label="Email" placeholder="Your email" type="email" handleOnChange={(value) => setEmail(value)} /> */}
      <InputModal
        label="Password"
        placeholder="Your secret password"
        type="password"
      />
      <button className="w-full border border-outline shadow-button rounded-md px-3 py-1 font-medium flex justify-center items-center mt-1">
        Continue
      </button>
    </div>
  );
}

export default SignIn