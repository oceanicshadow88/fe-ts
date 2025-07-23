/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './ProjectEditor.module.scss';
import { IOnChangeProjectLead, IProjectEditor } from '../../../types';
import { UserContext } from '../../../context/UserInfoProvider';
import UsersFieldsV2 from '../../../lib/FieldsV2/UsersFieldsV2/UsersFieldsV2';
import ButtonV2 from '../../../lib/FormV2/ButtonV2/ButtonV2';
import InputV2 from '../../../lib/FormV3/InputV3/InputV3';
import TextAreaV2 from '../../../lib/FormV2/TextAreaV2/TextAreaV2';
import BtnContainer from '../../../lib/Grid/BtnContainer/BtnContainer';
import Row from '../../../lib/Grid/Row/Row';
import EditableAvatar from '../../EditableAvatar/EditableAvatar';

interface ProjectEditorProps {
  showCancelBtn?: boolean;
  projectData?: IProjectEditor;
  onClickSave: (data: IProjectEditor) => void;
  onClickCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hasError?: boolean;
  loading?: boolean;
}

function ProjectEditor(props: ProjectEditorProps) {
  const [data, setData] = useState<IProjectEditor>({
    name: '',
    key: '',
    projectLead: 1,
    iconUrl: '',
    description: ''
  });
  const userInfo = useContext(UserContext);
  const [projectLeader, setProjectLeader] = useState('');

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    setData({ ...data, projectLead: userInfo });
  }, [userInfo.id]);

  const {
    showCancelBtn = false,
    projectData,
    onClickSave,
    hasError,
    onClickCancel = () => {},
    loading
  } = props;
  const onChange = (e: IOnChangeProjectLead) => {
    if (e.target.value) {
      setProjectLeader(e.target.value);
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!projectData) {
      return;
    }
    setData(projectData);
  }, [projectData]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateData = {
      [e.target.name]: e.target.value,
      key: e.target.value.substring(0, 3).toUpperCase()
    };

    setData({ ...data, ...updateData });
  };

  const onChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, description: e.target.value });
  };

  const onChangeWebsiteUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, websiteUrl: e.target.value });
  };

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectLeader !== '') {
      const apiData = { ...data, userId: userInfo.id };
      onClickSave(apiData);
    } else {
      toast.error('Please select a project leader!');
    }
  };

  const uploadSuccess = (photoData: any) => {
    const updateData = { ...data };
    updateData.iconUrl = typeof photoData === 'string' ? photoData : photoData[0].location;
    setData(updateData);
  };

  return (
    <div className={styles.editSection}>
      <div className={styles.editContainer}>
        <form onSubmit={onSave}>
          <EditableAvatar uploadSuccess={uploadSuccess} src={data.iconUrl} addPredefinedIcons />
          <Row defaultMargin>
            <UsersFieldsV2
              onChange={onChange}
              defaultValue={data.projectLead}
              label="Project Lead"
              name="projectLead"
              required
              dataTestId="project-lead"
            />
          </Row>
          <Row defaultMargin>
            <InputV2
              name="name"
              label="Name"
              onValueChanged={onChangeName}
              value={data.name}
              dataTestId="name"
            />
          </Row>
          <Row defaultMargin>
            <InputV2
              name="key"
              label="Key"
              onValueChanged={() => {}}
              value={data.key}
              dataTestId="key"
            />
          </Row>
          <Row defaultMargin>
            <InputV2
              name="websiteUrl"
              label="Website Url"
              onValueChanged={onChangeWebsiteUrl}
              value={data.websiteUrl}
              dataTestId="websiteUrl"
            />
          </Row>
          <Row defaultMargin>
            <TextAreaV2
              label="Description"
              onValueChanged={onChangeDesc}
              defaultValue={data.description}
              name="description"
              dataTestId="project-description"
            />
          </Row>
          {hasError && (
            <p className={styles.error} data-testid="projectError">
              Error
            </p>
          )}
          <Row>
            <BtnContainer>
              <ButtonV2
                text="Save"
                onClick={() => {}}
                dataTestId="save"
                fill
                loading={loading}
                btnType="submit"
              />
              {showCancelBtn && (
                <ButtonV2
                  text="Cancel"
                  onClick={onClickCancel}
                  dataTestId="cancel"
                  loading={loading}
                />
              )}
            </BtnContainer>
          </Row>
        </form>
      </div>
    </div>
  );
}

ProjectEditor.defaultProps = {
  showCancelBtn: false,
  projectData: null,
  hasError: false,
  onClickCancel: () => {},
  loading: false
};

export default ProjectEditor;
