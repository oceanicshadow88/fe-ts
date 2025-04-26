import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProjectMemberPage.module.scss';
import ProjectMemberTitle from './ProjectMemberTitle/ProjectMemberTitle';
import ProjectMemberMain from './ProjectMemberMain/ProjectMemberMain';
import { IUserInfo, IRole } from '../../types';
import Loading from '../../components/Loading/Loading';
import { getMembers, updateMemberRole, removeMember, inviteMember } from '../../api/member/member';
import { getRoles } from '../../api/role/role';
import ProjectHOC from '../../components/HOC/ProjectHOC';

export default function ProjectMembersPage() {
  const { projectId = '' } = useParams();
  const [members, setMembers] = useState<IUserInfo[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const fetchMembers = useCallback(async () => {
    try {
      setLoadingStatus(true);
      const res = await getMembers(projectId);
      setMembers(res.data);
    } catch (e) {
      setMembers([]);
    } finally {
      setLoadingStatus(false);
    }
  }, [projectId]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingStatus(true);
        const res = await getRoles(projectId);
        setRoles(res);
      } catch (e) {
        setMembers([]);
      } finally {
        setLoadingStatus(false);
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
        {loadingStatus ? (
          <Loading />
        ) : (
          <ProjectMemberMain
            members={members}
            roles={roles}
            onChangeProjectRole={onChangeProjectRole}
            onClickRemove={onClickRemove}
          />
        )}
      </div>
    </ProjectHOC>
  );
}
