/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { IOptions } from '../../../types';

interface IDropdownV2 {
  onValueChanged: (label: string, value: string) => void;
  defaultValue: string;
  options: IOptions[];
}

export default function DropdownV2(props: IDropdownV2) {
  const { onValueChanged, defaultValue, options } = props;
  const [value, setValue] = useState(defaultValue || options[0].value);
  const [isSearching, setIsSearching] = useState(false);
  const [showList, setShowList] = useState(false);

  const onClickDropdownHandler = (val: string, label: string) => {
    setValue(val);
    onValueChanged(val, label);
    setShowList(false);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsSearching(true);
  };

  const filteredList = isSearching
    ? options.filter((item) => {
        return item.label.toLowerCase().includes(value.toLowerCase());
      })
    : options.filter((item) => {
        return !item.label.toLowerCase().includes(value.toLowerCase());
      });

  const renderValue = options.find((item) => {
    return item.value === value;
  })?.label;

  return (
    <>
      <input
        name="search"
        type="text"
        value={renderValue}
        onChange={onChangeHandler}
        onClick={() => {
          setIsSearching(false);
          setShowList(true);
        }}
      />
      {showList && (
        <div>
          {filteredList.map((item) => {
            return (
              <button
                key={item.value}
                onClick={() => onClickDropdownHandler(item.value, item.label)}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
