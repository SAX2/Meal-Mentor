import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Indent,
  Italic,
  Link,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Table,
  Underline,
  Undo,
} from "lucide-react";
import { ListBulletIcon } from "@radix-ui/react-icons";
import { type Editor } from "@tiptap/react";
import { ToolbarOptions } from "../types";

export const TOOLBAR_OPTIONS: ToolbarOptions[] = [
  {
    type: "button",
    items: [
      {
        content: "bold",
        icon: <Bold width={18} height={18} className="text-black" />,
        function: (editor: Editor) => editor.chain().focus().toggleBold().run(),
      },
      {
        content: "italic",
        icon: <Italic width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().toggleItalic().run(),
      },
      {
        content: "underline",
        icon: <Underline width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().toggleUnderline().run(),
      },
      {
        content: "strike",
        icon: <Strikethrough width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().toggleStrike().run(),
      },
    ],
  },
  {
    type: "button",
    items: [
      {
        content: "blockquote",
        icon: <Quote width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().toggleBlockquote().run(),
      },
      {
        content: "code",
        value: "javascript",
        icon: <Code width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().toggleCode().run(),
      },
      {
        content: "heading",
        value: 1,
        icon: <Heading1 width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        content: "heading",
        value: 2,
        icon: <Heading2 width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
    ],
  },
  {
    type: "button",
    items: [
      {
        content: "indent",
        value: "+1",
        icon: <Indent width={18} height={18} className="text-black" />,
      },
      {
        content: "indent",
        value: "-1",
        icon: (
          <Indent width={18} height={18} className="text-black rotate-180" />
        ),
      },
      {
        content: "orderedList",
        value: "ordered",
        icon: <ListOrdered width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().toggleOrderedList().run(),
      },
      {
        content: "bulletList",
        value: "bullet",
        icon: <ListBulletIcon width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().toggleBulletList().run(),
      },
    ],
  },
  {
    type: "select",
    items: [
      {
        content: "align",
        value: "left",
        icon: <AlignLeft width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().setTextAlign("left").run(),
      },
      {
        content: "align",
        value: "center",
        icon: <AlignCenter width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().setTextAlign("center").run(),
      },
      {
        content: "align",
        value: "right",
        icon: <AlignRight width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().setTextAlign("right").run(),
      },
      {
        content: "align",
        value: "justify",
        icon: <AlignJustify width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor.chain().focus().setTextAlign("justify").run(),
      },
    ],
  },
  {
    type: "select",
    items: [
      {
        content: "textStyle",
        value: "inter",
        title: "Inter",
        function: (editor: Editor) => editor.chain().focus().setFontFamily("inter").run(),
      },
      {
        content: "textStyle",
        value: "sans serif",
        title: "Sans serif",
        function: (editor: Editor) => editor.chain().focus().setFontFamily("sans serif").run(),
      },
      {
        content: "textStyle",
        value: "serif",
        title: "Serif",
        function: (editor: Editor) => editor.chain().focus().setFontFamily("serif").run(),
      },
      {
        content: "textStyle",
        value: "monospace",
        title: "Monospace",
        function: (editor: Editor) => editor.chain().focus().setFontFamily("monospace").run(),
      },
      {
        content: "textStyle",
        value: "cursive",
        title: "Monospace",
        function: (editor: Editor) => editor.chain().focus().setFontFamily("cursive").run(),
      },
    ],
  },
  {
    type: "select",
    items: [
      {
        content: "textStyle",
        value: 8,
        title: "8px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("8px").run(),
      },
      {
        content: "textStyle",
        value: 9,
        title: "9px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("9px").run(),
      },
      {
        content: "textStyle",
        value: 10,
        title: "10px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("10px").run(),
      },
      {
        content: "textStyle",
        value: 11,
        title: "11px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("11px").run(),
      },
      {
        content: "textStyle",
        value: 12,
        title: "12px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("12pt").run(),
      },
      {
        content: "textStyle",
        value: 14,
        title: "14px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("14pt").run(),
      },
      {
        content: "textStyle",
        value: 18,
        title: "18px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("18pt").run(),
      },
      {
        content: "textStyle",
        value: 24,
        title: "24px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("24pt").run(),
      },
      {
        content: "textStyle",
        value: 30,
        title: "30px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("30pt").run(),
      },
      {
        content: "textStyle",
        value: 36,
        title: "36px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("36pt").run(),
      },
      {
        content: "textStyle",
        value: 48,
        title: "48px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("48pt").run(),
      },
      {
        content: "textStyle",
        value: 60,
        title: "60px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("60pt").run(),
      },
      {
        content: "textStyle",
        value: 72,
        title: "72px",
        function: (editor: Editor) =>
          editor.chain().focus().setFontSize("72pt").run(),
      },
    ],
  },
  {
    type: "select",
    items: [
      {
        content: "heading",
        value: "1",
        title: "H1",
        function: (editor: Editor) =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        content: "heading",
        value: "2",
        title: "H2",
        function: (editor: Editor) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        content: "heading",
        value: "3",
        title: "H3",
        function: (editor: Editor) =>
          editor.chain().focus().toggleHeading({ level: 3 }).run(),
      },
      {
        content: "heading",
        value: "4",
        title: "H4",
        function: (editor: Editor) =>
          editor.chain().focus().toggleHeading({ level: 4 }).run(),
      },
    ],
  },
  {
    type: "select",
    items: [
      {
        content: "color",
        value: { content: "black", hex: "#0A0A0A" },
        function: (editor: Editor) => editor.chain().focus().unsetColor().run(),
      },
      {
        content: "color",
        value: { content: "forest-green", hex: "#006400" },
        function: (editor: Editor) =>
          editor.chain().focus().setColor("#006400").run(),
      },
      {
        content: "color",
        value: { content: "maroon", hex: "#800000" },
        function: (editor: Editor) =>
          editor.chain().focus().setColor("#800000").run(),
      },
      {
        content: "color",
        value: { content: "purple", hex: "#800080" },
        function: (editor: Editor) =>
          editor.chain().focus().setColor("#800080").run(),
      },
      {
        content: "color",
        value: { content: "light-gray", hex: "#cccccc" },
        function: (editor: Editor) =>
          editor.chain().focus().setColor("#cccccc").run(),
      },
      {
        content: "color",
        value: { content: "light-blue", hex: "#00ffff" },
        function: (editor: Editor) =>
          editor.chain().focus().setColor("#00ffff").run(),
      },
      {
        content: "color",
        value: { content: "lime-green", hex: "#00ff00" },
        function: (editor: Editor) =>
          editor.chain().focus().setColor("#00ff00").run(),
      },
    ],
  },
  {
    type: "select",
    items: [
      {
        content: "background",
        value: { content: "white", hex: "#fff" },
        function: (editor: Editor) =>
          editor.chain().focus().unsetHighlight().run(),
      },
      {
        content: "background",
        value: { content: "black", hex: "#000" },
        function: (editor: Editor) =>
          editor.chain().focus().toggleHighlight({ color: "#000" }).run(),
      },
      {
        content: "background",
        value: { content: "grey", hex: "#ccc" },
        function: (editor: Editor) =>
          editor.chain().focus().toggleHighlight({ color: "#ccc" }).run(),
      },
      {
        content: "background",
        value: { content: "light-blue", hex: "#defbff" },
        function: (editor: Editor) =>
          editor.chain().focus().toggleHighlight({ color: "#defbff" }).run(),
      },
      {
        content: "background",
        value: { content: "light-green", hex: "#dcedc8" },
        function: (editor: Editor) =>
          editor.chain().focus().toggleHighlight({ color: "#dcedc8" }).run(),
      },
      {
        content: "background",
        value: { content: "light-yellow", hex: "#ffffcc" },
        function: (editor: Editor) =>
          editor.chain().focus().toggleHighlight({ color: "#ffffcc" }).run(),
      },
    ],
  },
  {
    type: "button",
    items: [
      {
        content: "table",
        value: "table",
        icon: <Table width={18} height={18} className="text-black" />,
      },
    ],
  },
  {
    type: "button",
    items: [
      {
        content: "history",
        value: "undo",
        icon: <Undo width={18} height={18} className="text-black" />,
        function: (editor: Editor) => editor.chain().focus().undo().run(),
      },
      {
        content: "history",
        value: "redo",
        icon: <Redo width={18} height={18} className="text-black" />,
        function: (editor: Editor) => editor.chain().focus().redo().run(),
      },
    ],
  },
];

export const BUBBLEMENU_OPTIONS: ToolbarOptions[] = [
  {
    type: "input",
    items: [
      {
        content: "link",
        value: "link",
        icon: <Link width={18} height={18} className="text-black" />,
        function: (editor: Editor) =>
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .toggleLink({ href: "https://www.debanz.com" })
            .run(),
      },
    ],
  },
];