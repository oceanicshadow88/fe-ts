import React from 'react';
import styles from './UsersDropDown.module.scss';
import { ITypes, IUserInfo } from '../../../../types';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import Button from '../../../Form/Button/Button';
import Avatar from '../../../Avatar/Avatar';

export interface ISelectProps {
  value?: IUserInfo;
  users: IUserInfo[];
  onChange: (value: IUserInfo | undefined) => void;
  dataTestId: string;
}

interface IOption {
  id?: string;
  name?: string;
}

export default function UsersDropDown({ value, users, onChange, dataTestId }: ISelectProps) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const options: IOption[] = users.map((item: IUserInfo) => ({
    id: item.id,
    name: item.name
  }));

  return (
    <div ref={myRef} className={styles.userDropDown}>
      <Button
        icon={
          <Avatar
            src={value?.avatarIcon}
            backgroundColor={value?.backgroundColor}
            name={value?.name}
          />
        }
        onClick={() => setVisible(!visible)}
        overrideStyle={styles.userBtn}
        dataTestId={dataTestId}
      >
        {value?.name ?? 'undefined'}
      </Button>

      {visible && (
        <ul className={styles.userDropDownList}>
          {options.map((item: IOption) => (
            <li key={item.id}>
              <Button
                overrideStyle={styles.userBtn}
                icon={<Avatar name={item?.name} />}
                onClick={() => {
                  onChange(item as ITypes);
                  setVisible(false);
                }}
                dataTestId={item.name}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
