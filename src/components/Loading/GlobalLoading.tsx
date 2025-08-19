import React, { createContext, useContext, useState, useMemo } from 'react';
import styles from './GlobalLoading.module.scss';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const contextValue = useMemo(
    () => ({
      isLoading,
      setIsLoading
    }),
    [isLoading]
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner} />
            <span>Loading...</span>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export const useGlobalLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useGlobalLoading must be used within LoadingProvider');
  }
  return context;
};
