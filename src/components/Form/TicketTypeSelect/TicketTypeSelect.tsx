import React, { useEffect, useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import styles from './TicketTypeSelect.module.scss';

const TYPES = [
  {
    type: 'story',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium'
  },
  {
    type: 'task',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium'
  },
  {
    type: 'bug',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium'
  },
  {
    type: 'techDebt',
    imgUrl:
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10308?size=medium'
  }
];

interface IOption {
  type: string;
  imgUrl: string;
  onClickOption: (e: any, type: string) => void;
  setClicked: (state: boolean) => void;
}

function Option({ type, imgUrl, onClickOption, setClicked }: IOption) {
  return (
    <button
      className={styles.dropDownButtonContainer}
      onClick={(e) => {
        onClickOption(e, type);
        setClicked(false);
      }}
      name={type}
      value={type}
    >
      <img src={imgUrl} alt={type} />
      <p>{type}</p>
    </button>
  );
}

interface ITicketTypeSelect {
  showDropDownOnTop?: boolean;
  setCurrentTypeOption: (type: string) => void;
}

export default function TicketTypeSelect({
  setCurrentTypeOption,
  showDropDownOnTop
}: ITicketTypeSelect) {
  const initialOption = TYPES[0];
  const [showOptions, setShowOptions] = useState(false);
  const [currentOption, setCurrentOption] = useState(initialOption);
  const [clicked, setClicked] = useState(false);
  const otherOptions = TYPES.filter((item) => item.type !== currentOption.type);

  const handleCurrentOption = (type: string) => {
    const newCurrentOption = TYPES.filter((item) => item.type === type)[0];
    setCurrentOption(newCurrentOption);
    setCurrentTypeOption(type);
  };

  const onClickOption = (e: any, option: string) => {
    e.preventDefault();
    setShowOptions(!showOptions);
    handleCurrentOption(option);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!containerRef.current?.contains(e.target)) {
        setShowOptions(false);
        setClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let btnClassName = '';
  if (clicked) {
    btnClassName = [styles.buttonContainer, styles.buttonClicked].join(' ');
  } else {
    btnClassName = styles.buttonContainer;
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        onClick={(e) => {
          onClickOption(e, currentOption.type);
          setClicked(!clicked);
        }}
        className={btnClassName}
        onBlur={() => {}}
        onFocus={() => {}}
      >
        <img className={styles.icon} src={currentOption.imgUrl} alt={currentOption.type} />
        <HiChevronDown />
      </button>
      <div
        className={[styles.optionsContainer, showDropDownOnTop && styles.showDropDownOnTop].join(
          ' '
        )}
      >
        <ul className={[styles.listContainer, showOptions && styles.show].join(' ')}>
          {otherOptions.map((option) => {
            const { type, imgUrl } = option;
            return (
              <li key={type}>
                <Option
                  onClickOption={onClickOption}
                  type={type}
                  imgUrl={imgUrl}
                  setClicked={setClicked}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

TicketTypeSelect.defaultProps = {
  showDropDownOnTop: false
};
