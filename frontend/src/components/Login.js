import React from "react";
import Entrance from "./Entrance";

export default function Login({ handleLoginSubmit, isLoggedIn }) {
  return (
    <Entrance
      title={'Вход'}
      buttonText={'Войти'}
      isRegister={false}
      handleLoginSubmit={handleLoginSubmit}
      isLoggedIn={isLoggedIn}
    />
  )
}