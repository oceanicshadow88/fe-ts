/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineSetting, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsBriefcase } from 'react-icons/bs';
import styles from './Setting.module.scss';
import { deleteProject, showProject, updateProject } from '../../api/projects/projects';
import { IProjectData, IProjectForm } from '../../types';
import { UserContext } from '../../context/UserInfoProvider';
import SettingCard from '../../components/SettingCard/SettingCard';
import ChangeIcon from '../../components/Projects/ProjectEditor/ChangeIcon/ChangeIcon';
import { getUsers } from '../../api/user/user';
import 'react-toastify/dist/ReactToastify.css';
import checkAccess from '../../utils/helpers';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';
import InputV3 from '../../lib/FormV3/InputV3/InputV3';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import Modal from '../../lib/Modal/Modal';
import { useForm } from '../../hooks/Form';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const userInfo = useContext(UserContext);
  const [userList, setUserList] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { formValues, setFormValues, formErrors, handleChange, handleBlur, validateAll } =
    useForm<IProjectForm>(
      {
        name: '',
        key: '',
        projectLead: '',
        description: '',
        websiteUrl: '',
        iconUrl: '',
        owner: ' '
      },
      {
        name: { required: true },
        key: { required: true },
        projectLead: {},
        description: {},
        websiteUrl: {},
        iconUrl: {},
        owner: {}
      }
    );

  const update = (updateData: IProjectData) => {
    setLoading(true);
    updateProject(projectId, updateData)
      .then((res: AxiosResponse) => {
        if (!res.data) {
          return;
        }
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
    const isValid = validateAll();

    if (!isValid) {
      return;
    }

    const copiedData = { ...formValues };
    update(copiedData);
  };

  const uploadSuccess = (photoData: any) => {
    const updateData = { ...formValues };
    updateData.iconUrl = photoData[0].location;
    setFormValues(updateData);
    update({ iconUrl: updateData.iconUrl });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateData = {
      [e.target.name]: e.target.value,
      key: e.target.value.substring(0, 3).toUpperCase()
    };
    setFormValues((prev) => ({ ...prev, ...updateData }));
  };

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
          owner: projectDesc?.owner ?? {},
          iconUrl: projectDesc?.iconUrl ?? ''
        };
        setFormValues(initialData);
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
            <ChangeIcon
              uploadSuccess={uploadSuccess}
              value={formValues}
              loading={!formValues.iconUrl}
            />
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <InputV3
                label="Project Name"
                onValueChanged={handleChangeName}
                onValueBlur={handleBlur('name')}
                value={formValues?.name}
                error={formErrors?.name}
                name="name"
                loading={!formValues}
                dataTestId="projectName"
                required
              />
              <InputV3
                label="Project Key"
                onValueChanged={handleChange('key')}
                onValueBlur={handleBlur('key')}
                value={formValues?.key}
                error={formErrors?.key}
                name="key"
                loading={!formValues}
                dataTestId="projectKey"
                required
              />
            </div>
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              {/* <DropdownV2
                ref={projectLeadRef}
                label="Project Lead"
                dataTestId="projectLead"
                onValueChanged={onChange}
                onValueBlur={() => {}}
                value={formValues?.projectLead}
                placeHolder={
                  userList.find((item) => item.id === formValues?.projectLead)?.name ?? ''
                }
                name="projectLead"
                loading={!formValues}
                options={userList.map((item) => {
                  return {
                    label: item.name,
                    value: item.id
                  };
                })}
                required
              /> */}
              <InputV3
                label="Website Url"
                onValueChanged={handleChange('websiteUrl')}
                onValueBlur={handleBlur('websiteUrl')}
                value={formValues?.websiteUrl}
                error={formErrors?.websiteUrl}
                name="websiteUrl"
                loading={!formValues}
                dataTestId="websiteUrl"
              />
            </div>
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <InputV3
                label="Description"
                onValueChanged={handleChange('description')}
                onValueBlur={handleBlur('description')}
                value={formValues?.description}
                error={formErrors?.description}
                name="description"
                loading={!formValues}
                dataTestId="description"
              />
            </div>
            <ButtonV2
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
