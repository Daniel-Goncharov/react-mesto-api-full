import React, { useState, useEffect, useRef } from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isEditAvatarPopupLoading }) {
  const avatarRef = useRef()

  const [urlError, setUrlError] = useState({ errorMessage: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setUrlError({ errorMessage: '' });
    setIsFormValid(false);
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleChange() {
    const avatar = avatarRef.current;

    if (!avatar.validity.valid) {
      setUrlError({ errorMessage: avatar.validationMessage });
      setIsFormValid(false);
    } else {
      setUrlError({ errorMessage: '' });
      setIsFormValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText={isEditAvatarPopupLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <input
        className={`form__input form__input_data_place-url`}
        id="avatar-input"
        type="url"
        name="avatar-url"
        placeholder="Укажите ссылку на аватар"
        required
        ref={avatarRef}
        onChange={handleChange}
      />
      <span className={`form__error ${!isFormValid ? "form__error_visible" : ""}`} >{urlError.errorMessage}</span>
    </PopupWithForm>
  )
}