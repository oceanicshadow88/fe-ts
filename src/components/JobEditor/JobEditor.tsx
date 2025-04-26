import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';
import InputV2 from '../../lib/FormV2/InputV2/InputV2';
import BtnContainer from '../../lib/Grid/BtnContainer/BtnContainer';
import Row from '../../lib/Grid/Row/Row';
import { IJobApplyEditor } from '../../types';
import styles from './JobEditor.module.scss';

interface JobEditorProps {
  redirectPage: React.Dispatch<React.SetStateAction<boolean>>;
  showCancelBtn?: boolean;
  onClickSend?: (data: IJobApplyEditor) => void;
  onClickCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hasError?: boolean;
  loading?: boolean;
}

function JobEditor(props: JobEditorProps) {
  const [data, setData] = useState<IJobApplyEditor>({
    fullName: '',
    company: '',
    workEmailAddress: '',
    phoneNumber: ''
  });

  const { fullName, company, workEmailAddress, phoneNumber } = data;

  const [emailAddress, setEmailAddress] = useState('');

  const handleInput = useMemo(
    () => (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [name]: e.currentTarget.value });
      if (name === 'workEmailAddress') {
        setEmailAddress(e.currentTarget.value);
      }
    },
    [data]
  );

  const {
    redirectPage,
    showCancelBtn = false,
    hasError,
    onClickSend = () => {},
    onClickCancel = () => {},
    loading
  } = props;

  const onSend = () => {
    if (!emailAddress) {
      toast.error('Please type your work email address');
    } else {
      redirectPage(true);
      onClickSend(data);
    }
  };

  return (
    <div className={styles.editSection}>
      <div className={styles.editContainer}>
        <form>
          <div>
            <Row defaultMargin>
              <InputV2
                name="full name"
                label="Full Name"
                dataTestId="full-name"
                onValueChanged={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInput('fullName', e)
                }
                value={fullName || ''}
              />
            </Row>
            <Row defaultMargin>
              <InputV2
                name="company"
                label="Company"
                dataTestId="company"
                onValueChanged={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInput('company', e)
                }
                value={company || ''}
              />
            </Row>
            <Row defaultMargin>
              <InputV2
                name="work email address"
                label="Work Email Address"
                dataTestId="work-email"
                onValueChanged={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInput('workEmailAddress', e)
                }
                value={workEmailAddress || ''}
              />
            </Row>
            <Row defaultMargin>
              <InputV2
                name="phone number"
                label="Phone Number"
                dataTestId="phone-number"
                onValueChanged={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInput('phoneNumber', e)
                }
                value={phoneNumber || ''}
              />
            </Row>
          </div>
          {hasError && (
            <p className={styles.error} data-testid="projectError">
              Error
            </p>
          )}
          <Row>
            <BtnContainer>
              <ButtonV2 text="Send" onClick={onSend} dataTestId="send" fill loading={loading} />
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

JobEditor.defaultProps = {
  showCancelBtn: false,
  onClickSend: () => {},
  onClickCancel: () => {},
  loading: false,
  hasError: false
};

export default JobEditor;
