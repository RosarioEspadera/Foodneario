// src/js/upload.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_ANON_KEY');
const form = document.getElementById('uploadForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const file = data.get('image');

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
      uploader_id: null // replace with actual user ID if tracked
    }]);

  if (dbError) return console.error(dbError);
  alert('Dish uploaded successfully!');
});
