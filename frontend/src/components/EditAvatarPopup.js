import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
      <PopupWithForm title='Change profile picture' name='change-avatar' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} value='Save' >
        <input type="url" name="avatar-link" id="avatar-input" ref={avatarRef} className="form__input change-avatar__link" placeholder="Image URL" required />
        <span id="avatar-input-error" className="form__input-error"></span>
      </PopupWithForm>
    );
}

export default EditAvatarPopup;
