import React from 'react';

function PopupWithImage (props) {
  if ((props.card) !== null) {
  return (
    <div className='popup popup_dark popup_opened'>
      <div className="popup__container popup__container_photo">
        <span className="popup__close" onClick={props.onClose}>+</span>
        <figure className="photo">

        <img className="photo__item" src={props.card.link} alt={props.card.name} />
        <figcaption className="photo__title">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
} else {
  return (
    <></>
  );
}
}

export default PopupWithImage;
