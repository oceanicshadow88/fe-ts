import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectMemberTitle.module.scss';
import InviteMemberFloatForm from '../InviteMemberFloatForm/InviteMemberFloatForm';
import { ModalContext } from '../../../context/ModalProvider';

interface Props {
  projectId: string;
  roles: any;
  onInviteMember: (data: any) => void;
}

export default function ProjectMemberTitle({ projectId, roles, onInviteMember }: Props) {
  const navigate = useNavigate();
  const { showModal } = useContext(ModalContext);

  return (
    <div className={styles.projectMemberHeaderContainer}>
      <div>
        <button
          data-testid="invite-members"
          onClick={() =>
            showModal(
              'invite-member',
              <InviteMemberFloatForm roles={roles} onInviteMember={onInviteMember} />
            )
          }
        >
          Add Member
        </button>
        <button
          data-testid="manage-role-btn"
          onClick={() => navigate(`/projects/${projectId}/roles`)}
        >
          Manage Role
        </button>
      </div>
    </div>
  );
}
