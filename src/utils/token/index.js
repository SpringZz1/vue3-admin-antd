const TOKEN_CODE = "token";

export function getToken() {
  return window.sessionStorage.getItem(TOKEN_CODE);
}

export function setToken(value) {
  return window.sessionStorage.setItem(TOKEN_CODE, value);
}

export function removeToken() {
  return window.sessionStorage.removeItem(TOKEN_CODE);
}
