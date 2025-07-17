function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64).split('').map((c) =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
  return JSON.parse(jsonPayload);
}

export function handleCredentialResponse(response) {
  const token = response.credential;

  try {
    const userInfo = parseJwt(token);
    localStorage.setItem("user_id", userInfo.sub);
    localStorage.setItem("user_email", userInfo.email);
    localStorage.setItem("token", token);

    // Redirect after successful login
    window.location.href = "https://rosarioespadera.github.io/Foodneario/upload.html";
  } catch (err) {
    console.error("JWT parsing failed:", err);
    alert("Login failed. Please try again.");
  }
}
