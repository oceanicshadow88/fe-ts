import React, { useEffect, useState } from 'react';
import { generateHTML, JSONContent } from '@tiptap/core';
import Mention from '@tiptap/extension-mention';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';
import parse from 'html-react-parser';
import TipTapEditor from '../../../TipTapEditor/TipTapEditor';
import {
  createComment,
  deleteComment,
  getComment,
  updateComment
} from '../../../../api/comment/comment';
import { IUserInfo } from '../../../../types';
import checkAccess from '../../../../utils/helpers';
import Avatar from '../../../Avatar/Avatar';
import TimeAgo from '../../../TimeAgo/TimeAgo';
import style from './CommentsSession.module.scss';
import { Permission } from '../../../../utils/permission';

interface ICommentsSessionProps {
  userId?: string;
  users: IUserInfo[];
  ticketId?: string;
  projectId: string;
}

interface IComment {
  content: string;
  createdAt: string;
  id: string;
  sender: IUserInfo;
  ticket: string;
  updatedAt: string;
  _v: number;
}

function CommentsSession(Props: ICommentsSessionProps) {
  const { userId = '', ticketId = '', users = [], projectId = '' } = Props;
  const [comments, setComments] = useState<IComment[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const fetchCommentsData = async () => {
    const result = await getComment(ticketId);
    setComments(result.data);
  };

  useEffect(() => {
    fetchCommentsData();
  }, [ticketId]);

  const handleSubmit = async (content: JSONContent, commentId?: string) => {
    const stringifiedContent = JSON.stringify(content);

    const saveActions = {
      create: () =>
        createComment({ ticket: ticketId, sender: userId, content: stringifiedContent }),
      update: () => updateComment(commentId as string, stringifiedContent)
    };

    const action = commentId ? 'update' : 'create';
    await saveActions[action]();

    fetchCommentsData();
    setIsEditing(false);
  };

  const handleDelete = async (id?: string) => {
    if (!id) {
      return;
    }
    await deleteComment(id);
    fetchCommentsData();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditSubmit = (content: JSONContent, commentId?: string) => {
    if (commentId) {
      handleSubmit(content, commentId);
    }
    setEditingCommentId(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const renderCommentContent = (content: string) => {
    try {
      const jsonContent: JSONContent = JSON.parse(content);
      const html = generateHTML(jsonContent, [StarterKit, ImageResize, Mention]);
      const fixedHtml = html.replace(/<p>/g, '<span>').replace(/<\/p>/g, '</span>');
      return parse(fixedHtml);
    } catch (error) {
      return parse('<p>Invalid content</p>');
    }
  };

  const renderCommentsList = () => {
    return (
      <div className={style.container}>
        {comments.map((comment) => (
          <div key={comment.id} className={style.commentItem}>
            <div className={style.commentsUser}>
              <div className={style.commentsUserInfo}>
                <Avatar user={comment.sender} />
                <span>{comment.sender?.name}</span>
              </div>
              <TimeAgo date={comment.createdAt} className={style.timeAgo} />
            </div>

            {editingCommentId === comment.id ? (
              <div className="comment-editor-wrapper">
                <TipTapEditor
                  onSubmit={(content) => handleEditSubmit(content, comment.id)}
                  onCancel={handleCancelEdit}
                  initialContent={JSON.parse(comment.content)}
                  users={users}
                  aiOptimizeAction="optimizeText"
                />
              </div>
            ) : (
              <>
                <div className={style.commentsContent}>{renderCommentContent(comment.content)}</div>
                {checkAccess(Permission.EditTickets, projectId) && (
                  <div className={style.commentsButtons}>
                    <button onClick={() => setEditingCommentId(comment.id)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(comment.id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {checkAccess(Permission.AddComments, projectId) &&
        (isEditing ? (
          <TipTapEditor
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            users={users}
            aiOptimizeAction="optimizeText"
          />
        ) : (
          <button className={style.commentInputDisactive} onClick={() => setIsEditing(true)}>
            Input comments here...
          </button>
        ))}
      {checkAccess(Permission.EditTickets, projectId) && renderCommentsList()}
    </>
  );
}

export default CommentsSession;
