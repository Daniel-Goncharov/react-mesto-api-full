import React from 'react';

export default function MenuBurger({isShowMenu, email, signOut}) {
  return (
    <div className={`menu-burger__position ${isShowMenu ? 'menu-burger_type_open' : 'menu-burger_type_close'}`}>
      <menu className='menu-burger'>
        <span>{email}</span>
        <button className='button link header__button-exit menu-burger__exit' onClick={signOut}>Выйти</button>
      </menu>
    </div>
  );
}