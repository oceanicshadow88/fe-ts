import React, { useEffect, useState } from 'react';

import styles from './ShortcutModal.module.scss';
import ShortcutContent from './ShortcutContent/ShortcutContent';
import AddShortcutButtons from './AddShortcutButtons/AddShortcutButtons';
import EditShortcutButtons from './EditShortcutButtons/EditShortcutButtons';
import { createShortcut, updateShortcut } from '../../../api/shortcut/shortcut';
import { IShortcutData } from '../../../types';

interface IOperation {
  operation: string;
  addLinkToggle: boolean;
  setAddLinkToggle: (addLinkToggle: boolean) => void;
  shortCutAdded: (data: IShortcutData) => void;
  shortCutUpdated: () => void;
  selectedLink: IShortcutData | null;
  currentProjectId: string;
}

export default function ShortcutModal({
  operation,
  setAddLinkToggle,
  addLinkToggle,
  selectedLink,
  currentProjectId,
  shortCutAdded,
  shortCutUpdated
}: IOperation) {
  const [webValue, setWebValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(true);

  function validURL(str: string) {
    // Used from https://www.geeksforgeeks.org/check-if-an-url-is-valid-or-not-using-regular-expression/
    const pattern = new RegExp(
      '((http|https)://)(www.)?' +
        '[a-zA-Z0-9@:%._\\+~#?&//=]' +
        '{2,256}\\.[a-z]' +
        '{2,6}\\b([-a-zA-Z0-9@:%' +
        '._\\+~#?&//=]*)'
    ); // fragment locator
    return !!pattern.test(str);
  }

  useEffect(() => {
    setIsUrlValid(!validURL(webValue));
  }, [webValue]);

  useEffect(() => {
    setWebValue(selectedLink?.shortcutLink ?? '');
    setNameValue(selectedLink?.name ?? '');
  }, [selectedLink]);

  const onClickAddShortcut = () => {
    createShortcut(currentProjectId, { name: nameValue, shortcutLink: webValue }).then((res) => {
      shortCutAdded(res.data);
    });
  };

  const onClickUpdateShortcut = () => {
    if (selectedLink?.id !== undefined)
      updateShortcut(currentProjectId, selectedLink?.id, {
        name: nameValue,
        shortcutLink: webValue
      }).then(() => {
        shortCutUpdated();
      });
  };

  return (
    <div>
      <div>
        <div className={styles.dialog}>
          <ShortcutContent
            operation={operation}
            setWebValue={setWebValue}
            setNameValue={setNameValue}
            webValue={webValue}
            value={nameValue}
            isUrlValid={isUrlValid}
          />
          {
            {
              Add: (
                <AddShortcutButtons
                  setAddLinkToggle={setAddLinkToggle}
                  addLinkToggle={addLinkToggle}
                  webValue={webValue}
                  nameValue={nameValue}
                  onClickAddShortcut={onClickAddShortcut}
                  isUrlValid={isUrlValid}
                />
              ),
              Edit: (
                <EditShortcutButtons
                  setAddLinkToggle={setAddLinkToggle}
                  addLinkToggle={addLinkToggle}
                  onClickUpdateShortcut={onClickUpdateShortcut}
                />
              )
            }[operation]
          }
        </div>
      </div>
    </div>
  );
}
