import React, { useState } from 'react';
import { IPermissions, IRole } from '../../../types';
import styles from './PermissionSelector.module.scss';
import SelectorIndicator from '../SelectorIndicator/SelectorIndicator';

interface IProps {
  isNewRole?: boolean;
  submitRoleHandler: (role: string, permissions: Array<string>, newRole: boolean) => void;
  closeHandler: () => void;
  permissions: IPermissions[];
  role?: IRole;
}

function PermissionSelector(props: IProps) {
  const { isNewRole = false, submitRoleHandler, closeHandler, permissions, role } = props;
  const [roleName, setRoleName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorActive, setErrorActive] = useState(false);

  const operationList = [
    'projects',
    'boards',
    'members',
    'roles',
    'shortcuts',
    'tickets',
    'settings'
  ];

  const defaultFormat = (operation: string, defaultPermissions: Array<any>) => {
    return defaultPermissions
      .filter((permission) => {
        const seperation = permission?.slug.split(':');
        return seperation[1] === operation;
      })
      .map((el) => {
        return (
          <SelectorIndicator
            key={el.id}
            isChecked={false}
            permission={el}
            disabled={role?.isPublic ?? false}
          />
        );
      });
  };

  const operationFilter = (
    operation: string,
    defaultPermissions: Array<IPermissions>,
    selectedPermissions: Array<IPermissions>
  ) => {
    const permissionForm = defaultPermissions.filter((permission) => {
      const seperation = permission?.slug.split(':');
      return seperation[1] === operation;
    });

    const seletedForm = selectedPermissions
      .filter((permission) => {
        const seperation = permission?.slug.split(':');
        return seperation[1] === operation;
      })
      .map((el) => el.id);
    return permissionForm.map((el) => {
      if (seletedForm.indexOf(el.id) === -1)
        return (
          <SelectorIndicator
            key={el.id}
            isChecked={false}
            permission={el}
            disabled={role?.isPublic ?? false}
          />
        );
      return (
        <SelectorIndicator
          key={el.id}
          isChecked
          permission={el}
          disabled={role?.isPublic ?? false}
        />
      );
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const view = event.target.elements;

    const updatedPermissions = Array.prototype.filter
      .call(view, (input) => input.checked)
      .map((input) => input.id);

    if (updatedPermissions.length === 0) {
      setErrorActive(true);
      setErrorMsg('Please select at least one permission!!!');
      return;
    }

    submitRoleHandler(isNewRole ? roleName : role?.id ?? '', updatedPermissions, isNewRole);
  };

  return (
    <div data-testid="permission-selector" className={styles['popup-container']}>
      <form
        onSubmit={submitHandler}
        onChange={() => {
          setErrorActive(false);
        }}
        className={styles['form-container']}
      >
        <div>{isNewRole ? <h1>Add New Role</h1> : <h1>Edit Permissions</h1>}</div>
        {isNewRole && (
          <label htmlFor="roleName" className={styles['roleName-container']}>
            <p>Role name:</p>
            <input
              data-testid="role-input"
              name="roleName"
              onChange={(e) => {
                setRoleName(e.target.value);
              }}
            />
          </label>
        )}
        <div>
          {operationList.map((el) => {
            return (
              <div key={el} className={styles['operation-container']}>
                <p>{`${el}:`}</p>
                <div className={styles['permission-container']}>
                  {isNewRole
                    ? defaultFormat(el, permissions)
                    : operationFilter(el, permissions, role?.permissions ?? [])}
                </div>
              </div>
            );
          })}
        </div>
        {errorActive && (
          <div className={styles['err-msg-container']}>
            <p>{errorMsg}</p>
          </div>
        )}

        <div className={styles.btnContainer}>
          {!role?.isPublic && (
            <input
              data-testid="submit-btn"
              type="submit"
              value="Submit"
              className={`${styles.btn} ${styles.add}`}
            />
          )}
          <input
            type="button"
            value="Close"
            onClick={closeHandler}
            className={`${styles.btn} ${styles.cancel}`}
          />
        </div>
      </form>
    </div>
  );
}

export default PermissionSelector;
