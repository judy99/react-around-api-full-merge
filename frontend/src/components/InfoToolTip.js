import React from 'react';

function InfoToolTip(props) {
  return (
    <div className={`popup ${(props.isOpen) ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <span className="popup__close" onClick={props.onClose}>+</span>
        <div className={ `${props.name} ${props.name}__icon ${ (props.isRegistered) ? `${props.name}__icon_state_yes` : `${props.name}__icon_state_no` } ` } >
        <h2 className={`${props.name}__heading`}>{props.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoToolTip;
