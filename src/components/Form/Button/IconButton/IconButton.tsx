import React from 'react';
import styles from './IconButton.module.scss';

interface IIconButton {
  ticketId?: string;
  icon: React.ReactNode;
  tooltip: string;
  overrideStyle?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export default function IconButton({
  icon,
  tooltip,
  overrideStyle,
  onClick,
  ticketId
}: IIconButton) {
  return (
    <button
      className={[styles.iconButton, overrideStyle].join(' ')}
      onClick={onClick}
      data-testid={`icon-btn-${tooltip.toLowerCase().replace(/\s+/g, '-')}-`.concat(
        ticketId as string
      )}
    >
      {icon}
      <span className={styles.tooltip}>{tooltip}</span>
    </button>
  );
}

IconButton.defaultProps = {
  ticketId: '',
  overrideStyle: '',
  onClick: () => {}
};
