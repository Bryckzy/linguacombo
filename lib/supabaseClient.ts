import { createClient } from '@supabase/supabase-js';

// These variables are expected to be set in the environment.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This warning is for development; in production, missing env vars should be treated as a critical error.
  // However, the core requirement is to assume they are pre-configured.
  // The application code using `supabase` client should handle if it's null,
  // or we rely on the environment always providing them.
  // For robustness in components, they should check if supabase client is available.
  console.warn(
    'Supabase URL or Anon Key is not set. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.'
  );
}

// Initialize and export the Supabase client.
// Components using this client should ideally check if it's non-null before usage,
// especially if there's a possibility of env vars not being set during startup or in certain environments.
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
