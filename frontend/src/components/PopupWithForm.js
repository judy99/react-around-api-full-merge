import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={`popup ${(props.isOpen) ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <span className="popup__close" onClick={props.onClose}>+</span>
        <form action="#" method="post" className={`form ${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
          <h2 className={`${props.name}__heading`}>{props.title}</h2>
          {props.children}
          <input type="submit" name="save" className={`btn form__submit ${props.name}__save`} value={props.value} />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
