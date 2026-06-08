import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
}

// Use a valid dummy URL to prevent URL parsing errors during build/boot
// when the user hasn't set their environment variables yet.
const url = supabaseUrl && supabaseUrl.startsWith('http') ? supabaseUrl : 'https://dummy-project.supabase.co';

export const supabase = createClient(
  url,
  supabaseAnonKey || 'dummy-key'
);
