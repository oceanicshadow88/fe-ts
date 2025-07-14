/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineSetting, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsBriefcase } from 'react-icons/bs';
import styles from './Setting.module.scss';
import { deleteProject, showProject, updateProject } from '../../api/projects/projects';
import { IMinEvent, IProjectData, IProjectEditor } from '../../types';
import { UserContext } from '../../context/UserInfoProvider';
import SettingCard from '../../components/SettingCard/SettingCard';
import ChangeIcon from '../../components/Projects/ProjectEditor/ChangeIcon/ChangeIcon';
import { getUsers } from '../../api/user/user';
import 'react-toastify/dist/ReactToastify.css';
import checkAccess from '../../utils/helpers';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';
import DropdownV2 from '../../lib/FormV2/DropdownV2/DropdownV2';
import InputV2, { InputV2Handle } from '../../lib/FormV2/InputV2/InputV2';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import Modal from '../../lib/Modal/Modal';

const subMenuItem = (projectId: string) => {
  return {
    planning: [
      {
        name: 'Project Details',
        url: `/settings/${projectId}`,
        icon: <AiOutlineSetting />,
        dataTestId: 'preference',
        active: true
      },
      {
        name: 'Project members',
        checkAccess: 'view:members',
        url: `/projects/${projectId}/members`,
        icon: <BsBriefcase />,
        dataTestId: 'project-members'
      }
    ],
    dailyScrumBtn: [
      {
        name: 'Custom Fields (WIP)',
        url: `/custom-fields/${projectId}`,
        icon: <AiOutlineUnorderedList />,
        dataTestId: 'custom-fields'
      }
    ]
  };
};

export default function Setting() {
  const navigate = useNavigate();
  const { projectId = '' } = useParams();
  const [originalData, setOriginalData] = useState<IProjectEditor | null>(null);
  const [data, setData] = useState<IProjectEditor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const userInfo = useContext(UserContext);
  const [userList, setUserList] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const nameRef = useRef<InputV2Handle>(null);
  const projectKeyRef = useRef<InputV2Handle>(null);
  const webUrlRef = useRef<InputV2Handle>(null);
  const descriptionRef = useRef<InputV2Handle>(null);

  useEffect(() => {
    if (Object.keys(userInfo).length === 0 || !userInfo) {
      return;
    }
    const token = userInfo?.token;
    if (!token) {
      return;
    }
    showProject(projectId)
      .then((res) => {
        const projectDesc = res?.data;
        const initialData = {
          name: projectDesc?.name ?? '',
          key: projectDesc?.key ?? '',
          projectLead: projectDesc?.projectLead?.id ?? '',
          description: projectDesc?.description ?? '',
          websiteUrl: projectDesc?.websiteUrl ?? '',
          owner: projectDesc?.owner ?? {}
        };
        setOriginalData(initialData);
        setData(initialData);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          navigate('/unauthorize');
        }
      });
  }, [projectId, userInfo.token, userInfo]);

  useEffect(() => {
    const getUsersList = async () => {
      if (userList.length === 0) {
        const res = await getUsers();
        setUserList(res.data);
      }
    };
    getUsersList();
  }, [userList]);

  const update = (updateData: IProjectData) => {
    setLoading(true);
    updateProject(projectId, updateData)
      .then((res: AxiosResponse) => {
        if (!res.data) {
          return;
        }
        setOriginalData(data);
        toast.success('Your profile has been successfully updated', {
          theme: 'colored',
          className: 'primaryColorBackground'
        });
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onClickSave = () => {
    const isNameValid = nameRef.current?.validate() ?? false;
    const isProjectKeyValid = projectKeyRef.current?.validate() ?? false;
    const isWebUrlValid = webUrlRef.current?.validate() ?? false;
    const isDescriptionValid = descriptionRef.current?.validate() ?? false;

    if (!isNameValid || !isProjectKeyValid || !isWebUrlValid || !isDescriptionValid) {
      return;
    }

    if (JSON.stringify(data) === JSON.stringify(originalData)) {
      return;
    }

    const copiedData = { ...data };
    update(copiedData);
  };

  const uploadSuccess = (photoData: any) => {
    const updateData = { ...data };
    updateData.iconUrl = photoData[0].location;
    setData(updateData);
    update({ iconUrl: updateData.iconUrl });
  };

  const onChange = (e: IMinEvent) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateData = {
      [e.target.name]: e.target.value,
      key: e.target.value.substring(0, 3).toUpperCase()
    };

    setData({ ...data, ...updateData });
  };

  return (
    <div className={[styles.settingPage, 'relative'].join(' ')} data-testid="setting-page">
      <MainMenuV2 />
      <SubSettingMenu items={subMenuItem(projectId)} />
      <div className={styles.settingContainer}>
        <div className={styles.settingMiniContainer}>
          <header>
            <h1 className={styles.headerText}>Project Settings</h1>
            <hr className={styles.divider} />
          </header>
          <SettingCard title="Project Information">
            <ChangeIcon uploadSuccess={uploadSuccess} value={data?.iconUrl} loading={!data} />
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <InputV2
                ref={nameRef}
                label="Project Name"
                onValueChanged={onChangeName}
                onValueBlur={() => {}}
                value={data?.name}
                defaultValue={data?.name}
                name="name"
                loading={!data}
                dataTestId="projectName"
                required
              />
              <InputV2
                ref={projectKeyRef}
                label="Project Key"
                onValueChanged={onChange}
                onValueBlur={() => {}}
                value={data?.key}
                defaultValue={data?.key}
                name="key"
                loading={!data}
                dataTestId="projectKey"
                required
              />
            </div>
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <DropdownV2
                label="Project Lead"
                dataTestId="projectLead"
                onValueChanged={onChange}
                onValueBlur={() => {}}
                value={data?.projectLead}
                placeHolder={userList.find((item) => item.id === data?.projectLead)?.name ?? ''}
                name="projectLead"
                loading={!data}
                options={userList.map((item) => {
                  return {
                    label: item.name,
                    value: item.id
                  };
                })}
                required
              />
              <InputV2
                ref={webUrlRef}
                label="Website Url"
                onValueChanged={onChange}
                onValueBlur={() => {}}
                value={data?.websiteUrl}
                defaultValue={data?.websiteUrl}
                name="websiteUrl"
                loading={!data}
                dataTestId="websiteUrl"
              />
            </div>
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <InputV2
                ref={descriptionRef}
                label="Description"
                onValueChanged={onChange}
                onValueBlur={() => {}}
                value={data?.description}
                defaultValue={data?.description}
                name="description"
                loading={!data}
                dataTestId="description"
              />
            </div>
            <ButtonV2
              disabled={JSON.stringify(data) === JSON.stringify(originalData)}
              text="SAVE CHANGES"
              onClick={onClickSave}
              loading={loading}
              dataTestId="projectUpdateBtn"
            />
          </SettingCard>
          {checkAccess('delete:projects', projectId) && (
            <SettingCard title="Delete Project">
              <p className={styles.p}>
                Delete your project and all of your source data. This is irreversible.
              </p>
              <ButtonV2
                text="DELETE"
                danger
                size="xs"
                dataTestId="delete-project"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              />
            </SettingCard>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <Modal classesName={styles.modal}>
          <p>Are you sure you want to delete the project?</p>
          <div className={styles.modalBtn}>
            <ButtonV2
              text="Confirm"
              danger
              dataTestId="confirm-delete"
              onClick={() => {
                setSubmitting(true);
                deleteProject(projectId)
                  .then(() => {
                    toast.success('Project has been deleted', {
                      theme: 'colored',
                      className: 'primaryColorBackground'
                    });
                    navigate('/projects');
                  })
                  .catch(() => {
                    toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              }}
              disabled={submitting}
            />
            <ButtonV2
              text="Cancel"
              fill
              dataTestId="cancel-delete"
              onClick={() => {
                setShowDeleteModal(false);
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
