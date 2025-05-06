import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProjectMemberPage.module.scss';
import ProjectMemberTitle from './ProjectMemberTitle/ProjectMemberTitle';
import ProjectMemberMain from './ProjectMemberMain/ProjectMemberMain';
import { IUserInfo, IRole } from '../../types';
import { getMembers, updateMemberRole, removeMember, inviteMember } from '../../api/member/member';
import { getRoles } from '../../api/role/role';
import ProjectHOC from '../../components/HOC/ProjectHOC';
import { getOwner } from '../../utils/helpers';

export default function ProjectMembersPage() {
  const { projectId = '' } = useParams();
  const [members, setMembers] = useState<IUserInfo[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [owner, setOwner] = useState<IUserInfo | null>(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const ownerInfo = await getOwner(projectId);
        setOwner(ownerInfo);
      } catch (e) {
        // how we handle this error?
      }
    };
    fetchOwner();
  }, [projectId]);

  const fetchMembers = useCallback(async () => {
    try {
      const res = await getMembers(projectId);
      setMembers(res.data);
    } catch (e) {
      setMembers([]);
    }
  }, [projectId]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoles(projectId);
        setRoles(res);
      } catch (e) {
        // why we not setRoles([])????
        setMembers([]);
      }
    };
    fetchRoles();
    fetchMembers();
  }, [projectId, fetchMembers]);

  const onChangeProjectRole = async (e: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
    const roleId = e.target.value;

    const res = await updateMemberRole(roleId, userId, projectId);
    if (res.data) {
      await fetchMembers();
    }
  };

  const onClickRemove = async (userId: string) => {
    const res = await removeMember(userId, projectId);
    if (res.data) {
      await fetchMembers();
    }
  };

  const onInviteMember = async (data) => {
    const res = await inviteMember(data.email, data.roleId, projectId);
    if (res.data) {
      await fetchMembers();
    }
  };

  return (
    <ProjectHOC title="Access">
      <div className={styles.projectMemberMain}>
        <ProjectMemberTitle projectId={projectId} roles={roles} onInviteMember={onInviteMember} />
        <ProjectMemberMain
          owner={owner}
          members={members}
          roles={roles}
          onChangeProjectRole={onChangeProjectRole}
          onClickRemove={onClickRemove}
        />
      </div>
    </ProjectHOC>
  );
}
