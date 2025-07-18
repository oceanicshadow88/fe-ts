import React, { useEffect } from 'react';
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
import { useAiOptimize } from './hooks/useAiOptimize';

interface ICommentEditorProps {
  onSubmit: (content: JSONContent) => void;
  onCancel: () => void;
  initialContent?: JSONContent;
  users: IUserInfo[];
  aiOptimizeAction: 'optimizeTicketDescription' | 'optimizeText';
}

function TipTapEditor({
  onSubmit,
  onCancel,
  initialContent,
  users,
  aiOptimizeAction
}: ICommentEditorProps) {
  const { optimize, isLoading } = useAiOptimize();

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
    if (!editor) return;

    const content = editor.getJSON();
    if (isContentEmpty(content) || isContentUnchanged(content)) return;

    onSubmit(content);
    editor.commands.clearContent();
  };

  // AI优化按钮点击逻辑，使用新版useAiOptimize
  const handleAiOptimize = async () => {
    if (!editor) return;
    const text = editor.getText();
    const result = await optimize(text, aiOptimizeAction);
    if (result) {
      editor.commands.setContent(result);
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
        onAiButtonClick={handleAiOptimize}
        loading={isLoading}
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
