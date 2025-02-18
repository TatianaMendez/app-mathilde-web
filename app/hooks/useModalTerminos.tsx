// useModal.ts
import { useState, useRef } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = (forceClose = false) => {
    setIsModalOpen((prev) => {
      if (prev && !forceClose) {
        setTermsAccepted(false);
      }
      return !prev;
    });
  };

  const handleScroll = () => {
    if (modalRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !buttonEnabled) {
        setButtonEnabled(true);
      }
    }
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    toggleModal(true);
  };

  return {
    isModalOpen,
    toggleModal,
    termsAccepted,
    handleAcceptTerms,
    buttonEnabled,
    handleScroll,
    modalRef,
    setTermsAccepted
  };
};

export default useModal;
