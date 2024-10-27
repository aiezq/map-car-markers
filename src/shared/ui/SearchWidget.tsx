import React from 'react';
import styles from './SearchWidget.module.css';

interface Object {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

interface SearchWidgetProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredObjects: Object[];
  handleSelectObject: (obj: Object) => void;
  selectedObject: Object | null;
  handleToggleVisibility: (id: number) => void;
  visibleObjects: Set<number>;
}

const SearchWidget: React.FC<SearchWidgetProps> = ({
  searchTerm,
  setSearchTerm,
  filteredObjects,
  handleSelectObject,
  selectedObject,
  handleToggleVisibility,
  visibleObjects
}) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.list}>
        {filteredObjects.map(obj => (
          <li
            key={obj.id}
            className={`${styles.listItem} ${selectedObject?.id === obj.id ? styles.selected : ''}`}
            onClick={() => {
              if (visibleObjects.has(obj.id)) {
                handleSelectObject(obj);
              }
            }}
          >
            <input
              type="checkbox"
              checked={visibleObjects.has(obj.id)}
              onClick={(e) => e.stopPropagation()} // Prevent the click event from bubbling up
              onChange={() => handleToggleVisibility(obj.id)}
              className={styles.checkbox}
            />
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchWidget;