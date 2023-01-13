import React, { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({ isOpen, onAddPlace, isAddPlacePopupLoading, onClose}) {
  const [formData, setFormData] = useState({ name: '', link: '' });
  const [error, setError] = useState({ name: ' ', link: ' ' })
  const isFormValid = !error.name && !error.link;

  useEffect(() => {
    setFormData({name: '', link: ''});
    setError({name: ' ', link: ' '})
  }, [isOpen]);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });

    if (!evt.target.validity.valid) {
      setError({ ...error, [evt.target.name]: evt.target.validationMessage });
    } else {
      setError({ ...error, [evt.target.name]: '' });
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: formData.name,
      link: formData.link
    })
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      buttonText={isAddPlacePopupLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <input
        className={`form__input form__input_data_place-url ${error.name ? "form__input_type_error" : ""}`}
        id="placeName-input"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <span className={`form__error placeName-input-error ${error.name ? "form__error_visible" : ""}`} >{error.name}</span>
      <input
        className={`form__input form__input_data_place-url ${error.link ? "form__input_type_error" : ""}`}
        id="placeUrl-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={formData.link}
        onChange={handleChange}
      />
      <span className={`form__error placeUrl-input-error ${error.link ? "form__error_visible" : ""}`} >{error.link}</span>
    </PopupWithForm>
  )
}