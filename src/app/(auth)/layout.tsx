import React from 'react'

const layout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className="w-full max-h-dvh h-dvh flex justify-center items-center">
      {children}
    </div>
  );
}

export default layout;