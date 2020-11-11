import React from 'react';

function Header(props) {
  return (
    <header className="header">
      <a href="/" className="link header__logo logo">Around
      <span className="logo__small">The U.S.</span>
      </a>
      <ul className="menu">
        {props.children}
      </ul>
    </header>
  );
}

export default Header;
