// src/js/catalog.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(
  'https://roqikwfaenwqipdydhwv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcWlrd2ZhZW53cWlwZHlkaHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTYxMzksImV4cCI6MjA2ODE5MjEzOX0.CpUCA3X4bNIjOCtxrdOZ2kciXEHEogukBie9IOlHpno'
);
const menuGrid = document.getElementById("menuGrid");
async function loadDishes() {
  const { data, error } = await supabase.from("foods").select("*");

  if (error) {
    console.error("Failed to load dishes:", error);
    menuGrid.innerHTML = "<p>Error loading menu. Try again later.</p>";
    return;
  }

  if (data.length === 0) {
    menuGrid.innerHTML = "<p>No dishes uploaded yet. Be the first!</p>";
    return;
  }

  menuGrid.innerHTML = ""; // Clear default

  data.forEach((dish) => {
    const card = document.createElement("div");
    card.className = "dish-card";

    card.innerHTML = `
      <img src="${dish.image_url}" alt="${dish.name}" class="dish-img" />
      <h3>${dish.name}</h3>
      <p>${dish.description}</p>
      <small>Uploaded by: ${dish.uploader_id || "guest"}</small>
    `;

    menuGrid.appendChild(card);
  });
}

loadDishes();
