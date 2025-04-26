import React, { useState } from 'react';
import { JSONContent } from '@tiptap/core';
import parse from 'html-react-parser';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';
import { Mention } from '@tiptap/extension-mention';
import style from './DescriptionSession.module.scss';
import AttachmentSession from './@components/AttachmentSession/AttachmentSession';
import TipTapEditor from '../../../TipTapEditor/TipTapEditor';
import { IUserInfo } from '../../../../types';

interface IDescriptionSessionProps {
  description: string | undefined;
  attachmentUrls: string[];
  users: IUserInfo[];
  onSubmitForm: (data: any) => void;
}

export default function DescriptionSession({
  description,
  attachmentUrls,
  users,
  onSubmitForm
}: IDescriptionSessionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const parseJsonToHtml = (content: string) => {
    try {
      const jsonContent: JSONContent = JSON.parse(content);
      const html = generateHTML(jsonContent, [StarterKit, ImageResize, Mention]);
      return html;
    } catch (error) {
      return null;
    }
  };

  const renderContent = (content: string) => {
    if (content === '') {
      return 'Input description here...';
    }
    const html = parseJsonToHtml(content);
    if (!html) return parse('<p>Invalid content</p>');
    const fixedHtml = html.replace(/<p>/g, '<span>').replace(/<\/p>/g, '</span>');
    return parse(fixedHtml);
  };

  const getAttachmentUrls = (content: JSONContent) => {
    const contentArray = content.content;
    if (!contentArray) return [];

    return contentArray
      .filter((item: any) => item.type === 'image')
      .map((item: any) => item.attrs?.src || '');
  };

  const handleSubmit = (content: JSONContent) => {
    const urls = getAttachmentUrls(content);
    const stringifiedContent = JSON.stringify(content);
    onSubmitForm({ attachmentUrls: urls, description: stringifiedContent });
    setIsEditing(false);
  };

  return (
    <div className={style.detailsContainer}>
      <h4>Description</h4>
      <div className={style.descriptionArea}>
        {isEditing ? (
          <TipTapEditor
            onSubmit={handleSubmit}
            users={users}
            initialContent={description ? JSON.parse(description) : undefined}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <button onClick={() => setIsEditing(true)} className={style.description}>
            {renderContent(description ?? '')}
          </button>
        )}
      </div>
      <AttachmentSession attachmentUrls={attachmentUrls} />
    </div>
  );
}
