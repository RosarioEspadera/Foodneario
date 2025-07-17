import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(
  'https://roqikwfaenwqipdydhwv.supabase.co',
  'your-anon-key-here' // Keep this secured later
);

const form = document.getElementById('uploadForm');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;

  const data = new FormData(form);
  const file = data.get('image');

  if (!file || file.size === 0) {
    showError("Please choose an image to upload.");
    submitBtn.disabled = false;
    return;
  }

  const user_id = localStorage.getItem('user_id');
  if (!user_id) {
    showError("Please sign in with Google before uploading.");
    submitBtn.disabled = false;
    return;
  }

  const filePath = `public/${Date.now()}-${file.name}`;
  const { data: fileData, error: uploadError } = await supabase.storage
    .from('dish-images')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    showError(`Upload failed: ${uploadError.message}`);
    submitBtn.disabled = false;
    return;
  }

  const imageUrl = supabase.storage
    .from('dish-images')
    .getPublicUrl(filePath).publicUrl;

  const { error: dbError } = await supabase
    .from('foods')
    .insert([{
      name: data.get('name'),
      description: data.get('description'),
      price: parseFloat(data.get('price')),
      image_url: imageUrl,
      uploader_id: user_id
    }]);

  if (dbError) {
    showError(`Insert failed: ${dbError.message}`);
    submitBtn.disabled = false;
    return;
  }

  showSuccess("Dish uploaded successfully!");
  form.reset();
  submitBtn.disabled = false;

  // Optional redirect:
  // window.location.href = "menu.html";
});

// Helper functions
function showError(msg) {
  alert(msg);
  console.error(msg);
}

function showSuccess(msg) {
  alert(msg);
  console.log(msg);
}
