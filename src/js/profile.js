import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://roqikwfaenwqipdydhwv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcWlrd2ZhZW53cWlwZHlkaHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTYxMzksImV4cCI6MjA2ODE5MjEzOX0.CpUCA3X4bNIjOCtxrdOZ2kciXEHEogukBie9IOlHpno"
);

const userInfo = document.getElementById("userInfo");
const actions = document.getElementById("profileActions");

(async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    userInfo.innerHTML = `
      <h2>You're browsing as a guest.</h2>
      <p>Want to upload your own dish?</p>
    `;
    const signInBtn = document.createElement("button");
    signInBtn.textContent = "Sign in with Google";
    signInBtn.onclick = () => window.location.href = "index.html";
    actions.appendChild(signInBtn);
    return;
  }

  const { email, id } = data.user;
  userInfo.textContent = `Signed in as ${email}`;
  localStorage.setItem("user_id", id);
  localStorage.setItem("user_email", email);

  const uploadBtn = document.createElement("button");
  uploadBtn.textContent = "Upload a Dish";
  uploadBtn.onclick = () => window.location.href = "upload.html";
  actions.appendChild(uploadBtn);

  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Log out";
  logoutBtn.onclick = async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  };
  actions.appendChild(logoutBtn);
})();

