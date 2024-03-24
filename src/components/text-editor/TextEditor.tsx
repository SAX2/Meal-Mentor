"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import { File, Folder } from "@/lib/supabase/supabase.types";
import { useEditorContet } from "@/lib/providers/editor-provider";
import { useAuth } from '@clerk/nextjs';
import { getFileDetails, getFolderDetails, updateFileData, updateFolderData } from '@/lib/supabase/queries';
import { useRouter } from 'next/navigation';
import { TOOLBAR_OPTIONS } from "@/utils/data/toolbar";
import clsx from 'clsx';
import EditorSkeleton from '../skeletons/EditorSkeleton';
import Toolbar from "./Toolbar";

//Editor
import StarterKit from "@tiptap/starter-kit";
import FontSize from 'tiptap-extension-font-size'
import Underline from "@tiptap/extension-underline";
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

interface TextEditorProps {
  dirDetails?: File | Folder;
  fileId: string;
  dirType: "folder" | "file";
}

const TextEditor: React.FC<TextEditorProps> = ({
  dirType,
  fileId,
  dirDetails,
}) => {
  const { setIsSaving } = useEditorContet()
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      FontSize,
      Underline,
      TextStyle,
      Color
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      
      if (!userId || !fileId) return;
      
      setIsSaving(true);

      saveTimerRef.current = setTimeout(async () => {
        setIsSaving(true)
        if (html && fileId) {
          try {
            if (dirType === "folder") {
              await updateFolderData({
                folderId: fileId,
                data: { data: html },
              });
            }
            if (dirType === "file") {
              await updateFileData({
                fileId,
                data: { data: html },
              });
            }
          } catch (error) {
            console.log(error)
          } finally {
            setIsSaving(false);
          }
        }
      }, 850);

      return () => {
        setIsSaving(false);
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      };
    },
    autofocus: true,
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          "outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor || !fileId || !dirType || !userId) return;

    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (dirType === 'file') {
          const { data: selectedDir, error } = await getFileDetails({
            fileId,
            userId: userId,
          });
          if (error) return router.replace(`/dashboard`);
          if (selectedDir === null) {
            setIsLoading(false);
            return;
          }
          if ( selectedDir[0].data === null) {
            setIsLoading(false);
            return;
          }
          editor.commands.setContent(selectedDir[0].data);
        }
        if (dirType === 'folder') {
          const { data: selectedDir, error } = await getFolderDetails({
            folderId: fileId,
            userId: userId,
          });
          if (error) return router.replace(`/dashboard`);
          if (selectedDir === null) {
            setIsLoading(false);
            return;
          }
          if ( selectedDir[0].data === null) {
            setIsLoading(false);
            return;
          }
          editor.commands.setContent(selectedDir[0].data);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return;
  }, [editor, fileId, userId, dirType])

  const bubbleMenuItemStyle = 'p-1 hover:bg-white-2-sec rounded-sm'

  return (
    <>
      <Toolbar options={TOOLBAR_OPTIONS} editor={editor} />
      {isLoading && <EditorSkeleton />}
      <EditorContent
        editor={editor}
        className={clsx(
          "w-full h-fit min-h-48 p-4 !outline-0 !outline-transparent",
          isLoading && "opacity-0"
        )}
      />
    </>
  );
};

export default TextEditor;
