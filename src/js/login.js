// src/js/login.js
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));

  return JSON.parse(jsonPayload);
}

export function handleCredentialResponse(response) {
  const token = response.credential;
  const userInfo = parseJwt(token);

  localStorage.setItem("user_id", userInfo.sub);
  localStorage.setItem("user_email", userInfo.email);
  localStorage.setItem("token", token);

  // Redirect to upload page
window.location.href = "https://rosarioespadera.github.io/Foodneario/upload.html";

}

