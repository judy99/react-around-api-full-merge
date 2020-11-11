import React from 'react';
import { useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Footer from './Footer';
import Main from './Main';
import {Api} from '../utils/api.js';
import Loader from './Loader';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth.js';
import { httpStatusCode } from '../utils/utils.js';
import { BASE_URL } from '../utils/utils.js';

function App() {
  const DELAY_REDIRECT = 3000;

  const [isEditProfilePopupOpen, setEditPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);
  const [isDeleteConfirmationPopup, setDeleteConfirmationPopup] = React.useState(false);
  const [isPopupWithImageOpen, setPopupWithImage] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deleteCard, setDeleteCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [cardLikes, setCardLikes] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [isRegistered, setRegistered] = React.useState(false);
  const [isInfoToolTip, setInfoToolTip] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem('jwt'));

  const api = new Api({
    baseUrl: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const history = useHistory();

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Send a request to the API and getting the updated card data
    if (isLiked) {
      setIsLoading(true);
      api.removeLike(card._id)
      .then((card) => {
        // Create a new array based on the existing one and putting a new card into it
        // const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCardLikes(card.likes);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));

    } else {
      setIsLoading(true);
      api.addLike(card._id)
      .then((card) => {
        // Create a new array based on the existing one and putting a new card into it
        // const newCard = card.likes.map((c) => c._id === card._id ? newCard : c);
        setCardLikes(card.likes);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
    }
}

  function handleCardDelete(card) {
    setDeleteConfirmationPopup(!isDeleteConfirmationPopup);
    setDeleteCard(card);
  }

  function handleConfirmDelete() {
    setIsLoading(true);
    closeAllPopups();
    if (isDeleteConfirmationPopup) {
      api.removeCard(deleteCard._id)
      .then((card) => {
      // Create a new array based on the existing one and removing a card from it
        const newCards = cards.filter((c) => c._id !== deleteCard._id);
      // Update the state
        setCards(newCards);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDeleteCard(null);
        setIsLoading(false);
    });
  }
}

  function handleEditAvatarClick () {
    setEditAvatar(true);
  }

  function handleEditProfileClick () {
    setEditPopup(true);
  }

  function handleAddPlaceClick () {
    setAddPlace(true);
  }

  function closeAllPopups () {
    setEditAvatar(false);
    setEditPopup(false);
    setAddPlace(false);
    setSelectedCard(null);
    setDeleteConfirmationPopup(false);
    setInfoToolTip(false);
  }

  function handleCardClick(card) {
    setPopupWithImage(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    closeAllPopups();
    api.updateUserInfo(user).then((res) => {
      setCurrentUser({...currentUser, name: res.data.name, about: res.data.about});
    }).catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateAvatar(avatar) {
    closeAllPopups();
    setIsLoading(true);
    api.setUserAvatar(avatar)
    .then((res) => {
      setCurrentUser({...currentUser, avatar: res.data.avatar});
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleAddPlace(newCard) {
    closeAllPopups();
    setIsLoading(true);
    api.addCard(newCard)
    .then((res) => {
      setCards([res, ...cards]);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleSignup(username, password) {
      auth.register(username, password)
      .then((res) => {
        if (res instanceof Error) {
          if (res.message === String(httpStatusCode.BAD_REQUEST)) {
            setRegistered(false);
            throw new Error('One of the fields was filled in incorrectly');
          }
        }
        else {
          setRegistered(true);
          return res;
        }
    })
      .then((res) => {
        if (!(res instanceof Error)) {
          setTimeout(() => {
            closeAllPopups();
            history.push('/signin');
          }, DELAY_REDIRECT);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setInfoToolTip(true));
  }

  function handleLogin(username, password) {
    setIsLoading(true);
    auth.authorize(username, password)
    .then((data) => {
        if (data instanceof Error) {
          setLoggedIn(false);
          if (data.message === String(httpStatusCode.BAD_REQUEST))
            throw new Error('One or more of the fields were not provided.');
          if (data.message === String(httpStatusCode.UNAUTHORIZED))
            throw new Error('The user with the specified email not found.');
        }
        else if (data.token) {
          localStorage.setItem('jwt', data.token);
          setToken(data.token);
          setUsername(username);
          setLoggedIn(true);
          history.push("/");
          return;
        }
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUsername('');
    setCurrentUser({});
    setCards([]);
    history.push('/signin');
  }

React.useEffect(() => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
        setIsLoading(true);
        auth.getContent(jwt)
        .then((res) => {
          if (res instanceof Error) {
            if (res.message === String(httpStatusCode.UNAUTHORIZED))
              throw new Error('The provided token is invalid.');
          }
            setLoggedIn(true);
            setUsername(res.email);
            setToken(jwt);
          })
        .then(() => history.push("/"))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
  }
  else {
    history.push('/signin');
    setIsLoading(false);
  }
}, []);

React.useEffect(() => {
    if (loggedIn && token)
    {
      setIsLoading(true);
      api.getAppInfo()
      .then((data) => {
        setCurrentUser(data[1]);
        setCards(data[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }
}, [token, loggedIn]);

      return (
    <div className="page">
     { isLoading && <Loader /> }

      <Switch>
        <Route path="/signup">
          <Register handleSignup={handleSignup} onCloseToolTip={closeAllPopups} isInfoToolTip={isInfoToolTip} isRegistered={isRegistered} />
        </Route>

        <Route path="/signin">
          <Login setUsername={setUsername} handleLogin={handleLogin} setToken={setToken} setLoggedIn={setLoggedIn} setCards={setCards} setCurrentUser={setCurrentUser} />

        </Route>

        <ProtectedRoute path="/"
          component={Main}
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}

          selectedCard={selectedCard}
          onSelectedCard={handleCardClick}
          cardLikes={cardLikes}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          username={username}
          onSignOut={signOut}
          currentUser={currentUser}

          closeAllPopups={closeAllPopups}

          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          isDeleteConfirmationPopup={isDeleteConfirmationPopup}
          isPopupWithImageOpen={isPopupWithImageOpen}

          handleUpdateUser={handleUpdateUser}
          handleUpdateAvatar={handleUpdateAvatar}
          handleAddPlace={handleAddPlace}
          handleConfirmDelete={handleConfirmDelete}
       />
       <Route exact path="/">
            { loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
      </Route>

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
