import React, { useContext, useState } from 'react';
import styles from './InviteMemberFloatForm.module.scss';
import { IRole } from '../../../types';
import { ModalContext } from '../../../context/ModalProvider';
import DropdownV2 from '../../../lib/FormV2/DropdownV2/DropdownV2';

interface Props {
  roles: IRole[];
  onInviteMember: (data) => void;
}

export default function InviteMemberFloatForm({ roles, onInviteMember }: Props) {
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState();
  const { closeModal } = useContext(ModalContext);

  return (
    <div className={styles.InviteMemberFloatFormContainer}>
      <form action="">
        <h1>Invite Member</h1>
        <div className={styles.content}>
          <p>Email</p>
          <input
            placeholder="e.g. www.example@gmail.com"
            data-testid="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.content}>
          <DropdownV2
            label="Role"
            name="role"
            data-testid="dropdown-role"
            onValueChanged={(e: any) => setRoleId(e.target.value)}
            value={roleId}
            options={roles.map((item) => {
              return {
                value: item.id,
                label: item.name ?? ''
              };
            })}
          />
        </div>
        <div className={styles.buttonList}>
          <button type="button" onClick={() => closeModal('invite-member')}>
            Cancel
          </button>
          <button
            type="button"
            data-testid="add-button"
            onClick={() => {
              onInviteMember({ email, roleId });
              closeModal('invite-member');
            }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
