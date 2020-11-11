import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Form from './Form.js';
import Header from './Header.js';
import InfoToolTip from './InfoToolTip.js';

function Register (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setRegistered] = useState(false);
  const [isInfoToolTip, setInfoToolTip] = useState(false);

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = (e) => {
    e.currentTarget.reset();
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      resetForm(e);
      props.handleSignup(email, password);
    };

    useEffect( () => {
        setRegistered(props.isRegistered);
        setInfoToolTip(props.isInfoToolTip);
    }, [props.isRegistered, props.isInfoToolTip]);

  return (
    <>
    <Header>
      <li><NavLink to="/signin" className="menu__link">Log In</NavLink></li>
    </Header>
    <div className='main'>
    <div className='main__container'>
    <Form title='Sign Up' name='login' id='login' onSubmit={handleSubmit} value='Sign up'>
      <input type='email' name='email' id='email-input' className='form__input login__email' placeholder='Email' onChange={handleOnChangeEmail} required />
      <span id='email-input-error' className='form__input-error'></span>
      <input type='password' name='password' id='password-input' className='form__input login__password' placeholder='Password' onChange={handleOnChangePassword} required />
      <span id='password-input-error' className='form__input-error'></span>
    </Form>
    <Link className='login__link' to="/signin">Already a member? Log in here</Link>
    </div>
    </div>

    { isRegistered ?
      <InfoToolTip name='tool-tip' isRegistered={isRegistered} isOpen={isInfoToolTip} title='Success! You have now been registered.' onClose={props.onCloseToolTip} />
      : <InfoToolTip isOpen={isInfoToolTip} isRegistered={isRegistered} title='Oops, something went wrong! Please try again.' name='tool-tip' onClose={props.onCloseToolTip} />
    }

    </>

  );
}

export default Register;
