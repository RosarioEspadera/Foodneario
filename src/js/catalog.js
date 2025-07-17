// src/js/catalog.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_ANON_KEY');
const grid = document.getElementById('menuGrid');

const loadMenu = async () => {
  const { data, error } = await supabase.from('foods').select('*');
  if (error) return console.error(error);

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.innerHTML = `
      <img src="${item.image_url}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <strong>₱${item.price.toFixed(2)}</strong>
    `;
    grid.appendChild(card);
  });
};

loadMenu();
