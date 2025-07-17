const userEmail = localStorage.getItem("user_email");
const token = localStorage.getItem("token");
const userInfo = document.getElementById("userInfo");
const actions = document.getElementById("profileActions");

if (token && userEmail) {
  userInfo.textContent = `Signed in as ${userEmail}`;

  const uploadBtn = document.createElement("button");
  uploadBtn.textContent = "Upload a Dish";
  uploadBtn.onclick = () => window.location.href = "upload.html";

  actions.appendChild(uploadBtn);
} else {
  userInfo.innerHTML = "<h2>You're browsing as a guest.</h2><p>Want to upload your own dish?</p>";

  const signInBtn = document.createElement("button");
  signInBtn.textContent = "Sign in with Google";
  signInBtn.onclick = () => window.location.href = "index.html";

  actions.appendChild(signInBtn);
}
