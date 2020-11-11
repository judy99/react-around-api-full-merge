import React from 'react';
import Card from './Card';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import PopupWithImage from './PopupWithImage';

function Main(props) {

  return (
    <>
    <CurrentUserContext.Provider value={props.currentUser}>
    <Header>
      <li><NavLink to="/" className="menu__link" activeClassName="menu__link_active" >{props.username}</NavLink></li>
      <li><NavLink to="/signin" className="menu__link" onClick={props.onSignOut}>Log out</NavLink></li>
    </Header>
    <main className="main">

      <section className="profile">
        <div className="profile__person">
          <div className="profile__avatar-wrapper">
            <img src={props.currentUser.avatar} alt="User ptofile avatar" className="profile__avatar" />
            <div className="profile__avatar-hover" onClick={props.onEditAvatar} ></div>
          </div>
          <div className="profile__info">
            <div className="profile__info-wrapper">
              <h1 className="profile__name">{props.currentUser.name}</h1>
              <button type="button" className="btn profile__edit-btn" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__occupation">{props.currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="btn profile__add-btn" onClick={props.onAddPlace}></button>
      </section>
      <ul className="gallery">
      { props.cards.map(item => {
        return <Card card={item} key={item._id} cardLikes={item.likes} onCardClick={props.onSelectedCard} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} /> }
      )
    }
      </ul>
    </main>

    <EditProfilePopup isOpen={props.isEditProfilePopupOpen} onClose={props.closeAllPopups} onUpdateUser={props.handleUpdateUser} />
    <EditAvatarPopup isOpen={props.isEditAvatarPopupOpen} onClose={props.closeAllPopups} onUpdateAvatar={props.handleUpdateAvatar} />
    <AddPlacePopup isOpen={props.isAddPlacePopupOpen} onClose={props.closeAllPopups} onAddPlace={props.handleAddPlace} />
    <DeleteConfirmationPopup isOpen={props.isDeleteConfirmationPopup} onClose={props.closeAllPopups} onConfirmDelete={props.handleConfirmDelete} />
    <PopupWithImage isOpen={props.isPopupWithImageOpen} card={props.selectedCard} onClose={props.closeAllPopups} />

    </CurrentUserContext.Provider>
    </>
  );
}
export default Main;
