import React from 'react';
import styles from './TicketPriorrityDropDown.module.scss';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import Button from '../../../Form/Button/Button';

interface IPriorityBtn {
  priority: string;
  onChange: (value: string) => void;
}

export default function PriorityBtn({ priority, onChange }: IPriorityBtn) {
  const allPriorities = [
    {
      priority: 'Highest',
      imgUrl: 'https://010001.atlassian.net/images/icons/priorities/highest.svg'
    },
    { priority: 'High', imgUrl: 'https://010001.atlassian.net/images/icons/priorities/high.svg' },
    {
      priority: 'Medium',
      imgUrl: 'https://010001.atlassian.net/images/icons/priorities/medium.svg'
    },
    { priority: 'Low', imgUrl: 'https://010001.atlassian.net/images/icons/priorities/low.svg' },
    {
      priority: 'Lowest',
      imgUrl: 'https://010001.atlassian.net/images/icons/priorities/lowest.svg'
    }
  ];

  const currentPriorityBtn = allPriorities.find(
    (eachPriority) => eachPriority.priority === priority
  );

  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  return (
    <div className={styles.priorityBtnContainer} ref={myRef}>
      <Button
        icon={<img src={currentPriorityBtn?.imgUrl} alt="" />}
        onClick={() => setVisible(!visible)}
        overrideStyle={styles.priorityBtn}
        dataTestId="priority"
      >
        {priority}
      </Button>
      {visible && (
        <ul className={styles.priorityBtnList}>
          {allPriorities.map((item) => (
            <li key={item.priority}>
              <Button
                icon={<img src={item.imgUrl} alt={item.priority} />}
                overrideStyle={styles.priorityBtn}
                onClick={() => {
                  onChange(item.priority);
                  setVisible(false);
                }}
                dataTestId={item.priority}
              >
                {item.priority}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
