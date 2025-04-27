import React, { useState } from 'react';

import { HiDotsHorizontal } from 'react-icons/hi';
import { RiEditLine } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';
import styles from './RoleTable.module.scss';
import PermissionIndicator from '../PermissionIndicator/PermissionIndicator';

import { IRole } from '../../../types';

interface IRoleTable {
  roles: IRole[];
  onEditRole: (role: IRole) => void;
  deleteRole: (roleId: string) => void;
}

const defaultTemplete = [
  {
    slug: 'create',
    isActive: false
  },
  {
    slug: 'view',
    isActive: false
  },
  {
    slug: 'edit',
    isActive: false
  },
  {
    slug: 'delete',
    isActive: false
  }
];

const seperationHandler = (operation: string, newPermissions: Array<any>) => {
  const filterPermissions = newPermissions
    .filter((permission) => {
      const seperation = permission.slug.split(':');
      return seperation[1] === operation;
    })
    .map((el) => el.slug.split(':')[0]);

  return defaultTemplete.map((el) => {
    const res = filterPermissions.indexOf(el.slug);
    if (res === -1) return { ...el };
    return { ...el, isActive: true };
  });
};

const indicatorsGenerator = (operation: string, newPermissions: Array<any>) => {
  return seperationHandler(operation, newPermissions).map((el) => {
    return (
      <PermissionIndicator key={el.slug} isPermissionAllowed={el.isActive} content={el.slug} />
    );
  });
};

function RoleTable(props: IRoleTable) {
  const { roles, onEditRole, deleteRole } = props;
  const [selectRole, setSelectRole] = useState('');

  const operationList = [
    'projects',
    'boards',
    'members',
    'roles',
    'shortcuts',
    'tickets',
    'settings'
  ];

  const openMoreHandler = (e) => {
    setSelectRole(e.target.value);
  };

  // const editRoleHandler = (role: IRole) => {
  //   editRole(selectRole);
  //   setSelectRole('');

  // };

  const deleteRoleHandler = () => {
    deleteRole(selectRole);
    setSelectRole('');
  };

  return (
    <table data-testid="role-table" className={styles['roles-table-container']}>
      <thead>
        <tr className={styles['role-header']}>
          <th>Roles</th>
          {operationList.map((el) => {
            return <th key={el}>{el}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => {
          return (
            <tr className={styles['role-body']} key={role.id}>
              <th className={styles.permissions}>{role.name}</th>
              {operationList.map((el) => {
                return (
                  <th key={el} className={styles.permissions}>
                    <div className={styles['default-status']}>
                      {indicatorsGenerator(el, role.permissions)}
                    </div>
                  </th>
                );
              })}
              <th data-testid="more-btn" className={styles['moreBtn-container']}>
                <button className={styles.moreBtn} value={role.id} onMouseEnter={openMoreHandler}>
                  <HiDotsHorizontal color="#0052cc" size="20px" />
                </button>
                <ul data-testid="more-list" className={styles['drop-down']}>
                  <li>
                    <button
                      data-testid="edit-btn"
                      onClick={() => onEditRole(role)}
                      className={styles.editBtn}
                    >
                      <RiEditLine color="white" size="20px" />
                    </button>
                  </li>
                  {role.allowDelete && (
                    <li>
                      <button onClick={deleteRoleHandler} className={styles.cancelBtn}>
                        <ImCancelCircle color="white" size="20px" />
                      </button>
                    </li>
                  )}
                </ul>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default RoleTable;
