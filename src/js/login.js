import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase client with anon key
const supabase = createClient(
  "https://roqikwfaenwqipdydhwv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcWlrd2ZhZW53cWlwZHlkaHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTYxMzksImV4cCI6MjA2ODE5MjEzOX0.CpUCA3X4bNIjOCtxrdOZ2kciXEHEogukBie9IOlHpno"
);

// Trigger Supabase Google login flow
document.getElementById("loginBtn").addEventListener("click", async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://rosarioespadera.github.io/Foodneario/profile.html"
    }
  });
});
