"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type EditorContentProps = {
  isSaving: {
    isSaving: boolean;
    saved: boolean;
  };
  setIsSaving: React.Dispatch<React.SetStateAction<{
    isSaving: boolean;
    saved: boolean;
  }>>;
};

export const EditorContext = createContext<EditorContentProps>({
  isSaving: {
    isSaving: false,
    saved: false,
  },
  setIsSaving: () => {},
});

export const EditorContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [isSaving, setIsSaving] = useState<{
    isSaving: boolean;
    saved: boolean;
  }>({
    isSaving: false,
    saved: true,
  });

  return (
    <EditorContext.Provider value={{ setIsSaving, isSaving }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContet = () => useContext(EditorContext)  