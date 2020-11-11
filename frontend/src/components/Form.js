import React from 'react';

function Form(props) {
  return (
    <form action="#" method="post" className={`form ${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
    <h2 className={`${props.name}__heading`}>{props.title}</h2>
      {props.children}
    <input type="submit" name="save" className={`btn form__submit ${props.name}__save`} value={props.value} />
  </form>
  );
}

export default Form;
