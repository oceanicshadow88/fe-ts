/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Create a context for modal management
export const ModalContext = createContext({
  showModal: (modalId: string, modalComp: React.ReactNode) => {},
  closeModal: (modalId: string) => {}
});

interface IModalProvider {
  children: React.ReactNode;
}

// Modal provider component
export default function ModalProvider({ children }: IModalProvider) {
  const [activeModals, setActiveModals] = useState<any>([]);
  const location = useLocation();

  useEffect(() => {
    setActiveModals([]);
  }, [location]);

  const showModal = (modalId: string, modalComp: React.ReactNode) => {
    const modal = activeModals.find((item) => item.id === modalId);
    if (modal) {
      return;
    }

    setActiveModals([...activeModals, { id: modalId, modalComp }]);
  };

  const closeModal = (modalId: string) => {
    setActiveModals(activeModals.filter((item) => item.id !== modalId));
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        closeModal
      }}
    >
      {children}
      {activeModals.map((item) => {
        return <div key={item.id}>{item.modalComp}</div>;
      })}
    </ModalContext.Provider>
  );
}
