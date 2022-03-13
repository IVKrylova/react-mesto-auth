import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  // хуки состояния открытия/закрытия popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen ] = React.useState(false);
  // хуки состояния текущего id карточки
  const [currentCardId, setCurrentCardId] = React.useState('');
  // хуки состояния popup с изображением
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });;
  // хуки состояния данных о пользователе
  const [currentUser, setCurrentUser] = React.useState({ name: '', description: '', avatar: '', id: '' });
  // хуки состояния загрузки массива карточек
  const [cards, setCards] = React.useState([]);
  // хуки состояния индикатора загрузки запросов
  const [isRenderLoading, setIsRenderLoading] = React.useState(false);
  // хуки состояния авторизации пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);
  // хуки состояния разворачивающегося меню
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // хуки состояния popup в InfoTooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  // хуки состояния регистрации нового пользователя
  const [isRegistred, setIsRegistred] = React.useState(false);
  // хуки состояния email авторизированного пользователя
  const [email, setEmail] = React.useState('');
  // получаем доступ к объекту history
  const history = useHistory();

  React.useEffect(_ => {
    // загрузка массива карточек с сервера
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.log(err));
  }, []);

  // обработчик клика на лайк
  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser.id);

    // oтправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card.id, isLiked)
      .then(newCard => {
        const newArrayCards = cards.map(item => item._id === card.id ? newCard : item);

        setCards(newArrayCards);
      })
      .catch(err => console.log(err));
  }

   // обработчик закрытия popup при нажатии на Esc
  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  // обработчик закрытия popup при клике вне его
  function handleBackgroundClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  // обработчик удаления карточки
  function handleCardDelete(props) {
    api.deleteCard(props)
      .then(_ => {
        const newArrayCards = cards.filter(item => item._id !== props);

        setCards(newArrayCards);
        setCurrentCardId('');
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  // открытие popup для удаления карточки
  function handleOpenCardClick(evt) {
    setIsDeleteCardPopupOpen(true);
    setCurrentCardId(evt.target.value);
  }

  // открытие popup для редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // открытие popup в profile__info
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // открытие popup для добавления карточки в elements
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // закрытие всех popup
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({...{name: '', link: ''}});
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  // открытие popup с изображением
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // обработчик изменения информации о пользователе
  function handleUpdateUser(props) {
    setIsRenderLoading(true);
    api.editProfileInfo(props)
      .then(data => {
        setCurrentUser({ name: data.name, description: data.about, avatar: data.avatar, id: data._id });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(_ => setIsRenderLoading(false));
  }

  // обработчик изменения аватара
  function handleUpdateAvatar(props) {
    setIsRenderLoading(true);
    api.editAvatar(props.avatar)
      .then(data => {
        setCurrentUser({ name: data.name, description: data.about, avatar: data.avatar, id: data._id });
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(_ => setIsRenderLoading(false));
  }

  // обработчик добавления новой карточки
  function handleAddPlaceSubmit(props) {
    setIsRenderLoading(true);
    api.sendNewCard(props)
      .then(data => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(_ => setIsRenderLoading(false));
  }

  React.useEffect(() => {
    // загрузка информации о пользователе с сервера
    api.getUserInfo()
      .then(data => {
        const { name, about, avatar, _id } = data;
        setCurrentUser({ name: name, description: about, avatar: avatar, id: _id })
      })
      .catch(err => console.log(err));
  }, []);

  // обработчик открытия меню
  function handleOpenExpandingMenu() {
    setIsMenuOpen(true);
  }

  // обработчик закрытия меню
  function handleCloseExpandingMenu() {
    setIsMenuOpen(false);
  }

  // обработчик формы регистрации
  function handleSubmitRegistration(props) {
    auth.register(props.password, props.email)
      .then(_ => {
        setIsRegistred(true);
      })
      .catch(err => console.log(err))
      .finally(_ => setIsInfoTooltipOpen(true));
  }

  // настройка переадресации на страницу входа после удачной регистрации
  React.useEffect(_ => {
    if (!isInfoTooltipOpen && isRegistred) {
      history.push('/sign-in');
      // меняем isRegistred, чтобы работала ссылка "Регистрация" в header
      setIsRegistred(false);
    }
  }, [isInfoTooltipOpen]);

  // обработчик формы авторизации
  function handleSubmitLogin(props) {
    // сохраняем email в Local storage
    localStorage.setItem('email', props.email);

    auth.authorize(props.password, props.email)
      .then(data => {
        // сохраняем токен в Local storage
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
      })
      .catch(err => console.log(err))
  }

  // установка значения для авторизированного пользователя
  React.useEffect(_ => {
    setEmail(localStorage.getItem('email'));
  });

  // функция проверки токена
  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      // проверяем данные о пользователе по токену
      auth.sendToken(token)
      .then(data => {
        const email = data.data.email;
        if (email === localStorage.getItem('email')) {
          setLoggedIn(true);
        }
      })
      .catch(err => console.log(err));
    }
  }

  // проверяем токен при загрузке приложения
  React.useEffect(_ => tokenCheck(), []);

  // проверяем, авторизирован ли пользователь и загружаем приложение
  React.useEffect(_ => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  // обработчик выхода из приложения
  function handleExit() {
    localStorage.removeItem('token');
    setEmail('');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="site-background"
          onClick={handleBackgroundClose}
          onKeyDown={handleEscClose}>
        <div className="page">
          <Switch>
            <ProtectedRoute exact path="/"
              loggedIn={loggedIn}
              component={ <>
                <Header onOpenMenu={handleOpenExpandingMenu}
                        isMenuOpen={isMenuOpen}
                        onCloseMenu={handleCloseExpandingMenu}
                        email={email}
                        onExit={handleExit} />
                <Main onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleOpenCardClick} />
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar}
                                isOpen={isEditAvatarPopupOpen}
                                onClose={closeAllPopups}
                                buttonText="Сохранить"
                                isRenderLoading={isRenderLoading} />
                <EditProfilePopup onUpdateUser={handleUpdateUser}
                                  isOpen={isEditProfilePopupOpen}
                                  onClose={closeAllPopups}
                                  buttonText="Сохранить"
                                  isRenderLoading={isRenderLoading} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen}
                              onClose={closeAllPopups}
                              onAddPlace={handleAddPlaceSubmit}
                              buttonText="Создать"
                              isRenderLoading={isRenderLoading} />
                <DeleteCardPopup isOpen={isDeleteCardPopupOpen}
                                onClose={closeAllPopups}
                                cardId={currentCardId}
                                onDeleteCard={handleCardDelete}
                                buttonText="Да" />
                <ImagePopup card={selectedCard}
                            onClose={closeAllPopups} />
              </>}>
            </ProtectedRoute>
            <Route path="/sign-up">
              <Header />
              <Register onRegister={handleSubmitRegistration}
                        isRegistred={isRegistred} />
              <InfoTooltip isOpen={isInfoTooltipOpen}
                          onClose={closeAllPopups}
                          isRegistred={isRegistred} />
            </Route>
            <Route path="/sign-in">
              <Header />
              <Login onLogin={handleSubmitLogin}
                    loggedIn={loggedIn} />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
