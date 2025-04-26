import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styles from './StepsNav.module.scss';

export interface ICustomLink {
  to: string;
  children: string;
}

function CustomLink({ to, children }: ICustomLink) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? `${styles.active}` : ''}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
interface IStepsNav {
  title: string;
  items: any;
}
export default function StepsNav(props: IStepsNav) {
  const { title, items } = props;

  return (
    <div className={styles.navContainer}>
      <h4>
        <CustomLink to="/">{title}</CustomLink>
      </h4>
      <ul>
        {items.map((item) => {
          return (
            <CustomLink key={item.link} to={item.link}>
              {item.name}
            </CustomLink>
          );
        })}
      </ul>
    </div>
  );
}
