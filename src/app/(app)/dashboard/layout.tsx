import React from "react";

interface layoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children, modal }) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default layout;
