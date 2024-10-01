import React, { useState } from 'react';
import Modal from './Modal';

const ExamplePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Example Modal">
        <p>This is the content inside the modal!</p>
        <button onClick={closeModal}>Close from inside</button>
      </Modal>
    </div>
  );
};

export default ExamplePage;
