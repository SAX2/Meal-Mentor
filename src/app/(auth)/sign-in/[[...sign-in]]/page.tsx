import AuthModal, { InputModal } from '@/components/auth-modal/AuthModal';
import { dialogs } from '@/utils/data/data';
import React from 'react'
import SignIn from './_components/SignIn';

const page = () => {
  return (
    <AuthModal
      providersEnabled
      description={dialogs.login.description}
      title={dialogs.login.title}
      providers={["google", "facebook", "apple"]}
    >
      <SignIn />
    </AuthModal>
  );
}

export default page