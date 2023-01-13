import React, { useEffect} from 'react';

export default function PopupWithForm({ name, isOpen, onClose, title, children, buttonText, onSubmit, isDisabled }) {
  useEffect(() => {
    function handleEsc(evt) {
      if (evt.key === 'Escape') {
        onClose&& onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);

      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
    }
  },[isOpen, onClose]);

  return(
    <div
      className={`popup ${name}-popup ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__closed-button" type="button" onClick={onClose}></button>
        <h2 className={`form__title form__title_type_${name}`}>{title}</h2>
        <form
          className={`form form_type_${name}`}
          name={name} method="post"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button className={`form__submit-button ${isDisabled ? 'form__submit-button_disabled' : ''}`}
                  onClick={onSubmit} type="submit">{buttonText}</button>
        </form>
      </div>
      <div className="popup__overlay" onClick={onClose}/>
    </div>
  )
}