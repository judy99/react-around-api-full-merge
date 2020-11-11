import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteConfirmationPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onConfirmDelete(props.card);
  }

  return (
    < PopupWithForm title='Are you sure?' name='delete-card' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} value='Yes'>
    < /PopupWithForm>
  );
}

export default DeleteConfirmationPopup;
