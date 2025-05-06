import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import styles from './LabelsDropDownV2.module.scss';
import { ILabelData } from '../../../../types';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import { showLabel, createLabel } from '../../../../api/label/label';
import AutoWidthInput from './@components/AutoWidthInput/AutoWidthInput';

interface ITicketStatusDropDown {
  ticketLabels: ILabelData[];
  ticketId: string;
  projectId: string;
  onTicketLabelsChange: (ticketLabels: ILabelData[]) => void;
  dataTestId: string;
  isDisabled: boolean;
}

export default function TicketStatusDropDown({
  ticketLabels,
  ticketId,
  projectId,
  onTicketLabelsChange,
  dataTestId,
  isDisabled
}: ITicketStatusDropDown) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  const [availableLabels, setAvailableLabels] = useState<ILabelData[]>([]);

  const [showNewLabel, setShowNewLabel] = useState(false);

  const [inputLabelName, setInputLabelName] = useState('');

  const buildAvailableLabels = async () => {
    const res = await showLabel(projectId);
    setAvailableLabels(res.data.filter((label) => !ticketLabels.some((t) => t.id === label.id)));
  };

  useEffect(() => {
    buildAvailableLabels();
  }, [ticketLabels]);

  const handleInputLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputLabelName(e.target.value);

    if (inputValue === '') {
      setShowNewLabel(false);
      return;
    }

    const hasLabel = [...ticketLabels, ...availableLabels].some(
      (label) => label.name.toLowerCase() === inputValue.toLowerCase()
    );

    setShowNewLabel(!hasLabel);
  };

  const clearInput = () => {
    handleInputLabelChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCreateNewLabel = async () => {
    const res = await createLabel(ticketId, {
      name: inputLabelName,
      slug: inputLabelName.toLowerCase().replace(/ /g, '-')
    });

    if (!res?.data) return;
    onTicketLabelsChange([...ticketLabels, res.data]);
    setShowNewLabel(false);
    clearInput();
  };

  const handleDeleteTag = (tag: ILabelData) => {
    onTicketLabelsChange(ticketLabels.filter((t) => t.id !== tag.id));
  };

  const handleAddLabelToTicket = (label: ILabelData) => {
    onTicketLabelsChange([...ticketLabels, label]);
  };

  useEffect(() => {
    buildAvailableLabels();
  }, [ticketLabels]);

  const renderExistingLabels = () => {
    return (
      <div className={styles.existingLabelsContainer}>
        {ticketLabels.map((label) => (
          <div key={label.id} className={styles.existingLabelItem}>
            <span>{label.name}</span>
            <TiDelete onClick={() => handleDeleteTag(label)} />
          </div>
        ))}
        <AutoWidthInput
          className={ticketLabels.length > 0 ? styles.inputLabelExsiting : styles.inputLabelNew}
          minWidth={ticketLabels.length > 0 ? 0 : 120}
          onChange={handleInputLabelChange}
          onBlur={clearInput}
          value={inputLabelName}
        />
      </div>
    );
  };

  const renderDropdownButton = () => {
    if (ticketLabels.length === 0) {
      return <span className={styles.noneLabel}>None</span>;
    }
    return ticketLabels.map((tag) => (
      <span key={tag.id} className={styles.labelTag} data-testid={tag}>
        {tag.name}
      </span>
    ));
  };

  const filteredLabels = availableLabels.filter((label) =>
    label.name.toLowerCase().includes(inputLabelName.toLowerCase())
  );
  const showDropDownMenu = showNewLabel || filteredLabels.length > 0;

  const renderNewLabel = () => {
    if (!showNewLabel) {
      return <></>;
    }
    return (
      <button className={styles.suggestLabelItem} onClick={handleCreateNewLabel}>
        {inputLabelName} (New Label)
      </button>
    );
  };

  const renderFilteredLabels = () => {
    if (!filteredLabels || filteredLabels.length === 0) {
      return <></>;
    }
    return filteredLabels.map((label) => (
      <button
        className={styles.suggestLabelItem}
        key={label.id}
        onClick={() => handleAddLabelToTicket(label)}
      >
        {label.name}
      </button>
    ));
  };

  return (
    <div
      ref={myRef}
      className={
        visible ? styles.labelDropdownContainerActive : styles.labelDropdownContainerDeactive
      }
    >
      {visible ? (
        <div className={styles.labelDropdownMenu}>
          <div className={styles.labelInputContainer}>{renderExistingLabels()}</div>
          <div className={styles.suggestLabelsContainer}>
            {showDropDownMenu && (
              <div className={styles.suggestLabelsList}>
                <div className={styles.suggestLabelsTitle}>All Labels</div>
                {renderNewLabel()}
                {renderFilteredLabels()}
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            if (isDisabled) return;
            const isVisible = !visible;
            if (isVisible) clearInput();
            setVisible(isVisible);
          }}
          className={styles.labelDropdownButton}
          data-testId={dataTestId}
        >
          {renderDropdownButton()}
        </button>
      )}
    </div>
  );
}
