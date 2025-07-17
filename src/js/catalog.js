// src/js/catalog.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(
  'https://roqikwfaenwqipdydhwv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcWlrd2ZhZW53cWlwZHlkaHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTYxMzksImV4cCI6MjA2ODE5MjEzOX0.CpUCA3X4bNIjOCtxrdOZ2kciXEHEogukBie9IOlHpno'
);
const grid = document.getElementById('menuGrid');

async function loadMenu() {
  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .order('inserted_at', { ascending: false });

  if (error) {
    console.error('Error loading dishes:', error);
    grid.innerHTML = '<p>Failed to load menu. Please try again later.</p>';
    return;
  }

  if (!data.length) {
    grid.innerHTML = '<p>No dishes uploaded yet. Be the first to share something delicious!</p>';
    return;
  }

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.innerHTML = `
      <img src="${item.image_url}" alt="${item.name}" />
      <div class="dish-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <strong>₱${item.price.toFixed(2)}</strong>
      </div>
    `;
    grid.appendChild(card);
  });
}

loadMenu();
