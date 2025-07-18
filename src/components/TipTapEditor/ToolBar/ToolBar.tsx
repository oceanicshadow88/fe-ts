import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { FaMagic } from 'react-icons/fa';
import style from './ToolBar.module.scss';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';

export interface IToolbarButton {
  label: string;
  onClick: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  icon?: React.ReactNode;
}

export interface IButtonGroup {
  label: string;
  buttons: IToolbarButton[];
  icon?: JSX.Element;
}

interface IToolbarProps {
  editor: Editor | null;
  groups?: IButtonGroup[];
  onAiButtonClick?: () => void;
  loading?: boolean;
}

function Toolbar({ editor, groups = [], onAiButtonClick, loading }: IToolbarProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  if (!editor) {
    return null;
  }

  const toggleDropdown = (groupLabel: string) => {
    setOpenGroup((prev) => (prev === groupLabel ? null : groupLabel));
    setVisible(true);
  };

  const handleButtonClick = (toolbarEditor: Editor, button: IToolbarButton) => {
    button.onClick(toolbarEditor);
    setOpenGroup(null);
    setVisible(false);
  };

  return (
    <div className={style.toolbar} ref={myRef}>
      {groups.map((group) => (
        <div key={group.label} className={style.dropdownGroup}>
          <button
            className={style.dropdownToggle}
            onClick={() => toggleDropdown(group.label)}
            title={group.label}
          >
            {group.icon && React.isValidElement(group.icon) ? group.icon : null}
          </button>

          {visible && openGroup === group.label && (
            <div className={style.dropdownMenu}>
              {group.buttons.map((button) => (
                <button
                  key={button.label}
                  onClick={() => handleButtonClick(editor, button)}
                  className={button.isActive(editor) ? 'active' : ''}
                  title={button.label}
                >
                  {button.icon || button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {onAiButtonClick && (
        <button onClick={onAiButtonClick} disabled={loading} title="AI Optimize">
          <FaMagic color={loading ? '#aaa' : '#007bff'} size={20} />
        </button>
      )}
    </div>
  );
}
export default Toolbar;
