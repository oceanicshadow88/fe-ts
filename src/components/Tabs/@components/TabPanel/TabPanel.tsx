import React, { ReactNode } from 'react';

export interface ITabPanelProps {
  children: ReactNode;
  index: number;
  activeIndex?: number;
}

export default function TabPanel({ children, index, activeIndex = 0 }: ITabPanelProps) {
  return activeIndex === index ? <div>{children}</div> : null;
}
