import React from 'react';
import Textfield from '@atlaskit/textfield';
import style from './AccessSearchBar.module.scss';

export default function AccessSearchBar() {
  return (
    <div className={style.container}>
      <Textfield
        id={style.input}
        type="text"
        name="search"
        placeholder="Search for names, groups or email addresses"
      />
    </div>
  );
}
