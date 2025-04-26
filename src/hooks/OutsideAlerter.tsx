import { useRef, useState, useEffect } from 'react';

export default function useOutsideAlerter(initialValue: boolean, fn?: () => void) {
  const myRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(initialValue);
  const handleClickOutsideDropDown = (e: TouchEvent | MouseEvent) => {
    if (visible && !myRef.current?.contains(e.target as Node)) {
      setVisible(false);
      if (fn) {
        fn();
      }
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropDown);
    return () => document.removeEventListener('mousedown', handleClickOutsideDropDown);
  });
  return { visible, setVisible, myRef };
}
