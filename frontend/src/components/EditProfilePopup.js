import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setName(name || currentUser.name);
    setDescription(description || currentUser.about);
}, [currentUser.name, currentUser.about]);



  function handleSubmit(e) {
  e.preventDefault();
  // Pass the values of the managed components to the external handler
  props.onUpdateUser({
    name: name,
    about: description,
  });
  }

  function handleOnChangeName(e) {
    setName(e.target.value);
  }

  function handleOnChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm title='Edit profile' name='edit-profile' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} value='Save' >
      <input type="text" name="name" id="name-input" className="form__input edit-profile__name" placeholder="Name" minLength="2" maxLength="40" value={name || ''} onChange={handleOnChangeName} required />
      <span id="name-input-error" className="form__input-error"></span>
      <input type="text" name="job" id="job-input" className="form__input edit-profile__job" placeholder="About me" minLength="2" maxLength="200" onChange={handleOnChangeDescription} value={description || ''} required />
      <span id="job-input-error" className="form__input-error"></span>
   </PopupWithForm>
 );
}

export default EditProfilePopup;
