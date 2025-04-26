import './MentionList.scss';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export interface IMentionItem {
  id?: string | null;
  name?: string;
}

export interface IMentionListProps {
  items: IMentionItem[];
  command: (params: { label: string }) => void;
}

export interface IMentionListRef {
  onKeyDown: (args: { event: KeyboardEvent }) => boolean;
}

const MentionList = forwardRef<IMentionListRef, IMentionListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectItem = (index: number): void => {
    const item = props.items[index];
    if (item) {
      props.command({ label: item.name ?? '' });
    }
  };

  const upHandler = (): void => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = (): void => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = (): void => {
    selectItem(selectedIndex);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }
      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }
      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }
      return false;
    }
  }));

  return (
    <div className="dropdown-menu">
      {props.items.length ? (
        props.items.map((item) => (
          <button
            key={item.id}
            className={props.items.indexOf(item) === selectedIndex ? 'is-selected' : ''}
            onClick={() => selectItem(props.items.indexOf(item))}
          >
            {item.name}
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});

export default MentionList;
