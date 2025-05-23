"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import { Document, Folder } from "@/lib/supabase/supabase.types";
import { useEditorContet } from "@/lib/providers/editor-provider";
import { useAuth } from '@clerk/nextjs';
import { getFileDetails, getFolderDetails, updateFileData, updateFolderData } from '@/lib/supabase/queries';
import { useRouter } from 'next/navigation';
import { BUBBLEMENU_OPTIONS, TOOLBAR_OPTIONS } from "@/utils/data/toolbar";
import clsx from 'clsx';
import EditorSkeleton from '../skeletons/EditorSkeleton';
import Toolbar from "./Toolbar";
import { createClient } from '@supabase/supabase-js'

//Editor
import StarterKit from "@tiptap/starter-kit";
import FontSize from "tiptap-extension-font-size";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Code from "@tiptap/extension-code";
import FontFamily from "@tiptap/extension-font-family";

interface TextEditorProps {
  dirDetails?: Document | Folder;
  fileId: string;
  dirType: "folder" | "file";
  owner: string | null;
}

const TextEditor: React.FC<TextEditorProps> = ({
  dirType,
  fileId,
  dirDetails,
  owner
}) => {
  const { setIsSaving } = useEditorContet()
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>('');
  const [debouncedEditorContent, setDebouncedEditorContent] = useState<string>('');
  const router = useRouter();
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const editor = useEditor({
    extensions: [
      StarterKit,
      FontSize,
      Underline,
      TextStyle,
      Color,
      Code,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "underline cursor-pointer text-grey",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Write your text here...",
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      if (!userId || !fileId) return;

      if (html && fileId) {
        setIsSaving((prevState) => ({ ...prevState, saved: false }));
        setEditorContent(html);
      }
    },
    autofocus: true,
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  const handleInserts = (payload: string) => {
    console.log('Change received!', payload)
  }

  useEffect(() => {
    if (editorContent.length === 0 || editor === null || !fileId) return;

    const debounceTimeout = setTimeout(() => {
      setDebouncedEditorContent(editorContent);
    }, 2000);

    return () => clearTimeout(debounceTimeout);
  }, [editorContent]);

  useEffect(() => {
    const updateDir = async () => {
      try {
        setIsSaving((prevState) => ({ ...prevState, isSaving: true }));
        if (dirType === "folder") {
          await updateFolderData({
            folderId: fileId,
            data: { data: editorContent },
          });
        }
        if (dirType === "file") {
          await updateFileData({
            fileId,
            data: { data: editorContent },
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSaving((prevState) => ({
          ...prevState,
          isSaving: false,
          saved: true,
        }));
      }
    }

    if (debouncedEditorContent) {
      updateDir();
    }
  }, [debouncedEditorContent]);

  useEffect(() => {
    if (!editor || !fileId || !dirType || !userId) return;

    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (dirType === 'file') {
          editor.commands.clearContent();

          const { data: selectedDir, error } = await getFileDetails({
            fileId,
            userId: owner ?? userId,
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
          editor.commands.clearContent();

          const { data: selectedDir, error } = await getFolderDetails({
            folderId: fileId,
            userId: owner ?? userId,
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

    if (fileId) {
      fetchData();
    }
  }, [editor, fileId, userId, dirType])

  const bubbleMenuItemStyle = 'p-1 hover:bg-white-2-sec rounded-sm'

  return (
    <>
      <Toolbar options={TOOLBAR_OPTIONS} editor={editor} />
      {isLoading && <EditorSkeleton />}
      {/* {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 200 }} className="">
          <Toolbar options={BUBBLEMENU_OPTIONS} editor={editor} />
        </BubbleMenu>
      )} */}
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
