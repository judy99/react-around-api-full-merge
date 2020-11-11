// utils is a place where you hold functions that are not related to any module or class.
// This is due to the fact that JS is not a strict language. You can use functions, objects, prototypes, classes for the same things.
// Lazy programmers, who can’t split a program into modules clearly, usually place a lot of code into utils.
// This causes problems when you try to find some function inside a big heap of code.
// So a utils folder or a utils.js should be as smaller as you can.
// Group functions, allocate modules, don’t grow this junkyard)

export const httpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// export const BASE_URL = 'http://www.liakurianova.students.nomoreparties.site';
export const BASE_URL = 'http://localhost:3000';
