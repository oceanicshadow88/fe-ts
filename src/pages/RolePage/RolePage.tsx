import React, { useState, useEffect, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import ProjectHeader from '../../components/Projects/ProjectHeader/ProjectHeader';
import RoleTable from './RoleTable/RoleTable';
import PermissionSelector from './PermissionSelector/PermissionSelector';
import AddRoleBtn from './AddRoleBtn/AddRoleBtn';
import { IPermissions, IRole } from '../../types';
import { getRoles, addRole, updateRole, deleteRole, getPermissions } from '../../api/role/role';
import styles from './RolePage.module.scss';
import RoleNav from './RoleNav/roleNav';
import { ModalContext } from '../../context/ModalProvider';

function RolePage() {
  const [loader, setLoader] = useState(false);
  const { projectId = '' } = useParams();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [permissions, setPermissions] = useState<IPermissions[]>([]);
  const { showModal, closeModal } = useContext(ModalContext);

  const fetchRoles = useCallback(async () => {
    try {
      setLoader(true);
      const res = await getRoles(projectId);
      setRoles(res);
    } catch (err) {
      setLoader(false);
      toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
    } finally {
      setLoader(false);
    }
  }, [projectId]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPermissions();
        setPermissions(res);
      } catch (err) {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      }
    })();
    fetchRoles();
  }, [fetchRoles]);

  const submitEditHandler = async (
    role: string,
    newPermissions: Array<string>,
    newRole: boolean
  ) => {
    try {
      setLoader(true);
      if (newRole) {
        await addRole(projectId, role, newPermissions);
      } else {
        await updateRole(projectId, role, newPermissions);
      }
    } catch (err) {
      setLoader(false);
      toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
    } finally {
      fetchRoles();
    }
  };

  const newRoleHandler = () => {
    showModal(
      'selectedRole',
      <PermissionSelector
        isNewRole
        submitRoleHandler={submitEditHandler}
        closeHandler={() => closeModal('selectedRole')}
        permissions={permissions}
      />
    );
  };

  const onEditRole = async (role: IRole) => {
    showModal(
      'selectedRole',
      <PermissionSelector
        submitRoleHandler={submitEditHandler}
        closeHandler={() => closeModal('selectedRole')}
        permissions={permissions}
        role={role}
      />
    );
    // const Role = await getRoleById(projectId, roleId);
    // setEditRole(roleId);
    // setSelectedRole(Role);
    // setOpenEdit(true);
  };

  const deleteRoleHanlder = async (roleId: string) => {
    try {
      setLoader(true);
      await deleteRole(projectId, roleId);
    } catch (err) {
      setLoader(false);
      toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
    } finally {
      fetchRoles();
    }
  };

  return (
    <div className={[styles['page-container']].join(' ')}>
      <ProjectHeader />
      <div className={styles['main-container']}>
        <RoleNav />
        <div className={styles['header-container']}>
          <h1>Manage Roles</h1>
          <AddRoleBtn addRole={newRoleHandler} />
        </div>
        {loader ? (
          <Loading />
        ) : (
          <RoleTable roles={roles} onEditRole={onEditRole} deleteRole={deleteRoleHanlder} />
        )}
      </div>
    </div>
  );
}

export default RolePage;
