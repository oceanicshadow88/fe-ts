import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { JSONContent } from '@tiptap/core';
import ImageResize from 'tiptap-extension-resize-image';
import style from './TipTapEditor.module.scss';
import TooLBar from './ToolBar/ToolBar';
import { CommentEditorToolBarButtonConfig } from './@const/CommentEditorToolBarButtonConfig';
import { IUserInfo } from '../../types';
import { createMentionExtension } from './@const/MentionExtension';
import { DropUploadImageExtension } from './@const/DropUploadImageExtension';

interface ICommentEditorProps {
  onSubmit: (content: JSONContent) => void;
  onCancel: () => void;
  initialContent?: JSONContent;
  users: IUserInfo[];
}

function TipTapEditor({ onSubmit, onCancel, initialContent, users }: ICommentEditorProps) {
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, ImageResize, createMentionExtension(users), DropUploadImageExtension],
    content: initialContent || ''
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  const isContentEmpty = (content?: JSONContent): boolean => {
    return (
      !content?.content ||
      content?.content.every((node) => {
        return node.type === 'paragraph' && (!node.content || node.content.length === 0);
      })
    );
  };

  const isContentUnchanged = (content: JSONContent): boolean => {
    return JSON.stringify(content) === JSON.stringify(initialContent);
  };

  const handleSubmit = () => {
    if (!editor) {
      return;
    }

    const content = editor.getJSON();

    if (isContentEmpty(content)) {
      return;
    }

    if (isContentUnchanged(content)) {
      return;
    }

    onSubmit(content);

    editor.commands.clearContent();
  };

  const handleAiOptimize = async () => {
    if (!editor || isAiOptimizing) {
      return;
    }

    setIsAiOptimizing(true);

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('AI optimization failed:', error);
    } finally {
      setIsAiOptimizing(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={style.commentEditor}>
      <TooLBar
        editor={editor}
        groups={CommentEditorToolBarButtonConfig}
        onAiOptimize={handleAiOptimize}
        loading={isAiOptimizing}
      />
      <EditorContent editor={editor} />
      <div className={style.buttonContainer}>
        <button onClick={handleSubmit} className={style.submitButton}>
          {!isContentEmpty(initialContent) ? 'Update' : 'Submit'}
        </button>
        <button onClick={onCancel} className={style.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TipTapEditor;
