"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import { File, Folder } from "@/lib/supabase/supabase.types";
import { useAuth } from '@clerk/nextjs';
import { getFileDetails, getFolderDetails, updateFileData, updateFolderData } from '@/lib/supabase/queries';
import { useRouter } from 'next/navigation';

import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import FontFamily from '@tiptap/extension-font-family'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import ListItem from '@tiptap/extension-list-item'
import BlockQoute from '@tiptap/extension-blockquote'
import CodeBlock from '@tiptap/extension-code-block'
import FontSize from 'tiptap-extension-font-size'

import clsx from 'clsx';
import EditorSkeleton from '../skeletons/EditorSkeleton';
import { TOOLBAR_OPTIONS } from "@/utils/data/data";
import Toolbar from "./Toolbar";

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
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      FontFamily,
      Paragraph,
      Text,
      TextStyle,
      FontSize,
      ListItem,
      CodeBlock,
      BlockQoute,
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph',],
      }),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()

      if (!userId || !fileId) return;

      saveTimerRef.current = setTimeout(async () => {
        if (html && fileId) {
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
        }
      }, 850);

      return () => {
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      }
    },
  })

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
      {editor && (
        <BubbleMenu
          className="p-1 flex gap-1 bg-white rounded-md border border-outline shadow-button"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={clsx(
              bubbleMenuItemStyle,
              editor.isActive("bold") && "bg-white-2-sec-2"
            )}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={clsx(
              bubbleMenuItemStyle,
              editor.isActive("italic") && "bg-white-2-sec-2"
            )}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={clsx(
              bubbleMenuItemStyle,
              editor.isActive("strike") && "bg-white-2-sec-2"
            )}
          >
            Strike
          </button>
        </BubbleMenu>
      )}
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
