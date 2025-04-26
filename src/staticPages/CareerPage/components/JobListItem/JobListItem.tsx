import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import styles from './JobListItem.module.scss';
import Modal from '../../../../lib/Modal/Modal';
import DefaultModalBody from '../../../../lib/Modal/ModalBody/DefaultModalHeader/DefaultModalBody';
import ApplyNowModal from '../../../../components/Modals/ApplyNowModal/ApplyNowModal';

interface IJobListItem {
  title: string;
  department: string;
  id: string;
  desc: string;
  list: string[] | undefined;
}

const tagClassesMap = {
  developer: styles.pupple,
  devops: styles.orange,
  design: styles.red,
  product: styles.blue
};

function JobListItem(props: IJobListItem) {
  const { title, id, desc, list, department } = props;

  const [showApplyNowModal, setShowApplyNowModal] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const onClickJobApplySend = () => {};

  const onClckClose = () => {
    setShowSuccessPage(false);
    setShowApplyNowModal(false);
  };

  const renderModals = () => {
    return (
      <>
        {showApplyNowModal &&
          ReactDOM.createPortal(
            <ApplyNowModal
              setShowApplyNowModal={setShowApplyNowModal}
              setShowSuccessPage={setShowSuccessPage}
              onClickJobApplySend={onClickJobApplySend}
            />,
            document.body
          )}
        {showSuccessPage &&
          ReactDOM.createPortal(
            <Modal fullWidth classesName={styles.borderForSuccessPage} data-testid="success-modal">
              <div className={styles.close}>
                <ImCross color="#4f5366" onClick={onClckClose} />
              </div>
              <DefaultModalBody defaultPadding={false} classesName={styles.modalPadding}>
                <div className={styles.iconPosition}>
                  <TiTick size={200} />
                </div>
                <div className={styles.messagePosition}>
                  <h1>We have receive your application, we will get to you as soon as possible</h1>
                </div>
              </DefaultModalBody>
            </Modal>,
            document.body
          )}
      </>
    );
  };

  return (
    <div className={styles.careerCard} id={id}>
      <span className={[styles.tag, tagClassesMap[department.toLocaleLowerCase()]].join(' ')}>
        {department}
      </span>
      <h3>{title}</h3>
      <p className={styles.department}>{desc}</p>
      <ul>
        {list?.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <button
        key={id}
        className={styles.applyButtonText}
        onClick={() => setShowApplyNowModal(true)}
        data-testid="apply-button"
      >
        Apply now
      </button>
      {showApplyNowModal && renderModals()}
    </div>
  );
}

export default JobListItem;
