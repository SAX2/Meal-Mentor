'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import 'quill/dist/quill.snow.css';
import EmojiRoute from '../emoji/EmojiRoute';
import { File, Folder } from '@/utils/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Selector from './Selector';
import SelectorDropdown from './Selector';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';

interface QuillEditorProps {
  dirDetails?: File | Folder;
  fileId?: string;
  dirType?: 'folder' | 'file';
}

type ToolbarOptions = {
  type: 'button' | 'select';
  items: {
    content: string;
    value?: string;
  }[]
}

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
    items: [{ content: "blockquote" }, { content: "code-block", value: 'javascript' }],
  }, // toggled buttons

  // [{ header: 1 }, { header: 2 }], // custom button values
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
      { content: "align", value: "" },
      { content: "align", value: "center" },
      { content: "align", value: "right" },
      { content: "align", value: "justify" },
    ],
  },
  {
    type: "select",
    items: [
      { content: "font", value: "" },
      { content: "font", value: "serif" },
      { content: "font", value: "monospace" },
    ],
  },
  // // [{ direction: 'rtl' }], // text direction

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

  const align = {
    items: [
      {
        content: "align",
        value: "",
        function: () => quill.format("align", ""),
        icon: <AlignLeft width={18} height={18} className='text-black'/>
      },
      {
        content: "align",
        value: "center",
        function: () => quill.format("align", "center"),
        icon: <AlignCenter  width={18} height={18} className='text-black'/>
      },
      {
        content: "align",
        value: "right",
        function: () => quill.format("align", "right"),
        icon: <AlignRight  width={18} height={18} className='text-black'/>
      },
      {
        content: "align",
        value: "justify",
        function: () => quill.format("align", "justify"),
        icon: <AlignJustify  width={18} height={18} className='text-black'/>
      },
    ],
  };

  const font = {
    items: [
      {
        content: "font",
        value: "sans-serif",
        function: () => quill.format("font", ""),
      },
      {
        content: "font",
        value: "serif",
        function: () => quill.format("font", "serif"),
      },
      {
        content: "font",
        value: "monospace",
        function: () => quill.format("font", "monospace"),
      },
    ],
  };


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
        {TOOLBAR_OPTIONS.map((toolbarGroup, index) => {
          if (toolbarGroup.type === "button") {
            return (
              <ul
                key={`${toolbarGroup.type}_${index}`}
                className={`flex p-1 ${
                  index < TOOLBAR_OPTIONS.length - 1 && "border-r"
                }`}
              >
                {toolbarGroup.items.map((toolbarItem) => {
                  return (
                    <ToolbarItem
                      key={
                        toolbarItem.value
                          ? toolbarItem.value
                          : toolbarItem.content
                      }
                      type={toolbarItem.content}
                      value={toolbarItem.value && toolbarItem.value}
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
                className={`flex p-1 ${
                  index < TOOLBAR_OPTIONS.length - 1 && "border-r"
                }`}
              >
                {toolbarGroup.items.filter((item) => item.content === "align")
                  .length > 0 && (
                  <SelectorDropdown
                    defaultValue={align.items[0]}
                    items={align.items}
                  />
                )}
                {toolbarGroup.items.filter((item) => item.content === "font")
                  .length > 0 && (
                  <SelectorDropdown
                    defaultValue={font.items[0]}
                    items={font.items}
                  />
                )}
              </ul>
            );
          }
          return;
        })}
        {/* <!-- Add font size dropdown --> */}
        {/* <select className="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <div className="flex">
          <button className="hover:!bg-white-2-sec !rounded-sm ql-bold"></button>
          <button className="hover:!bg-white-2-sec !rounded-sm ql-italic"></button>
          <button className="hover:!bg-white-2-sec !rounded-sm ql-underline"></button>
          <button className="hover:!bg-white-2-sec !rounded-sm ql-strike"></button>
        </div> */}
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