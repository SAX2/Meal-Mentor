"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type EditorContentProps = {
  isSaving: boolean | null;
  setIsSaving: (value: boolean) => void;
};

export const EditorContext = createContext<EditorContentProps>({
  isSaving: null,
  setIsSaving: (value: boolean) => value,
});

export const EditorContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [isSaving, setIsSaving] = useState<boolean>(false);

  return (
    <EditorContext.Provider value={{ setIsSaving, isSaving }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContet = () => useContext(EditorContext)  