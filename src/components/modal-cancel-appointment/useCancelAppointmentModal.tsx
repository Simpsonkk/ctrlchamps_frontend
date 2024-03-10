import React, { useState } from 'react';

type ReturnType = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
};

export function useCancelAppointmentModal(): ReturnType {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpen = (): void => setModalOpen(true);

  return {
    modalOpen,
    setModalOpen,
    handleOpen,
  };
}
