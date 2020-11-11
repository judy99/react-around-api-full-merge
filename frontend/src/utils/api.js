export class Api {
  constructor ({
    baseUrl,
    headers
  }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // GET http://www.liakurianova.students.nomoreparties.site/cards
  getInitialCards () {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  // GET http://www.liakurianova.students.nomoreparties.site/users/me
  getUserInfo () {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  // POST http://www.liakurianova.students.nomoreparties.site/cards
  addCard ({
  name,
  link
}) {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  // DELETE http://www.liakurianova.students.nomoreparties.site/cards/cardID
  removeCard (cardID) {
    return fetch(this.baseUrl + '/cards/' + cardID, {
      headers: this.headers,
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status} ${res.message}`);
        }
      });
  }

  getAppInfo () {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  // add likes
  // PUT http://www.liakurianova.students.nomoreparties.site/cards/likes/cardId
  addLike (cardId) {
    return fetch(this.baseUrl + '/cards/likes/' + cardId, {
      headers: this.headers,
      method: 'PUT'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  // DELETE http://www.liakurianova.students.nomoreparties.site/cards/likes/cardId
  removeLike (cardId) {
    return fetch(this.baseUrl + '/cards/likes/' + cardId, {
      headers: this.headers,
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  changeLikeCardStatus (cardId, cardStatus) {
    if (!cardStatus) {
      this.addLike(cardId);
    }
    else {
      this.removeLike(cardId)
    }
  }

  // Editing the Profile
  // PATCH http://www.liakurianova.students.nomoreparties.site/users/me
  updateUserInfo ({ name, about }) {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
  }

  // PATCH http://www.liakurianova.students.nomoreparties.site/users/me/avatar
  setUserAvatar (avatar) {
    return fetch(this.baseUrl + '/users/me/avatar', {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify(avatar),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status} ${res.message}`);
        }
      });
  }
}
