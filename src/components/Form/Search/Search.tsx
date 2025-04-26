import React, { useState } from 'react';
import styles from './Search.module.scss';

function Search() {
  const [search, setSearch] = useState(Array<{ entityId: string; name: string }>());
  let timer: ReturnType<typeof setTimeout>;

  const debounce = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      clearTimeout(timer);
    }, 2000);
  };

  const optimizedFn = () => {
    debounce();
  };

  return (
    <div className={styles.searchBar}>
      <input type="text" name="search" placeholder="Search" onChange={() => optimizedFn()} />
      {setSearch.length > 0 && (
        <div className={styles.autocomplete}>
          {search.map((notice) => (
            <div key={notice.entityId} className={styles.autocompleteItems}>
              <span>{notice.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
