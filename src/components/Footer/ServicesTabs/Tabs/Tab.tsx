import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Tab.module.scss';

interface Props {
  services: {
    title: string;
    contents: Array<{ href: string; item: string }>;
  };
}

export default function tab({ services }: Props) {
  return (
    <div className={styles.service}>
      <h1 className={styles.title}>
        {services.title}
        <span>+</span>
      </h1>
      <ul>
        {services.contents.map((serviceItem) => (
          <li key={serviceItem.href}>
            <Link to={serviceItem.href}>{serviceItem.item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
