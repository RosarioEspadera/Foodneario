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
  userInfo.textContent = "You're browsing as a guest.";

  const menuBtn = document.createElement("button");
  menuBtn.textContent = "View Menu";
  menuBtn.onclick = () => window.location.href = "menu.html";

  actions.appendChild(menuBtn);
}
