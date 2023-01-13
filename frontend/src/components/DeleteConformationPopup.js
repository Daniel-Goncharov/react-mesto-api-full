import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteConformationPopup({ isOpen, onClose, isConfirmPopupLoading, onCardDelete }) {
  function handleCardDelete(evt) {
    evt.preventDefault();

    onCardDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      buttonText={isConfirmPopupLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCardDelete}
    />
  )
}