// src/js/login.js
export function handleCredentialResponse(response) {
  const jwt = response.credential;
  console.log("Google JWT:", jwt);
  localStorage.setItem("token", jwt); // store for later use
}
window.handleCredentialResponse = handleCredentialResponse;
