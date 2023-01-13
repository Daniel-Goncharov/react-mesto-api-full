import SuccessIcon from "../images/Goodrequest.svg";
import FailIcon from "../images/Badrequest.svg";
import React, { useEffect } from "react";

export default function InfoToolTip({ isOpen, onClose, isSuccessTooltipStatus, }) {
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

  return (
    <div
      className={`popup tooltip_popup ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container-tooltip">
        <button type="button" className="popup__closed-button" onClick={onClose} />
        <img
          src={isSuccessTooltipStatus ? SuccessIcon : FailIcon}
          alt={isSuccessTooltipStatus ? "Регистрация прошла успешно.": "Регистрация не была выполнена."}
          className="popup__tooltip_image"
        />
        <p className="popup__tooltip_message">
          {isSuccessTooltipStatus ? "Вы успешно зарегистрировались!": "Что-то пошло не так. Попробуйте ещё раз!"}
        </p>
      </div>
      <div className="popup__overlay" onClick={onClose}/>
    </div>
  );
}