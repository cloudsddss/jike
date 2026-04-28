const System_Key = "token_key";

export function setToken(token) {
  return localStorage.setItem(System_Key, token);
}

export function getToken() {
  return localStorage.getItem(System_Key);
}

export function removeToken() {
    return localStorage.removeItem(System_Key);
}
