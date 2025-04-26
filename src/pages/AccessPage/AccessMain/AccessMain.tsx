import React from 'react';
import { IMember, IRemove } from '../Typings/Typings';
import style from './AccessMain.module.scss';

export default function AccessMain({ removeClick, memberList }: IRemove) {
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>
              <span>Name</span>
            </th>
            <th>
              <span>Email</span>
            </th>
            <th>
              <span>Role</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {memberList.length > 0 &&
            memberList.map((member: IMember) => {
              return (
                <tr key={member.id}>
                  <td>
                    <div className={style.nameItem}>
                      <span className={style.avatar} />
                      <span className={style.memberName}>{member.name}</span>
                    </div>
                  </td>
                  <td>
                    <div>-</div>
                  </td>
                  <td>
                    <div className={style.buttonsLayout}>
                      <button type="button" className={style.roleButton}>
                        <span>Member</span>
                      </button>
                      <button
                        type="button"
                        className={style.removeButton}
                        onClick={() => removeClick(member.id)}
                      >
                        <span>Remove</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
