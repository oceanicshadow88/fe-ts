import React from 'react';
import { RiText, RiH1, RiH2, RiMoreLine } from 'react-icons/ri';
import { LuHeading } from 'react-icons/lu';
import { BiEdit } from 'react-icons/bi';
import {
  GoBold,
  GoItalic,
  GoStrikethrough,
  GoCode,
  GoHorizontalRule,
  GoUpload,
  GoImage
} from 'react-icons/go';
import { BsListTask, BsBlockquoteLeft } from 'react-icons/bs';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { MdFormatListBulleted } from 'react-icons/md';
import { TbClearFormatting } from 'react-icons/tb';
import { Editor } from '@tiptap/react';
import { IButtonGroup } from '../ToolBar/ToolBar';
import { upload } from '../../../api/upload/upload';

const handleImageUpload = async (editor: Editor) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.style.display = 'none';

  input.click();

  input.onchange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file?.type.startsWith('image/')) {
      return;
    }
    const formData = new FormData();
    formData.append('photos', file);
    const response = await upload(formData);
    const imageUrls = response.data.map((item: { location: string }) => item.location);
    imageUrls.forEach((url) => {
      editor.chain().focus().setImage({ src: url }).run();
    });
  };
};

export const CommentEditorToolBarButtonConfig: IButtonGroup[] = [
  {
    label: 'Formatting',
    icon: <RiText />,
    buttons: [
      {
        label: 'Bold',
        icon: <GoBold />,
        onClick: (editor) => editor.chain().focus().toggleBold().run(),
        isActive: (editor) => editor.isActive('bold')
      },
      {
        label: 'Italic',
        icon: <GoItalic />,
        onClick: (editor) => editor.chain().focus().toggleItalic().run(),
        isActive: (editor) => editor.isActive('italic')
      },
      {
        label: 'Strike',
        icon: <GoStrikethrough />,
        onClick: (editor) => editor.chain().focus().toggleStrike().run(),
        isActive: (editor) => editor.isActive('strike')
      }
    ]
  },
  {
    label: 'Headings',
    icon: <LuHeading />,
    buttons: [
      {
        label: 'H1',
        icon: <RiH1 />,
        onClick: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: (editor) => editor.isActive('heading', { level: 1 })
      },
      {
        label: 'H2',
        icon: <RiH2 />,
        onClick: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: (editor) => editor.isActive('heading', { level: 2 })
      }
    ]
  },
  {
    label: 'Blocks',
    icon: <BiEdit />,
    buttons: [
      {
        label: 'Code Block',
        icon: <GoCode />,
        onClick: (editor) => editor.chain().focus().toggleCodeBlock().run(),
        isActive: (editor) => editor.isActive('codeBlock')
      },
      {
        label: 'Blockquote',
        icon: <BsBlockquoteLeft />,
        onClick: (editor) => editor.chain().focus().toggleBlockquote().run(),
        isActive: (editor) => editor.isActive('blockquote')
      },
      {
        label: 'Horizontal Rule',
        icon: <GoHorizontalRule />,
        onClick: (editor) => editor.chain().focus().setHorizontalRule().run(),
        isActive: () => false
      }
    ]
  },
  {
    label: 'Lists',
    icon: <BsListTask />,
    buttons: [
      {
        label: 'Bullet List',
        icon: <MdFormatListBulleted />,
        onClick: (editor) => editor.chain().focus().toggleBulletList().run(),
        isActive: (editor) => editor.isActive('bulletList')
      },
      {
        label: 'Ordered List',
        icon: <AiOutlineOrderedList />,
        onClick: (editor) => editor.chain().focus().toggleOrderedList().run(),
        isActive: (editor) => editor.isActive('orderedList')
      }
    ]
  },
  {
    label: 'Media',
    icon: <GoUpload />,
    buttons: [
      {
        label: 'Upload Image',
        icon: <GoImage />,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick: (editor) => handleImageUpload(editor),
        isActive: () => false
      }
    ]
  },
  {
    label: 'Other',
    icon: <RiMoreLine />,
    buttons: [
      {
        label: 'Clear Formatting',
        icon: <TbClearFormatting />,
        onClick: (editor) => editor.chain().focus().clearNodes().unsetAllMarks().run(),
        isActive: () => false
      }
    ]
  }
];
