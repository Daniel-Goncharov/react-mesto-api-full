import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, handleCardLike, onCardDelete, cards}) {
  const currentUser = React.useContext(CurrentUserContext)
  const cardsElements = cards.map((card) => (
    <li key={card._id}><Card
      card={card}
      onCardClick={onCardClick}
      onCardLike={handleCardLike}
      onCardDelete={onCardDelete}
    />
    </li>))

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <button type="button" className="profile__avatar-button" onClick={onEditAvatar}></button>
          <img className="profile__pic" src={currentUser.avatar} alt="Аватар пользователя" />
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить картинку" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
        { cardsElements }
        </ul>
      </section>
    </main>
  )
}