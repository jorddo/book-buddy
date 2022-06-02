import { GET_ME } from './queries';
import { ADD_USER, LOGIN_USER } from './mutations';

const url = process.env.REACT_APP_GRAPHQL_ENDPOINT;

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: GET_ME,
    }),
  });
};

export const createUser = ({ username, email, password }) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ADD_USER,
      variables: {
        username,
        email,
        password,
      },
    }),
  });
};

export const loginUser = ({ email, password }) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: LOGIN_USER,
      variables: {
        email,
        password,
      },
    }),
  });
};

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
