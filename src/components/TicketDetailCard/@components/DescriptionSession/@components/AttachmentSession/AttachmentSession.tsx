import React from 'react';

interface IAttachmentSession {
  attachmentUrls: string[];
}

export default function AttachmentSession({ attachmentUrls }: IAttachmentSession) {
  return (
    <div>
      <h4>Attachments</h4>
      {attachmentUrls?.map((url) => (
        <img
          key={url}
          src={url}
          alt="attachment"
          style={{ width: '100px', height: '100px', marginRight: '10px' }}
        />
      ))}
    </div>
  );
}
