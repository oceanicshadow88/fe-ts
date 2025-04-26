import React from 'react';
import Modal from '../../../lib/Modal/Modal';
import DefaultModalBody from '../../../lib/Modal/ModalBody/DefaultModalHeader/DefaultModalBody';
import styles from './ApplyNowModal.module.scss';
import DefaultModalHeader from '../../../lib/Modal/ModalHeader/DefaultModalHeader/DefaultModalHeader';
import JobEditor from '../../JobEditor/JobEditor';

interface IForModal {
  setShowApplyNowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSuccessPage: React.Dispatch<React.SetStateAction<boolean>>;
  onClickJobApplySend: () => void;
}

function ApplyNowModal(props: IForModal) {
  const { setShowApplyNowModal, setShowSuccessPage, onClickJobApplySend } = props;
  return (
    <>
      <Modal data-testid="job-apply-modal">
        <DefaultModalHeader
          title="Apply Now"
          onClickClose={() => {
            setShowApplyNowModal(false);
          }}
        />
        <DefaultModalBody defaultPadding={false} classesName={styles.modalPadding}>
          <JobEditor
            redirectPage={setShowSuccessPage}
            showCancelBtn
            onClickSend={onClickJobApplySend}
            onClickCancel={() => {
              setShowApplyNowModal(false);
            }}
          />
        </DefaultModalBody>
      </Modal>
    </>
  );
}

export default ApplyNowModal;
