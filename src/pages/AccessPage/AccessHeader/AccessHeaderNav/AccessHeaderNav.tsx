import React from 'react';
import { Link } from 'react-router-dom';
import style from './AccessHeaderNav.module.scss';

export default function AccessHeaderNav() {
  return (
    <div>
      <nav className={style.navLayout}>
        <ol>
          <li>
            <Link to="/access" target="_self">
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link to="/access" target="_self">
              <span>EvanLin</span>
            </Link>
          </li>
          <li>
            <Link to="/access" target="_self">
              <span>Project settings</span>
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}
