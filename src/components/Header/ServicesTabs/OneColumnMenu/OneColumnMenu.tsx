import * as React from 'react';
import { IconType } from 'react-icons';
import styles from './OneColumnMenu.module.scss';
import Middle from './middle/Middle';

interface Props {
  servicesInfo: {
    content: {
      title: string;
      content: Array<{
        icon: IconType;
        title: string;
        description: string;
        href: string;
      }>;
    };
  };
  active: boolean;
}

export default function OneColumnMenu({ servicesInfo, active = false }: Props) {
  return (
    <div className={active ? styles.subNavOneColumn : styles.oneColumnMenuNotActive}>
      {active && (
        <div className={styles.serviceContainerOneColumn}>
          <Middle content={servicesInfo.content} />
        </div>
      )}
    </div>
  );
}
