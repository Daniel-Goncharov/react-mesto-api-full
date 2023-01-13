import React, { useEffect, useState, useContext } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onUpdateUser, isEditProfilePopupLoading, onClose}) {
  const currentUser = useContext(CurrentUserContext)
  const [formData, setFormData] = useState({ name: '', about: '' });
  const [error, setError] = useState({ name: '', about: '' })
  const isFormValid = !error.name && !error.about;

  useEffect(() => {
    setFormData({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen])

  function handlChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });

    if (!evt.target.validity.valid) {
      setError({ ...error, [evt.target.name]: evt.target.validationMessage });
    } else {
      setError({ ...error, [evt.target.name]: '' });
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({
      name: formData.name,
      about: formData.about
    })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText={isEditProfilePopupLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <input
        className={`form__input form__input_data_name ${error.name ? "form__input_type_error" : ""}`} 
        id="name-imput"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        value={formData.name || ''}
        onChange={handlChange}
      />
      <span className={`form__error ${error.name ? "form__error_visible" : ""}`} >{error.name}</span>
      <input
        className={`form__input form__input_data_job ${error.about ? "form__input_type_error" : ""}`}
        id="job-imput"
        type="text"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        value={formData.about || ''}
        onChange={handlChange}
      />
      <span className={`form__error ${error.about ? "form__error_visible" : ""}`} >{error.about}</span>
    </PopupWithForm>
  )
}