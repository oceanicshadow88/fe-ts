/* eslint-disable no-console */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GoTrash } from 'react-icons/go';
import { FiEdit } from 'react-icons/fi';
import styles from './DraggableRetroItem.module.scss';
import checkAccess from '../../../../utils/helpers';
import { Permission } from '../../../../utils/permission';
import { IRetroItem } from '../../../../types';
import InlineEditor from '../../../../components/InlineEditor/InlineEditor';
import { useForm } from '../../../../hooks/Form';

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

  const { formValues, formErrors, handleFieldChange } = useForm<{
    description: string;
  }>({
    description: {
      label: 'Description',
      value: item.content,
      rules: { required: true, limit: 225 }
    }
  });

  const isEdit = currentEditId === item.id;

  const handleClose = () => {
    setCurrentEditId(null);
  };

  const handleSave = () => {
    const isContentUpdated = item.content !== formValues.description;
    const isValid = !formErrors.description;
    if (isContentUpdated && isValid) {
      onUpdateItem(item.id, { ...item, content: formValues.description });
    }
    setCurrentEditId(null);
  };

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided2) => {
        return (
          <div
            ref={provided2.innerRef}
            /* eslint-disable react/jsx-props-no-spreading */
            {...provided2.draggableProps}
            {...provided2.dragHandleProps}
            aria-hidden="true"
            data-testid={`ticket-${item.id}`}
            className={styles.card}
          >
            <div className={styles.cursorPointerSection}>
              {isEdit ? (
                <InlineEditor
                  name="description"
                  defaultValue={formValues.description}
                  onValueChanged={handleFieldChange}
                  onClose={handleClose}
                  onSave={handleSave}
                  errorMsg={formErrors.description ?? ''}
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
                      <FiEdit size={14} />
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
          </div>
        );
      }}
    </Draggable>
  );
}
