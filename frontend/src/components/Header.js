import React, { useState } from 'react';
import { Route, Link, } from 'react-router-dom';
import MenuBurger from './MenuBurger';

export default function Header({ isLoggedIn, email, signOut }) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [classHeaderMenu, setClassHeaderMenu] = useState(false);

  function toggleAuthInfo() {
    isShowMenu ? setIsShowMenu(false) : setIsShowMenu(true);
    classHeaderMenu ? setClassHeaderMenu(false) : setClassHeaderMenu(true);
  }

  return (
      <header className='header__position'>
        {isLoggedIn && <MenuBurger
          email={email}
          signOut={signOut}
          isShowMenu={isShowMenu}
        />}
        <div className='header'>
          <div className="header__logo"/>
          {isLoggedIn
            ? (<>
                <div className='header__user-info'>
                  <span>{email}</span>
                  <button className="button link header__button-exit" onClick={signOut}>Выйти</button>
                </div>

                <button
                  className={`header__menu  ${classHeaderMenu ? 'header__menu_type_opened' : 'header__menu_type_closed'}`}
                  onClick={toggleAuthInfo}
                >
                  <span/>
                </button>

              </>
            ) :
              (<>
                <Route path="/sign-in">
                  <Link to={"/sign-up"} className="button link header__button-entrance">Регистрация</Link>
                </Route>
                <Route path="/sign-up">
                  <Link to={"/sign-in"} className="button link header__button-entrance">Войти</Link>
                </Route>
              </>)
          }
        </div>
      </header>
  );
}

