import React, { useRef } from 'react';
import style from './AddPeopleModal.module.scss';
import search from '../../../assets/search-line.svg';
import dropDownArrow from '../../../assets/arrow-drop-down-line.svg';
import { IProps } from '../Typings/Typings';

export default function AddPeopleModal({ cancelClick, addClick, memberList }: IProps) {
  const handleAddInputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = (): void => {
    const val: string = handleAddInputRef.current?.value.trim() ?? '';

    if (val.length) {
      const isExist = memberList.find((member) => member.name === val);
      if (isExist) {
        return;
      }

      addClick({
        id: new Date().getTime(),
        name: val
      });

      const handelInputVCurrent = handleAddInputRef.current as HTMLInputElement;
      handelInputVCurrent.value = '';
    }
  };

  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.dialog}>
          <header>
            <h1>Add people</h1>
          </header>
          <div className={style.bodyContent}>
            <div className={style.inputContent}>
              <input
                type="text"
                name="input"
                className={style.inputRight}
                placeholder="Type a name, group or email address"
                ref={handleAddInputRef}
              />
              <img className={style.inputImg} src={search} alt="search" />
            </div>
            <div className={style.roleContent}>
              <span>Role</span>
              <div className={style.inputContent}>
                <button className={style.inputRight} type="button">
                  Member
                </button>
                <img className={style.inputImg} src={dropDownArrow} alt="search" />
              </div>
            </div>
          </div>
          <footer>
            <div className={style.footerContent}>
              <button className={style.cancelButton} type="button" onClick={cancelClick}>
                <span>Cancel</span>
              </button>
              <button className={style.addButton} type="button" onClick={handleAddClick}>
                <span>Add</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
