import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ onCardLike, onCardClick, onCardDelete, card }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some((item) => item._id === currentUser._id)
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? '' : 'element__delete_state_hidden'}`
  )
  const cardLikeButtonClassName  = (
    `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
  )
  function handleCardClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="element">
      <img className="element__picture"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
            />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удаление карточки"
        onClick={handleDeleteClick}
        />
    </div>
  )
}