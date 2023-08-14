import { useCallback, useEffect, useState } from 'react';

interface StorageValue {
  [key: string]: StorageValue;
}
const STORAGE_EVENT = 'storageChanged';

export function useLocalStorage(key: string, initialValue: StorageValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error fetching from localStorage:', error);
      return initialValue;
    }
  });

  const setState = useCallback(
    (value: StorageValue) => {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
      window.dispatchEvent(
        new CustomEvent(STORAGE_EVENT, {
          detail: {
            newValue: value,
            key,
          },
        })
      );
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (event.detail.key === key && event.detail.newValue !== undefined) {
        setStoredValue(event.detail.newValue);
      }
    };

    window.addEventListener(STORAGE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageChange);
    };
  }, [key]);

  return [storedValue, setState];
}
