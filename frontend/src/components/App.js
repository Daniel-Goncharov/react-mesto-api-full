import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConformationPopup from './DeleteConformationPopup';
import Spinner from './Spinner';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";

import api from '../utils/api';
import * as auth from "../utils/auth";

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([])
  const [cardDelete, setCardDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = useState(false);
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);
  const [isConfirmPopupLoading, setIsConfirmLoading] = useState(false);
  const [email, setEmail] = useState("");

  const history = useHistory();
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [isSuccessTooltipStatus, setIsSuccessTooltipStatus] = useState(false);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardClick(card) {
    setCardDelete(card);
    setIsConfirmPopupOpen(true);
  }
  function onCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setInfoToolTipPopupOpen(false);
  }

  function onUpdateUser(userData) {
    setIsEditProfilePopupLoading(true);
    api.setUserInfoApi(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsEditProfilePopupLoading(false);
      })
  }

  function onUpdateAvatar(userData) {
    setIsEditAvatarPopupLoading(true);
    api.changeAvatar(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsEditAvatarPopupLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete() {
    setIsConfirmLoading(true);
    api.deleteCard(cardDelete._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== cardDelete._id));
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsConfirmLoading(false);
    })
  }

  function handleAddPlaceSubmit(cardData) {
    setIsAddPlacePopupLoading(true);
    api.addCardServer(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsAddPlacePopupLoading(false);
      })
  }

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true)
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([initialUserInfo, initialCards]) => {
        setCurrentUser(initialUserInfo);
        setCards(initialCards);
        setIsLoading(false)
      })
      .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате");
          }
          console.log("401 — Переданный токен некорректен");
        });
    }
  }, [history]);

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then((res) => {

        setIsSuccessTooltipStatus(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setIsSuccessTooltipStatus(false);
      })
      .finally(() => {
        setInfoToolTipPopupOpen(true);
      })
  }

  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then(() => {
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccessTooltipStatus(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/sign-in");
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        email={email}
        signOut={handleSignOut}
      />
        <Switch>
          {isLoading ? <Spinner /> : <ProtectedRoute
            exact
            path="/"
            isLoggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={onCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
            component={Main}
            isLoading={isLoading}
          >
          </ProtectedRoute>}
          <Route path="/sign-in">
            <Login
              handleLoginSubmit={handleLoginSubmit}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              handleRegisterSubmit={handleRegisterSubmit}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {isLoggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={onUpdateUser}
          isEditProfilePopupLoading={isEditProfilePopupLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isAddPlacePopupLoading={isAddPlacePopupLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
          isEditAvatarPopupLoading={isEditAvatarPopupLoading}
        />
        <DeleteConformationPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isConfirmPopupLoading={isConfirmPopupLoading}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccessTooltipStatus={isSuccessTooltipStatus}
        />
    </CurrentUserContext.Provider>
  );
}
