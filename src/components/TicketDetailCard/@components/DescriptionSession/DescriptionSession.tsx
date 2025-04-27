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
  description?: string;
  attachmentUrls: string[];
  users: IUserInfo[];
  onSubmitForm: (data: { attachmentUrls: string[]; description: string }) => void;
}

export default function DescriptionSession({
  description,
  attachmentUrls,
  users,
  onSubmitForm
}: IDescriptionSessionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const safeParseJsonContent = (content: string): JSONContent | null => {
    try {
      return JSON.parse(content) as JSONContent;
    } catch {
      return null;
    }
  };

  const generateHtmlFromJson = (json: JSONContent | null): string | null => {
    if (!json) return null;
    return generateHTML(json, [StarterKit, ImageResize, Mention]);
  };

  const renderContent = (raw: string | undefined) => {
    if (!raw) {
      return <em className={style.placeholder}>Input description here...</em>;
    }

    const parsedJson = safeParseJsonContent(raw);
    const html = generateHtmlFromJson(parsedJson);

    return html ? parse(html) : <span className={style.invalid}>Invalid content</span>;
  };

  const extractAttachmentUrls = (content: JSONContent): string[] => {
    return (
      content.content?.filter((item) => item.type === 'image').map((item) => item.attrs?.src) || []
    );
  };

  const handleSubmit = (content: JSONContent) => {
    const urls = extractAttachmentUrls(content);
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
            initialContent={
              description ? safeParseJsonContent(description) || undefined : undefined
            }
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <button onClick={() => setIsEditing(true)} className={style.description}>
            <div className={style.tipTapPreview}>{renderContent(description)}</div>
          </button>
        )}
      </div>
      <AttachmentSession attachmentUrls={attachmentUrls} />
    </div>
  );
}
