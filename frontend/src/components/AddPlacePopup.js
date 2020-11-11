import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleOnChangeName(e) {
    setName(e.target.value);
  }

  function handleOnChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Pass the values of the managed components to the external handler
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);


  return (
    <PopupWithForm title='New place' name='add-card' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} value='Add place'>
       <input type="text" name="name" id="title-input" value={name} onChange={handleOnChangeName} className="form__input add-card__title" placeholder="Title" minLength="2" maxLength="30" required />
       <span id="title-input-error" className="form__input-error"></span>
       <input type="url" name="link" id="link-input" value={link} onChange={handleOnChangeLink} className="form__input add-card__image-link" placeholder="Image URL" required />
       <span id="link-input-error" className="form__input-error"></span>
      </PopupWithForm>
  );
}
export default AddPlacePopup;
