// src/js/upload.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(
  'https://roqikwfaenwqipdydhwv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcWlrd2ZhZW53cWlwZHlkaHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTYxMzksImV4cCI6MjA2ODE5MjEzOX0.CpUCA3X4bNIjOCtxrdOZ2kciXEHEogukBie9IOlHpno'
);

const form = document.getElementById('uploadForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const file = data.get('image');

    const user_id = localStorage.getItem('user_id');
  if (!user_id) {
    alert("Please sign in with Google before uploading.");
    return;
  }
  // Upload file to bucket
  const { data: fileData, error: uploadError } = await supabase.storage
    .from('dish-images')
    .upload(`public/${file.name}`, file, { upsert: true });

  if (uploadError) return console.error(uploadError);

  const imageUrl = supabase.storage
    .from('dish-images')
    .getPublicUrl(`public/${file.name}`).publicUrl;

  // Save metadata
  const { error: dbError } = await supabase
  .from('foods')
  .insert([{
    name: data.get('name'),
    description: data.get('description'),
    price: parseFloat(data.get('price')),
    image_url: imageUrl,
    uploader_id: user_id || null
  }]);


  if (dbError) return console.error(dbError);
  alert('Dish uploaded successfully!');
});
