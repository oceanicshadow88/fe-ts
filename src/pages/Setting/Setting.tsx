import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineSetting, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsBriefcase } from 'react-icons/bs';
import styles from './Setting.module.scss';
import { deleteProject, showProject, updateProject } from '../../api/projects/projects';
import { IMinEvent, IProjectData, IProjectForm } from '../../types';
import { UserContext } from '../../context/UserInfoProvider';
import SettingCard from '../../components/SettingCard/SettingCard';
import EditableAvatar from '../../components/EditableAvatar/EditableAvatar';
import { getUsers } from '../../api/user/user';
import 'react-toastify/dist/ReactToastify.css';
import checkAccess from '../../utils/helpers';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';
import InputV3 from '../../lib/FormV3/InputV3/InputV3';
import SubSettingMenu from '../../lib/SubSettingMenu/SubSettingMenu';
import Modal from '../../lib/Modal/Modal';
import { useForm } from '../../hooks/Form';
import DropdownV3 from '../../lib/FormV3/DropdownV3/DropdownV3';

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
  const userInfo = useContext(UserContext);

  const [userList, setUserList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [originalData, setOriginalData] = useState<IProjectForm | null>(null);

  const {
    formValues,
    setFormValues,
    formFields,
    formErrors,
    handleFieldChange,
    handleFieldBlur,
    validateAll
  } = useForm<IProjectForm>({
    name: { label: 'Project Name', value: '', rules: { required: true } },
    key: { label: 'Project Key', value: '', rules: { required: true } },
    projectLead: {
      label: 'Project Lead',
      value: '',
      rules: { required: true }
    },
    description: { label: 'Description', value: '' },
    websiteUrl: { label: 'Website Url', value: '' },
    iconUrl: { value: '' }
  });

  const updateFormData = (updateData: IProjectData) => {
    setLoading(true);
    updateProject(projectId, updateData)
      .then((res: AxiosResponse) => {
        if (!res || !res.data) {
          return;
        }
        setOriginalData(formValues);
        toast.success('Your profile has been successfully updated', {
          theme: 'colored',
          className: 'primaryColorBackground'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickSave = () => {
    const isValid = validateAll();
    const isFormUpdated = JSON.stringify(formValues) !== JSON.stringify(originalData);

    if (!isValid || !isFormUpdated) {
      return;
    }

    const copiedData = { ...formValues };
    updateFormData(copiedData);
  };

  const handleUploadSuccess = (photoData: any) => {
    const updateData = { ...formValues };
    updateData.iconUrl = photoData;
    setFormValues(updateData);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // manually call trigger validation
    handleFieldChange(e);

    const nameValue = e.target.value;
    const keyValue = nameValue.substring(0, 3).toUpperCase();

    const updateData = {
      [e.target.name]: nameValue,
      key: keyValue
    };

    // manually call trigger validation
    const simulatedChangeEvent = {
      target: { name: 'key', value: keyValue }
    } as React.ChangeEvent<HTMLInputElement>;

    handleFieldChange(simulatedChangeEvent);

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
        if (!res || !res.data) {
          return;
        }
        const projectDesc = res?.data;
        const initialData = { ...projectDesc, projectLead: projectDesc?.projectLead?.id ?? '' };
        setFormValues(initialData);
        setOriginalData(initialData);
      })
      .catch((e) => {
        if (e?.response?.status === 403) {
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
            <EditableAvatar
              uploadSuccess={handleUploadSuccess}
              avatarIcon={formFields?.iconUrl.value}
              loading={!formFields}
              addPredefinedIcons
            />
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <InputV3
                label={formFields.name.label ?? ''}
                onValueChanged={handleNameChange}
                onValueBlur={handleFieldBlur}
                value={formFields.name.value}
                error={formErrors?.name}
                name="name"
                loading={!formValues}
                dataTestId="projectName"
                required
              />
              <InputV3
                label={formFields.key.label ?? ''}
                onValueChanged={handleFieldChange}
                onValueBlur={handleFieldBlur}
                value={formFields.key.value}
                error={formErrors?.key}
                name="key"
                loading={!formValues}
                dataTestId="projectKey"
                required
              />
            </div>
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <DropdownV3
                label={formFields.projectLead.label ?? ''}
                dataTestId="projectLead"
                onValueChanged={handleFieldChange as (e: IMinEvent) => void}
                onValueBlur={handleFieldBlur}
                value={formFields.projectLead.value}
                error={formErrors?.projectLead}
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
                addNullOptions
              />
              <InputV3
                label={formFields.websiteUrl.label ?? ''}
                onValueChanged={handleFieldChange}
                onValueBlur={handleFieldBlur}
                value={formFields.websiteUrl.value}
                error={formErrors?.websiteUrl}
                name="websiteUrl"
                loading={!formValues}
                dataTestId="websiteUrl"
              />
            </div>
            <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
              <InputV3
                label={formFields.description.label ?? ''}
                onValueChanged={handleFieldChange}
                onValueBlur={handleFieldBlur}
                value={formFields.description.value}
                error={formErrors?.description}
                name="description"
                loading={!formValues}
                dataTestId="description"
              />
            </div>
            <ButtonV2
              disabled={
                JSON.stringify(formValues) === JSON.stringify(originalData) ||
                Object.values(formErrors)?.some((value) => value != null)
              }
              text="SAVE CHANGES"
              onClick={handleClickSave}
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
