import React, { useEffect } from 'react';
import styles from './SupportTypeSelector.module.scss';

const supportTypesTitles: string[] = [
  'no support',
  'technical support',
  'requirement support',
  'dependency support',
  'other'
];

enum SupportType {
  NO_SUPPORT,
  TECHNICAL,
  REQUIREMENT,
  DEPENDENCY,
  OTHER
}

function SupportTypeSelector({
  supportType,
  name,
  onChange,
  otherSupportDesc,
  editOtherSupportDesc
}: {
  supportType: SupportType;
  onChange: (value: number) => void;
  name: string;
  otherSupportDesc?: string;
  editOtherSupportDesc: (value: string) => void;
}) {
  useEffect(() => {
    if (supportType !== SupportType.OTHER) {
      editOtherSupportDesc('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supportType]);

  return (
    <div
      className={styles.mainWrapper}
      data-testid="dailyscrum-ticket-support-type-radio-input-group"
    >
      {supportTypesTitles.slice(1).map((title, index) => {
        return (
          <div className={styles.controlWrapper} key={crypto.randomUUID()}>
            <label htmlFor={`${name}-${index}`} className="supportName">
              {title}
              <input
                type="radio"
                id={`${name}-${index}`}
                name={name}
                required
                checked={index === supportType - 1}
                value={index + 1}
                onChange={(e) => {
                  onChange(+e.target.value);
                }}
              />
            </label>
          </div>
        );
      })}
      {supportType === SupportType.OTHER ? (
        <textarea
          placeholder="please write at least one reason."
          required
          maxLength={40}
          value={otherSupportDesc}
          onChange={(e) => {
            editOtherSupportDesc(e.target.value);
          }}
          data-testid="dailyscrum-ticket-other-support-desc"
        />
      ) : null}
    </div>
  );
}

SupportTypeSelector.defaultProps = {
  otherSupportDesc: ''
};

export default React.memo(SupportTypeSelector);
