import React from 'react';

import './styles.css';

const Modal = ({ isVisible, modalChildren, backdropStyle, onBackdropClick }) => (
  <div
    className={`beast-modal ${isVisible ? 'visible': 'invisible'}`}
    style={{ ...backdropStyle}}
    onClick={onBackdropClick}>
    <div className='beast-modal-body' onClick={(e) => e.stopPropagation()}>
      {modalChildren}
    </div>
  </div>
);

export default Modal;