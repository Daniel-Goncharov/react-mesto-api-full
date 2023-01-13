import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

export default function Entrance({
  title,
  signupText,
  buttonText,
  isRegister,
  linkText,
  handleLoginSubmit,
  handleRegisterSubmit,
  isLoggedIn
}) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: ' ', password: ' ' })
  const isFormValid = !error.email && !error.password;

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
    if (isRegister) {
      handleRegisterSubmit(formData.email, formData.password);
    } else {
      handleLoginSubmit(formData.email, formData.password);
    }
  }

  if (isLoggedIn) {
    return (
      <Redirect to="/"/>
    )
  }

  return (
      <section className="entrance">
        <h2 className="form__title form__title_type_inverted">{title}</h2>
        <form className="form form_type_entrance" onSubmit={handleSubmit} noValidate>
          <input
            onChange={handleChange}
            className={`form__input form__input_type_inverted ${error.email ? "form__input_type_error" : ""}`}
            placeholder="Email"
            name="email"
            type="email"
            required
            value={formData.email || ""}
          />
          <span className={`form__error placeName-input-error ${error.email ? "form__error_visible" : ""}`}>{error.email}</span>
          <input
            onChange={handleChange}
            className={`form__input form__input_type_inverted ${error.password ? "form__input_type_error" : ""}`}
            placeholder="Пароль"
            name="password"
            type="password"
            minLength="6"
            maxLength="40"
            required
            value={formData.password || ""}
          />
          <span className={`form__error placeName-input-error ${error.password ? "form__error_visible" : ""}`} >{error.password}</span>
          <button
            disabled={!isFormValid}
            className={`form__submit-button form__submit-button_type_inverted ${!isFormValid ? 'form__submit-button_disabled' : ""}`}
            type="submit"
          >
            {buttonText}
          </button>
          {isRegister && (
            <div className="entrance__signup">
              <p className="entrance__signup_text">{signupText}</p>
              <Link to="sign-in" className="entrance__signup_link">
              {linkText}
              </Link>
            </div>)}
        </form>
      </section>
  );
}