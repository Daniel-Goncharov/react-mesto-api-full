import React from "react";

import Entrance from "./Entrance";

export default function Register({ handleRegisterSubmit, isLoggedIn }) {
  return (
    <Entrance
      title={'Регистрация'}
      buttonText={'Зарегистрироваться'}
      signupText={'Уже зарегистрированы?'}
      linkText={'Войти'}
      isRegister={true}
      handleRegisterSubmit={handleRegisterSubmit}
      isLoggedIn={isLoggedIn}
    />
  )
}