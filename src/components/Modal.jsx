import { useEffect } from 'react';
import style from './Gallery.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ toggleModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
      window.removeEventListener('keydown', handleKeyDown);
    }
  };

  const handleClickOverlay = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return createPortal(
    <div>
      <div className={style.overlay} onClick={handleClickOverlay}>
        <div className={style.modal}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
