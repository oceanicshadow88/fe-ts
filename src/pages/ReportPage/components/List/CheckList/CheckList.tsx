import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { capitalise } from '../../../utils';
import styles from './CheckList.module.scss';

interface Props {
  list: string[];
  prefixIcon?: JSX.Element;
  isShowIconContainer?: boolean;
  containerBgColor?: 'pink' | 'blue' | 'brand' | 'green' | 'default' | '';
  isHaveLeadingPadding?: boolean;
}

function CheckList({
  list,
  prefixIcon,
  isShowIconContainer,
  containerBgColor,
  isHaveLeadingPadding
}: Props) {
  return (
    <ul
      className={[styles.checkList, styles[!isHaveLeadingPadding ? 'noLeadingPadding' : '']].join(
        ' '
      )}
    >
      {list.map((text) => (
        <li key={crypto.randomUUID()} className={styles.listItem}>
          <>
            {isShowIconContainer ? (
              <div
                className={[
                  styles.iconContainer,
                  styles[`iconContainer${capitalise(containerBgColor as string)}`]
                ].join(' ')}
              >
                {prefixIcon}
              </div>
            ) : (
              <>{prefixIcon}</>
            )}
            <p>{capitalise(text)}</p>
          </>
        </li>
      ))}
    </ul>
  );
}

CheckList.defaultProps = {
  prefixIcon: <AiOutlineCheckCircle color="green" size={20} />,
  isShowIconContainer: false,
  containerBgColor: 'default',
  isHaveLeadingPadding: true
};

export default CheckList;
