function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map((c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("JWT parsing failed:", err);
    return null;
  }
}

function greetUser(email) {
  const greeting = document.createElement("p");
  greeting.textContent = `Welcome back, ${email}!`;
  const loginSection = document.getElementById("loginSection") || document.body;
  loginSection.insertBefore(greeting, loginSection.firstChild);
}

export function handleCredentialResponse(response) {
  const token = response.credential;
  const userInfo = parseJwt(token);

  if (!userInfo || !userInfo.email || !userInfo.sub) {
    alert("Login failed. Invalid token structure.");
    return;
  }

  localStorage.setItem("user_id", userInfo.sub);
  localStorage.setItem("user_email", userInfo.email);
  localStorage.setItem("token", token);

  greetUser(userInfo.email);

  // Redirect after successful login
  window.location.href = "https://rosarioespadera.github.io/Foodneario/profile.html";
}
