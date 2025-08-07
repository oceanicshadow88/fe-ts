import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GoTrash } from 'react-icons/go';
import { FiEdit } from 'react-icons/fi';
import styles from './DraggableRetroItem.module.scss';
import checkAccess from '../../../../utils/helpers';
import { Permission } from '../../../../utils/permission';
import InlineEditor from '../../../../lib/FormV2/InlineEditor/InlineEditor';
import { IRetroItem } from '../../../../types';

interface IDraggableBoardCard {
  currentEditId: string | null;
  setCurrentEditId: (currentEditId: string | null) => void;
  item: IRetroItem;
  index: number;
  projectId: string;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, data: IRetroItem) => void;
  draggableId: string;
}

export default function DraggableRetroItem(props: IDraggableBoardCard) {
  const {
    currentEditId,
    setCurrentEditId,
    item,
    index,
    onRemoveItem,
    onUpdateItem,
    projectId,
    draggableId
  } = props;

  const isEdit = currentEditId === item.id;

  const handleDestroy = () => {
    setCurrentEditId(null);
  };

  const handleSave = (content: string) => {
    onUpdateItem(item.id, { ...item, content });
    setCurrentEditId(null);
  };

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided2) => {
        return (
          <div
            className={styles.card}
            ref={provided2.innerRef}
            /* eslint-disable react/jsx-props-no-spreading */
            {...provided2.dragHandleProps}
            {...provided2.draggableProps}
            aria-hidden="true"
            data-testid={`ticket-${item.id}`}
          >
            {isEdit ? (
              <InlineEditor
                onClose={handleDestroy}
                onDestroy={handleDestroy}
                onSave={handleSave}
                defaultValue={item.content}
                dataTestId={`retro-item-editor-${item.id}`}
              />
            ) : (
              <span className={styles.editorContainer}>
                <p>
                  {item.content}
                  <button
                    aria-label="Edit"
                    data-testid={`update-retro-item-${item.id}`}
                    type="button"
                    className={[styles.iconBtn, styles.editBtn].join(' ')}
                    onClick={() => setCurrentEditId(item.id)}
                  >
                    <FiEdit size={14} style={{ margin: 'auto' }} />
                  </button>
                </p>
              </span>
            )}

            {checkAccess(Permission.DeleteRetro, projectId) && !isEdit && (
              <div className={styles.deleteBtnContainer}>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => onRemoveItem(item.id)}
                >
                  <GoTrash
                    size={16}
                    data-testid={`delete-retro-item-${item.id}`}
                    aria-label="Delete"
                  />
                </button>
              </div>
            )}
          </div>
        );
      }}
    </Draggable>
  );
}
