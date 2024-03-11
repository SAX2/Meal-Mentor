'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import 'quill/dist/quill.snow.css';
import { File, Folder } from '@/utils/data';
import SelectorDropdown from './Selector';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Sparkles  } from 'lucide-react';
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface QuillEditorProps {
  dirDetails?: File | Folder;
  fileId?: string;
  dirType?: 'folder' | 'file';
}

type ToolbarOptions = {
  type: "button" | "select";
  items: {
    content: string;
    value?: string | {
      content: string;
      hex?: string;
    };
  title?: string;
  icon?: React.ReactElement;
  }[];
};

const TOOLBAR_OPTIONS: ToolbarOptions[] = [
  {
    type: "button",
    items: [
      { content: "bold" },
      { content: "italic" },
      { content: "underline" },
      { content: "strike" },
    ],
  },
  {
    type: "button",
    items: [
      { content: "blockquote" },
      { content: "code-block", value: "javascript" },
      { content: "header", value: "1" },
      { content: "header", value: "2" },
    ],
  },
  {
    type: "button",
    items: [
      { content: "script", value: "sub" },
      { content: "script", value: "super" },
    ],
  },
  {
    type: "button",
    items: [
      { content: "indent", value: "-1" },
      { content: "indent", value: "+1" },
      { content: "list", value: "ordered" },
      { content: "list", value: "bullet" },
    ],
  },
  {
    type: "select",
    items: [
      {
        content: "align",
        value: "",
        icon: <AlignLeft width={18} height={18} className="text-black" />,
      },
      {
        content: "align",
        value: "center",
        icon: <AlignCenter width={18} height={18} className="text-black" />,
      },
      {
        content: "align",
        value: "right",
        icon: <AlignRight width={18} height={18} className="text-black" />,
      },
      {
        content: "align",
        value: "justify",
        icon: <AlignJustify width={18} height={18} className="text-black" />,
      },
    ],
  },
  {
    type: "select",
    items: [
      { content: "font", value: "", title: "Sans serif" },
      { content: "font", value: "serif", title: "Serif" },
      { content: "font", value: "monospace", title: "Monospace" },
    ],
  },
  {
    type: "select",
    items: [
      { content: "color", value: { content: "black", hex: "#0A0A0A" } },
      { content: "color", value: { content: "dark-gray", hex: "#FFFFFF" } },
      { content: "color", value: { content: "blue", hex: "#000080" } },
      { content: "color", value: { content: "forest-green", hex: "#006400" } },
      { content: "color", value: { content: "maroon", hex: "#800000" } },
      { content: "color", value: { content: "purple", hex: "#800080" } },
      { content: "color", value: { content: "light-gray", hex: "#cccccc" } },
      { content: "color", value: { content: "light-blue", hex: "#00ffff" } },
      { content: "color", value: { content: "lime-green", hex: "#00ff00" } },
    ],
  },
  {
    type: "select",
    items: [
      { content: "background", value: { content: "white", hex: "#fff" } },
      { content: "background", value: { content: "black", hex: "#000" } },
      { content: "background", value: { content: "grey", hex: "#ccc" } },
      { content: "background", value: { content: "light-blue", hex: "#defbff" } },
      { content: "background", value: { content: "light-green", hex: "#dcedc8" } },
      { content: "background", value: { content: "light-yellow", hex: "#ffffcc" } },
    ],
  },
  // [{ direction: 'rtl' }], // text direction

  // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],

  // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  // [{ align: [] }],

  // ['clean'], // remove formatting button
];

const QuillEditor: React.FC<QuillEditorProps> = ({
  dirDetails,
  dirType,
  fileId,
}) => {
  const [quill, setQuill] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  // const { state, workspaceId, folderId, dispatch } = useAppState();

  //
  const wrapperRef = useCallback(async (wrapper: any) => {
    if (typeof window !== 'undefined') {
      if (wrapper === null) return;
      
      wrapper.innerHTML = '';
      const editor = document.createElement('div');
      wrapper.append(editor);
      
      const Quill = (await import('quill')).default;
      const QuillCursors = (await import('quill-cursors')).default;
      
      Quill.register('modules/cursors', QuillCursors);
      
      const q = new Quill(editor, {
        theme: 'snow',
        modules: {
          toolbar: '#toolbar',
          cursors: {
            transformOnTextChange: true,
          },
        },
        placeholder: "Start typing your text here..."
      });
      
      setQuill(q);
    }
  }, []);


  // useEffect(() => {
  //   if (quill === null || !fileId) return;

  //   const quillHandler = (delta: any, oldDelta: any, source: any) => {
  //     if (source !== "user") return;
  //     if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
  //     setSaving(true);
  //     const contents = quill.getContents();
  //     const quillLength = quill.getLength();
  //     saveTimerRef.current = setTimeout(async () => {
  //       if (contents && quillLength !== 1 && fileId) {
  //         // if (dirType == 'folder') {
  //         //   if (!workspaceId) return;
  //         //   dispatch({
  //         //     type: 'UPDATE_FOLDER',
  //         //     payload: {
  //         //       folder: { data: JSON.stringify(contents) },
  //         //       workspaceId,
  //         //       folderId: fileId,
  //         //     },
  //         //   });
  //         //   await updateFolder({ data: JSON.stringify(contents) }, fileId);
  //         // }
  //         if (dirType == 'file') {
  //           if (!workspaceId || !folderId) return;
  //           dispatch({
  //             type: 'UPDATE_FILE',
  //             payload: {
  //               file: { data: JSON.stringify(contents) },
  //               workspaceId,
  //               folderId: folderId,
  //               fileId,
  //             },
  //           });
  //           await updateFile({ data: JSON.stringify(contents) }, fileId);
  //         }
  //       }
  //       setSaving(false);
  //     }, 850);
  //   };
  //   quill.on("text-change", quillHandler);

  //   return () => {
  //     quill.off("text-change", quillHandler);
  //     if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
  //   };
  // }, [quill, fileId]);

  return (
    <>
      <div id="toolbar">
        <div className="flex p-1 border-r">
          <button
            className={"outline-0 rounded-sm hover:!bg-white-2-sec"}
          >
            <Sparkles width={18} height={18} className="text-black" />
          </button>
        </div>
        {TOOLBAR_OPTIONS.map((toolbarGroup, index) => {
          if (toolbarGroup.type === "button") {
            return (
              <ul
                key={`${toolbarGroup.type}_${index}`}
                className={`flex p-1 border-r`}
              >
                {toolbarGroup.items.map((toolbarItem) => {
                  return (
                    <ToolbarItem
                      key={
                        toolbarItem.value
                          ? toolbarItem.value.toString()
                          : toolbarItem.content
                      }
                      type={toolbarItem.content}
                      value={toolbarItem.value && toolbarItem.value.toString()}
                    />
                  );
                })}
              </ul>
            );
          }
          if (toolbarGroup.type === "select") {
            return (
              <ul
                key={`${toolbarGroup.type}_${index}`}
                className={`flex p-1 border-r`}
              >
                <SelectorDropdown
                  defaultValue={toolbarGroup.items[0]}
                  items={toolbarGroup.items}
                  quill={quill}
                />
              </ul>
            );
          }
          return;
        })}
        <div className="flex p-1">
          <button className={"outline-0 rounded-sm hover:!bg-white-2-sec"}>
            <DotsHorizontalIcon width={18} height={18} className="text-black" />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col relative w-full">
        <div id="container" className="w-full" ref={wrapperRef}></div>
      </div>
    </>
  );
};

export const ToolbarItem = ({
  type,
  value,
  disabled,
  noHover,
}: {
  type: string;
  value?: string;
  disabled?: boolean;
  noHover?: boolean;
}) => {
  return (
    <button
      className={`!outline-0 !rounded-sm ql-${type} ${
        noHover ? "hover:!bg-none" : "hover:!bg-white-2-sec"
      }`}
      disabled={disabled}
      value={value}
    ></button>
  );
};

export default QuillEditor;